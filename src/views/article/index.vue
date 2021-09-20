<template>
  <div class="article-index">
    <!-- 导航栏 -->
    <van-nav-bar title="文章详情" left-arrow @click-left="$router.back()" />
    <div class="content-container">
      <h1 class="title">项目中如何处理相对时间?</h1>
      <van-cell class="user-infor" center>
        <van-image
          slot="icon"
          round
          fit="cover"
          src="https://profile.csdnimg.cn/D/4/8/3_qq_54527592"
        />
        <div class="name" slot="title">李公子</div>
        <div class="upbdata" slot="label">14小时前</div>
        <van-button
          class="follow-btn"
          round
          icon="plus"
          type="info"
          size="small"
          >关注</van-button
        >
      </van-cell>
      <div class="markdown-body content">
        <div class="baidu_pl" id="csdn-previewimg-box">
          <div class="article_content">
            <div id="content_views" class="htmledit_views clearfix">
              <link
                rel="stylesheet"
                href="https://csdnimg.cn/release/blogv2/dist/mobile/css/edit_views_html-b7fdf59250.min.css"
              />
              <p id="u9e209c39">推荐两个第三方库：</p>
              <ul>
                <li id="uff1a3a86">
                  <a href="https://momentjs.com/" title="Moment.js"
                    >Moment.js</a
                  >
                </li>
              </ul>
              <ul>
                <li id="ue255d89f">
                  <a href="https://day.js.org/" title="Day.js">Day.js</a>
                </li>
              </ul>
              <p id="u240912a8"></p>
              <p id="uc17c29f2">
                两者都是专门用于处理时间的 JavaScript 库，功能差不多，因为
                Day.js 的设计就是参考的 Moment.js。但是 Day.js 相比 Moment.js
                的包体积要更小一些，因为它采用了插件化的处理方式。
              </p>
              <p id="ua5e43622"></p>
              <p id="uab609217">
                <a href="https://day.js.org/zh-CN/" title="Day.js">Day.js</a>
                是一个轻量的处理时间和日期的 JavaScript 库，和
                <a href="https://momentjs.com/" title="Moment.js">Moment.js</a>
                的 API 设计保持完全一样，如果您曾经用过 Moment.js,
                那么您已经知道如何使用 Day.js 。
              </p>
              <p id="u7923f43b"></p>
              <ul>
                <li id="u27e439b2">Day.js 可以运行在浏览器和 Node.js 中。</li>
              </ul>
              <ul>
                <li id="uc23cef1c">🕒 和 Moment.js 相同的 API 和用法</li>
              </ul>
              <ul>
                <li id="ue7aa7e81">💪 不可变数据 (Immutable)</li>
              </ul>
              <ul>
                <li id="uf454924c">🔥 支持链式操作 (Chainable)</li>
              </ul>
              <ul>
                <li id="ud2d0251c">🌐 国际化 I18n</li>
              </ul>
              <ul>
                <li id="u92e0ff5e">📦 仅 2kb 大小的微型库</li>
              </ul>
              <ul>
                <li id="u135a21ce">👫 全浏览器兼容</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <van-cell title="评论列表" />
      <comment-item v-for="index in 10" :key="index" />
    </div>
  </div>
</template>

<script>
import CommentItem from '@/component/comment-item'
import './github-markdown.css'
export default {
  name: 'Article',
  components: {
    CommentItem
  },
  // 获取动态路由参数
  props: {
    articleId: {
      type: String,
      require: true
    }
  },
  data () {
    return {}
  }
}
</script>

<style lang="less" scoped>
.article-index {
  .content-container {
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
        font-size: 12px;
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
}
</style>
