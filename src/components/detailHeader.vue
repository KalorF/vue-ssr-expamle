<template>
  <div class="detailHeader">
    <van-swipe :autoplay="swiperTime" indicator-color="white">
      <van-swipe-item class="first-image" v-if="goodsData.banner_video && !helpShow">
        <video :src="goodsData.banner_video[0]" controls="controls" height="400" width="100%" class="first-video"
                :poster="goodsData.head_img" @play="videoPlay" @pause="videoPause"></video>
      </van-swipe-item>
      <van-swipe-item class="first-image" v-if="goodsData.head_img">
        <img v-lazy="goodsData.head_img" class="head_img">
      </van-swipe-item>
      <van-swipe-item v-for="(item,index) in goodsData.banner_imgs" :key="index" class="first-image">
        <img v-lazy="item" class="head_img">
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  props: {
    goodsData: {
      type: Object,
      default: function () {
        return {}
      },
      required: true
    },
    swiperTime: {
      type: Number,
      default: 3000,
      required: true
    },
    salesVolume: {
      type: Number,
      default: 2000,
      required: true
    },
    helpShow: {
      type: Boolean,
      default: false,
      required: true
    },
    someDateTime: {
      type: [String, Boolean],
      default: false,
      required: true
    }
  },
  methods: {
    videoPlay () {
      this.$emit('videoPlay')
    },
    videoPause () {
      this.$emit('videoPause')
    }
  }
}
</script>

<style lang="less" scoped>
@import '../common/css/common.less';
// 第一张图
  .first-image {
    padding: 0;
    text-align: center;
    font-size: 0;
    width: 100%;
    position: relative;
    bottom: 0;
    .first-video {
      z-index: -1;
    }
    img {
      width: 100%;
    }
    .absolute-pos{
      position: absolute;
    }
  }
  .head_img {
    width: 100%;
    height: 400px;
  }
</style>
