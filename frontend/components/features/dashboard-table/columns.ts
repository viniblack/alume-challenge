import { ColumnDef } from "@tanstack/react-table";
import { Simulation } from "@/lib/http/simulationAPI";

export const simulationColumns: ColumnDef<Simulation>[] = [
  {
    accessorKey: "createdAt",
    header: "Data",
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);
      return date.toLocaleDateString("pt-BR");
    },
  },
  {
    accessorKey: "totalAmount",
    header: "Valor",
    cell: ({ row }) => `R$ ${row.original.totalAmount.toLocaleString("pt-BR")}`,
  },
  {
    accessorKey: "numberOfInstallments",
    header: "Nº Parcelas",
  },
  {
    accessorKey: "monthlyInstallment",
    header: "Parcela",
    cell: ({ row }) => `R$ ${row.original.monthlyInstallment.toLocaleString("pt-BR")}`,
  },
  {
    accessorKey: "monthlyInterestRate",
    header: "Juros",
    cell: ({ row }) => `${row.original.monthlyInterestRate}%`,
  },
  {
    accessorKey: "totalToPay",
    header: "Total",
    cell: ({ row }) => `R$ ${row.original.totalToPay.toLocaleString("pt-BR")}`,
  },
];
