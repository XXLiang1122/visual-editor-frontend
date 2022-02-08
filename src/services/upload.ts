import ajax from './base'
import { ResponseData } from 'types/api'

// 上传文件
export const upload = <T>(data: FormData): Promise<ResponseData<T>> => {
  return ajax({
    url: '/upload',
    method: 'post',
    data
  })
}