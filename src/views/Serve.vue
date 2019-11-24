<template>
  <div class='question-page'>
    <div class='question-list-warp' v-for="(listItem,index) in ListData" :key="index">
      <div class='question-list'>
        <div class='question-list-title' @click='isOpen(index)' >
          <div>{{listItem.qusetion}}</div>
          <img class="listItem-down" :src='listItem.down'>
        </div>
        <div  v-show='listItem.hiddenstatus'  class='question-dec-hidden'>
          {{listItem.dec}}
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'order',
  data () {
    return {
      ListData: []
    }
  },
  mounted () {
    let ListData = [{
      id: 1,
      hiddenstatus: false,
      down: 'https://res.heywoodsminiprogram.com/point-open-buy/images/downImg.png',
      qusetion: '1.我的订单大概多久发货?',
      dec: '订单的发货时间为您下单之后的24小时内，请您耐心等待，订单状态及物流进度可在下单成功后的模块消息内容中查看，普通地区异地物流运转3-5天左右，偏远地区异地物流运转时间5-7天子铺，如遇特殊情况将会导致延误，以物流官网进度为准。若您的订单超出72小时仍未发货，建议您联系商家进行咨询。'
    }, {
      id: 2,
      qusetion: '2.我的订单如何申请退换货?',
      hiddenstatus: false,
      down: 'https://res.heywoodsminiprogram.com/point-open-buy/images/downImg.png',
      dec: '若您需要办理退换货，无需对订单进行任何操作，请您及时联系商家协商退换货事宜，向商家索取商品寄回地址信息，将商品寄回至商家处，并向商家提供商品寄回有效物流单号，由商家为您安排退换货。'
    }, {
      id: 3,
      qusetion: '3.如何联系商家?',
      hiddenstatus: false,
      down: 'https://res.heywoodsminiprogram.com/point-open-buy/images/downImg.png',
      dec: '下单成功后，系统将会发送消息，可通过点击消息中的链接打开订单中心，拨打售后电话联系商家。'
    }, {
      id: 4,
      qusetion: '4.价格说明?',
      hiddenstatus: false,
      down: 'https://res.heywoodsminiprogram.com/point-open-buy/images/downImg.png',
      dec: '价格：指商品的实时标价，不因表述的差异改变性质。具体成交价格根据商品参加活动或者使用优惠券等发生变化，最终以订单结算价格为准。'
    }]
    this.ListData = ListData
    // document.documentElement.scrollTop = 0
  },
  methods: {
    isOpen (index) {
      console.log(index, 'ffff', this.ListData)
      for (var i = 0; i < this.ListData.length; i++) {
        if (i !== index && this.ListData[i].hiddenstatus) {
          this.ListData[i].hiddenstatus = false
          this.ListData[i].down = 'https://res.heywoodsminiprogram.com/point-open-buy/images/downImg.png'
        }
      }
      if (this.ListData[index].hiddenstatus) {
        this.ListData[index].hiddenstatus = false
        this.ListData[index].down = 'https://res.heywoodsminiprogram.com/point-open-buy/images/downImg.png'
      } else {
        this.ListData[index].hiddenstatus = true
        this.ListData[index].down = 'https://res.heywoodsminiprogram.com/point-open-buy/images/upImg.png'
      }
      console.log(this.ListData, ' this.data.ListData')
    }

  }

}
</script>

<style scoped lang='less'>
.question-page{
  width: 100%;
  // min-height: 100vh;
  background: #ffffff;
  .question-list-warp{
    width: 92%;
    height: 100%;
    margin: 0 auto;
    .question-list{
      width: 100%;
      border-bottom: 1px rgba(232,232,232,1) solid;
      .question-list-title{
        width: 100%;
        display: flex;
        height: 55px;
        color:rgba(51,51,51,1);
        flex-flow: row nowrap;
        align-items: center;
        justify-content: space-between;
        div{
          font-size:18px;
          font-family:PingFangSC-Regular;
          font-weight:400;
          color:rgba(51,51,51,1);
        }
        .listItem-down{
          width:15px;
          height:12px;
        }
      }
      .question-dec-hidden{
        width: 96%;
        margin-left: 4%;
        line-height: 25px;
        font-size: 16px;
        text-align: left;
      }
    }
    .question-list:last-child{
      border-bottom:none;
    }
  }
}
</style>
