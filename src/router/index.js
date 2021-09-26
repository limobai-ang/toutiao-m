import Vue from 'vue'
import VueRouter from 'vue-router'
import { Dialog } from 'vant'
import store from '@/store'
// 解决跳转路由 报错vue路由报错Navigation aborted from “/*“ to “/*“ via a navigation guard
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalPush.call(this, location, onResolve, onReject)
  }
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views/layout'),
    meta: { requiresAuth: false },
    children: [
      {
        // 默认子路由
        path: '',
        name: 'home',
        component: () => import('@/views/home'),
        meta: { requiresAuth: false }
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/qa'),
        meta: { requiresAuth: false }
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video'),
        meta: { requiresAuth: false }
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my'),
        meta: { requiresAuth: false }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login'),
    meta: { requiresAuth: false }
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search'),
    meta: { requiresAuth: false }
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article'),
    // 将路由动态参数映射到组件的 props 中，更推荐这种做法
    props: true,
    meta: { requiresAuth: false }
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/my-profile'),
    meta: { requiresAuth: true }
  },
  {
    path: '/chat',
    name: 'chat',
    component: () => import('@/views/user-chat'),
    meta: { requiresAuth: true }
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('@/views/user'),
    meta: { requiresAuth: false }
  }
]

const router = new VueRouter({
  routes
})

// 全局前置守卫
/*
  to: '将要访问的页面路由信息'
  from: '来自哪个页面的路由信息'
  next: '放行的标记'
*/
router.beforeEach((to, from, next) => {
  // 判断用户是否登录 如果是登录状态 那么所有页面都能访问
  if (store.state.token) {
    next()
    return
  }
  // 用户没有登录 那么就判断页面是否是需要登录才能访问的
  if (to.meta.requiresAuth) {
    // 页面需要登录 提示用户去登录
    Dialog.confirm({
      title: '提示',
      message: '当前页面需要登录后才能访问 确认登录吗？'
    })
      .then(() => {
        // 去到登录页 并通过query参数来记录当前前的地址 在登录之后跳转到记录的地址
        router.replace({
          name: 'login',
          query: {
            redirect: router.currentRoute.fullPath
          }
        })
      })
      .catch(() => {
        // 取消 终断执行
        next(false)
      })
  } else {
    // 页面不需要登录 直接放行
    next()
  }
})

export default router
