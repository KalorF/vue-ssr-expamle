<template>
  <div class="order-page" id="order-page">
    <div class="suc-view">
      <img src="https://res.heywoodsminiprogram.com/shopping/serve_h5/order-success.png" class="suc-icon"/>
      <div class="suc-text">下单成功</div>
    </div>
    <div class="moreGoods">
      <img src="https://res.heywoodsminiprogram.com/shopping/serve_h5/recommend.png" alt="" >
    </div>
    <goods :goodsList="goodsList" :salesVolume="salesVolume" :pageType="2"></goods>

    <van-dialog
      v-model="show"
      title="客服二维码"
      show-confirm-button
      confirm-button-text="关闭"
      close-on-click-overlay
    >
      <img src="http://shopping-material.oss-cn-shenzhen.aliyuncs.com/picture/detail/156517478968798333" style="width:80%;display:block;margin:10px auto">
    </van-dialog>

    <!--公众号关注二维码弹层-->
    <!-- <qrCode :showQrCode="showQrCode" @hideQrCode="hideQrCode"></qrCode> -->
  </div>

</template>

<script>
import { requestApi } from '@/request/request'
// import { wxconfig } from '@/utils/wxconfig'
// import { CheckLogin } from '@/common/js/mixins'
// import { getQueryVariable } from '@/utils/util'
// import { Toast } from 'vant'
import goods from '@/components/goods.vue'
// import qrCode from '@/components/qrCode.vue'
// import {transformQualityUrl} from '@/utils/util'
export default {
  name: 'order',
  // mixins: [CheckLogin],
  data () {
    return {
      orderList: [],
      goodsList: [],
      salesVolume: '',
      // sessionId: '',
      openId: '',
      key: '',
      page: 1,
      page_size: 10,
      form: {
        gid: 5
      },
      concatShow: false,
      anthorShow: true,
      show: false
      // showQrCode:false,
    }
  },
  components: {
    goods
    // qrCode
  },
  // created () {
  //   // console.log(sessionStorage.getItem('subscribe'),'是否关注公众号')
  //   // console.log(window.location.search,'getQueryVariable',getQueryVariable('appid'))
  //   // if(this.$route.query.template_id){
  //   //   console.log('确认授权请求接口')
  //   //   this.onceSubAdd()
  //   // }
  //   // if(JSON.parse(sessionStorage.getItem('subscribe'))){
  //   //   console.log(typeof subscribe,'1111')
  //   //   this.showQrCode=false
  //   // }else{
  //   //   this.showQrCode= true
  //   // }
  //   // this.sessionId = sessionStorage.getItem('sessionId') ? sessionStorage.getItem('sessionId') : ''
  // },
  mounted () {
    // document.title = '订单信息'
    // document.documentElement.scrollTop = 0
    // document.body.scrollTop = 0
    this.openId = localStorage.getItem('newSystemOpenIdServe') || ''
    this.gid = this.$route.query.gid
    this.oid = this.$route.query.oid

    this.initGoods()
  },
  methods: {
    // hideQrCode(){
    //   this.showQrCode= false
    // },
    // 客服
    getAnthor () {
      let url = 'https://mp.weixin.qq.com/mp/subscribemsg?action=get_confirm&appid=wx7e5baeb049c739f9'
      window.location.href = url
    },
    //  初始化商品列表
    initGoods () {
      let data = {
        key: this.key
      }
      requestApi({
        name: 'recommList',
        data
      }).then((res) => {
        console.log('initGoods', res)
        this.goodsList = res.data.data_list
        // this.goodsList = res.data.data_list.slice(0,10).sort(function(a,b){ return Math.random()>.5 ? -1 : 1;})
        this.goodsList.forEach((item, index) => {
          this.goodsList[index].salesVolume = Math.floor(Math.random() * (10000 - 1000 + 1) + 1000)
          // this.goodsList[index].head_img = this.goodsList[index].head_img ? transformQualityUrl(this.goodsList[index].head_img,200):''
        })
      })
    }
  }
}
</script>

<style scoped lang='less'>
.order-page {
  width: 100%;
  background: #F5F5F5;
  .suc-view {
    width: 100%;
    background: #fff;
    margin-bottom: 6px;
    padding-bottom: 45px;
    padding-top: 40px;
    .suc-icon {
      width:150px;
      display: block;
      margin: 0 auto 10px auto;
      transform: translateX(-10px);
    }
    .suc-text {
      text-align: center;
      font-size: 24px;
      font-family:PingFangSC-Medium,PingFangSC;
      font-weight:bold;
      color:rgba(9,187,7,1);
    }
    .order-bt{
      padding: 19px;
      margin-top: 35px;
      .order-bt-list{
        width: 160px;
        height: 45px;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
    .suc-concat{
      position: relative;
      width:70%;
      height:45px;
      margin: 0 auto 40px auto;
      // display: flex;
      // align-items: center;
      .suc-concat-button{
        width: 70%;
        margin: 10px auto;
        height: 80%;
        display: block;
        border-radius:16px;
        color:white;
        background:rgba(190,52,40,1);
        animation: mymove 0.7s infinite;
        .suc-concat-button-image{
          width: 100%;
          height: 100%;
        }
      }
      @keyframes mymove{
        0%   {width: 70%;height: 80%;}
        25%  {width: 75%;height: 85%;}
        50%  {width: 80%;height: 90%;}
        75%  {width: 75%;height: 85%;}
        100% {width: 70%;height: 80%;}
      }
    }
  }
  .guide {
    width: 80%;
    display: block;
    margin: 0 auto;
  }
  .customer {
    width: 20%;
    position: absolute;
    right: -40px;
    top: 0;
  }
  .detail-view{
    width: 100%;
    background: #fff;
    border-bottom: 1px solid rgba(232, 232, 232, 1);
    padding-top: 15px;
    .detail-view-container{
      width: 90%;
      margin: 0 auto;
      display: flex;
      border-bottom: 2px solid rgba(232, 232, 232, 1);
      .left-view{
        margin-bottom: 15px;
        img{
          width:85px;
          height:115px;
          border-radius:8px;
        }
      }
      .middle-view {
        margin: 0 0 15px 18px;
        width: 100%;
        .text-1{
          font-size: 15px;
          margin-bottom: 25px;
          color: rgba(0, 0, 0, 1);
        }
        .text-2 {
          font-size: 15px;
          font-family: PingFangSC-Regular;
          color: rgba(153, 153, 153, 1);
        }
      }
      .right-view{
        float: right;
        width: 100%;
        // border: 1px red solid;
        .text-3 {
          text-align: right;
          width: 100%;
          font-size: 15px;
        }
        .text-4 {
          text-align: right;
          width: 100%;
          font-size: 15px;
          text-decoration: line-through;
        }
        .text-5 {
          text-align: right;
          font-size: 15px;
          width: 100%;
        }
      }
    }
    .detail-view-bottom {
      width: 90%;
      height: 38px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .status {
        width: 80px;
        height: 22px;
        line-height:22px;
        border: 1px solid rgba(190, 52, 40, 1);
        border-radius: 2px;
        font-size:14px;
        color: rgba(190, 52, 40, 1);
        text-align: center;
      }
      .text-6 {
        font-size: 14px;
        color: rgba(51, 51, 51, 1);
      }
      .text-7 {
        font-size: 14px;
        color: #BE3428;
      }
    }

  }
  .custom-view {
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    img{
      width:136px;
      height: 36px;
    }
  }
  .moreGoods {
    width: 45%;
    margin: 15px auto 10px auto;
    img{
      width: 100%;
      height: 100%;
    }
  }
}
</style>
