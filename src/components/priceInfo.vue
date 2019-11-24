<template>
  <div id="marketingModules">
    <div :class="['marquee-wrapper', Fiexd ? 'fix' : '']" v-show="marqueeShow">
      <ul id="marqueeContainer" class="marquee-style-1">
        <li>
          <div class="purInfo-container flex-start">
            <img v-if="purInfoText.head_img" :src="purInfoText.head_img" class="purInfo-img"/>
            <p v-if="purInfoText.msg">{{purInfoText.msg}}</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="goods-detail-header">
      <div class="goods-detail-header-top flex-between">
        <div class="goods-detail-header-price-container flex-between">
          <div class="goods-detail-header-price-text">
            <!-- <span class="goods-detail-header-price-text-int">{{goodsData.price.slice(0,goodsData.price.length-2)}}</span> -->
            <!-- <span  class="goods-detail-header-price-text-float">{{goodsData.price.slice(goodsData.price.length-2,goodsData.price.length)}} 元</span> -->
          </div>
          <div class="goods-detail-header-num" style="margin-left:15px;margin-top:8px;font-size:17px;text-decoration:line-through;">
            {{goodsData.origin_price}}元
          </div>
        </div>
        <div class="goods-detail-header-num">
          已售{{salesVolume ? salesVolume : 5884}}件
        </div>
      </div>
      <div class="goods-detail-middle">
        <img src="https://res.heywoodsminiprogram.com/shopping/serve_h5/hotsale.png" class="goods-detail-middle-icon"/>
        {{goodsData.description}}
      </div>
      <div class="goods-detail-bottom flex-between">
        <div class="goods-detail-bottom-item flex-center"  v-if="goodsData.pay_type == 1">
          <img class="goods-detail-bottom-item-img" src="https://res.heywoodsminiprogram.com/shopping/h5/wxpay.png"/>
          <span class="goods-detail-bottom-item-text" style="color:#5A9549;">微信支付</span>
        </div>
        <div class="goods-detail-bottom-item flex-center" v-else>
          <img class="goods-detail-bottom-item-img" src="https://res.heywoodsminiprogram.com/shopping/serve_h5/huodao.png"/>
          <span class="goods-detail-bottom-item-text" style="color:#09BB07;">货到付款</span>
        </div>
        <div class="goods-detail-bottom-item flex-center">
          <img class="goods-detail-bottom-item-img" src="https://res.heywoodsminiprogram.com/shopping/serve_h5/baoyou.png"/>
          <span class="goods-detail-bottom-item-text" style="color:#10AEFF;">全国包邮</span>
        </div>
        <div class="goods-detail-bottom-item flex-center">
          <img class="goods-detail-bottom-item-img" src="https://res.heywoodsminiprogram.com/shopping/serve_h5/fast.png"/>
          <span class="goods-detail-bottom-item-text" style="color:#FFBE00;">极速发货</span>
        </div>
        <div class="goods-detail-bottom-item flex-center moreItem"  @click="toHelp">
          <span class="goods-detail-bottom-item-text">常见问题</span>
          <img class="goods-detail-bottom-item-img2" src="https://res.heywoodsminiprogram.com/shopping/h5/dayu.png"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { requestApi } from '@/request/request'
export default {
  props: ['goodsData', 'salesVolume'],
  data () {
    return {
      gid: '',
      key: '',
      Fiexd: false,
      purInfo: [], // 订单
      purInfoText: [], //
      marqueeShow: true
    }
  },
  mounted () {
    if (this.$route.query.gid) {
      this.gid = this.$route.query.gid
      this.key = this.$route.query.key
    } else if (this.$route.params.gid) {
      this.gid = this.$route.params.gid
      this.key = this.$route.params.key
    }
    // window.addEventListener('scroll', this.handleScroll)
    this.getPurInfo()
  },
  destroyed () {
    // window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    getPurInfo () {
      requestApi({
        name: 'getPurInfo'
      }).then(res => {
        this.purInfo = res.data
        this.purInfoText = this.purInfo[0]
        this.timerHandler()
      })
    },
    // handleScroll () {
    //   let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
    //   if (scrollTop > 400) {
    //     this.Fiexd = true
    //   } else {
    //     this.Fiexd = false
    //   }
    // },
    timerHandler () {
      let timer = 0
      this.timers = setInterval(() => {
        timer++
        if (timer === 4) {
          this.marqueeShow = false
        } else if (timer === 5) {
          this.marqueeShow = false
          clearInterval(this.timers)
          let purInfoText = Math.floor(Math.random() * this.purInfo.length)
          this.purInfoText = this.purInfo[purInfoText]
          this.timerHandler()
        } else {
          this.marqueeShow = true
        }
      }, 1000)
    },
    //  常见帮助
    toHelp () {
      this.$emit('handleHelp')
    }
  }

}
</script>

<style lang='less' scoped>
@import '../common/css/common.less';

#marketingModules {
  background: #fff;
  // marquee-wrapper
  .marquee-wrapper {
    pointer-events: none;
    height: .36rem;
    position: absolute;
    top: 20px;
    z-index: 99;
    #marqueeContainer {
      position: relative;
      margin: 0;
      padding: 0;
      list-style: none;
      li {
        list-style: none;
        position: absolute;
        left: 0;
        padding: 5px 10px;
        border-radius: .15rem;
        opacity: 1;
        height: .36rem;
        overflow: hidden;
        .purInfo-container {
           width: 100%;
           overflow: hidden;
        }
        .purInfo-img {
          padding: 2px;
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }
        div {
          border-radius: .13rem;
          line-height: .26rem;
          box-shadow: 0 0 .04rem rgba(0, 0, 0, .5);
          background-color: rgba(88, 88, 88, .8)
        }
        p {
          max-width: 2rem;
          color: #e5e5e5;
          padding: 0px 10px;
          background-size: .22rem;
          background-repeat: no-repeat;
          background-position: .01rem;
          font-size: .14rem;
          line-height: .26rem;
          animation: marquee 5s;
          -webkit-animation: marquee 5s;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
        }

      }

    }
    .marquee-style-1 {
      li > div {
        background-color: #fff;
        color: #000
      }
    }
    .marquee-style-2 {
      li > div {
        background-color: rgba(0, 0, 0, .9);
        color: #fff
      }
    }
  }

  //
  .marquee-wrapper.fix {
    position: fixed;
    top: .1rem;
    width: 100%;
    left: 0;
    right: 0;
    margin-top: 0
  }

  .pc .marquee-wrapper.fix {
    left: 50%;
    margin-left: -3.2rem
  }

  @keyframes marquee {
    0% {
      opacity: 0
    }
    15% {
      opacity: 1
    }
    60% {
      opacity: 1
    }
    80% {
      opacity: 0
    }
    to {
      opacity: 0
    }
  }

  // good-hot-wrapper hot-style-2
  .good-hot-wrapper {
    position: relative;
    height: .54rem;
    line-height: .54rem;
    font-size: .30rem;
    color: #fff;
    text-align: left;
    overflow: hidden;
    padding-left: .05rem;
    div {
      float: right;
      height: .54rem;
      line-height: .24rem;
      font-size: .16rem;
      font-weight: 700;
      text-align: center;
      padding: 0 .3rem;
      display: table;
      p {
        display: table-cell;
        vertical-align: middle;
        span {
          font-size: .12rem;
          font-weight: 400
        }
      }
    }
    span.money-icon {
      font-size: .14rem
    }
  }

  .good-hot-wrapper.hot-style-1 {
    background-image: linear-gradient(90deg, #ff3f68, #f61d4a);
    div {
      background-color: #ffd6de;
      color: #f71e4b
    }
  }
  .good-hot-wrapper.hot-style-2 {
    background-color: #ec193a;
    div {
      background-color: #fff9fb;
      color: #e31858;
      position: relative;
      p {
        position: relative;
        z-index: 1
      }
      &:after {
        content: "";
        display: block;
        position: absolute;
        background-color: #fff9fb;
        height: .7rem;
        width: .7rem;
        border-radius: 100%;
        left: -.15rem;
        top: -.09rem
      }
    }
  }
  .good-hot-wrapper.hot-style-3 {
    background-image: linear-gradient(90deg, #fc2c44, #ff651b);
    div {
      background-color: #fff5f6;
      color: #fe5129;
      margin-right: .15rem
    }
  }

  // page-title
  .page-title {
    position: relative;
    font-size: .15rem;
    text-align: left;
    padding: .10rem .10rem .10rem .05rem;
    word-wrap: break-word;
    word-break: break-all;
    p {
      text-indent: .4rem;
      letter-spacing: .01rem;
    }
    .icon {
      position: absolute;
      left: .05rem;
      top: .11rem;
      font-size: .12rem;
      font-weight: 400;
      color: #ffff00;
      padding: 0 .05rem;
      line-height: .18rem;
      border-radius: .1rem;
      background-color: #ff0000;
    }
  }
}

.fix-price {
  font-size: .2rem;
  text-align: left;
  padding: .1rem 0 0 .05rem;
  line-height: .12rem
}

.good-services {
  font-size: .12rem;
  width: 100%;
  padding: .1rem .05rem;
  box-sizing: border-box;
  .item {
    float: left;
    width: 33.3%;
    span {
      display: inline-block;
      margin-right: .03rem;
      font-size: .12rem;
      line-height: .16rem;
      height: .16rem;
      width: .16rem;
      border-radius: .09rem;
      text-align: center;
      border: .01rem solid #ff0000;
      color: #ff0000;
    }
    div {
      display: inline-block;
    }
  }
;
  .item:first-child {
    text-align: left
  }
  .item:nth-child(2) {
    text-align: center
  }
  .item:nth-child(3) {
    text-align: right
  }
}

.goods-detail-header {
  box-sizing: border-box;
  padding: 5px 10px;
  width: 100%;
  background: #fff;
  .goods-detail-header-top {
    align-items: flex-end;
  }
  .goods-detail-header-price-container {
    align-items: flex-end;
  }
  .goods-detail-header-price-text {
    font-weight: bold;
    color:#F40E28;
    .goods-detail-header-price-text-int {
      font-size: 35px;
    }
    .goods-detail-header-price-text-float {
      font-size: 17px;
      //line-height: 30px;
    }
  }

  .goods-detail-header-num {
    font-size: 13px;
    color: #8D8D8D;
    margin-left: 15px;
    line-height: 30px;
  }
}

.goods-detail-middle {
  margin: 5px 0;
  position: relative;
  display: inline-block;
  font-size: 18px;
  line-height: 25px;
  font-weight: bold;
  text-indent: 85px;
  color:rgba(61,61,61,1);
  .goods-detail-middle-icon {
    position: absolute;
    top: 1px;
    left: 0;
    width: 77px;
    height: 20px;
  }
}

.goods-detail-bottom {
  margin: 5px 0;
  &:last-child {
    height: 13px;
    line-height: 13px;
  }
  .goods-detail-bottom-item {
    .goods-detail-bottom-item-img {
      width: 16px;
      vertical-align: middle;
    }
    .goods-detail-bottom-item-text {
      font-size: 14px;
      height: 16px;
      line-height: 16px;
      margin-left: 2px;
      vertical-align: middle;
    }
    .goods-detail-bottom-item-img2{
      margin-left: 4px;
      width: 7px;
      height: 12px;
    }
  }
}
.moreItem{
  padding: 1px 4px;
  border: 1px solid #909090;
  border-radius: 12px;
}
</style>
