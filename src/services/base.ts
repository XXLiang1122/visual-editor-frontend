import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { message } from 'antd'

interface CustomAxiosInstance extends AxiosInstance {
  (config: AxiosRequestConfig): Promise<any>
}

const service = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 10000
})

service.interceptors.request.use((request) => {
  const token = localStorage.getItem('token')
  if (token && request.headers) {
    request.headers.token = token
  }
  return request
})

service.interceptors.response.use((response) => {
  if (response.data.code !== 0) {
    message.error(response.data.msg)
    if (response.data.code === 100) {
      localStorage.removeItem('token')
      window.location.pathname = '/login'
    }
    return Promise.reject(response.data)
  }
  return response.data
}, (error) => {
  console.log(error)
})

export default service as CustomAxiosInstance