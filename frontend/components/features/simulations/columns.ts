import { ColumnDef } from "@tanstack/react-table";

export type Simulation = {
  id: string;
  totalAmount: number;
  numberOfInstallments: number;
  monthlyInterestRate: number;
  monthlyInstallment: number;
  createdAt: string;
  totalInterest: number;
  totalToPay: number;
  interestPercentage: number;
};

export const columns: ColumnDef<Simulation>[] = [
  {
    accessorKey: "createdAt",
    header: "Data",
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);
      return date.toLocaleDateString("pt-BR");
    },
    enableSorting: true
  },
  {
    accessorKey: "totalAmount",
    header: "Valor",
    cell: ({ row }) => `R$ ${row.original.totalAmount.toLocaleString("pt-BR")}`,
    enableSorting: true
  },
  {
    accessorKey: "numberOfInstallments",
    header: "Parcelas",
    enableSorting: true
  },
  {
    accessorKey: "interestPercentage",
    header: "Juros (%)",
    cell: ({ row }) => `${row.original.interestPercentage.toFixed(2)}%`,
    enableSorting: true
  },
  {
    accessorKey: "monthlyInstallment",
    header: "Valor Parcela",
    cell: ({ row }) => `R$ ${row.original.monthlyInstallment.toFixed(2)}`,
    enableSorting: true
  },
  {
    accessorKey: "totalToPay",
    header: "Total c/ Juros",
    cell: ({ row }) => `R$ ${row.original.totalToPay.toLocaleString("pt-BR")}`,
    enableSorting: true
  },
];

