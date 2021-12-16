import axios from 'axios'

const service = axios.create({
  baseURL: 'https://pixabay.com/api',
  timeout: 10000
})

service.interceptors.response.use((response) => {
  return response.data
})

export default service