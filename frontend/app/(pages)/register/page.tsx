import { RegisterForm } from "@/components/features/register-form";
import PublicRoute from "@/components/PublicRoute";

export default function RegisterPage() {
  return (
    <PublicRoute>
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <RegisterForm />
        </div>
      </div>
    </PublicRoute>
  )
}
