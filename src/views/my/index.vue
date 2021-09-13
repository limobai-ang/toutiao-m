<template>
  <div class="my-container">
    <van-cell-group>
      <van-cell title="单元格" value="内容">
        <van-image
          slot="icon"
          round
          width="50px"
          height="50px"
          src="https://img01.yzcdn.cn/vant/cat.jpeg"
        />
        <div slot="title">昵称</div>
        <van-button>编辑资料</van-button>
      </van-cell>
      <van-grid :border="false">
        <van-grid-item text="文字">
          <div slot="text">
            <div>666</div>
            <div>头条</div>
          </div>
        </van-grid-item>
        <van-grid-item text="文字">
          <div slot="text">
            <div>666</div>
            <div>关注</div>
          </div>
        </van-grid-item>
        <van-grid-item text="文字">
          <div slot="text">
            <div>666</div>
            <div>粉丝</div>
          </div>
        </van-grid-item>
        <van-grid-item text="文字">
          <div slot="text">
            <div>666</div>
            <div>获赞</div>
          </div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>
    <van-grid :column-num="2">
      <van-grid-item icon-prefix="iconfont icon" icon="shoucang" text="收藏" />
      <van-grid-item icon-prefix="iconfont icon" icon="lishi" text="历史" />
    </van-grid>
    <van-cell title="消息通知" is-link to="/" />
    <van-cell title="小智同学" is-link to="/" />
    <van-cell title="退出登录" to="" />
  </div>
</template>

<script>
export default {
  name: 'My'
}
</script>

<style></style>
