<template>
  <div class="updata-photo">
    <img :src="image" alt="" ref="img" />
    <van-nav-bar
      left-text="取消"
      right-text="确认"
      @click-left="$emit('close')"
      @click-right="onClickRight"
    />
  </div>
</template>

<script>
import { setPhotofile } from '@/api/user.js'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
export default {
  name: 'UpdataPhoto',
  props: {
    value: {
      type: String,
      require: true
    },
    file: {
      type: File,
      require: true
    }
  },
  data () {
    return {
      image: window.URL.createObjectURL(this.file),
      cropper: null
    }
  },
  methods: {
    // 获取裁切后的图片 (包装为Promise) 可以在下面通过 await 调用
    getCroppedCanvas () {
      return new Promise(resolve => {
        this.cropper.getCroppedCanvas().toBlob(blob => {
          resolve(blob)
        })
      })
    },

    // 发起请求
    async onClickRight () {
      this.$toast.loading({
        message: '修改中...',
        forbidClick: true,
        duration: 0
      })
      // 获取到裁切之后的图像
      const file = await this.getCroppedCanvas()
      // 如果要求 Content-Type 是 multipart/form-data,则一定要提交FormData 数据对象，专门用于文件上传的，不能提交{}
      const fd = new FormData()
      fd.append('photo', file)
      const res = await setPhotofile(fd).catch(err => err)
      if (res.status !== 201) {
        this.$toast.fail('修改失败')
        return
      }
      this.$toast.success('修改成功')
      // 修改完成之后 更新父组件中的地址并关闭弹出层
      this.$emit('input', res.data.data.photo)
      this.$emit('close')
    }
  },
  mounted () {
    const image = this.$refs.img
    this.cropper = new Cropper(image, {
      aspectRatio: 1, // 裁剪框尺寸
      viewMode: 1, // 限制裁剪框不超过画布的大小
      dragMode: 'move', // 定义裁剪器的拖动模式。 移动画布
      cropBoxResizable: false, // 通过拖动来调整裁剪框的大小
      cropBoxMovable: false, // 通过拖动移动裁剪框。
      background: false // 显示容器的网格背景
    })
  }
}
</script>

<style lang="less" scoped>
.updata-photo {
  img {
    display: block;
    width: 100%;
  }
  .van-nav-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: transparent;
  }
}
</style>
