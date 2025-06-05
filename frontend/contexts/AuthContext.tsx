"use client"
import authAPI, { LoginRequest, RegisterStudentRequest } from "@/lib/http/authAPI";
import { authLogin, authRegister } from "@/services/auth";
import React, { useState, createContext, useContext, useCallback } from "react";

export type Student = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

type AuthContextType = {
  student: Student | null;
  loading: boolean;
  login: (payload: LoginRequest) => Promise<void>;
  register: (payload: RegisterStudentRequest) => Promise<void>;
  logout: () => Promise<void>;
  fetchCurrentStudent: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchCurrentStudent = useCallback(async () => {
    try {
      const res = await authAPI.getCurrentStudent();
      setStudent(res.student);
    } catch (error) {
      console.error(error);
      setStudent(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (payload: LoginRequest) => {
    await authLogin(payload);
    await fetchCurrentStudent();
  };

  const register = async (payload: RegisterStudentRequest) => {
    await authRegister(payload);
    await fetchCurrentStudent();
  };

  const logout = async () => {
    await authAPI.logout();
    setStudent(null);
  };

  return (
    <AuthContext.Provider value={{ student, loading, login, register, logout, fetchCurrentStudent }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }
  return context;
};