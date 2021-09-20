import axios from 'axios'
import store from '@/store'

// 封装请求模块
const request = axios.create({
  // 基础路径
  baseURL: 'http://localhost:8080/toutiao'
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
