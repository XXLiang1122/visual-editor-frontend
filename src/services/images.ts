import axios from 'axios'

const service = axios.create({
  baseURL: 'https://pixabay.com/api',
  timeout: 10000
})

service.interceptors.response.use((response) => {
  return response.data
})

const key = '24178889-8dbe9fccf0c585814c1dcb342'

export const getImages = (params: any): any => {
  return service({
    url: '/',
    params: {
      key,
      lang: 'zh',
      ...params
    }
  })
}
