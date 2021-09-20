<template>
  <div class="porfile-index">
    <van-nav-bar title="个人信息" left-arrow @click-left="$router.back()" />
    <van-cell-group>
      <van-cell title="头像" is-link center>
        <van-image
          round
          width="1rem"
          height="1rem"
          fit="cover"
          src="https://img01.yzcdn.cn/vant/cat.jpeg"
        />
      </van-cell>
      <van-cell title="昵称" :value="userInfo.name" is-link @click="userPhotoIsShow = true" />
      <van-cell title="性别" :value="userInfo.sex" is-link />
      <van-cell title="生日" :value="userInfo.age" is-link />
    </van-cell-group>
    <!-- 弹出层 -->
    <van-popup
      v-model="userPhotoIsShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <updata-name @close="userPhotoIsShow = false" v-model="userInfo.name"></updata-name>
    </van-popup>
  </div>
</template>

<script>
import UpdataName from './component/updata-name.vue'
export default {
  name: 'MyProfile',
  components: {
    UpdataName
  },
  data () {
    return {
      userPhotoIsShow: false,
      userInfo: {
        photo: 'https://img01.yzcdn.cn/vant/cat.jpeg',
        name: '李公子',
        sex: '女',
        age: '1998-09-30'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.van-popup {
  background-color: #f5f7f9;
}
</style>
