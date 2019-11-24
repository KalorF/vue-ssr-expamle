<template>
  <div class="skeleton">
    <div class="skeleton-goods-block"></div>
    <div class="skeleton-price-block">
      <div class="skeleton-price-left"></div>
      <div class="skeleton-price-right"></div>
    </div>
    <div class="skeleton-dec-block">
      <div></div>
      <div></div>
    </div>
    <div class="skeleton-explain-block">
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div class="skeleton-tab">
      <div class="skeleton-tab-left block-center">
        <div></div>
      </div>
      <div class="skeleton-tab-right block-center">
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>

export default {

}

</script>
<style lang='less' rel='stylesheet/less' scoped>
  .skeleton {
    position: fixed;
    width: 100%;
    height: 100%;
    .skeleton-goods-block {
      width: 100%;
      height: 65%;
      background: rgba(229, 228, 228, 1);
    }
    .skeleton-price-block {
      width: 100%;
      height: 9%;
      display: flex;
      flex-flow: row nowrap;
      .skeleton-price-left {
        width: 64%;
        height: auto;
        background: rgba(210, 210, 210, 1);
      }
      .skeleton-price-right {
        width: 36%;
        height: auto;
      }
    }
    .skeleton-dec-block {
      margin: 0 auto;
      margin-top: 3%;
      width: 97.5%;
      height: 8%;
      display: flex;
      flex-flow: column;
      justify-content: space-between;
      div {
        width: 100%;
        height: 46%;
        background: rgba(229, 228, 228, 1);
      }
    }
    .skeleton-explain-block {
      width: 97.5%;
      height: 8%;
      margin: 0 auto;
      display: flex;
      align-items: center;
      flex-flow: row nowrap;
      justify-content: space-between;
      div {
        width: 24%;
        height: 21px;
        background: rgba(229, 228, 228, 1);
      }
    }
    .skeleton-tab {
      position: fixed;
      width: 100%;
      height: 8%;
      bottom: 0px;
      left: 0;
      display: flex;
      flex-flow: row nowrap;
      .skeleton-tab-left {
        width: 25%;
        height: 100%;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(229, 228, 228, 1);
        div {
          width: 70%;
          height: 80%;
          margin: 5% auto;
          background: rgba(229, 228, 228, 1);
        }
      }
      .skeleton-tab-right {
        width: 75%;
        height: 100%;
        background: rgba(229, 228, 228, 1);
        div {
          width: 80%;
          height: 80%;
          background: rgba(255, 255, 255, 1);
        }
      }
      .block-center{
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: center;
      }
    }
  }
</style>
