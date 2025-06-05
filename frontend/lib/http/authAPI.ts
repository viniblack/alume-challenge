import apiClient from "./apiClient";

export type RegisterStudentRequest = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type AuthResponse = {
  student: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  };
};

const authAPI = {
  login: async (payload: LoginRequest): Promise<AuthResponse> => {
    const res = await apiClient.post<AuthResponse>('/api/login', payload);
    return res.data;
  },
  register: async (payload: RegisterStudentRequest): Promise<AuthResponse> => {
    const res = await apiClient.post<AuthResponse>('/api/register', payload);
    return res.data;
  },
  getCurrentStudent: async (): Promise<AuthResponse> => {
    const res = await apiClient.get<AuthResponse>('/api/me');
    return res.data
  },
  logout: async () => {
    const res = await apiClient.post('/api/logout');
    return res.data
  }
};

export default authAPI;
