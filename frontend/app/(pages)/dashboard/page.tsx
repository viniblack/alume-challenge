'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSimulations, getSimulationsEvolution, getSimulationsSummary } from "@/services/simulation";
import { useEffect, useState, useCallback } from "react";
import { Simulation } from "@/lib/http/simulationAPI";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import RequireAuth from "@/components/RequireAuth";
import { DataTable } from "@/components/features/dashboard-table/data-table";
import { simulationColumns } from "@/components/features/dashboard-table/columns";
import { toast } from "sonner";

export default function DashboardPage() {
  const [simulations, setSimulations] = useState<Simulation[]>([]);
  const [simulationsSummary, setSimulationsSummary] = useState<{ totalSimulations: number; averageInstallment: number }>({ totalSimulations: 0, averageInstallment: 0 });
  const [simulationsEvolution, setSimulationsEvolution] = useState<Simulation[]>([]);

  const fetchData = useCallback(async () => {
    try {
      const [simulationsRes, summaryRes, evolutionRes] = await Promise.all([
        getSimulations(1),
        getSimulationsSummary(),
        getSimulationsEvolution()
      ]);

      setSimulations(simulationsRes.simulations);
      setSimulationsSummary(summaryRes);
      setSimulationsEvolution(evolutionRes.simulations);
    } catch (error) {
      console.error("Erro ao buscar dados", error.response?.data?.error || error.message)
      toast.error(error.response?.data?.error || "Erro ao buscar dados")
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const recentSimulations = simulations.slice(0, 5);

  const totalSimulations = simulations.length;
  const averageInstallment = simulationsSummary.totalSimulations > 0
    ? simulationsSummary.averageInstallment
    : 0;

  return (
    <RequireAuth>
      {/* grid gap-6 p-4 sm:p-6 max-w-screen-xl mx-auto */}
      <div className="w-full px-3 md:px-10 pt-5 d-flex">
        {/* Últimas Simulações */}
        <Card className="my-5">
          <CardHeader>
            <CardTitle className="text-base sm:text-lg md:text-xl">Últimas 5 Simulações</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <DataTable columns={simulationColumns} data={recentSimulations} />
          </CardContent>
        </Card>

        {/* Cards de estatísticas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <StatCard title="Total de Simulações" value={totalSimulations.toString()} />
          <StatCard title="Valor Médio das Parcelas" value={`R$ ${averageInstallment.toLocaleString("pt-BR")}`} />
        </div>

        {/* Gráfico */}
        <Card className="my-5">
          <CardHeader>
            <CardTitle className="text-base sm:text-lg md:text-xl">Evolução das Simulações por Valor</CardTitle>
          </CardHeader>
          <CardContent className="h-64 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={simulationsEvolution.slice().reverse()}
                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="createdAt"
                  tickFormatter={(str) => new Date(str).toLocaleDateString("pt-BR")}
                />
                <YAxis />
                <Tooltip formatter={(value: number) => `R$ ${value.toLocaleString("pt-BR")}`} />
                <Line
                  type="monotone"
                  dataKey="totalAmount"
                  stroke="#00dcc0"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </RequireAuth>
  );
}

/** Subcomponente para Cards de estatísticas */
function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-base sm:text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-xl sm:text-2xl font-bold break-words">{value}</p>
      </CardContent>
    </Card>
  );
}
