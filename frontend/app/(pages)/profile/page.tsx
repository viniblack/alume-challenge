"use client"

import { useCallback, useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import authAPI from "@/lib/http/authAPI"
import { toast } from "sonner"
import { updateProfile } from "@/services/auth"
import RequireAuth from "@/components/RequireAuth"

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import ChangePassword from "@/components/features/change-password"

export type Student = {
  id: string
  firstName: string
  lastName: string
  email: string
}

export default function ProfilePage() {
  const [student, setStudent] = useState<Student | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  })

  const fetchCurrentStudent = useCallback(async () => {
    try {
      const res = await authAPI.getCurrentStudent()
      setStudent(res.student)
    } catch (error) {
      console.error("Erro ao buscar dados do usuário:", error)
      toast.error("Erro ao carregar perfil.")
    }
  }, [])

  useEffect(() => {
    fetchCurrentStudent()
  }, [fetchCurrentStudent])

  useEffect(() => {
    if (student) {
      setFormData({
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
      })
    }
  }, [student])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSave = async () => {
    try {
      const res = await updateProfile(formData)
      console.log("Atualização de perfil:", res)
      toast.success("Perfil atualizado com sucesso.")
      setIsEditing(false)
      fetchCurrentStudent()
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error)
      toast.error("Erro ao salvar alterações.")
    }
  }

  if (!student) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center">
        <p className="text-muted-foreground">Carregando dados do perfil...</p>
      </div>
    )
  }

  return (
    <RequireAuth>
      <div className="max-w-2xl mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle>Perfil</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">Nome</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="lastName">Sobrenome</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>

            <div className="flex justify-between gap-2 pt-4">
              {isEditing ? (
                <>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleSave}>Salvar</Button>
                </>
              ) : (
                <>
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline">Mudar senha</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <ChangePassword onClose={() => setIsDialogOpen(false)} />
                    </DialogContent>
                  </Dialog>

                  <Button onClick={() => setIsEditing(true)}>Editar</Button>
                </>
              )}
            </div>
          </CardContent>

        </Card>
      </div>
    </RequireAuth>
  )
}
