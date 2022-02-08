import ajax from './base'
import { ResponseData } from 'types/api'

// 获取模板列表
export const getMyTemplates = <T, K>(params: T): Promise<ResponseData<K>> => {
  return ajax({
    url: '/template/list',
    method: 'get',
    params
  })
}

// 创建模板
export const creatTemplate = <T>(): Promise<ResponseData<T>> => {
  return ajax({
    url: '/template/create',
    method: 'post'
  })
}

// 删除模板
export const removeTemplate = (id: string): Promise<ResponseData<void>> => {
  return ajax({
    url: `template/remove/${id}`,
    method: 'delete'
  })
}

// 修改模板标题/描述
export const editTitle = <T>(id: string, data: T): Promise<ResponseData<void>> => {
  return ajax({
    url: `/template/update/titleAndDesc/${id}`,
    method: 'put',
    data
  })
}

// 获取模板详情
export const getTemplateDetail = <T>(id: string): Promise<ResponseData<T>> => {
  return ajax({
    url: `/template/detail/${id}`,
    method: 'get'
  })
}

// 修改模板详情
export const updateTemplate = <T>(id: string, data: T): Promise<ResponseData<void>> => {
  return ajax({
    url: `/template/update/${id}`,
    method: 'put',
    data
  })
}