<template>
  <div class="search-history">
    <van-cell title="历史记录" size="large">
      <van-icon
        name="delete"
        v-if="!isEditHistory"
        @click="isEditHistory = true"
      />
      <div v-if="isEditHistory">
        <span>全部删除 </span>
        <span  @click="isEditHistory = false">完成</span>
      </div>
    </van-cell>
    <!-- 历史项 -->
    <van-cell title="单元格">
        <van-icon name="close" v-if="isEditHistory"/>
    </van-cell>
    <van-cell title="单元格">
        <van-icon name="close" v-if="isEditHistory"/>
    </van-cell>
    <van-cell title="单元格">
        <van-icon name="close" v-if="isEditHistory"/>
    </van-cell>
    <van-cell title="单元格">
        <van-icon name="close" v-if="isEditHistory"/>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  data () {
    return {
      isEditHistory: false
    }
  }
}
</script>

<style></style>
