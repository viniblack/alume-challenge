import PrivateRoute from "@/components/PrivateRoute";
import SimulationCard from "@/components/simulation-card";

export default function SimulationPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center">
      <PrivateRoute>
        <SimulationCard />
      </PrivateRoute>
    </div>
  )
}