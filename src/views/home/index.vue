<template>
  <div>
    <van-button :loading="loading" type="primary" loading-text="加载中..."
      >主要按钮</van-button
    >
    <van-cell-group>
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" label="描述信息" />
    </van-cell-group>
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
    <div class="box">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      loading: false
    }
  }
}
</script>

<style lang="less" scoped>
.box {
  width: 100px;
  height: 100px;
  background-color: pink;
}
</style>
