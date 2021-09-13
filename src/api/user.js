// 引入封装过的request方法
import request from '@/utils/request.js'

// 用户登录
const login = data => {
  return request.post('/app/v1_0/authorizations', data)
}

// 获取验证码
const codes = params => {
  return request.get(`/app/v1_0/sms/codes/${params}`)
}
export { login, codes }
