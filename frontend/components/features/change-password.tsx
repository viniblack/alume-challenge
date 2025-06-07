"use client"

import {
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { changePasswordSchema, ChangePasswordSchema } from "@/lib/validations"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { changePassword } from "@/services/auth"
import { useState } from "react"

type ChangePasswordProps = {
  onClose: () => void
}

export default function ChangePassword({ onClose }: ChangePasswordProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
  })

  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: ChangePasswordSchema) => {
    try {
      setLoading(true)
      const res = await changePassword(data)
      toast.success(res.message)
      onClose()
    } catch (error) {
      console.error("Change Password error", error.response?.data?.error || error.message)
      toast.error(error.response?.data?.error || "Erro ao mudar a senha")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-100 p-5">
      <DialogHeader className="my-5">
        <DialogTitle>Mudar senha</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="grid gap-3">
          <Label htmlFor="currentPassword">Senha atual</Label>
          <Input id="currentPassword" type="password" {...register("currentPassword")} />
          {errors.currentPassword && <p className="text-red-500">{errors.currentPassword.message}</p>}
        </div>
        <div className="grid gap-3">
          <Label htmlFor="newPassword">Nova senha</Label>
          <Input id="newPassword" type="password" {...register("newPassword")} />
          {errors.newPassword && <p className="text-red-500">{errors.newPassword.message}</p>}
        </div>
        <div className="grid gap-3">
          <Label htmlFor="confirmNewPassword">Confirmar nova senha</Label>
          <Input id="confirmNewPassword" type="password" {...register("confirmNewPassword")} />
          {errors.confirmNewPassword && (
            <p className="text-red-500">{errors.confirmNewPassword.message}</p>
          )}
        </div>
        <DialogFooter>
          <Button type="submit" disabled={loading}>
            {loading ? "Enviando..." : "Mudar senha"}
          </Button>
        </DialogFooter>
      </form>
    </div>
  )
}
