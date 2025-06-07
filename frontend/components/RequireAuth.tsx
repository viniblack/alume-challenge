"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { NavBar } from "./features/navBar";

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const { student, loading, fetchCurrentStudent } = useAuth();
  const router = useRouter();

  useEffect(() => {
    fetchCurrentStudent();
  }, [fetchCurrentStudent]);

  useEffect(() => {
    if (!loading && !student) {
      router.push("/login");
    }
  }, [loading, student, router]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (!student) {
    return null;
  }

  return (
    <>
      <NavBar />
      {children}
    </>
  );
}
