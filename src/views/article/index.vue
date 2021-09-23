<template>
  <div class="article-index">
    <!-- 导航栏 -->
    <van-nav-bar title="文章详情" left-arrow @click-left="$router.back()" />
    <!-- 内容区域 -->
    <div class="content-container">
      <h1 class="title">{{ artcileData.title }}</h1>
      <van-cell class="user-infor" center>
        <van-image slot="icon" round fit="cover" :src="artcileData.aut_photo" />
        <div class="name" slot="title">{{ artcileData.aut_name }}</div>
        <div class="upbdata" slot="label">
          {{ artcileData.pubdate | relativeTime }}前
        </div>
        <van-button
          class="follow-btn"
          round
          :icon="artcileData.is_followed ? '' : 'plus'"
          :type="artcileData.is_followed ? 'default' : 'info'"
          size="small"
          :loading="this.isFollowLoading"
          @click="onFollow"
          >{{ artcileData.is_followed ? '已关注' : '关注' }}</van-button
        >
      </van-cell>
      <div
        class="markdown-body content"
        ref="artcileContentRef"
        v-html="artcileData.content"
      ></div>
      <!-- 评论列表 -->
      <comment-list
        :source="articleId.toString()"
        :list="CommentList"
        @totalCount="totalCount = $event"
      ></comment-list>
    </div>
    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button round type="default" @click="isAddCommentShow = true"
        >写评论</van-button
      >
      <van-icon name="comment-o" :badge="totalCount" />
      <van-icon
        :color="artcileData.is_collected ? '#ff8344' : ''"
        :name="artcileData.is_collected ? 'star' : 'star-o'"
        @click="onCollected"
      />
      <van-icon
        :color="artcileData.attitude === 1 ? '#ff8344' : ''"
        :name="artcileData.attitude === 1 ? 'good-job' : 'good-job-o'"
        @click="onAttitude"
      />
      <van-icon color="#333" name="share" />
    </div>
    <!-- 发布评论 -->
    <van-popup
      v-model="isAddCommentShow"
      position="bottom"
      :style="{ height: '30%' }"
    >
      <post-comment :target="articleId" @post-success="onPostSuccess" />
    </van-popup>
    <!--回复评论 -->
    <van-popup
      v-model="isReplyCommentShow"
      position="bottom"
      :style="{ height: '90%' }"
    >
       <!-- 这里使用 v-if 的目的是让组件随着弹出层的显示 进行渲染和销毁，防止加载过的组件不重新渲染导致数据不会重新加载的问题 -->
      <comment-reply v-if="isReplyCommentShow" :articleId="articleId" :userComment="userComment" @close="isReplyCommentShow = !isReplyCommentShow" />
    </van-popup>
  </div>
</template>

<script>
import CommentReply from './component/comment-reply.vue'
import PostComment from './component/post-comment.vue'
import CommentList from './component/comment-list.vue'
import { addFollow, delFollow } from '@/api/user.js'
import { ImagePreview } from 'vant'
import {
  getArticle,
  addCollections,
  delCollections,
  addAttitude,
  delAttitude
} from '@/api/article.js'
import './github-markdown.css'

export default {
  name: 'Article',
  components: {
    CommentList,
    PostComment,
    CommentReply
  },
  // 获取动态路由参数
  props: {
    articleId: {
      type: [String, Number, Object],
      require: true
    }
  },
  data () {
    return {
      artcileData: {},
      isFollowLoading: false,
      isCollectionsLoading: false,
      // 评论文章弹出层的显示与隐藏
      isAddCommentShow: false,
      // 评论回复弹出层的显示与隐藏
      isReplyCommentShow: false,
      // 评论列表
      CommentList: [],
      // 评论总数量
      totalCount: 0,
      // 评论回复的用户对象
      userComment: {}
    }
  },
  methods: {
    // 获取文章
    async getArticleFn () {
      const res = await getArticle(this.articleId).catch(err => err)
      console.log(res)
      if (res.status !== 200) {
        this.$toast.fail('文章获取失败')
        this.$router.back()
      }
      this.artcileData = res.data.data
      /*
        获取文章内容的Dom容器
        得到所以有的img标签
        循环img列表，给img注册点击事件
        在事件处理函数中调用imagePreview() 预览
        注意：
          数据改变影响视图更新（DOM数据）不是立即的
          所以如果需要在修改数据之后马上操作被该数据影响的视图Dom，需要把这个代码放到$nextTick中
       */
      // 得到所有的img标签
      this.$nextTick(() => {
        this.handleImgPreview()
      })
    },
    // 图片预览
    handleImgPreview () {
      const imgList = this.$refs.artcileContentRef.querySelectorAll('img')
      const imgUrl = []
      imgList.forEach((item, index) => {
        imgUrl.push(item.src)
        item.onclick = function () {
          ImagePreview({
            // 预览地址
            images: imgUrl,
            // 预览起始位置
            startPosition: index
          })
        }
      })
    },
    // 关注用户
    async onFollow () {
      // 判断用户是否关注
      if (this.artcileData.is_followed) {
        // 已关注 取消关注
        this.isFollowLoading = true
        // const res = await delFollow(this.artcileData.aut_id).catch(err => err)
        // console.log('取消关注', res)
        // if (res.status !== 201) {
        //   if (res.request.status === 401) {
        //     this.$toast({
        //       message: '请先登录账号',
        //       position: 'top'
        //     })
        //     this.isFollowLoading = false
        //     return
        //   } else {
        //     this.$toast({
        //       message: '取消关注失败 未知错误',
        //       position: 'top'
        //     })
        //     this.isFollowLoading = false
        //     return
        //   }
        // }
        delFollow(this.artcileData.aut_id).catch(err => err)
        this.$toast({
          message: '取消关注成功',
          position: 'top'
        })
        this.isFollowLoading = false
      } else {
        // 未关注 点击关注
        this.isFollowLoading = true
        const res = await addFollow(this.artcileData.aut_id).catch(err => err)
        if (res.status !== 201) {
          // 响应错误 判断状态码给出提示
          if (res.request.status === 401) {
            this.$toast({
              message: '请先登录账号',
              position: 'top'
            })
            this.isFollowLoading = false
            return
          } else {
            this.$toast({
              message: '关注失败 未知错误',
              position: 'top'
            })
            this.isFollowLoading = false
            return
          }
        }
        this.$toast({
          message: '关注成功',
          position: 'top'
        })
        this.isFollowLoading = false
      }
      this.artcileData.is_followed = !this.artcileData.is_followed
    },
    // 收藏文章
    async onCollected () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      if (this.artcileData.is_collected) {
        // const res = await delCollections(this.artcileData.art_id.toString()).catch(err => err)
        delCollections(this.artcileData.art_id.toString()).catch(err => err)
      } else {
        const res = await addCollections(
          this.artcileData.art_id.toString()
        ).catch(err => err)
        if (res.status !== 201) {
          if (res.request.status === 401) {
            this.$toast({
              message: '请先登录账号',
              position: 'top'
            })
            this.isFollowLoading = false
            return
          } else {
            this.$toast({
              message: '收藏失败 未知错误',
              position: 'top'
            })
            this.isFollowLoading = false
            return
          }
        }
      }
      this.$toast.success(
        this.artcileData.is_collected ? '取消收藏成功' : '收藏成功'
      )
      this.artcileData.is_collected = !this.artcileData.is_collected
    },
    // 点赞文章
    async onAttitude () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      if (this.artcileData.attitude === 1) {
        // const res = await delCollections(this.artcileData.art_id.toString()).catch(err => err)
        delAttitude(this.artcileData.art_id.toString()).catch(err => err)
        this.artcileData.attitude = 0
      } else {
        const res = await addAttitude(this.artcileData.art_id.toString()).catch(
          err => err
        )
        if (res.status !== 201) {
          if (res.request.status === 401) {
            this.$toast({
              message: '请先登录账号',
              position: 'top'
            })
          } else {
            this.$toast({
              message: '点赞失败 未知错误',
              position: 'top'
            })
          }
        }
        this.artcileData.attitude = 1
      }
      this.$toast.success(
        this.artcileData.attitude === 1 ? '点赞成功' : '取消点赞成功'
      )
    },
    // 添加评论
    onPostSuccess (commentData) {
      // 将评论添加在数组首位
      this.CommentList.unshift(commentData)
      // 让评论总数加1
      this.totalCount++
      // 将弹出层关闭
      this.isAddCommentShow = false
      this.$toast.success('发布成功')
    }
  },
  created () {
    this.getArticleFn()
  },
  mounted () {
    // 点击回复按钮传递过来的评论数据
    this.$bus.$on('onReplyComment', data => {
      this.userComment = data
      this.isReplyCommentShow = true
    })
  }
}
</script>

<style lang="less" scoped>
.article-index {
  .content-container {
    width: 100%;
    background: #fff;
    position: fixed;
    top: 46px;
    bottom: 50px;
    overflow: auto;
    .title {
      font-size: 20px;
      color: #3c383c;
      padding: 14px;
    }
    .user-infor {
      .van-image {
        width: 35px;
        height: 35px;
        margin-right: 18px;
      }
      .name {
        font-size: 14px;
        color: #333333;
      }
      .upbdata {
        font-size: 12px;
        color: #bababa;
      }
      .follow-btn {
        width: 85px;
        height: 29px;
      }
      .user-title {
        display: flex;
        justify-content: space-between;
      }
    }
    .content {
      padding: 14px;
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
    justify-content: space-between;
    align-items: center;
    .van-button {
      width: 50%;
      height: 30px;
    }
  }
}
</style>
