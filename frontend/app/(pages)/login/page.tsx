import { LoginForm } from "@/components/features/login-form"
import PublicRoute from "@/components/PublicRoute"

export default function LoginPage() {
  return (
    <PublicRoute>
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <LoginForm />
        </div>
      </div>
    </PublicRoute>
  )
}
