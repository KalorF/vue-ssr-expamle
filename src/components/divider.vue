<template>
  <div class="goods-detail-divider flex-center">
    <span></span>
    <div>{{title}}</div>
    <span></span>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: [String],
      default: '商品详情',
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
.goods-detail-divider {
  width: 100%;
  height: 30px;
  background: rgba(255, 255, 255, 1);
  font-size: 15px;
  color: #9E9E9E;
  div {
    margin: 0 10px;
  }
  span {
    width: 20%;
    height: 1px;
    background: #D2D2D2;
  }
}
</style>
