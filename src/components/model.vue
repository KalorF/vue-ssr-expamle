<template>
  <div class='mask' v-if='show'>
    <div class="model-container">
      <div class="model-inner-container">
        <div class="model-header">
          <img class="close" src="https://res.heywoodsminiprogram.com/shopping/h5/close.png" @click="close"/>
          常见问题
        </div>
        <div class="model-content">
          <div class="model-content-title-container flex-start" >
            <img class="model-content-img" src="https://res.heywoodsminiprogram.com/shopping/h5/howlong.png"/>
            <span class="model-content-title">多久发货</span>
          </div>
          <div class="model-text-content">
            下单后24小时发货,订单状态可在 <span style="color:#FE8043;">“我的好货”</span>页面查看 普通地区物流3-5天到达,偏远地区5-7天到达,如遇特殊情况可能会导致延误~
          </div>
        </div>
        <div class="model-content">
          <div class="model-content-title-container flex-start">
            <img class="model-content-img" src="https://res.heywoodsminiprogram.com/shopping/h5/tuihuan.png"/>
            <span class="model-content-title">如何退换货</span>
          </div>
          <div class="model-text-content">
            <p>請及时联系客服,点击拨打电话</p>
            <a class="phone-container" :href="`tel:${phone}`">
                <img class="model-content-img" src="https://res.heywoodsminiprogram.com/shopping/h5/btn-phone.png"/>
                <span class="phone-number" style="color:#00C100;text-decoration:underline">{{phone}}</span>
            </a>
          </div>
        </div>
        <div class="model-content">
          <div class="model-content-title-container flex-start" >
            <img class="model-content-img" src="https://res.heywoodsminiprogram.com/shopping/h5/money.png"/>
            <span class="model-content-title">价格说明</span>
          </div>
          <div class="model-text-content">价格指商品的实时标价,最终以订单结算价格为准!</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { requestApi } from '@/request/request'
export default {
  props: ['show'],
  data () {
    return {
      phone: ''
    }
  },
  created () {
    requestApi({
      name: 'staff'
    }).then((res) => {
      if (res.code === 1) {
        this.phone = res.data.phone
      }
    })
  },
  methods: {
    close () {
      this.$emit('closeHelp')
    }
  }
}
</script>

<style lang="less" scoped>
@import '../common/css/common.less';
.mask{
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.7);
    z-index: 999;
}
.model-container {
    position: relative;
    padding: 15px 0;
    width: 100%;
    height: 400px;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    z-index: 10000;
}
.model-inner-container {
    width: 80%;
    background: #fff;
    margin: 0 auto;
    border-radius: 5px;
}
.close {
    width: 35px;
    height: 35px;
    position: absolute;
    top: 7px;
    right: 26px;
    z-index: 10000;
}
.model-header {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    height: 50px;
    background: #E4322D;
    text-align: center;
    font-size: 20px;
    line-height: 50px;
    color: #fff;
    font-weight: bold;
    letter-spacing: 2px;
}
.model-content {
    padding: 10px;
}
.model-content-img {
    width: 15px;
    height: 15px;
    margin-right: 5px;
}
.model-content-title {
    font-weight: bold;
    font-size: 18px;
    color: #FD620A;
}
.model-text-content {
    color: #555;
    font-size: 18px;
}
.phone-container {
    display: block;
}
</style>
