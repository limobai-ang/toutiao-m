<template>
  <div>
    <!-- 子路由出口 -->
    <keep-alive>
      <router-view />
    </keep-alive>
    <!-- 底部导栏 -->
    <van-tabbar route>
      <van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/qa" icon="comment-o">问答</van-tabbar-item>
      <van-tabbar-item to="/video" icon="video-o">视频</van-tabbar-item>
      <van-tabbar-item to="/my" icon="user-circle-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  data () {
    return {}
  },
  mounted () {
    // 添加layout的缓存 (登录的时候清除了组件的缓存 让组件重新获取数据 页面渲染完毕后再次缓存组件)
    this.$store.commit('addCachePages', 'Layout')
  }
}
</script>

<style></style>
