<template>
  <div class="search-associate">
    <van-cell
      icon="search"
      v-for="(item, index) in searchList"
      :key="index"
      @click="$emit('search', item)"
    >
      <div slot="title" v-html="highlight(item)"></div>
    </van-cell>
  </div>
</template>

<script>
// 引入防抖函数
import { debounce } from 'lodash'
import { getSuggestion } from '@/api/search'
export default {
  name: 'SearchAssociate',
  props: {
    searchContent: {
      type: String,
      require: true
    }
  },
  data () {
    return {
      searchList: []
    }
  },
  methods: {
    highlight (str) {
      return str.replace(
        new RegExp(this.searchContent, 'ig'),
        `<span style="color:red">${this.searchContent}</span>`
      )
    }
  },
  watch: {
    // 监听属性的变化
    searchContent: {
      immediate: true,
      // 防抖处理
      handler: debounce(async function () {
        // 请求获取数据
        const res = await getSuggestion({ q: this.searchContent }).catch(
          err => err
        )
        console.log(res)
        this.searchList = res.data.data.options
      }, 300)
    }
  }
}
</script>

<style lang="less" scoped></style>
