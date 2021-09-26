<template>
  <div>
    <van-nav-bar left-arrow @click-left="$router.back()" title="注册/登录" />
    <!-- 表单验证不通过时不展示错误信息 错误时触发onFailed方法 -->
    <van-form
      :show-error="false"
      :show-error-message="false"
      ref="login-form"
      validate-first
      @submit="onLogin"
      @failed="onFailed"
    >
      <van-field
        v-model="loginForm.mobile"
        icon-prefix="iconfont icon"
        left-icon="shouji"
        placeholder="请输入手机号"
        :rules="formRules.mobile"
        name="mobile"
        center
      />
      <van-field
        v-model="loginForm.code"
        clearable
        icon-prefix="iconfont icon"
        left-icon="yanzhengma"
        placeholder="请输入短信验证码"
        :rules="formRules.code"
        center
      >
        <template #button>
          <van-button
            size="mini"
            round
            :disabled="isDisabled"
            v-if="!isDisabled"
            class="sent-btn"
            :loading="isLoading"
            loading-type="spinner"
            @click.prevent="onSendSms"
          >
            {{ btnMessage }}
          </van-button>
          <van-count-down
            v-if="isDisabled"
            :time="1000 * 60"
            format="ss s"
            @finish="isDisabled = false"
          />
        </template>
      </van-field>
      <div class="loginBtn">
        <van-button type="info" native-type="submit" block>登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, codes } from '@/api/user.js'
import { mapMutations } from 'vuex'
export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        mobile: '13911111112',
        code: '246810'
      },
      formRules: {
        mobile: [
          { required: true, message: '请填写手机号' },
          {
            pattern: /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/,
            message: '手机号码格式错误！'
          }
        ],
        code: [
          { required: true, message: '请输入短信验证码' },
          { pattern: /^\d{6}$/, message: '验证码格式错误！' }
        ]
      },
      btnMessage: '发送验证码',
      isDisabled: false,
      isLoading: false
    }
  },
  methods: {
    ...mapMutations(['setToken']),
    // 登录功能
    async onLogin () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      const req = await login(this.loginForm).catch(err => err)
      this.setToken(req.data.data)
      // 清除layout的缓存 让它重新渲染
      this.$store.commit('removeCachePages', 'Layout')
      // 跳转回原来的页面
      // this.$router.back()
      console.log(this.$route)
      this.$router.push(this.$route.query.redirect || '/')
      // 提示用户
      this.$toast.success('登录成功')
    },
    // 表单验证失败时触发
    onFailed (errorInfo) {
      // errorInfo.errors.forEach(item => {
      //   this.$toast({
      //     message: item.message,
      //     position: 'top'
      //   })
      // })

      // 多条会叠在一起 所以只显示第一条
      if (errorInfo.errors[0]) {
        this.$toast({
          message: errorInfo.errors[0].message,
          position: 'top'
        })
      }
    },
    // 发送验证码
    async onSendSms () {
      // 获取验证手机号验证结果
      const data = await this.$refs['login-form']
        .validate('mobile')
        .catch(err => {
          this.$toast({
            message: err.message,
            position: 'top'
          })
          return err
        })
      // 判断结果  如果是err 就结束
      if (data) return

      // console.log('验证通过')
      // console.log('发送验证码')
      this.isLoading = true
      const res = await codes(this.loginForm.mobile).catch(err => {
        this.$toast({
          message:
            err.response.status === 429
              ? '发送的太频繁了，请稍后重试'
              : '验证码发送失败',
          position: 'top'
        })
        // 结束按钮的loading 状态
        this.isLoading = false
        return err
      })
      if (res.status !== 200) return
      // console.log('验证码发送成功')
      this.isLoading = false
      // 调用countDown方法 控制按钮状态
      // this.countDown()

      // 控制倒计时组件是否显示
      this.isDisabled = true
    }
    // 倒计时功能函数
    // #region
    // countDown () {
    //   this.isDisabled = true
    //   this.btnMessage = 60
    //   const timeID = setInterval(() => {
    //     this.btnMessage--
    //     if (this.btnMessage < 0) {
    //       this.isDisabled = false
    //       this.btnMessage = '发送验证码'
    //       // 结束定时器
    //       clearInterval(timeID)
    //     }
    //   }, 1000)
    // }
    // #endregion
  }
}
</script>

<style lang="less" scoped>
.loginBtn {
  padding: 26px 16px;
}
.sent-btn {
  width: 76px;
  height: 23px;
  background-color: #eeedee;
}
</style>
