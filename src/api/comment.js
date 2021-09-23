// 文章评论模块
import request from '@/utils/request.js'

// 获取评论或评论回复
const getcomment = params => {
  return request({
    method: 'GET',
    url: '/v1_0/comments',
    params
  })
}

// 对评论或评论回复点赞
const addCommentLike = commentId => {
  return request({
    method: 'POST',
    url: '/v1_0/comment/likings',
    data: {
      target: commentId
    }
  })
}

// 取消对评论或评论回复点赞
const delCommentLike = commentId => {
  return request({
    method: 'DELETE',
    url: `/v1_0/comment/likings/${commentId}`
  })
}

// 发布评论
const addComment = data => {
  return request({
    method: 'POST',
    url: '/v1_0/comments',
    data
  })
}

export { getcomment, addCommentLike, delCommentLike, addComment }
