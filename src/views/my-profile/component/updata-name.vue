<template>
  <div class="updata-name">
    <van-nav-bar
      title="昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onClickRight"
    />
    <div class="name-content">
      <van-field
        v-model="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="10"
        placeholder="请输入昵称"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'UpdataName',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      message: this.value
    }
  },
  methods: {
    onClickRight () {
      this.$emit('input', this.message)
      this.$emit('close')
    }
  }
}
</script>

<style lang="less" scoped>
.updata-name {
  .van-nav-bar {
    background: #fff;
    /deep/.van-icon {
      color: #1989fa;
    }
    /deep/.van-nav-bar__title {
      color: #333;
    }
  }
  .name-content {
    padding: 10px;
  }
}
</style>
