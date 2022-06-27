import request from '../utils/request'

// 登录
export const login = (data = {}) => {
  return request({
    url: '/api/user/login',
    method: 'post',
    data
  })
}

// 获取当前用户信息
export const getUserInfo = () => {
  return request({
    url: '/api/user/userInfo',
    method: 'get'
  })
}

// 获取当前用户权限数据
export const getPermissions = () => {
  return request({
    url: '/api/user/getPermissions?type=1',
    method: 'get'
  })
}
