import request from '@/utils/request.js'

// 获取全部频道
const getChannels = () => {
  return request.get('/v1_0/channels')
}

// 获取用户频道列表
const getChannel = () => {
  return request.get('/v1_0/user/channels')
}

// 删除用户指定频道
const delChannel = params => {
  return request.delete(`/v1_0/user/channels/${params}`)
}

// 添加用户频道
const addChannel = data => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/channels',
    data
  })
}

export { getChannels, getChannel, delChannel, addChannel }
