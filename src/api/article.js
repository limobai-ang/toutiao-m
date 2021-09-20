// 文章相关的api接口
import request from '@/utils/request.js'

// 获取频道新闻
const getJournalism = params => {
  return request.get('/v1_1/articles', { params })
}

export { getJournalism }
