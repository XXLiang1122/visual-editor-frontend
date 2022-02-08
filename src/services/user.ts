import ajax from './base'
import {
  ResisterParams
} from 'types/user'
import { ResponseData } from 'types/api'

// 注册
export const register = <T>(data: ResisterParams): Promise<ResponseData<T>> => {
  return ajax({
    url: '/user/register',
    method: 'post',
    data
  })
}

// 登录
export const login = <T>(data: ResisterParams): Promise<ResponseData<T>> => {
  return ajax({
    url: '/user/login',
    method: 'post',
    data
  })
}

// 获取用户信息
export const getUserInfo = <T>(): Promise<ResponseData<T>> => {
  return ajax({
    url: '/user/info',
    method: 'get'
  })
}

// 改头像
export const setAvatar = (url: string): Promise<ResponseData<void>> => {
  return ajax({
    url: '/user/update/avatar',
    method: 'put',
    data: {
      url
    }
  })
}

// 改昵称
export const setName = (name: string): Promise<ResponseData<void>> => {
  return ajax({
    url: '/user/update/name',
    method: 'put',
    data: {
      name
    }
  })
}