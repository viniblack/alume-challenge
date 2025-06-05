import apiClient from "./apiClient";

export type SimulationRequest = {
  totalAmount: number;
  numberOfInstallments: number;
  monthlyInterestRate: number
}

export type LoginRequest = {
  email: string;
  password: string;
};

export type SimulationResponse = {
  simulation: {
    id: string;
    totalAmount: number;
    numberOfInstallments: number;
    monthlyInterestRate: number;
    monthlyInstallment: number;
    createdAt: string;
    totalInterest: number;
    totalToPay: number;
    interestPercentage: number;
  }
}

const simulationAPI = {
  CreateSimulation: async (payload: SimulationRequest): Promise<SimulationResponse> => {
    const res = await apiClient.post<SimulationResponse>('/api/simulations', payload);
    return res.data;
  }
}

export default simulationAPI;