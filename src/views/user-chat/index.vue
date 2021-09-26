<template>
  <div class="user-chat">
    <!-- 标题 -->
    <van-nav-bar title="小智同学" left-arrow @click-left="$router.back()" />
    <!-- 消息列表 -->
    <van-cell-group class="content-box" ref="content-box">
      <van-cell
        v-for="(item, index) in messageList"
        :key="index"
        :title="item"
      />
    </van-cell-group>
    <!-- 发送消息 -->
    <van-cell-group class="message-box">
      <van-field v-model.trim="message" center placeholder="请输入消息">
        <template #button>
          <van-button
            size="small"
            type="primary"
            @click="onSend"
            :disabled="!message"
            >发 送</van-button
          >
        </template>
      </van-field>
    </van-cell-group>
  </div>
</template>

<script>
// import io from 'socket.io-client'
import { setItem, getItem } from '@/utils/storage.js'
export default {
  name: 'UserChat',
  data () {
    return {
      message: '',
      socket: null,
      messageList: getItem('toutiao-messageList') || []
    }
  },
  created () {
    // 建立连接 (接口暂时有问题无法使用)
    // this.socket = io('http://toutiao-app.itheima.net')
    // this.socket.on('connect', function () {
    //   console.log('连接建立成功了')
    // })
  },
  methods: {
    onSend () {
      this.messageList.push(this.message)
      this.message = ''
    },
    // 调整对话框滚动位置
    scrollToButtom () {
      const list = this.$refs['content-box']
      console.log(list)
      list.scrollTop = list.scrollHeight
    }
  },
  watch: {
    messageList (newValue) {
      setItem('toutiao-messageList', newValue)
      this.$nextTick(() => {
        this.scrollToButtom()
      })
    }
  }
}
</script>

<style lang="less" scoped>
.user-chat {
  .content-box {
    position: fixed;
    top: 46px;
    bottom: 53px;
    left: 0;
    right: 0;
    overflow: scroll;
  }
  .message-box {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>
