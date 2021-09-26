import axios from 'axios'
import router from '@/router'
import store from '@/store'
import jsonBig from 'json-bigint'
import { Toast } from 'vant'
// 封装请求模块
const request = axios.create({
  // 基础路径
  baseURL: 'http://localhost:8080/toutiao',
  // transformResponse 允许自定义原始的响应数据（字符串）
  transformResponse: [
    function (data) {
      try {
        // 如果转换成功则返回转换的数据结果
        return jsonBig.parse(data)
      } catch (err) {
        // 如果转换失败，则包装为统一数据格式并返回
        return {
          data
        }
      }
    }
  ]
})

// 刷新用户token
const refreshUserToken = axios.create({
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

// 添加响应拦截器
request.interceptors.response.use(
  function (res) {
    return Promise.reject(res)
  },
  async function (error) {
    // 对响应错误做点什么;没有权限401，去登录界面
    if (error.response.status === 401) {
      // 没有token直接跳转登录页
      if (!store.state.token || !store.state.token.token) {
        redirectLogin()
      }
      // 使用refresh_token 获取新的token
      try {
        const { data } = await refreshUserToken({
          method: 'PUT',
          url: '/v1_0/authorizations',
          headers: {
            Authorization: `Bearer ${store.state.token.refresh_token}`
          }
        })
        store.commit('setToken', {
          refresh_token: store.state.token.refresh_token,
          token: data.data.token
        })
        return request(error.config)
      } catch (error) {
        // 刷新token失败
        redirectLogin()
      }
    } else if (error.response.status === 403) {
      Toast.fail('暂无权限')
    } else if (error.response.status >= 500) {
      Toast.fail('服务器错误')
    } else {
      Toast.fail('网络错误')
    }

    return Promise.reject(error)
  }
)

function redirectLogin () {
  console.log(router.currentRoute)
  return router.replace({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

// 导出
export default request
