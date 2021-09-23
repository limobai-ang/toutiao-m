<template>
  <div class="search-history">
    <van-cell title="历史记录" size="large">
      <van-icon
        name="delete"
        v-if="!isEditHistory"
        @click="isEditHistory = true"
      />
      <div v-if="isEditHistory">
        <span @click="$emit('delAllSearchHistory')">全部删除 </span>
        <span @click="isEditHistory = false">完成</span>
      </div>
    </van-cell>
    <!-- 历史项 -->
    <van-cell :title="item" v-for="(item, index) in searchHistory" :key="index" @click.stop="$emit('search', item)">
      <van-icon
        name="close"
        v-if="isEditHistory"
        @click.stop="$emit('delSearchHistory', index)"
      />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  props: {
    searchHistory: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      isEditHistory: false
    }
  },
  methods: {
  }
}
</script>

<style></style>
