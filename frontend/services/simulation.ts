import simulationAPI, { SimulationRequest } from "@/lib/http/simulationAPI"

export async function createSimulation(data: SimulationRequest) {
  return await simulationAPI.CreateSimulation(data)
}

export async function getSimulations(page = 1) {
  return await simulationAPI.GetSimulations(page);
}

export async function getSimulationsSummary() {
  return await simulationAPI.GetSimulationsSummary();
}

export async function getSimulationsEvolution() {
  return await simulationAPI.GetSimulationsEvolution();
}