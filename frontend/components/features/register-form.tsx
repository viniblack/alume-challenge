"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema, RegisterSchema } from "@/lib/validations"
import { authRegister } from "@/services/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export function RegisterForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  })

  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const onSubmit = async (data: RegisterSchema) => {
    try {
      setLoading(true)
      const res = await authRegister(data)

      console.log("Register success", res)

      toast.success("Usuário cadastrado com sucesso")

      router.push('/dashboard')
    } catch (err) {
      console.error("Register error", err)
      toast.error("Erro ao cadastrar usuário")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Registro</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex">
            <div className="grid gap-3 me-3">
              <Label htmlFor="firstName">Nome</Label>
              <Input id="firstName" {...register("firstName")} />
              {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="lastName">Sobrenome</Label>
              <Input id="lastName" {...register("lastName")} />
              {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}
            </div>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="email">Email</Label>
            <Input id="email" {...register("email")} />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>
          <div className="grid gap-3">
            <Label htmlFor="password">Senha</Label>
            <Input id="password" type="password" {...register("password")} />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
          </div>
          <div className="grid gap-3">
            <Label htmlFor="confirmPassword">Confirmar senha</Label>
            <Input id="confirmPassword" type="password" {...register("confirmPassword")} />
            {errors.confirmPassword && (
              <p className="text-red-500">{errors.confirmPassword.message}</p>
            )}
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? "Enviando..." : "Registrar"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
