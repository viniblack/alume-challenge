import authAPI from "@/lib/http/authAPI"
import { LoginSchema, RegisterSchema } from "@/lib/validations"

export async function authLogin(data: LoginSchema) {
  return await authAPI.login(data)
}

export async function authRegister(data: RegisterSchema) {
  return await authAPI.register(data)
}
