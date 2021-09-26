<template>
  <div id="app">
    <!-- 一级路由的出口 -->
    <!-- 条件缓存组件-->
    <keep-alive :include="cachePages">
      <router-view />
    </keep-alive>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'App',
  computed: {
    ...mapState(['cachePages'])
  }
}
</script>
<style lang="less"></style>
