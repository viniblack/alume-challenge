import axios, { AxiosInstance, AxiosError, AxiosRequestConfig } from 'axios'

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

let isRefreshing = false
let failedQueue: {
  resolve: (value?: unknown) => void
  reject: (reason?: unknown) => void
  config: AxiosRequestConfig
}[] = []

const processQueue = (error: AxiosError | null = null) => {
  failedQueue.forEach(({ resolve, reject, config }) => {
    if (error) {
      reject(error)
    } else {
      resolve(apiClient(config))
    }
  })
  failedQueue = []
}

const apiClient: AxiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config!

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject, config: originalRequest })
        })
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        await axios.post(
          `${baseURL}/api/refresh-token`,
          {},
          {
            withCredentials: true,
          }
        )

        processQueue(null)
        return apiClient(originalRequest)
      } catch (err) {
        processQueue(err as AxiosError)

        return Promise.reject(err)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)

export default apiClient
