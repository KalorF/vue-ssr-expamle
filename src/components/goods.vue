<template>
  <div class="goods-container flex-around">
    <div class="goods-item" v-for="item in goodsList" :key="item.id" @click="toDetail(item)">
      <img :src="item.head_img" class="goods-item-img"/>
      <!-- <div class="goods-item-tag" v-if="item.pay_type == 2">
          货到付款
      </div> -->
      <!-- <div class="goods-item-tag" v-if="item.pay_type == 1">
          线上支付
      </div> -->
      <span class="goods-item-title">{{item.description}}</span>
      <div class="goods-item-price-container flex-between">
          <span class="goods-item-price">{{item.price}}<span class="goods-item-price-unit">元</span></span>
          <span class="goods-item-price-num">已售{{item.salesVolume}}件</span>
      </div>
    </div>
    <div class="goods-item" v-if="goodsList.length % 2 != 0" style="visibility: hidden;"></div>
  </div>
</template>

<script>
export default {
  props: ['goodsList'],
  data () {
    return {
      key: localStorage.getItem('key')
    }
  },
  methods: {
    toDetail (item) {
      sessionStorage.setItem('salesVolume', item.salesVolume)
      this.$router.push(`/index/${item.id}/${this.key}`)
    }
  }
}
</script>

<style lang="less" scope>
@import '../common/css/common.less';
.goods-container {
  width: 100%;
  flex-wrap: wrap;
}
.goods-item {
  width: 48%;
  height: 245px;
  background: #fff;
  border-radius: 5px;
  position: relative;
  margin-bottom: 7px;
}
.goods-item-img {
  width: 100%;
  height: 170px;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  background-image: url('http://shopping-material.oss-cn-shenzhen.aliyuncs.com/undefined/156507425077041913');
  background-color: #e5e4e4;
  background-size: 150px 70px;
  background-position: center;
  background-repeat: no-repeat;
}
.goods-item-tag {
  position: absolute;
  background: red;
  color: white;
  right: 0;
  top: 145px;
  font-size: 14px;
  padding: 3px;
  border-top-left-radius: 5px;
}
.goods-item-title {
  .overhidden(2);
  height: 40px;
  width: 100%;
  font-size: 14px;
  font-weight: bold;
  padding:0 5px;
}
.goods-item-price-container {
  margin: 5px;
  font-size: 13px;
}
.goods-item-price {
  font-size: 17px;
  color: #FF642B;
  font-weight: bold;
}
.goods-item-price-unit {
  font-size: 13px;
}
.goods-item-price-num {
  color:#b6b6b6;
}
</style>
