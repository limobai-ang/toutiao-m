// 引入封装过的request方法
import request from '@/utils/request.js'
// 用户登录
const login = data => {
  return request.post('/v1_0/authorizations', data)
}

// 获取验证码
const codes = params => {
  return request.get(`/v1_0/sms/codes/${params}`)
}

// 获取登录用户自己的信息
const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user'
  })
}

export { login, codes, getUserInfo }
