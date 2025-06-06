"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const { student, loading } = useAuth();
  const router = useRouter();

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

  return <>{children}</>;
}
