// 引入Vue
import Vue from 'vue'
/* 初始化dayjs 相关配置 */
import dayjs from 'dayjs'
// 加载语言
import 'dayjs/locale/zh-cn'
// 按需加载插件。
import relativeTime from 'dayjs/plugin/relativeTime'
// 使用一下
dayjs.extend(relativeTime) // use plugin
// 配置使用中文语言包
dayjs.locale('zh-cn')

// 相对时间
// console.log(dayjs().from(dayjs('2021-9-15'), true)) // 2 years ago

// 把处理相对时间的代码包装为全局过滤器
// 然后就可以在任何组件的模板中使用了
// 所谓的过滤器其实就是一个可以在模板中使用的函数而已
// 在组件的模板中使用过滤器: {{ xxx | relativeTime }}
// 管道符前面的内容会作为参数传递给过滤器函数
// 过滤器的返回值会渲染到使用过滤器的模板中
Vue.filter('relativeTime', value => {
  return dayjs().from(dayjs(value), true)
})
// 给format一个默认值 不传值就使用默认的格式
Vue.filter('datetime', (value, format = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs(value).format(format)
})
