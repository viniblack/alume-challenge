import axios, { AxiosInstance } from 'axios'
// import { getSession, signOut } from 'next-auth/react'

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

const apiClient: AxiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

export default apiClient