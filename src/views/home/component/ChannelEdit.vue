<template>
  <div class="channel-edit">
    <van-cell center :border="false">
      <div slot="title" class="channel-title">我的频道</div>
      <van-button
        round
        plain
        hairline
        size="mini"
        type="danger"
        @click="isEdit = !isEdit"
        >{{ isEdit ? '完成' : '编辑' }}</van-button
      >
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        :class="{ activeStyle: active == index }"
        :icon="isEdit && index !== 0 ? 'clear' : ''"
        v-for="(item, index) in userChannels"
        :key="item.id"
        :text="item.name"
        @click="onUserChannelClick(index, item, 0)"
      />
    </van-grid>
    <van-cell center :border="false">
      <div slot="title" class="channel-title">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        v-for="(item, index) in undeterminedChannels"
        :key="item.id"
        :text="item.name"
        @click="addChannelFn(index, item)"
      />
    </van-grid>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage.js'
import { getChannels, delChannel, addChannel } from '@/api/channel.js'
export default {
  name: 'ChannelEdit',
  props: {
    userChannels: {
      type: Array,
      require: true
    },
    active: {
      type: Number,
      require: true
    }
  },
  data () {
    return {
      isEdit: false,
      // 全部频道
      ChannelsAll: []
    }
  },
  methods: {
    // 添加频道事件 判断是否是 编辑模式
    async onUserChannelClick (index, obj, type) {
      // 编辑状态，删除频道   非编辑状态切换频道
      if (this.isEdit && index !== 0) {
        // 编辑状态
        this.removerChannel(index, obj)
      } else {
        // 非编辑状态
        this.switchChannel(index)
      }
    },
    // 删除频道
    async removerChannel (index, obj) {
      // 删除后面的 让选中项-1
      if (index < this.active) {
        this.$emit('minus')
      }
      // 删除数据的index位
      this.userChannels.splice(index, 1)
      if (this.token) {
        const res = await delChannel(obj.id).catch(err => err)
        console.log(res)
      } else {
        // 未登录添加到本地存储
        setItem('toutiao-m-channels', this.userChannels)
      }
    },
    // 添加频道
    async addChannelFn (index, item) {
      this.userChannels.push(this.undeterminedChannels[index])
      // 如果已登录就添加到线上
      if (this.token) {
        const res = await addChannel({
          channels: [{ id: item.id, seq: this.userChannels.length }]
        }).catch(err => err)
        console.log(res)
      } else {
        // 未登录添加到本地存储
        setItem('toutiao-m-channels', this.userChannels)
      }
    },
    // 切换频道
    switchChannel (index) {
      // 关闭弹出层
      this.$emit('close')
      // 更新active
      this.$emit('updata-active', index)
    },
    // 获取全部频道
    async getChannelsFn () {
      const res = await getChannels().catch(err => err)
      this.ChannelsAll = res.data.data.channels
    }
  },
  created () {
    // 获取全部频道
    this.getChannelsFn()
  },
  computed: {
    ...mapState(['token']),
    // 过滤出未添加的数据
    undeterminedChannels () {
      return this.ChannelsAll.filter(item => {
        return !this.userChannels.some(userItem => userItem.id === item.id)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.van-button {
  width: 60px;
}
.channel-title {
  font-size: 16px;
  color: #333;
}
.van-grid-item {
  width: 80px;
  height: 43px;
  /deep/.van-grid-item__content {
    position: relative;
    background-color: #f3f5f7;
    border-radius: 6px;
    .van-grid-item__text {
      font-size: 14px;
      color: #222;
      margin-top: 0;
    }
    .van-icon {
      position: absolute;
      top: -8px;
      right: -8px;
      font-size: 18px;
      color: #ccc;
    }
  }
  /deep/.van-grid-item__content--surround::after {
    border-width: 0;
  }
}
.activeStyle {
  /deep/.van-grid-item__text {
    color: red !important;
  }
}
</style>
