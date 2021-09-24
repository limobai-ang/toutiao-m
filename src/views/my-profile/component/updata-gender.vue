<template>
  <div class="updata-gender">
    <van-picker
      title="性别"
      show-toolbar
      :columns="columns"
      @confirm="onConfirm"
      @cancel="onCancel"
      :default-index="value"
    />
  </div>
</template>

<script>
import { setUserProfile } from '@/api/user.js'
export default {
  name: 'UpdataGender',
  props: {
    value: {
      type: [Number, String],
      require: true
    }
  },
  data () {
    return {
      columns: ['男', '女']
    }
  },
  methods: {
    async onConfirm (value, index) {
      this.$toast(`当前值：${value}, 当前索引：${index}`)
      this.$toast.loading({
        message: '修改中...',
        forbidClick: true
      })
      const res = await setUserProfile({ gender: index }).catch(err => err)
      console.log(res)
      if (res.status !== 201) {
        this.$toast.fail('修改失败')
        return
      }
      this.$toast.success('修改成功')
      this.$emit('input', index)
      this.$emit('close')
    },
    onCancel () {
      this.$emit('close')
    }
  }
}
</script>

<style></style>
