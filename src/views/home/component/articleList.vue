<template>
  <div class="article-list" ref="article-list">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <article-item
          v-for="(item, index) in list"
          :key="index"
          :articleContent="item"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { debounce } from 'lodash'
import { getJournalism } from '@/api/article.js'
import ArticleItem from '@/component/article-item'
export default {
  name: 'ArticleList',
  components: { ArticleItem },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      // 下拉绑定数据
      count: 0,
      isLoading: false,
      timestamp: null,
      scrollTop: 0
    }
  },
  methods: {
    /*
      load 事件：
        list 初始化后会触发一次load事件，用于加载第一屏的数据
        如果一次请求加载的数据条数较少，导致列表内容无法铺满当前屏幕，list 会继续触发load事件，直到内容铺满全屏或者数据全部加载完成
      loading 属性：
        控制加载用的loading状态
        非加载中的loading为false，此时会根据列表滚动位置判断是否触发load事件 （列表了内容不足一屏时，会直接触发）
        加载中 loading为 true 表示正在发送异步请求，此时不会触发load事件
      finished 属性：
        控制加载结束的状态
        在每次请求完毕之后，需要手动将loading设置为false，表示本次加载结束
        所有数据加结束，finished为true，此时不会触发load事件

    */
    async onLoad () {
      // 获取文章数据
      const res = await getJournalism({
        channel_id: this.channel.id, // 频道 id
        timestamp: this.timestamp || Date.now(), // 获取下一页数据的时间戳，Date.now() 表示获取当前最新数据
        with_top: 1
      }).catch(err => err)
      // 抛出错误
      if (res.status !== 200) {
        this.$notify('文章列表获取失败')
      }
      // 把数据添加进list数组
      this.list.push(...res.data.data.results)

      // 下拉刷新
      // 设置本次加载状态结束，它才可以判断是否需要加载下一次，否则就会永远的停在这里
      this.loading = false
      //   // 数据全部加载完成
      if (this.list.length >= 10000) {
        this.finished = true
      }
    },
    onRefresh () {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
        this.count++
      }, 1000)
    }
  },
  mounted () {
    const articleList = this.$refs['article-list']
    articleList.onscroll = debounce(() => {
      console.log(articleList.scrollTop)
      this.scrollTop = articleList.scrollTop
    }, 100)
  },
  activated () {
    this.$refs['article-list'].scrollTop = this.scrollTop
  }
}
</script>

<style lang="less" scoped>
.article-list {
  position: fixed;
  right: 0;
  left: 0;
  top: 90px;
  bottom: 50px;
  overflow: scroll;
}
</style>
