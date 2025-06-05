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

export type Pagination = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
};

export type GetSimulationsResponse = {
  pagination: Pagination;
  simulations: Simulation[];
};

const simulationAPI = {
  CreateSimulation: async (payload: SimulationRequest): Promise<SimulationResponse> => {
    const res = await apiClient.post<SimulationResponse>('/api/simulations', payload);
    return res.data;
  },

  GetSimulations: async (page = 1): Promise<GetSimulationsResponse> => {
    const res = await apiClient.get<GetSimulationsResponse>(`/api/simulations?page=${page}`);
    return res.data;
  }
};

export default simulationAPI;