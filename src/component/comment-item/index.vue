<template>
  <div class="comment-item">
    <van-cell class="user-infor">
      <van-image
        slot="icon"
        round
        fit="cover"
        src="https://profile.csdnimg.cn/D/4/8/3_qq_54527592"
      />
      <div slot="title">
        <div class="user-title">
          <span>李公子</span>
          <div class="praise">
            <van-icon name="good-job-o" />
            <span>1213</span>
          </div>
        </div>
        <div>好久都不开发框架是不符合看见啥部分考生十分大方算法概述</div>
      </div>
      <div class="upbdata" slot="label">
        <span>14小时前 </span>
        <van-button round type="default" size="mini">回复</van-button>
      </div>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'CommentItem'
}
</script>

<style lang="less" scoped>
.user-infor {
  .van-image {
    width: 35px;
    height: 35px;
    margin-right: 18px;
  }
  .name {
    font-size: 12px;
    color: #333333;
  }
  .upbdata {
    font-size: 12px;
    color: #bababa;
  }
  .follow-btn {
    width: 85px;
    height: 29px;
  }
  .user-title {
    display: flex;
    justify-content: space-between;
    .praise {
      display: flex;
      align-items: center;
    }
  }
}
</style>
