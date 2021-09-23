<template>
  <div class="comment-reply">
    <!-- 标题 -->
    <van-nav-bar
      :title="userComment.reply_count + '回复'"
      @click-left="$emit('close')"
    >
      <van-icon slot="left" name="cross" />
    </van-nav-bar>
    <!-- 评论 -->
    <comment-item :userComment="userComment" />
    <!-- 评论列表 -->
    <comment-list
      :source="userComment.com_id.toString()"
      :type="'c'"
      :list="CommentList"
    ></comment-list>
    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button round type="default" @click="isAddCommentShow = true"
        >写评论</van-button
      >
    </div>
    <!-- 发布评论 -->
    <van-popup
      v-model="isAddCommentShow"
      position="bottom"
      :style="{ height: '30%' }"
    >
      <post-comment
        :target="userComment.com_id"
        :articleId="articleId"
        @post-success="onPostSuccess"
      />
    </van-popup>
  </div>
</template>

<script>
import PostComment from './post-comment.vue'
import CommentList from './comment-list.vue'
import CommentItem from './comment-item.vue'
export default {
  name: 'CommentReply',
  components: {
    CommentItem,
    CommentList,
    PostComment
  },
  props: {
    userComment: {
      type: Object,
      require: true
    },
    articleId: {
      type: [String, Number, Object],
      default: null
    }
  },
  data () {
    return {
      CommentList: [],
      isAddCommentShow: false
    }
  },
  methods: {
    // 添加回复
    onPostSuccess (commentData) {
      // 将评论添加在数组首位
      this.CommentList.unshift(commentData)
      // 让评论总数加1
      this.userComment.reply_count++
      // 将弹出层关闭
      this.isAddCommentShow = false
      this.$toast.success('回复成功')
    }
  }
}
</script>

<style lang="less" scoped>
.comment-reply {
  .van-nav-bar {
    background-color: #fff;
    /deep/.van-nav-bar__title {
      color: #000;
    }
    .van-icon {
      color: #1989fa;
    }
  }
  .article-bottom {
    width: 100%;
    height: 50px;
    position: fixed;
    bottom: 0;
    background-color: #fff;
    box-sizing: border-box;
    border-top: 1px solid #ccc;
    padding: 0 14px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    .van-button {
      width: 50%;
      height: 30px;
    }
  }
}
</style>
