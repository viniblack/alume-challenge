"use client"
import PrivateRoute from "@/components/PrivateRoute";
import SimulationCard from "@/components/features/simulation-card";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/features/simulations/data-table";
import { columns, Simulation } from "@/components/features/simulations/columns";
import { getSimulations } from "@/services/simulation";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function SimulationsPage() {
  const [data, setData] = useState<Simulation[]>([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async () => {
    const res = await getSimulations(pageIndex);
    setData(res.simulations);
    setTotalPages(res.pagination.totalPages);
  };

  useEffect(() => {
    fetchData();
  }, [pageIndex, pageSize]);

  return (
    <PrivateRoute>
      <div className="w-full px-10 pt-5">
        <div className="flex justify-between">
          <h2 className="text-3xl font-bold mb-6">Histórico de Simulações</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button size={"lg"} variant="outline">
                Criar
              </Button>
            </DialogTrigger>
            <DialogContent>
              <SimulationCard />
            </DialogContent>
          </Dialog>
        </div>
        <DataTable
          columns={columns}
          data={data}
          pageIndex={pageIndex}
          pageSize={pageSize}
          totalPages={totalPages}
          onPageChange={(page) => setPageIndex(page)}
          onPageSizeChange={(size) => {
            setPageSize(size);
            setPageIndex(1); // resetar para página 1 quando mudar o tamanho
          }}
        />
      </div>
    </PrivateRoute>
  );
}
