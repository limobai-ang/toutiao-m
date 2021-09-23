<template>
  <div class="post-comment">
    <van-field
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button @click="onPost" :disabled="!message">发布</van-button>
  </div>
</template>

<script>
import { addComment } from '@/api/comment.js'
export default {
  name: 'PostComment',
  props: {
    target: {
      type: [String, Number, Object],
      require: true
    },
    articleId: {
      type: [String, Number, Object],
      default: null
    }
  },
  data () {
    return {
      message: ''
    }
  },
  methods: {
    // 发布评论
    async onPost () {
      const res = await addComment({
        target: this.target.toString(),
        content: this.message,
        art_id: this.articleId ? this.articleId.toString() : null
      }).catch(err => err)
      if (res.status !== 201) {
        this.$toast({
          message: '文章不允许发布评论 或评论发布失败',
          position: 'top'
        })
        return
      }
      this.$emit('post-success', res.data.data.new_obj)
      this.message = ''
    }
  }
}
</script>

<style lang="less" scoped>
.post-comment {
  display: flex;
  padding: 14px;
  align-items: center;
  .van-button {
    width: 50px;
    height: 30px;
    padding: 0;
  }
}
</style>
