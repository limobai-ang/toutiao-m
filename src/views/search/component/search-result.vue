<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="item in list" :key="item.art_id" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'

export default {
  name: 'SearchResult',
  props: {
    searchContent: {
      type: String,
      require: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 20,
      total_count: 0
    }
  },
  methods: {
    async onLoad () {
      /*
        请求获取数据
        将数据放到数据列表中
        关闭本次的loading
        判断是否还有数据
          如果有，则更新获取下一页数据的页码
          如果没有，则把finished设置为true，关闭加载更多
      */
      const res = await getSearchResult({
        page: this.page,
        per_page: this.per_page,
        q: this.searchContent
      }).catch(err => err)
      console.log(res)
      this.list.push(...res.data.data.results)
      this.page++
      this.total_count = res.data.data.total_count
      this.loading = false
      //   // 数据全部加载完成
      if (this.list.length >= this.total_count) {
        this.finished = true
      }
    }
  },
  created () {}
}
</script>

<style lang="less" scoped>
.search-result {
  /deep/.van-list {
    position: fixed;
    right: 0;
    left: 0;
    top: 54px;
    bottom: 0;
    overflow: scroll;
  }
}
</style>
