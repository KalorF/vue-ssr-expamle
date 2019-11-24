<template>
  <div class="preview-phone">
    <!--骨架屏测试-->
    <skeleton v-if="bgShow"></skeleton>

    <div v-if="!bgShow">
      <!-- 顶部轮播区 -->
      <detailHeader
        :goodsData="goodsData"
        :swiperTime="swiperTime"
        :helpShow="helpShow"
        :salesVolume="salesVolume"
        :someDateTime="someDateTime"
        @videoPlay="videoPlay"
        @videoPause="videoPause"
      />

      <!-- 顶部标题区 -->
      <price-info :goodsData="goodsData" :salesVolume="salesVolume" @handleHelp="handleHelp"></price-info>

      <div class="price-buy-wrapper clear" @click="scrollform(2)">
        <a class="index-buying flex-center">
          <div class="wrap-buy flex-center">
            <!-- <img src="https://res.heywoodsminiprogram.com/shopping/serve_h5/zan.png" class="zan-img" alt=""> -->
            {{buttonValue || '点我0元下单'}}
          </div>
        </a>
      </div>

      <!--商品详情-->
      <divider title="商品详情"/>

      <!-- 富文本区域 -->
      <div class="ql-editor" v-html="goodsData.detail" v-show="tabIndex == 1" ref="qlEditor" v-lazy-container="{ selector: 'img' }"></div>

      <!-- 订单区 -->
      <divider title="填写订单"/>

      <orderFrameBottom
        ref="orderFrameBottom"
        :goodsData="goodsData"
        :form="form"
        :keys="keys"
        :haveChangedId="haveChangedId"
        :province="province"
        :cityArr="cityArr"
        :districtArr="districtArr"
        :pay_type="pay_type"
        :o_pay_type="o_pay_type"
        :showWxAddr="showWxAddr"
        :nameFlag="nameFlag"
        :phoneFlag="phoneFlag"
        :nowUdPrice="nowUdPrice"
        :nowOlPrice="nowOlPrice"
        @tabInfoChange="tabInfoChange"
        @handleDel="handleDel"
        @handleAdd="handleAdd"
        @userWxAddr="userWxAddr"
        @watchName="watchName"
        @watchPhone="watchPhone"
        @handleProvince="handleProvince"
        @handleCity="handleCity"
        @handleDistrict="handleDistrict"
        @inputPut="inputPut"
        @changeOpayType="changeOpayType"
        @handleSubmit="handleSubmit"
      />

      <previewBtn v-if="searchBarFixed" :goodsData="goodsData" @goform="scrollform(3)"></previewBtn>
    </div>
    <model :show="helpShow" @closeHelp="closeHelp"></model>
  </div>
</template>
<script >
// import 'quill/dist/quill.core.css'
// import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'
import priceInfo from '@/components/priceInfo.vue'
import previewBtn from '@/components/previewBtn.vue'
import model from '@/components/model.vue'
import { province } from '@/utils/province.js'
import { wxconfig } from '@/utils/wxconfig'
import { requestApi } from '@/request/request'
// import { CheckLogin } from '@/common/js/mixins'
// import filterSku from '@/common/js/filterSku'
import { isToday } from '@/utils/util'
// import tool from '@/utils/throttle'
import skeleton from '@/components/skeleton.vue'
import detailHeader from '@/components/detailHeader.vue'
import orderFrameBottom from '@/components/orderFrameBottom.vue'
import divider from '@/components/divider.vue'
import {
  Dialog, Toast
} from 'vant'
// import errorReport from '@/sdk/monitors'
// var Quill = require('quill/dist/quill.js')
export default {
  // mixins: [filterSku],
  data () {
    return {
      bgShow: true,
      addrSame: false,
      showWxAddr: false,
      helpShow: false,
      buttonValue: '点此0元下单到付',
      someDateTime: '',
      swiperTime: 3000,
      interval: '', //  定时器
      value: '',
      pay_type: 2,
      o_pay_type: 2,
      goodsData: {
        spec_info: []
      },
      // sessionId: '',
      openId: '',
      tabIndex: 1,
      gid: '',
      key: '',
      oid: '',
      form: {
        sku_info: {},
        head_img: '',
        goods: [
          {
            gid: '', // 商品id
            sku_id: '', // skuID
            amount: 1 // 购买数量
          }
        ],
        receiver_name: '',
        receiver_phone: '',
        receiver_province: '',
        receiver_city: '',
        receiver_region: '',
        receiver_addr: '',
        comments: '',
        key: ''
      },

      province: [],
      cityArr: [],
      districtArr: [],
      searchBarFixed: true,

      phoneFlag: false,
      nameFlag: false,
      salesVolume: '2000'
    }
  },

  components: {
    priceInfo,
    previewBtn,
    model,
    skeleton,
    detailHeader,
    orderFrameBottom,
    divider
  },
  async mounted () {
    //  确认登录状态
    // await this.checkLogin()
    // await this.getLoginMsg()
    //  数据上报
    // this.putData(90073, '')
    // this.pushData('product')

    if (this.gid === 20 && this.key === 'rXbInh') {
      this.gid = 20
      this.key = 'zAcaWp'
    } else if (this.gid === 2 && this.key === 'rBzJU3') {
      this.gid = 8
      this.key = 'zAcaWp'
    } else if (this.gid === 4 && this.key === 'pkEh0q') {
      this.gid = 4
      this.key = 'zAcaWp'
    }

    this.province = province

    //  从小程序返回h5判断支付状态
    if (this.$route.params.other === 'payfail') {
      Toast.fail('支付失败')
    }

    this.initGoods()
    this.initUserInfo()
    this.getsalesVolume()
    setTimeout(() => {
      this.showWxAddr = window.__wxjs_environment !== 'miniprogram'
      console.log('this.showWxAddr', window.__wxjs_environment, this.showWxAddr)
    }, 1000)
    // eslint-disable-next-line no-unused-vars
    let location = JSON.parse(localStorage.getItem('location'))
    // 判断用户之前是否填写地址
    // window.addEventListener('scroll', tool.debounce(this.handleScroll), false)
    // this.someDateTime = someDateTime('November 12, 2019 00:00:00')
    // this.interval = setInterval(() => {
    //   this.someDateTime = someDateTime('November 12, 2019 00:00:00')
    // }, 1000)
  },
  beforeDestroy () {
    // window.removeEventListener('scroll', this.handleScroll, false)
    window.clearInterval(this.interval)
  },

  methods: {
    getsalesVolume () {
      let salesVolumeList = localStorage.getItem('salesVolumeList') ? JSON.parse(localStorage.getItem('salesVolumeList')) : []
      let isExist = false
      console.log(salesVolumeList, 'salesVolumeList')
      if (salesVolumeList.length > 0) {
        salesVolumeList.forEach((item, index) => {
          if (this.gid === item.gid) {
            isExist = true
            // 取出改值，然后每天加100
            let istoday = this.upDateCache()
            if (!istoday) {
              console.log(istoday, 'istoday')
              item.salesVolume = parseInt(item.salesVolume) + 100
              localStorage.setItem('salesVolumeList', JSON.stringify(salesVolumeList))
            }
            this.salesVolume = item.salesVolume
          }
        })
      }
      if (!isExist) {
        let salesVolume = Math.floor(Math.random() * (1000 - 500 + 1) + 500)
        if (this.gid === 8 || this.gid === 4 || this.gid === 6) {
          salesVolume = Math.floor(Math.random() * (15000 - 10000 + 1) + 10000)
        }
        this.salesVolume = salesVolume
        let arr = {
          gid: this.gid,
          salesVolume: salesVolume
        }
        salesVolumeList.push(arr)
        localStorage.setItem('salesVolumeList', JSON.stringify(salesVolumeList))
      }
    },
    upDateCache () {
      let addCacheDataTime = localStorage.getItem('addCacheDataTime')
      !addCacheDataTime && localStorage.setItem('addCacheDataTime', new Date())
      if (addCacheDataTime && !isToday(addCacheDataTime)) {
        localStorage.setItem('addCacheDataTime', new Date())
        console.log('不是当天')
        return false
      } else {
        console.log('是当天')
        return true
      }
    },
    //  input类型申报
    inputPut: function (type) {
      // this.putData(90074, type)
    },
    //  初始化商品信息
    initGoods () {
      let data = {
        gid: this.gid,
        key: this.key
      }
      // console.log(data)
      requestApi({
        name: 'newInfo',
        data
      }).then((res) => {
        this.bgShow = false
        console.log('initGoods', res)
        if (res.code === 1) {
          let data = res.data
          this.goodsData = data.goods_detail
          // this.goodsData.detail = this.goodsData.detail ? this.goodsData.detail.replace(/target="_blank"/g, '') : ''
          // this.goodsData.detail = letslazyload(this.goodsData.detail)
          console.log('this.goodsData.detail', this.goodsData.detail)
          // 将图片进行质量压缩处理
          // this.goodsData.head_img = this.goodsData.head_img ? transformQualityUrl(this.goodsData.head_img, 600) : ''
          // console.log(this.goodsData.head_img, 'this.goodsData.head_img')
          // this.form.head_img = this.goodsData.head_img ? transformQualityUrl(this.goodsData.head_img, 600) : ''
          // console.log(this.form.head_img)
          // if (this.goodsData.banner_imgs.length > 0) {
          //   for (var i = 0; i < this.goodsData.banner_imgs.length; i++) {
          //     this.goodsData.banner_imgs[i] = transformQualityUrl(this.goodsData.banner_imgs[i], 600)
          //   }
          // }
          this.pay_type = res.data.goods_detail.pay_type
          // document.title = this.goodsData.head_title
          wxconfig(this.goodsData)

          // 将富文本第一个文本元素赋值按钮 （下期修改）
          if (this.goodsData.detail) {
            this.$nextTick(() => {
              let qlEditor = this.$refs.qlEditor
              let aList = qlEditor.querySelectorAll('a')
              if (qlEditor.children[0].children[0] && qlEditor.children[0].children[0].tagName === 'STRONG') {
                this.buttonValue = qlEditor.children[0].children[0].innerText
                qlEditor.removeChild(qlEditor.children[0])
              }
              if (aList.length > 0) {
                for (let i = 0; i < aList.length; i++) {
                  aList[i].addEventListener('click', (e) => {
                    e.preventDefault()
                    this.scrollform()
                  })
                }
              }
            })
          }

          //  构建商品规格
          for (let key in this.goodsData.sku_info) {
            if (this.goodsData.sku_info[key].stock === 0) {
              delete this.goodsData.sku_info[key]
            }
          }
          this.data = this.goodsData.sku_info
          this.goodsData.spec_info.forEach((item, index) => {
            this.keys.push({
              name: item.spec_name,
              isActive: false,
              value: []
            })
            item.spec_values.forEach((item2, index2) => {
              this.keys[index].value.push({
                id: item2.spec_value_id,
                cname: item2.spec_value,
                isActiveC: false,
                notClick: false
              })
            })
          })
          this.queryDGoodsById()
          // 默认选中第一个
          let datas = Object.keys(this.data)
          console.log('this.data', this.data, Object.keys(this.data)[0], this.keys)
          if (datas[0]) {
            let arr = datas[0].split(',')
            if (datas.length === 1) {
              this.keys.forEach((item, index) => {
                item.value.forEach((item2, index2) => {
                  arr.some((item3, index3) => {
                    if (item3 === item2.id) {
                      console.log('item3 == item2.id', index, index2)
                      this.tabInfoChange(index, index2)
                      return true
                    }
                  })
                })
              })
              this.form.goods[0].gid = this.gid
              this.form.goods[0].sku_id = this.data[datas[0]].id
              this.nowPrice = this.data[datas[0]].price
              this.nowOlPrice = this.data[datas[0]].ol_price
              this.nowUdPrice = this.data[datas[0]].ud_price
            } else {
              this.keys.forEach((item, index) => {
                item.value.forEach((item2, index2) => {
                  if (arr[0] === item2.id) {
                    this.tabInfoChange(0, index2)
                  }
                })
              })
            }
            console.log('arr', arr, this.data[datas[0]])
          }

          if (this.$route.params.other && this.$route.params.other !== 'payfail') {
            setTimeout(() => {
              this.scrollform(1)
            }, 500)
          }
        } else {
          // errorReport('detailError')
        }
      })
    },
    // 判断用户之前是否填写地址
    initUserInfo () {
      let data = {
        // sessionId: this.sessionId,
        openid: this.openId
      }
      requestApi({
        name: 'lastShipInfo',
        data
      }).then((res) => {
        if (res.code === 1) {
          let address = res.data
          this.form.receiver_name = address.receiver_name
          this.form.receiver_phone = address.receiver_phone
          this.province.forEach(ele => {
            if (ele.province === address.receiver_province) {
              this.cityArr = ele.city
              ele.city.forEach((e, i) => {
                if (e.city === address.receiver_city) {
                  this.districtArr = e.district
                }
              })
            }
          })
          this.form.receiver_province = address.receiver_province
          this.form.receiver_city = address.receiver_city
          this.form.receiver_region = address.receiver_region
          this.form.receiver_addr = address.receiver_addr
          console.log('last_ship_info', res)

          //  从小程序返回h5判断获取地址状态
          console.log('params', this.$route.params, this.$route.params.other === 'getAddressfail')
          if (this.$route.params.other && this.$route.params.other !== 'payfail') {
            console.log('params', this.$route.params.other)
            if (this.$route.params.other === 'getAddressfail') {
              Toast.fail('获取地址失败')
            } else {
              console.log('JSON.parse(this.$route.params.other)', JSON.parse(this.$route.params.other))
              this.writeAddr(JSON.parse(this.$route.params.other))
            }
          }
        } else {
          // errorReport('getUserInfoError')
        }
      })
    },
    // 滚动判断底部是否隐藏
    // handleScroll () {
    //   let clientHeight = document.documentElement.clientHeight || document.body.clientHeight
    //   if (!document.getElementById('data-fixed')) {
    //     return
    //   }
    //   // this.putData(90074, 1)
    //   let offsetTop = document.getElementById('data-fixed').getBoundingClientRect().top
    //   if (clientHeight > offsetTop) {
    //     this.searchBarFixed = false
    //   } else {
    //     this.searchBarFixed = true
    //   }
    // },

    scrollform (type) {
      // this.putData(90074, type)
      this.$refs.orderFrameBottom.scrollform()
    },
    // 选择数量--
    handleDel () {
      // this.putData(90074, 6)
      if (this.form.goods[0].amount === 1) {
        this.form.goods[0].amount = 1
      } else {
        this.form.goods[0].amount--
      }
      // const { order_num, goods_price } = this.form
      // this.form.goods_total = order_num * goods_price
    },
    // 选择数量++
    handleAdd () {
      // this.putData(90074, 6)
      this.form.goods[0].amount++
      // const { order_num, goods_price } = this.form
      // this.form.goods_total = order_num * goods_price
    },
    // 选择省 市 区
    handleProvince (e) {
      // this.putData(90074, 9)
      this.province.forEach(ele => {
        if (ele.province === e.target.value) {
          this.cityArr = ele.city
          this.districtArr = []
        }
      })
      if (this.form.receiver_city) {
        this.form.receiver_city = this.cityArr[0].city
      }

      let self = this
      this.handleCity({ target: { value: self.form.receiver_city } })
    },
    handleCity (e) {
      this.cityArr.forEach(ele => {
        if (ele.city === e.target.value) {
          this.districtArr = ele.district
        }
      })
      if (this.form.receiver_region) {
        this.form.receiver_region = this.districtArr[0]
      }
    },
    handleDistrict (e) {
      this.form.receiver_region = e.target.value
    },
    // 改变订单类型
    changeOpayType (type) {
      this.o_pay_type = type
    },
    // 提交订单
    async handleSubmit () {
      // eslint-disable-next-line camelcase
      const { goods, receiver_name, receiver_phone, receiver_province, receiver_city, receiver_region, receiver_addr, comments } = this.form
      const { nameFlag, phoneFlag } = this
      if (this.addrSame) {
        // this.putData(90074, 4, '', 2001)
      }
      if (this.haveChangedId.length < this.goodsData.spec_info.length) {
        // this.putData(90074, 4, '', 1001)
        this.$toast('请先选完商品属性')
        return
      }
      if (nameFlag) {
        // this.putData(90074, 4, '', 1002)
        return this.$toast('请输入中文名字')
      }
      if (phoneFlag) {
        // this.putData(90074, 4, '', 1003)
        return this.$toast('请输入正确的手机号')
      }
      // eslint-disable-next-line camelcase
      if (!receiver_name) {
        // this.putData(90074, 4, '', 1002)
        return this.$toast('请输入中文名字')
      }
      // eslint-disable-next-line camelcase
      if (!receiver_phone) {
        // this.putData(90074, 4, '', 1003)
        return this.$toast('请输入正确的手机号')
      }
      // eslint-disable-next-line camelcase
      if (!receiver_province) {
        // this.putData(90074, 4, '', 1004)
        return this.$toast('请选择省份')
      }
      // eslint-disable-next-line camelcase
      if (!receiver_city) {
        // this.putData(90074, 4, '', 1004)
        return this.$toast('请选择市区')
      }
      // eslint-disable-next-line camelcase
      if (!receiver_region) {
        // this.putData(90074, 4, '', 1004)
        return this.$toast('请选择地区')
      }
      // eslint-disable-next-line camelcase
      if (!receiver_addr) {
        // this.putData(90074, 4, '', 1005)
        return this.$toast('请填写详细地址')
      }
      // console.log(this.isEmojiCharacter(receiver_addr),receiver_addr,'表情检测')
      // eslint-disable-next-line camelcase
      if (receiver_addr && this.isEmojiCharacter(receiver_addr)) {
        return this.$toast('详细地址含有非法字符，请重新输入！')
      }
      if (comments && this.isEmojiCharacter(comments)) {
        return this.$toast('备注含有非法字符，请重新输入！')
      }
      // eslint-disable-next-line camelcase
      if (receiver_name && this.isEmojiCharacter(receiver_name)) {
        return this.$toast('姓名含有非法字符，请重新输入！')
      }
      let data = {
        goods: goods,
        receiver_name: receiver_name,
        receiver_phone: receiver_phone,
        receiver_province: receiver_province,
        receiver_city: receiver_city,
        receiver_region: receiver_region,
        receiver_addr: receiver_addr,
        comments: comments,
        key: this.key,
        page_type: window.__wxjs_environment === 'miniprogram' ? 'mini' : 'web',
        pay_type: this.pay_type === 3 ? this.o_pay_type : this.pay_type,
        // sessionId: this.sessionId
        openid: this.openId
      }
      console.log('order', data)
      let isOrder = await this.userOrderDay()
      // console.log('isOrder',isOrder)
      if (!isOrder) {
        return
      }
      requestApi({
        name: 'newCreate',
        data
      }).then(async res => {
        // console.log('create',res)
        if (res.code === 1) {
          //  判断是否是测试订单
          if (data.receiver_name.includes('测试') || data.comments.includes('测试')) {
            // this.putData(90074, 4, '', 0, 1)
          } else {
            // this.putData(90074, 4, '', 0, 0)
          }

          this.oid = res.data.oid
          if (res.data.need_pay) {
            if (window.__wxjs_environment === 'miniprogram') {
              console.log('跳转小程序')
              // eslint-disable-next-line no-undef
              wx.miniProgram.navigateTo({ url: `/pages/webPay/webPay?o_number=${res.data.o_number}&time_stamp=${res.data.time_stamp}&order_sign=${res.data.order_sign}&gid=${this.gid}&key=${this.key}&env=${process.env.BASE_ENV}` })
            } else {
              this.onBridgeReady(res.data.pay_config)
            }
          } else {
            this.$router.push(`/order?oid=${res.data.oid}&gid=${this.gid}`)
          }
        } else if (res.code === 40004 || res.code === 40009) {
          // this.putData(90074, 4, '', 1006)
          // errorReport('putOrderError')
          console.log('授权过期')
          // let msg = await this.checkLogin()
          // console.log('msg', msg)
        } else if (res.code === 40104) {
          // errorReport('putOrderError')
          this.keys = []
          this.data = {}
          this.initGoods()
          Toast.fail('支付方式改变，请重新提交订单')
        } else {
          // errorReport('putOrderError')
        }
      })
    },
    //  常见帮助
    handleHelp () {
      console.log('132132')
      this.helpShow = true
    },
    closeHelp () {
      this.helpShow = false
    },

    //  用户今日是否下单
    userOrderDay () {
      return new Promise((resolve, reject) => {
        requestApi({
          name: 'orderTime',
          data: {
            gid: this.gid,
            openid: this.openId
            // sessionId: this.sessionId
          }
        }).then(async res => {
          // console.log('order_time',res)
          if (res.code === 1) {
            if (res.data.status) {
              Dialog.confirm({
                title: '提示',
                message: '您已提交订单，是否再次购买',
                showCancelButton: true,
                confirmButtonText: '再次购买',
                cancelButtonText: '不了'
              }).then(() => {
                resolve(true)
              }).catch(() => {
                resolve(false)
              })
            } else {
              resolve(true)
            }
          } else if (res.code === 40004 || res.code === 40009) {
            // let msg = await this.checkLogin()
            // console.log('msg', msg)
          }
        })
      })
    },
    //  h5支付
    onBridgeReady (data) {
      console.log('onBridgeReady', data)
      // eslint-disable-next-line no-undef
      WeixinJSBridge.invoke(
        'getBrandWCPayRequest', {
          appId: data.appId,
          timeStamp: data.timeStamp, // 时间戳，自1970年以来的秒数
          nonceStr: data.nonceStr, // 随机串
          package: data.package,
          signType: data.signType, // 微信签名方式：
          paySign: data.paySign // 微信签名
        },
        (result) => {
          console.log('微信返回参数', result)
          if (result.err_msg === 'get_brand_wcpay_request:ok') {
            Toast.success('支付成功')
            this.$router.push(`/order?oid=${this.oid}&gid=${this.gid}`)
          } else {
            // eslint-disable-next-line no-undef
            WeixinJSBridge('getPayError')
            Toast.fail('支付失败')
          }
        })
    },
    //  使用微信地址
    async userWxAddr () {
      // eslint-disable-next-line no-unused-vars
      // eslint-disable-next-line camelcase
      // let { goods, receiver_name, receiver_phone, receiver_province, receiver_city, receiver_region, receiver_addr, comments } = this.form
      let addr = {}
      // this.putData(90074, 14)
      console.log(1111)
      if (window.__wxjs_environment === 'miniprogram') {
        console.log('跳转小程序')
        // eslint-disable-next-line no-undef
        wx.miniProgram.navigateTo({ url: `/pages/webPay/webPay?getAddress=${true}&gid=${this.gid}&key=${this.key}&env=${process.env.BASE_ENV}` })
      } else {
        addr = await wxconfig({}, true)
        console.log('userWxAddr', addr)
        if (addr.errMsg === 'openAddress:cancel') {
          return
        }
      }
      if (!addr.userName) {
        return
      }
      this.writeAddr(addr)
    },
    //  填入地址
    writeAddr (addr) {
      console.log('addr', addr)
      if (addr.countyName) {
        addr.countryName = addr.countyName
      }
      // eslint-disable-next-line no-unused-vars
      // eslint-disable-next-line camelcase
      let { receiver_name, receiver_phone, receiver_province, receiver_city, receiver_region, receiver_addr } = this.form
      switch (addr.cityName) {
        case '北京市':
          addr.cityName = '北京城区'
          break
        case '天津市':
          addr.cityName = '天津城区'
          break
        case '上海市':
          addr.cityName = '上海城区'
          break
        case '重庆市':
          addr.cityName = '市辖区'
          break
        case '香港特别行政区':
          addr.cityName = '香港城区'
          break
        case '澳门特别行政区':
          addr.cityName = '澳门城区'
          break
        default:
          break
      }
      // eslint-disable-next-line camelcase
      if (addr.userName === receiver_name && addr.telNumber === receiver_phone && addr.provinceName === receiver_province && addr.cityName === receiver_city && addr.countryName === receiver_region && addr.detailInfo === receiver_addr) {
        this.addrSame = true
      } else {
        this.addrSame = false
      }
      this.form.receiver_name = addr.userName
      this.form.receiver_phone = addr.telNumber
      this.province.forEach(ele => {
        if (ele.province === addr.provinceName) {
          this.cityArr = ele.city
          ele.city.forEach((e, i) => {
            if (e.city === addr.cityName) {
              this.districtArr = e.district
            }
          })
        }
      })
      this.form.receiver_province = addr.provinceName
      this.form.receiver_city = addr.cityName
      this.form.receiver_region = addr.countryName
      this.form.receiver_addr = addr.detailInfo
      console.log('writeAddr', this.addrSame, this.form.receiver_name, this.form)
    },
    watchName (e) {
      // this.putData(90074, 7)
      if (/^[\u4e00-\u9fa5]+$/i.test(e.target.value)) {
        this.nameFlag = false
      } else {
        this.nameFlag = true
      }
    },
    watchPhone (e) {
      // this.putData(90074, 8)
      let myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
      if (myreg.test(e.target.value)) {
        this.phoneFlag = false
      } else {
        this.phoneFlag = true
      }
    },
    // emoji表情判断
    isEmojiCharacter (substring) {
      // eslint-disable-next-line no-useless-escape
      var regStr = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig
      if (substring && regStr.test(substring)) {
        return true
      }
    },
    //  视频播放
    videoPlay () {
      this.swiperTime = 300000
    },
    //  视频暂停
    videoPause () {
      this.swiperTime = 3000
    },
    // 改变tab
    changeTab (type) {
      this.tabIndex = type
    }
  }
}
</script>

<style lang='less' scoped>
@import '../common/css/common.less';
.login-bg {
  background: #fff;
  width: 100%;
  height: 1000px;
  z-index: 99999;
  .login-img {
    display: block;
    width: 70%;
    margin: 50px auto;
  }
  .login-title {
    font-size: 30px;
    color: #ccc;
    font-weight: bold;
    text-align: center;
  }
}
.preview-phone {
  position: relative;
  // 图片
  .pic-module {
    width: 100%;
    vertical-align: top
  }

  //  导航栏
  .tab {
    padding: 0.1rem 0.2rem;
    width: 100%;
    font-size: .2rem;
    display: flex;
    justify-content: center;
    span {
      display: inline-block;
      padding: .1rem .2rem;
    }
    .active {
      color:#CF2A4F;
      border-bottom: 0.02rem solid #CF2A4F;
    }
  }

  .price-buy-wrapper {
    margin: .05rem;
    border-radius: .06rem;
    font-size: .18rem;
    overflow: hidden;
    background: #ff2405;
    .index-buying {
      display: block;
      text-align: center;
      color: rgb(255, 255, 0);
      width: 100%;
      touch-action: pan-y;
      user-select: none;
      -webkit-user-drag: none;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      .wrap-buy {
        font-size: 18px;
        font-weight: bold;
        color:#fff;
        height: 40px;
        line-height: 40px;
      }
      .zan-img {
        width: 25px;
        height: 30px;
        vertical-align: middle;
      }
    }
  }

  .advert {
    width: 100%;
    height: 2.2rem;
    text-align: center;
    background-color: red;
    h1 {
      color: yellow;
    }
    h2 {
      color: yellow;
      margin-top: .1rem;
    }
    p {
      font-size: 0.15rem;
      color: #fff;
      font-weight: 700;
      margin-top: 0.05rem;
    }
  }

  .ql-editor {
    cursor: text;
    line-height: 1.42;
    width: 100%;
    height: auto;
    overflow-y: auto;
    padding: .12rem .15rem;
    -o-tab-size: 4;
    tab-size: 4;
    -moz-tab-size: 4;
    text-align: left;
    word-wrap: break-word;
    .ql-editor-font {
      font-size: .2rem;
    }
    .ql-bg-black {
      background-color: #000;
    }
    .ql-bg-red {
      background-color: #e60000;
    }
    .ql-bg-orange {
      background-color: #f90;
    }
    .ql-bg-yellow {
      background-color: #ff0;
    }
    .ql-bg-green {
      background-color: #008a00;
    }
    .ql-bg-blue {
      background-color: #06c;
    }
    .ql-bg-purple {
      background-color: #93f;
    }
    .ql-color-white {
      color: #fff;
    }
    .ql-color-red {
      color: #e60000
    }
    .ql-color-orange {
      color: #f90
    }
    .ql-color-yellow {
      color: #ff0
    }
    .ql-color-green {
      color: #008a00
    }
    .ql-color-blue {
      color: #06c
    }
    .ql-color-purple {
      color: #93f
    }
  }

}

.preview-phone .prop-list {
    float: left;
    margin-left: .1rem;
}

.preview-phone .item-group {
    padding-bottom: .05rem;
    border-bottom: .01rem solid #edeef5;
    .activity {
      font-size: .2rem;
      color: red;
    }
}

.preview-phone .title {
    font-size: .16rem;
    font-weight: 700;
    color: #333;
    display: inline-block;
    width: 100%;
    margin: .1rem 0
}

.preview-phone .sub-title {
    font-size: .14rem;
    color: #333;
    display: block;
    margin: .1rem 0
}

//  富文本框样式
.preview-phone {
  .ql-editor{
    padding: 0;
    /deep/ p{
      img{
        width: 100%;
        display: block;
      }
    }
  }
}

</style>
