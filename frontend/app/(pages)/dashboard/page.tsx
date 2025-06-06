'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSimulations, getSimulationsEvolution, getSimulationsSummary } from "@/services/simulation";
import { useEffect, useState, useCallback } from "react";
import { Simulation } from "@/lib/http/simulationAPI";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import RequireAuth from "@/components/RequireAuth";

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

      console.log('Simulations:', simulationsRes.simulations);
      console.log('Summary:', summaryRes);
      console.log('Evolution:', evolutionRes.simulations);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
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
      <div className="grid gap-6 p-6">
        {/* Resumo das Simulações Recentes */}
        <Card>
          <CardHeader>
            <CardTitle>Últimas 5 Simulações</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {recentSimulations.map(sim => (
                <li key={sim.id} className="flex justify-between text-sm">
                  <span>{new Date(sim.createdAt).toLocaleDateString("pt-BR")}</span>
                  <span>Valor: R$ {sim.totalAmount.toLocaleString("pt-BR")}</span>
                  <span>Nº Parcelas: {sim.numberOfInstallments}</span>
                  <span>Parcela: R$ {sim.monthlyInstallment.toLocaleString("pt-BR")}</span>
                  <span>Juros: {sim.monthlyInterestRate}%</span>
                  <span>Total: R$ {sim.totalToPay.toLocaleString("pt-BR")}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Totalizadores */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <StatCard title="Total de Simulações" value={totalSimulations.toString()} />
          <StatCard title="Valor Médio das Parcelas" value={`R$ ${averageInstallment.toLocaleString("pt-BR")}`} />
        </div>

        {/* Gráfico de Evolução das Simulações */}
        <Card>
          <CardHeader>
            <CardTitle>Evolução das Simulações por Valor</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
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
            </div>
          </CardContent>
        </Card>
      </div>
    </RequireAuth>
  );
}

/** Subcomponente para Cards de estatísticas */
function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{value}</p>
      </CardContent>
    </Card>
  );
}
