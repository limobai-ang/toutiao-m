<template>
  <div>
    <van-nav-bar>
      <van-button
        class="search-btn"
        slot="title"
        type="info"
        round
        icon="search"
        size="small"
        to="/search"
        >搜索</van-button
      >
    </van-nav-bar>
    <!-- 文章频道列表 -->
    <!-- 标签页组件有一个功能，只有你第一次查看标签页的时候才会渲染里面的内容 -->
    <van-tabs v-model="active" color="#2892ff">
      <van-tab v-for="item in UserChannel" :key="item.id" :title="item.name">
        <ArticleList :channel="item" />
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div
        slot="nav-right"
        class="wap-nav-wrap"
        @click="isChannelEditShow = true"
      >
        <van-icon name="wap-nav" />
      </div>
    </van-tabs>
    <!-- 弹出层 -->
    <van-popup
      v-model="isChannelEditShow"
      get-container="body"
      closeable
      round
      close-icon-position="top-left"
      position="bottom"
    >
      <!-- 在模板中$event 代表事件参数  -->
      <channel-edit
        :userChannels="UserChannel"
        :active="active"
        @close="isChannelEditShow = false"
        @updata-active="active = $event"
        @minus="active = active - 1"
      />
    </van-popup>
  </div>
</template>

<script>
import { getChannel } from '@/api/comment.js'
import ArticleList from './component/articleList.vue'
import ChannelEdit from './component/ChannelEdit.vue'
export default {
  name: 'Home',
  components: {
    ArticleList,
    ChannelEdit
  },
  data () {
    return {
      active: 0,
      UserChannel: [],
      isChannelEditShow: false
    }
  },
  methods: {
    async getChannelFn () {
      const res = await getChannel().catch(err => err)
      if (res.status !== 200) {
        this.$notify('用户频道获取失败')
        return
      }
      console.log(res)
      this.UserChannel = res.data.data.channels
    }
  },
  created () {
    this.getChannelFn()
  }
}
</script>

<style lang="less" scoped>
.van-nav-bar {
  /deep/.van-nav-bar__title {
    max-width: none;
  }
  .search-btn {
    width: 277px;
    height: 32px;
    background-color: #5babfb;
    font-size: 14px;
    border: none;
    .van-icon {
      font-size: 16px;
    }
  }
}
/deep/.van-tab {
  padding: 0 20px;
  border-right: 1px solid #edeff3;
  border-bottom: 1px solid #edeff3;
}
/deep/.van-tabs__line {
  width: 15px;
  height: 3px;
  bottom: 20px;
}

// 弹出层
.van-popup {
  height: 100%;
}
.wap-nav-wrap {
  position: fixed;
  right: 0;
  height: 44px;
  // background:rgba(255,255,255,0.5);
  background-image: linear-gradient(
    to right,
    rgba(255, 255, 255, 0.5) 20%,
    #fff 80%
  );
  width: 33px;
  text-align: center;
  .van-icon {
    line-height: 44px;
  }
}
.placeholder {
  width: 33px;
  height: 44px;
  flex-shrink: 0;
}
.channel-edit {
  padding-top: 54px;
}
</style>
