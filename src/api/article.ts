import request from '../utils/request'

// 获取文章列表
export const getArticleList = (params = {}) => {
  return request({
    url: '/api/Article/getList',
    method: 'get',
    params
  })
}

// 创建文章
export const createArticle = (data = {}) => {
  return request({
    url: '/api/Article/create',
    method: 'post',
    data
  })
}
export const updateArticle = (data = {}) => {
  return request({
    url: '/api/Article/update',
    method: 'put',
    data
  })
}

export const deleteArticle = (id: string) => {
  return request({
    url: `/api/Article/delete/${id}`,
    method: 'delete'
  })
}

// 标签列表
export const getTagList = (params = {}) => {
  return request({
    url: '/api/Tag/getList',
    method: 'get',
    params
  })
}
