<template>
  <div class="search-index">
    <!-- 搜索栏  -->
    <form action="/">
      <van-search
        v-model="searchContent"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fb"
        shape="round"
        @search="onSearch"
        @cancel="$router.back()"
        @focus="onFocus"
      />
    </form>
    <!-- 搜索结果 -->
    <search-result
      v-if="isResult"
      :searchContent="searchContent"
    ></search-result>
    <!-- 搜索建议 -->
    <search-associate
      v-else-if="searchContent"
      :searchContent="searchContent"
      @search="onSearch"
    ></search-associate>
    <!-- 历史记录 -->
    <search-history
      v-else
      :searchHistory="searchHistory"
      @delSearchHistory="delSearchHistory"
      @delAllSearchHistory="delAllSearchHistory"
      @search="onSearch"
    ></search-history>
  </div>
</template>

<script>
import { setItem, getItem } from '@/utils/storage.js'
import SearchAssociate from './component/search-associate.vue'
import SearchHistory from './component/search-history.vue'
import SearchResult from './component/search-result.vue'

export default {
  name: 'Search',
  components: {
    SearchAssociate,
    SearchHistory,
    SearchResult
  },
  data () {
    return {
      // 输入框的内容
      searchContent: '',
      // 控制搜索结果页面的显示
      isResult: false,
      // 记录搜索结果
      searchHistory: getItem('toutiao-m-searchHistory') || []
    }
  },
  methods: {
    // 输入框按下回车
    onSearch (val) {
      if (val) {
        this.searchContent = val
        // 将搜索结果添加到数组
        const index = this.searchHistory.indexOf(val)
        if (index !== -1) {
          this.searchHistory.splice(index, 1)
        }
        this.searchHistory.push(val)
        this.isResult = true
      }
    },
    // 获得焦点触发
    onFocus () {
      this.isResult = false
    },
    // 删除历史项
    delSearchHistory (index) {
      this.searchHistory.splice(index, 1)
    },
    // 删除全部
    delAllSearchHistory () {
      this.searchHistory.splice(0, this.searchHistory.length)
    }
  },
  watch: {
    searchHistory (newName) {
      setItem('toutiao-m-searchHistory', newName)
    }
  }
}
</script>

<style lang="less" scoped></style>
