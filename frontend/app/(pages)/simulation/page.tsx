"use client"
import RequireAuth from "@/components/RequireAuth";
import SimulationCard from "@/components/features/simulation-card";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/features/simulations-table/data-table";
import { columns, Simulation } from "@/components/features/simulations-table/columns";
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
    <RequireAuth>
      <div className="w-full px-3 md:px-10 pt-5">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <h2 className="text-2xl md:text-3xl font-bold">Histórico de Simulações</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button size={"lg"} variant="outline" className="w-full md:w-auto">
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
    </RequireAuth>
  );
}



