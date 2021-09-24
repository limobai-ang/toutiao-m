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

// 关注用户
const addFollow = userId => {
  return request({
    method: 'POST',
    url: '/v1_0/user/followings',
    data: {
      target: userId
    }
  })
}

// 取消关注用户
const delFollow = userId => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/followings/${userId}`
  })
}

// 获取用户个人资料
const getUserProfile = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/profile'
  })
}

// 编辑用户个人资料
const setUserProfile = data => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/profile',
    data
  })
}

// 编辑用户照片资料
const setPhotofile = data => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/photo',
    data
  })
}

export { login, codes, getUserInfo, addFollow, delFollow, getUserProfile, setUserProfile, setPhotofile }
