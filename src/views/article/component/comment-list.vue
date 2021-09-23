<template>
  <div class="comment-list">
    <van-cell title="评论列表" />
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
      <comment-item
        v-for="(item, index) in list"
        :key="index"
        :userComment="item"
      />
    </van-list>
  </div>
</template>

<script>
import { getcomment } from '@/api/comment.js'
import CommentItem from './comment-item.vue'
export default {
  name: 'CommentList',
  props: {
    // 如果获取文章评论，则传递文章ID
    // 如果获取评论回复，则传递评论ID
    source: {
      type: [String, Number, Object],
      require: true
    },
    list: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      default: 'a'
    }
  },
  components: {
    CommentItem
  },
  data () {
    return {
      // list: [],
      loading: false,
      finished: false,
      offset: null, // 获取下一页数据的页码
      limit: 10, // 获取评论的个数
      error: false
    }
  },
  methods: {
    async onLoad () {
      // 异步更新数据
      const res = await getcomment({
        type: this.type, // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
        source: this.source,
        offset: this.offset,
        limit: this.limit
      }).catch(err => err)
      console.log(res)

      if (res.status !== 200) {
        this.loading = false
        this.error = true
        return
      }

      this.$emit('totalCount', res.data.data.total_count)
      this.list.push(...res.data.data.results)
      // 加载状态结束
      this.loading = false

      // 数据全部加载完成
      if (res.data.data.results.length) {
        this.offset = res.data.data.last_id
      } else {
        this.finished = true
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
