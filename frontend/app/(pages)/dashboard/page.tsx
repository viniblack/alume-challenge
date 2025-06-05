import PrivateRoute from "@/components/PrivateRoute";


export default function DashboardPage() {
  return (
    <PrivateRoute>
      <div>Bem-vindo ao Dashboard!</div>
    </PrivateRoute>
  )
}