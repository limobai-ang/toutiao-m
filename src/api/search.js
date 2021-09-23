import request from '@/utils/request.js'

// 获取联想建议（自动补全）
const getSuggestion = params => {
  return request.get('/v1_0/suggestion', { params })
}

// 获取搜索结果
const getSearchResult = params => {
  return request.get('/v1_0/search', { params })
}

export { getSuggestion, getSearchResult }
