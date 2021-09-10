import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/style/index.css'
// 加载vant组件库
import Vant from 'vant'
import 'vant/lib/index.css'
// 自动设置rem基准值（html标签字体大小）
import 'amfe-flexible'

Vue.config.productionTip = false
// 注册vant组件
Vue.use(Vant)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
