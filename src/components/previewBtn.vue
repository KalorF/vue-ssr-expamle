<template>
  <div id="btn-list" class="preview-phone-btn-list" style="height: .5rem;">
    <!--<a href="" class="goback">首页</a>-->
    <ul class="main-btn-list clear">
      <li style="width: 40%;background-color: #fff;position:relative;" @click="callphone" class="flex-center">
        <a id="contact_tel" :href="`tel:${phone}`" ref="phone" class="phone-container">
          <img src="https://res.heywoodsminiprogram.com/shopping/serve_h5/none-phone.png" class="phone-img">
          <span class="phone-title">电话咨询</span>
        </a>
        <div class="phoneWrap"></div>
      </li>
      <li style="width: 60%;background:linear-gradient(231deg,rgba(249,65,16,1) 0%,rgba(240,35,0,1) 100%);" @click="goForm" class="flex-center">
        <a id="contact_tel" class="phone-container">
          <!-- <img src="https://res.heywoodsminiprogram.com/shopping/serve_h5/zan.png" class="zan-img" alt=""> -->
          <span class="phone-title" style="color:#fff;">点我立即下单</span>
        </a>
        <!-- <a id="contact_tel" @click="handleSubmit" class="phone-container" v-else>
          <img src="https://res.heywoodsminiprogram.com/shopping/serve_h5/btn-gou.png" class="gou-img" alt="">
          <span class="phone-title" style="color:#fff;">提交订单</span>
        </a> -->
      </li>
    </ul>
  </div>
</template>

<script>
import { requestApi } from '@/request/request'
// import { CheckLogin } from '@/common/js/mixins'
// import errorReport from '@/sdk/monitors'
export default {
  // mixins: [CheckLogin],
  data () {
    return {
      phone: ''
    }
  },
  mounted () {
    requestApi({
      name: 'staff'
    }).then((res) => {
      if (res.code === 1) {
        this.phone = res.data.phone
      } else {
        // errorReport('getBuyerError')
      }
    })
  },
  methods: {
    goForm () {
      this.$emit('goform')
    },
    callphone () {
      this.putData(90074, 13)
      this.$refs.phone.click()
    },
    handleSubmit () {
      this.$emit('handleSubmit')
    }
  }
}
</script>
<style lang='less' scoped>
  @import '../common/css/common.less';
  .preview-phone-btn-list {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: .5rem;
    text-align: center;
    opacity: 1;
    visibility: visible;
    transition: visibility 1s, opacity 1s;
    -moz-transition: visibility 1s, opacity 1s;
    -webkit-transition: visibility 1s, opacity 1s;
    -o-transition: visibility 1s, opacity 1s;
    z-index: 90;
  }
  .preview-phone-btn-list .icon-phone-22 {
    background: url(https://da13095b.fyeds1.com/images/phone-22.png) no-repeat 50%;
    height: .22rem;
  }
  .preview-phone-btn-list .goback {
    display: none;
    position: absolute;
    left: 0;
    top: 0;
    width: .7rem;
    height: 100%;
    border-right: .01rem solid #e6e6e6;
    line-height: .14rem;
    font-size: .12rem;
    background: #fff;
    text-align: center;
    color: #666
  }

  .preview-phone-btn-list .goback:before {
    content: "";
    display: block;
    margin: .05rem auto;
    background: url(/images/home-22.png) no-repeat 50%;
    width: .22rem;
    height: .22rem
  }

  .preview-phone-btn-list .main-btn-list {
    height: .5rem;
    width: 100%;
  }

  .preview-phone-btn-list .main-btn-list>li {
    float: left;
    list-style: none;
    text-align: center;
    height: 100%
  }

  .preview-phone-btn-list .main-btn-list a {
    display: block;
    font-size: .12rem;
    line-height: .14rem;
  }

  .preview-phone-btn-list.from-together {
    padding-left: .7rem;
    background: #fff
  }

  .preview-phone-btn-list.from-together .goback {
    display: block
  }

  .preview-phone-btn-list.from-together.empty {
    padding-left: 0;
    border-top: .01rem solid #edeef5
  }

  .preview-phone-btn-list.from-together.empty .goback {
    width: 100%;
    height: .5rem;
    line-height: .14rem
  }

  .phoneWrap {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .phone-container {
    color:#555556;
    line-height: .5rem;
  }
  .phone-title {
    font-size: .18rem;
    font-weight: bold;
    vertical-align: middle;
    color:rgba(85,85,86,1);
    font-family:PingFangSC-Medium,PingFangSC;
    margin-left: 3px;
  }
  .phone-img{
    width:26px;
    height:26px;
    vertical-align: middle;
  }
  .zan-img {
    width: 25px;
    height: 30px;
    vertical-align: middle;
  }
  .gou-img{
    width: 33px;
    height: 24.5px;
    vertical-align: middle;
  }
  .flash {
    width: .20rem;
    height: .20rem;
    vertical-align: middle;
  }
</style>
