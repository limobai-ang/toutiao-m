import axios from 'axios'

// 封装请求模块
const request = axios.create({
  // 基础路径
  baseURL: 'http://ttapi.research.itcast.cn'
})

// 导出
export default request
