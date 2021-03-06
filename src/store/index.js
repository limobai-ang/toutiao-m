import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage.js'

Vue.use(Vuex)

// 这样做的目的可以避免访问和获取数据的名字不一致导致的问题
const USER_KEY = 'toutiao-m-token'

export default new Vuex.Store({
  state: {
    // 当前登录用户的登录状态token等数据
    token: getItem(USER_KEY),
    cachePages: ['Layout']
  },
  mutations: {
    setToken (state, data) {
      state.token = data
      // 为了防止页面刷新数据丢失，我们还需要把数据放到本地存储中，这里仅仅是为了持久化数据
      setItem(USER_KEY, data)
    },
    // 添加缓存组件
    addCachePages (state, val) {
      if (!state.cachePages.includes(val)) {
        state.cachePages.push(val)
      }
    },
    // 移除缓存组件
    removeCachePages (state, val) {
      const index = state.cachePages.indexOf(val)
      if (index !== -1) {
        state.cachePages.splice(index, 1)
      }
    }
  },
  actions: {},
  modules: {}
})
