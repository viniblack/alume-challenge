import authAPI from "@/lib/http/authAPI"
import { ChangePasswordSchema, LoginSchema, ProfileSchema, RegisterSchema } from "@/lib/validations"

export async function authLogin(data: LoginSchema) {
  return await authAPI.login(data)
}

export async function authRegister(data: RegisterSchema) {
  return await authAPI.register(data)
}

export async function changePassword(data: ChangePasswordSchema) {
  return await authAPI.changePassword(data)
}

export async function authLogout() {
  return await authAPI.logout()
}

export async function updateProfile(data: ProfileSchema) {
  return await authAPI.updateProfile(data)
}
