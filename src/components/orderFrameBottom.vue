<template>
  <div ref="fillForms">
    <div id="data-fixed" class="ec-form-fields">
      <div class="item-group clear">
        <!-- <p class="activity">活动内容：{{goodsData.activity_des}}</p> -->
        <div v-for="(item,index) in keys" :key="index">
          <div class="tabContent">
            <p class="sub-title is-required prop-name" style="margin-bottom: .2rem;font-size:.15rem;">
              请选择：<span style="color:red;">{{item.name}}</span>
            </p>
            <button
              class="sku"
              @click="tabInfoChange(index,cindex)"
              v-for="(citem,cindex) in item.value"
              :class="{notClick:citem.notClick,active:citem.isActiveC}"
              :attr_id="citem.id"
              :key="citem.id"
            >{{citem.cname}}</button>
          </div>
        </div>
      </div>
      <div class="ec-form-item clear item-group" style="margin-top: .1rem; padding-bottom: .1rem">
        <div class="is-required" style="padding-bottom: .06rem;">数量</div>
        <div style="text-align: right;line-height: .36rem;">
          <div id="package-spinner" class="ec-spinner" style="float: left;">
            <i class="left disabled"
              @click="handleDel"
              style="touch-action: pan-y; user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);">-</i>
            <div>{{form.goods[0].amount}}</div>
            <i class="right"
              @click="handleAdd"
              style="touch-action: pan-y; user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);">+</i>
          </div>
          <div v-if="pay_type != 3">
            商品金额：<span id="package-price" style="color: #cf294f; font-size: .16rem;"
                      v-if="haveChangedId.length == goodsData.spec_info.length">
              ￥{{pay_type == 1 ? (nowOlPrice*form.goods[0].amount*100/100).toFixed(2) : (nowUdPrice*form.goods[0].amount*100/100).toFixed(2)}}</span>
            <span id="package-price" style="color: #cf294f; font-size: .16rem;" v-else>￥0</span>
          </div>
          <div v-if="pay_type == 3">
            商品金额：<span id="package-price" style="color: #cf294f; font-size: .16rem;"
                      v-if="haveChangedId.length == goodsData.spec_info.length">
              ￥{{o_pay_type == 1 ? (nowOlPrice*form.goods[0].amount*100/100).toFixed(2): (nowUdPrice*form.goods[0].amount*100/100).toFixed(2)}}</span>
            <span id="package-price" style="color: #cf294f; font-size: .16rem;" v-else>￥0</span>
          </div>
        </div>
      </div>
      <div class="ec-form-item clear" style="width:100%;">
        <label class="ec-label" :style="`${!showWxAddr ?  'float:none;' : 'float:left;'}`">收货地址</label>
        <van-button type="primary" class="ec-content addr-button" @click="userWxAddr" v-if="showWxAddr">+使用微信地址</van-button>
      </div>
      <div class="ec-form-item clear">
        <label class="ec-label is-required">姓名</label>
        <div class="ec-content">
          <input v-model="form.receiver_name" type="text" class="ec-input" maxlength="10" @blur="watchName">
          <div v-if="nameFlag" class="ec-validate">姓名只能输入中文</div>
        </div>
      </div>
      <div class="ec-form-item clear">
        <label class="ec-label is-required">手机</label>
        <div class="ec-content">
          <input v-model="form.receiver_phone" type="tel" class="ec-input" @blur="watchPhone">
          <div v-if="phoneFlag" class="ec-validate">手机号码格式错误</div>
        </div>
      </div>
      <div id="select-area" class="ec-form-item clear">
        <label class="ec-label is-required">地区</label>
        <div class="ec-content">
          <div class="ec-content select-area select-wrapper">
            <select id="province" v-model="form.receiver_province" style="background:#fff;" @change="handleProvince">
              <option value="" :disabled="true" style="display:none;" selected>请选择省份</option>
              <option v-for="(item, index) in province" :key="index">{{item.province}}</option>
            </select>
          </div>
          <div class="ec-content select-area select-wrapper">
            <select id="city" v-model="form.receiver_city" style="background:#fff;" @change="handleCity">
              <option value="" :disabled="true" style="display:none;" selected>请选择城市</option>
              <option v-for="(item, index) in cityArr" :key="index">{{item.city}}</option>
            </select>
          </div>
          <div class="ec-content select-area select-wrapper">
            <select id="district" v-model="form.receiver_region" style="background:#fff;" @change="handleDistrict">
              <option value="" :disabled="true" style="display:none;" selected>请选择地区</option>
              <option v-for="(item, index) in districtArr" :key="index">{{item}}</option>
            </select>
          </div>
        </div>
      </div>
      <div class="ec-form-item clear">
        <label class="ec-label is-required">地址</label>
        <div class="ec-content">
          <input v-model="form.receiver_addr" placeholder="街道、楼牌号等" type="text" class="ec-input" maxlength="50" @blur="inputPut(10)">
        </div>
      </div>
      <div class="ec-form-item clear" style="margin-bottom: .1rem;">
        <label class="ec-label is-required">付款</label>
        <div class="ec-content" v-if="pay_type != 3">
          <ul class="radio-group" style="float: left;">
            <li class="active"><span class="radio-icon"></span>{{goodsData.pay_type == 2 ? '货到付款' : '微信支付'}}</li>
          </ul>
          <span style="color: #cf2a4f;" v-if="goodsData.pay_type == 2">验货满意后付款</span>
        </div>
        <div class="ec-content" v-if="pay_type == 3">
          <ul class="radio-group" style="float: left;">
            <li :class="{'active':o_pay_type == 2}" @click="changeOpayType(2)"><span class="radio-icon"></span>货到付款
            </li>
            <li :class="{'active':o_pay_type == 1}" @click="changeOpayType(1)"><span class="radio-icon"></span>微信支付
            </li>
          </ul>
        </div>
      </div>
      <div class="ec-form-item clear">
        <label class="ec-label required-placeholder" style="padding-top: .04rem;">留言</label>
        <div class="ec-content">
          <textarea v-model="form.comments" class="ec-input" style="height: .6rem;" maxlength="100"
                    @blur="inputPut(12)"></textarea>
        </div>
      </div>
    </div>
    <div class="submit-button"
        @click="handleSubmit"
        style="">
      提交订单
    </div>
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
    form: {
      type: Object,
      default: function () {
        return {}
      },
      required: true
    },
    keys: {
      type: Array,
      default: function () {
        return []
      },
      required: true
    },
    province: {
      type: Array,
      default: function () {
        return []
      },
      required: true
    },
    cityArr: {
      type: Array,
      default: function () {
        return []
      },
      required: true
    },
    districtArr: {
      type: Array,
      default: function () {
        return []
      },
      required: true
    },
    haveChangedId: {
      type: Array,
      default: function () {
        return {}
      },
      required: true
    },
    pay_type: {
      type: [String, Number],
      default: '2',
      required: true
    },
    o_pay_type: {
      type: [String, Number],
      default: 2,
      required: true
    },
    nowUdPrice: {
      type: [String, Number],
      default: 1,
      required: true
    },
    nowOlPrice: {
      type: [String, Number],
      default: 1,
      required: true
    },
    showWxAddr: {
      type: Boolean,
      default: false,
      required: true
    },
    nameFlag: {
      type: Boolean,
      default: false,
      required: true
    },
    phoneFlag: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  methods: {
    //  选择商品规格
    tabInfoChange (index, cindex) {
      this.$emit('tabInfoChange', index, cindex)
    },
    //  数量增加
    handleDel () {
      this.$emit('handleDel')
    },
    //  数量减少
    handleAdd () {
      this.$emit('handleAdd')
    },
    //  使用微信地址
    userWxAddr () {
      this.$emit('userWxAddr')
    },
    //  校验名字
    watchName (e) {
      this.$emit('watchName', e)
    },
    //  校验名字手机格式
    watchPhone (e) {
      this.$emit('watchPhone', e)
    },
    //  选择省
    handleProvince (e) {
      this.$emit('handleProvince', e)
    },
    //  选择市
    handleCity (e) {
      this.$emit('handleCity', e)
    },
    //  选择区
    handleDistrict (e) {
      this.$emit('handleDistrict', e)
    },
    //  数据上报
    inputPut (type) {
      this.$emit('inputPut', type)
    },
    //  改变订单类型
    changeOpayType (type) {
      this.$emit('changeOpayType', type)
    },
    //  提交订单
    handleSubmit () {
      this.$emit('handleSubmit')
    }
    // //  滚动到底部
    // scrollform (type) {
    //   let scrollTop = this.$refs.fillForms.offsetTop
    //   document.documentElement.scrollTop = scrollTop
    //   window.pageYOffset = scrollTop
    //   document.body.scrollTop = scrollTop
    // }
  }
}
</script>

<style lang="less" scope>
  @import '../common/css/common.less';
  .ec-form-fields {
    background: #f5f5f5;
    box-sizing: border-box;
    padding: .15rem;
    border-top: .01rem solid #edeef5;
    border-bottom: .01rem solid #edeef5;
    display: inline-block;
    width: 100%;
    .radio-group>li {
      display: inline-block;
      list-style: none;
      font-size: .16rem;
      line-height: .16rem;
      border-radius: .04rem;
      color: #333;
      margin-right: .1rem;
      margin-bottom: .1rem;
      cursor: pointer
    }
    .radio-group>li .radio-icon {
      display: inline-block;
      vertical-align: bottom;
      height: .18rem;
      width: .18rem;
      border-radius: 100%;
      border: .02rem solid #ccc;
      margin-right: .03rem;
      pointer-events: none
    }
    .radio-group>li.active .radio-icon:before {
      content: "";
      display: block;
      width: .1rem;
      height: .1rem;
      margin: .02rem;
      background-color: #cf294f;
      border-radius: 100%;
    }
    // 选择度数
    .sku {
      display: inline-block;
      list-style: none;
      font-size: .16rem;
      padding: 0 .15rem;
      max-width: 3rem;
      line-height: .34rem;
      border: .01rem solid #edeef5;
      // text-align: center;
      border-radius: .04rem;
      color: #333;
      margin-right: .1rem;
      margin-bottom: .1rem;
      cursor: pointer;
      background: #fff;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .notClick {
      background: #ccc;
    }
    .tabContent .active {
      background: #cf2a4f;
      color: white;
      border-color: #cf2a4f;
      touch-action: pan-y;
      user-select: none;
      -webkit-user-drag: none;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }
  }

    .ec-form-item {
      margin-bottom: .2rem;
      position: relative;
    }

    .ec-form-item .ec-label {
      text-align: left;
      vertical-align: middle;
      float: left;
      font-size: .14rem;
      color: #485c6a;
      line-height: 1;
      padding: .11rem 0;
      width: .6rem
    }

    .ec-form-item .ec-content {
      line-height: .36rem;
      position: relative;
      font-size: .14rem;
      margin-left: .61rem;
      display: flex;
    }

    .ec-form-item .select-area>select {
      width: 100%;
      height: .36rem;
      border: 0
    }

    .ec-form-item .ec-validate {
      position: absolute
    }

    .ec-form-item .select-wrapper {
      display: inline-block;
      width: 33%;
      margin-left: 0;
      padding-right: .05rem
    }

    .ec-spinner {
      border: .01rem solid #c5c5c5;
      text-align: center;
      border-radius: .02rem;
      div {
        display: inline-block;
        width: .52rem;
        height: .34rem;
        line-height: .34rem;
        float: left;
        background-color: #fff;
      }
      .left {
        float: left;
        display: block;
        height: .34rem;
        line-height: .34rem;
        font-style: normal;
        width: .32rem;
        font-size: .18rem;
        cursor: pointer;
        border-right: .01rem solid #c5c5c5;
      }
      .right {
        float: left;
        display: block;
        height: .34rem;
        line-height: .34rem;
        font-style: normal;
        width: .32rem;
        font-size: .18rem;
        cursor: pointer;
        border-left: .01rem solid #c5c5c5;
      }
      &::after, &::before {
        content: "";
        display: table;
        clear: both
      }
    }

    .ec-spinner .left.disabled,
    .ec-spinner .right.disabled {
      color: #c5c5c5
    }

    .is-required:before,
    .required-placeholder:before {
      content: "*";
      color: #ff4949;
      margin-right: .04rem
    }

    .required-placeholder:before {
      opacity: 0
    }

    .ec-input {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      background-color: #fff;
      background-image: none;
      border-radius: .04rem;
      border: .01rem solid #c5c5c5;
      color: #1f313d;
      display: block;
      font-size: inherit;
      height: .36rem;
      line-height: 1;
      padding: .03rem .1rem;
      transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
      width: 100%
    }
      // 提交订单按钮
  .submit-button {
    display: block;
    font-size: .16rem;
    text-align: center;
    margin: .15rem .1rem;
    border-radius: .04rem;
    color: rgb(255, 255, 0);
    background-color: rgb(255, 0, 0);
    height: .46rem;
    line-height: .46rem;
    touch-action: pan-y;
    user-select: none;
    -webkit-user-drag: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
  .addr-button {
    transform: translateX(110%);
    border-radius: 5px;
    padding: 0 20px;
    color: white;
    height: 40px;
  }
  .preview-phone .ec-validate {
    color: #ff4949;
    font-size: .12rem;
    line-height: 1;
    margin-top: .38rem;
  }

  .fill-forms {
    height: .5rem;
    line-height: .5rem;
    text-align: center;
    border-top: .01rem solid #edeef5;
    font-size: .16rem;
  }
</style>
