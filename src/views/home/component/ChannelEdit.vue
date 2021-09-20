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
        @click="onUserChannelClick(index, item, 1)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getChannels, delChannel } from '@/api/comment.js'
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
    onUserChannelClick (index, obj, type) {
      // 编辑状态，删除频道   非编辑状态切换频道
      if (this.isEdit) {
        // 编辑状态
        if (!type && index !== 0) {
          this.removerChannel(index, obj)
        } else {
          this.userChannels.push(this.undeterminedChannels[index])
        }
      } else {
        // 非编辑状态
        this.switchChannel(index)
      }
    },
    // 删除频道
    async removerChannel (index, obj) {
      if (index < this.active) {
        this.$emit('minus')
      }
      // 删除数据的index位
      this.userChannels.splice(index, 1)
      console.log(21313513155313)
      const res = await delChannel(obj.id).catch(err => err)
      console.log(res)
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
    this.getChannelsFn()
  },
  computed: {
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
