<template>
  <div class='qrCode-page' v-if='showQrCode'>
    <div class="qrCode-mask" @click="hideQrCode"></div>
    <div class="qrCode-content">
      <div class="qr-close">
        <img @click="hideQrCode" src="https://res.heywoodsminiprogram.com/shopping/serve_h5/close2.png"/>
      </div>
      <div class="qr-title">
        <p>长按识别关注公众号</p>
        <p>获取实时物流信息</p>
      </div>
      <div class="pic-fingle">
        <img  src="https://res.heywoodsminiprogram.com/shopping/serve_h5/pic-fingle.png"/>
      </div>

      <div class="qrCodeImg">
        <img src="https://res.heywoodsminiprogram.com/shopping/serve_h5/qr3.png"/>
        <img class="logo" src="https://res.heywoodsminiprogram.com/shopping/serve_h5/qr2.jpg"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['showQrCode'],
  data () {
    return {
      phone: ''
    }
  },
  methods: {
    hideQrCode () {
      this.$emit('hideQrCode')
    }
  }
}
</script>

<style lang="less" scoped>
  @import '../common/css/common.less';

  .qrCode-mask {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 999;
  }

  .qrCode-content {
    width: 78%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 10000;
    background: white;
    padding-bottom: 25px;
    .qr-close {
      height: 30px;
      img {
        position: absolute;
        right: 12px;
        top: 12px;
        width: 16px;
        height: 16px;
      }
    }
    .qr-title {
      width: 80%;
      font-size: .22rem;
      font-family: PingFangSC-Medium, PingFangSC;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
      line-height: 35px;
      margin: 0 auto;
      text-align: center;
    }
    .pic-fingle {
      width: 176px;
      height: 27px;
      margin: 10px auto 10px auto;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .qrCodeImg{
      width: 80%;
      height: 220px;
      margin: 0 auto;
      border-radius:10px;
      border: 4px rgba(249, 65, 16, 1) solid;
      position: relative;
      overflow: hidden;
      img{
        width: 100%;
        height: 100%;
        border-radius:10px;
      }
      .logo{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 45px;
        height: 45px;
        z-index: 10001;
        border-radius:0px;
      }
    }
  }

</style>
