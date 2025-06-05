"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { loginSchema, LoginSchema } from "@/lib/validations"
import { zodResolver } from "@hookform/resolvers/zod"
import { authLogin } from "@/services/auth"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

export function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  })

  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const onSubmit = async (data: LoginSchema) => {
    try {
      setLoading(true)
      const res = await authLogin(data)

      console.log("Login success", res)

      toast.success("Login sucesso")

      router.push('/dashboard')
    } catch (err) {
      console.error("Login error", err)
      toast.error("Erro ao cadastrar usuário")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} >
          <div className="flex flex-col gap-6">
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input id="email" {...register("email")} />
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>
            <div className="grid gap-3">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input id="password" type="password" {...register("password")} />
              {errors.password && <p className="text-red-500">{errors.password.message}</p>}

            </div>
            <div className="flex flex-col gap-3">
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Enviando..." : "Login"}
              </Button>
            </div>
          </div>
          <div className="mt-4 text-center text-sm">
            Ainda não tem conta?{" "}
            <a href="#" className="underline underline-offset-4">
              Cadastra-se
            </a>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
