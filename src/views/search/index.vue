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
      />
    </form>
    <!-- 搜索结果 -->
    <search-result v-if="isResult"></search-result>
    <!-- 搜索建议 -->
    <search-associate v-if="isassociate"></search-associate>
    <!-- 历史记录 -->
    <search-history v-if="isHistory"></search-history>
  </div>
</template>

<script>
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
      searchContent: '',
      isassociate: false, // 联想模块的显示状态
      isHistory: true, // 历史模块的显示状态
      isResult: false
    }
  },
  methods: {
    onSearch (val) {
      if (val) {
        this.isHistory = false
        this.isassociate = false
        this.isResult = true
      }
    }
  },
  watch: {
    searchContent (newValue, oldValue) {
      // console.log('searchContent被修改了', newValue, oldValue)
      this.isResult = false
      if (newValue) {
        this.isHistory = false
        this.isassociate = true
      } else {
        this.isHistory = true
        this.isassociate = false
      }
    }
  }
}
</script>

<style></style>
