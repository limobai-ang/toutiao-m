<template>
  <div class="my-container">
    <van-cell-group v-if="token" class="my-info">
      <van-cell
        title="单元格"
        value="内容"
        center
        :border="false"
        class="my-base"
      >
        <van-image
          slot="icon"
          round
          width="66px"
          height="66px"
          :src="userInfo.photo"
        />
        <div slot="title" class="my-name">{{ userInfo.name }}</div>
        <van-button class="my-editBtn" round size="small">编辑资料</van-button>
      </van-cell>
      <van-grid :border="false" class="data-info">
        <van-grid-item text="文字">
          <div slot="text">
            <div class="count">{{ userInfo.art_count }}</div>
            <div class="text">文章</div>
          </div>
        </van-grid-item>
        <van-grid-item text="文字">
          <div slot="text">
            <div class="count">{{ userInfo.follow_count }}</div>
            <div class="text">关注</div>
          </div>
        </van-grid-item>
        <van-grid-item text="文字">
          <div slot="text">
            <div class="count">{{ userInfo.fans_count }}</div>
            <div class="text">粉丝</div>
          </div>
        </van-grid-item>
        <van-grid-item text="文字">
          <div slot="text">
            <div class="count">{{ Math.abs(userInfo.like_count )}}</div>
            <div class="text">获赞</div>
          </div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>
    <div v-else class="not-login">
      <img src="./mobile.png" alt="登录" @click="$router.push('/login')" />
      <div class="text">登录/注册</div>
    </div>
    <van-grid :column-num="2" class="mb-4">
      <van-grid-item icon-prefix="iconfont icon" icon="shoucang" text="收藏" />
      <van-grid-item icon-prefix="iconfont icon" icon="lishi" text="历史" />
    </van-grid>
    <van-cell title="消息通知" is-link to="/" />
    <van-cell class="mb-4" title="小智同学" is-link to="/" />
    <van-cell v-if="token" class="logout" title="退出登录" @click="logout" />
  </div>
</template>

<script>
import { getUserInfo } from '@/api/user.js'
import { mapState } from 'vuex'
export default {
  name: 'My',
  data () {
    return {
      userInfo: {}
    }
  },
  methods: {
    logout () {
      this.$dialog
        .confirm({
          title: '退出登录',
          message: '确认要退出登录吗？'
        })
        .then(() => {
          // 清除用户登录状态
          this.$store.commit('setToken', null)
        })
        .catch(() => {
          // on cancel
        })
    },
    // 获取用户信息
    async getUserInfoFn () {
      const res = await getUserInfo().catch(err => err)
      if (res.status !== 200) {
        this.$notify('用户信息获取失败')
        return
      }
      this.userInfo = res.data.data
    }
  },
  computed: {
    ...mapState(['token'])
  },
  created () {
    this.getUserInfoFn()
  }
}
</script>

<style lang="less" scoped>
.my-info {
  background-image: url('./banner.png');
  background-size: cover;

  /deep/ .van-grid-item__content {
    background-color: unset;
  }
  .my-base {
    height: 115px;
    box-sizing: border-box;
    padding-top: 38px;
    padding-bottom: 11px;
    background-color: unset;
    .van-image {
      box-sizing: border-box;
      border: 1px solid #fff;
      margin-right: 11px;
    }
    .my-name {
      color: #fff;
      font-size: 15px;
    }
    .my-editBtn {
      height: 20px;
      color: #666;
    }
  }
}

.data-info {
  .van-grid-item {
    height: 65px;
    color: #fff;
    text-align: center;
    .count {
      font-size: 18px;
    }
    .text {
      font-size: 11px;
    }
  }
}

.mb-4 {
  margin-bottom: 4px;
}

/deep/ .van-grid {
  height: 70px;
  .van-grid-item {
    height: 100%;
  }
  .van-grid-item__icon {
    font-size: 22px;
  }
  .icon-shoucang {
    color: #ec5357;
  }
  .icon-lishi {
    color: #fea83c;
  }
  .van-grid-item__text {
    color: #333;
    font-size: 14px;
  }
}
// 登录按钮
.logout {
  text-align: center;
  color: #d76364;
}

// 非登录状态
.not-login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 180px;
  background-image: url('./banner.png');
  background-size: cover;
  img {
    width: 66px;
    height: 66px;
  }
  .text {
    color: #fff;
    font-size: 14px;
  }
}
</style>
