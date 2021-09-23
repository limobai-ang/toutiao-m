<template>
  <van-cell :to="{ name: 'article', params: { articleId: articleContent.art_id } }">
    <div slot="title">
      <p class="van-multi-ellipsis--l2">{{ articleContent.title }}</p>
      <div class="coverMultiBox" v-if="articleContent.cover.type === 3">
        <div
          class="coverItem"
          v-for="(item, index) in articleContent.cover.images"
          :key="index"
        >
          <van-image fit="cover" :src="item" />
        </div>
      </div>
    </div>
    <div class="coverBox" v-if="articleContent.cover.type === 1">
      <van-image fit="cover" :src="articleContent.cover.images[0]" />
    </div>
    <div slot="label">
      <span>{{ articleContent.aut_name }}</span> &nbsp;
      <span>{{ articleContent.comm_count }}评论</span> &nbsp;
      <span>{{ articleContent.pubdate | relativeTime }}前</span>
    </div>
  </van-cell>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    articleContent: {
      type: Object,
      require: true
    }
  }
}
</script>

<style lang="less" scoped>
.van-cell {
  justify-content: space-between;
  .van-cell__value {
    flex: unset;
  }
}
.coverBox {
  width: 112px;
  height: 72px;
  margin-left: 10px;
}
.van-image {
  width: 100%;
  height: 100%;
}
.coverMultiBox {
  display: flex;
  height: 72px;
  .coverItem {
    flex: 1;
    // 除了最后一个子元素 其余元素加padding
    &:not(:last-child) {
      padding-right: 4px;
    }
  }
}
</style>
