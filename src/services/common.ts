import ajax from './base'

const key = '24178889-8dbe9fccf0c585814c1dcb342'

export const getImages = (params: any): any => {
  return ajax({
    url: '/',
    params: {
      key,
      lang: 'zh',
      ...params
    }
  })
}
