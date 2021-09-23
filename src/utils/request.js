import axios from 'axios'
import store from '@/store'
import jsonBig from 'json-bigint'
// 封装请求模块
const request = axios.create({
  // 基础路径
  baseURL: 'http://localhost:8080/toutiao',
  // transformResponse 允许自定义原始的响应数据（字符串）
  transformResponse: [function (data) {
    try {
      // 如果转换成功则返回转换的数据结果
      return jsonBig.parse(data)
    } catch (err) {
      // 如果转换失败，则包装为统一数据格式并返回
      return {
        data
      }
    }
  }]
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    // 发送请求前做什么
    if (store.state.token) {
      // 若是有做鉴权token,就给头部带上token
      config.headers.Authorization = `Bearer ${store.state.token.token}`
    }
    return config
  },
  error => {
    // 在此定义请求错误需要做什么
    console.log(error)
    return Promise.reject(error)
  }
)
// 导出
export default request
