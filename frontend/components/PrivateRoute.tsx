"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { student, fetchCurrentStudent, loading } = useAuth();
  const router = useRouter();

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await fetchCurrentStudent();
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
      } finally {
        setChecked(true);
      }
    };

    checkAuth();
  }, [fetchCurrentStudent]);

  // ✅ Redireciona após a verificação, dentro de um efeito
  useEffect(() => {
    if (checked && !loading && !student) {
      router.push("/login");
    }
  }, [checked, loading, student, router]);

  if (!checked || loading) {
    return <p>Carregando...</p>;
  }

  // ✅ Evita renderizar a rota protegida antes do redirecionamento
  if (!student) {
    return null;
  }

  return <>{children}</>;
}
