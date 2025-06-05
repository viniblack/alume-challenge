import simulationAPI, { SimulationRequest } from "@/lib/http/simulationAPI"

export async function simulation(data: SimulationRequest) {
  return await simulationAPI.CreateSimulation(data)
}