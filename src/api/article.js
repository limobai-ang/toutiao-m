// 文章相关的api接口
import request from '@/utils/request.js'

// 获取频道新闻
const getJournalism = params => {
  return request.get('/v1_1/articles', { params })
}

// 获取新闻文章详情
const getArticle = params => {
  return request.get(`/v1_0/articles/${params}`)
}

// 收藏文章
const addCollections = ArticleId => {
  return request({
    method: 'POST',
    url: '/v1_0/article/collections',
    data: {
      target: ArticleId
    }
  })
}

// 取消收藏文章
const delCollections = ArticleId => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/collections/${ArticleId}`
  })
}

// 点赞文章
const addAttitude = ArticleId => {
  return request({
    method: 'POST',
    url: '/v1_0/article/likings',
    data: {
      target: ArticleId
    }
  })
}

// 取消点赞文章
const delAttitude = ArticleId => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/likings/${ArticleId}`
  })
}
export { getJournalism, getArticle, addCollections, delCollections, addAttitude, delAttitude }
