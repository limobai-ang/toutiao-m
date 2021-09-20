// 文章相关的api接口
import request from '@/utils/request.js'

// 获取频道新闻
const getJournalism = params => {
  return request.get('/mp/v1_0/articles', params)
}

export { getJournalism }
