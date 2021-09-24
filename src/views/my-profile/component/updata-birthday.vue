<template>
  <div class="updata-birthday">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @confirm="onConfirm"
      @cancel="$emit('close')"
    />
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { setUserProfile } from '@/api/user.js'
export default {
  name: 'UpdataBirthday',
  props: {
    value: {
      type: [String],
      require: true
    }
  },
  data () {
    return {
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(this.value) // 支持一个有效的字符串的时间格式
    }
  },
  methods: {
    async onConfirm () {
      this.$toast.loading({
        message: '修改中...',
        forbidClick: true
      })
      const res = await setUserProfile({
        birthday: dayjs(this.currentDate).format('YYYY-MM-DD') // 使用dayjs中的format方法将时间转为字符串年月日格式
      }).catch(err => err)
      // 处理错误
      if (res.status !== 201) {
        this.$toast.fail('修改失败')
        return
      }
      this.$toast.success('修改成功')
      // 更新父组件中的数据 隐藏弹出层
      this.$emit('input', dayjs(this.currentDate).format('YYYY-MM-DD'))
      this.$emit('close')
    }
  }
}
</script>

<style></style>
