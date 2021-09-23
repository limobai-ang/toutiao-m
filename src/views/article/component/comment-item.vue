<template>
  <div class="comment-item">
    <van-cell class="user-infor">
      <van-image slot="icon" round fit="cover" :src="userComment.aut_photo" />
      <div slot="title">
        <div class="user-title">
          <span class="user-name">{{ userComment.aut_name }}</span>
          <div class="praise" @click="onCommentLike">
            <van-icon
              :name="userComment.is_liking ? 'good-job' : 'good-job-o'"
              :color="userComment.is_liking ? '#ff8344' : ''"
            />
            <span>{{ userComment.like_count }}</span>
          </div>
        </div>
        <div class="user-content">{{ userComment.content }}</div>
      </div>
      <div class="upbdata" slot="label">
        <span>{{ userComment.pubdate | datetime('YY-MM-DD HH:mm:ss') }}</span
        >&nbsp;&nbsp;
        <van-button round type="default" size="mini" @click="$bus.$emit('onReplyComment',userComment)"
          >{{ userComment.reply_count }}回复</van-button
        >
      </div>
    </van-cell>
  </div>
</template>

<script>
import { addCommentLike, delCommentLike } from '@/api/comment.js'
export default {
  name: 'CommentItem',
  props: {
    userComment: {
      type: Object,
      require: true
    }
  },
  data () {
    return {}
  },
  methods: {
    async onCommentLike () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      if (this.userComment.is_liking) {
        // 取消点赞
        // const res = await delCommentLike(
        //   this.userComment.com_id.toString()
        // ).catch(err => err)
        // if (res.status !== 201) {
        //   this.$toast.fail('失败文案')
        //   return
        // }
        // 接口原因无法响应数据
        delCommentLike(this.userComment.com_id.toString()).catch(err => err)
        this.userComment.like_count--
      } else {
        // 点赞
        const res = await addCommentLike(
          this.userComment.com_id.toString()
        ).catch(err => err)
        if (res.status !== 201) {
          this.$toast.fail('操作失败')
          return
        }
        this.userComment.like_count++
      }
      this.userComment.is_liking = !this.userComment.is_liking
      this.$toast.success(
        this.userComment.is_liking ? '取消点赞成功' : '点赞成功'
      )
    }
  }
}
</script>

<style lang="less" scoped>
.user-infor {
  .van-image {
    width: 35px;
    height: 35px;
    margin-right: 18px;
  }
  .name {
    font-size: 12px;
    color: #333333;
  }
  .upbdata {
    font-size: 9px;
    color: #bababa;
    display: flex;
    align-items: center;
    .van-button {
      font-size: 9px;
      padding: 0 5px;
      height: 20px;
      background-color: #f3f5f7;
    }
  }
  .follow-btn {
    width: 85px;
    height: 29px;
  }
  .user-title {
    display: flex;
    justify-content: space-between;
    .user-name {
      font-size: 14px;
      color: #5f76a3;
    }
    .praise {
      display: flex;
      align-items: center;
    }
  }
  .user-content {
    font-size: 16px;
    color: #222;
  }
}
</style>
