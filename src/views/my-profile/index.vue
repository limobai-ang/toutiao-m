<template>
  <div class="porfile-index">
    <van-nav-bar title="个人信息" left-arrow @click-left="$router.back()" />
    <van-cell-group>
      <!-- 表单元素加上 hidden 相当于写了display:none; 隐藏元素了 设置accept属性只接受图片 -->
      <input
        type="file"
        id="upfile"
        hidden
        accept="image/*"
        @change="onFilechange"
        ref="file"
      />
      <!-- 在元素上嵌套了一层 label标签 并使用for属性和input上的id进行绑定 点击label标签会触发input的点击事件 -->
      <label for="upfile">
        <van-cell title="头像" is-link center class="porfile-photo">
          <van-image
            round
            width="1rem"
            height="1rem"
            fit="cover"
            :src="userInfo.photo"
          />
        </van-cell>
      </label>
      <van-cell
        title="昵称"
        :value="userInfo.name"
        is-link
        @click="userPhotoIsShow = true"
      />
      <van-cell
        title="性别"
        :value="userInfo.gender === 1 ? '女' : '男'"
        is-link
        @click="userGenderShow = true"
      />
      <van-cell
        title="生日"
        :value="userInfo.birthday"
        is-link
        @click="userBirthdayShow = true"
      />
    </van-cell-group>
    <!-- 修改姓名弹出层 -->
    <van-popup
      v-model="userPhotoIsShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <updata-name
        v-if="userPhotoIsShow"
        @close="userPhotoIsShow = false"
        v-model="userInfo.name"
      ></updata-name>
    </van-popup>
    <!-- 修改性别弹出层 -->
    <van-popup v-model="userGenderShow" position="bottom">
      <updata-gender
        v-if="userGenderShow"
        v-model="userInfo.gender"
        @close="userGenderShow = false"
      />
    </van-popup>
    <!-- 修改生日弹出层 -->
    <van-popup v-model="userBirthdayShow" position="bottom">
      <updata-birthday
        v-if="userBirthdayShow"
        v-model="userInfo.birthday"
        @close="userBirthdayShow = false"
      />
    </van-popup>
    <van-popup class="popup-photo"
      v-model="userPhotoShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <updata-photo
        v-if="userPhotoShow"
        v-model="userInfo.photo"
        :file="previewImage"
        @close="userPhotoShow = false"
      />
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user.js'
import UpdataName from './component/updata-name.vue'
import UpdataGender from './component/updata-gender.vue'
import UpdataBirthday from './component/updata-birthday.vue'
import UpdataPhoto from './component/updata-photo.vue'

export default {
  name: 'MyProfile',
  components: {
    UpdataName,
    UpdataGender,
    UpdataBirthday,
    UpdataPhoto
  },
  data () {
    return {
      // 修改姓名弹出层
      userPhotoIsShow: false,
      // 修啊性别弹出层
      userGenderShow: false,
      // 修改生日弹出层
      userBirthdayShow: false,
      // 修改头像弹出层
      userPhotoShow: false,
      // 用户数据
      userInfo: {},
      // 预览图片File对象
      previewImage: ''
    }
  },
  methods: {
    // 获取用户信息
    async loadUserPorfile () {
      const res = await getUserProfile({
        birthday: '2018-12-20'
      }).catch(err => err)
      console.log(res)
      if (res.status !== 200) {
        if (res.request.status === 401) {
          this.$toast({
            message: '请先登录账号',
            position: 'top'
          })
        } else {
          this.$toast({
            message: '信息获取失败',
            position: 'top'
          })
        }
        this.$router.back()
      }
      this.userInfo = res.data.data
    },
    // 选择图片触发
    onFilechange () {
      // 展示弹出层
      this.userPhotoShow = true
      // 预览图片
      // this.previewImage = window.URL.createObjectURL(this.$refs.file.files[0])
      this.previewImage = this.$refs.file.files[0]
      // 为了解决相同文件不触发 change事件，所以在这里手动的清空file的value
      this.$refs.file.value = ''
    }
  },
  created () {
    this.loadUserPorfile()
  }
}
</script>

<style lang="less" scoped>
.van-popup {
  background-color: #f5f7f9;
}
.porfile-photo {
  /deep/.van-cell__value {
    display: flex;
    justify-content: flex-end;
  }
}
.popup-photo {
  background-color: #000;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
