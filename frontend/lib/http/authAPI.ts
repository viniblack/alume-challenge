import apiClient from "./apiClient";

export type RegisterStudentRequest = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type StudentRequest = {
  firstName: string;
  lastName: string;
  email: string;
};

export type ChangePasswordRequest = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
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
  },
  changePassword: async (payload: ChangePasswordRequest) => {
    const res = await apiClient.patch('/api/change-password', payload)
    return res.data
  },
  updateProfile: async (payload: StudentRequest): Promise<AuthResponse> => {
    const res = await apiClient.put('/api/me', payload);
    return res.data;
  }
};

export default authAPI;
