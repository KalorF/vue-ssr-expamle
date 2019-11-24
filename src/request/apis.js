// import { baseConfig } from '../config/baseConfig'

export default {
  //  数据上报
  // dataReport: {
  //   url: baseConfig.prefixReportUrl,
  //   method: 'post',
  //   model: 'normal'
  // },
  //  后端数据上报
  putData: {
    url: '/h5_api/user/data_post',
    method: 'post'
  },
  //  获取静默授权code
  getCode: {
    url: '/h5_api/user/auth_url',
    method: 'post',
    model: 'wait'
  },
  // 获取openid
  getOpenId: {
    url: '/h5_api/user/get_session',
    method: 'post',
    model: 'wait'
  },
  //  获取登录信息
  getLoginMsg: {
    url: '/h5_api/user/check_login',
    method: 'post'
  },
  // 获取微信JSSDK配置信息
  getJSSDKConfig: {
    url: 'https://ecommerceweb.heywoodsminiprogram.com/h5_api/user/share_config',
    method: 'post'
  },
  //  获取商品详情
  newInfo: {
    url: '/api/goods/new_info',
    method: 'post'
  },
  //  获取最后一次收获地址
  lastShipInfo: {
    url: '/h5_api/user/last_ship_info',
    method: 'post'
  },
  //  创建订单
  newCreate: {
    url: '/h5_api/order/new_create',
    method: 'post'
  },
  //  判断是否重复下单
  orderTime: {
    url: '/h5_api/order/order_time',
    method: 'post'
  },
  //  订单列表
  OrderList: {
    url: '/h5_api/order/list',
    method: 'post'
  },
  //  推荐列表
  recommList: {
    url: '/api/goods/recomm_list',
    method: 'post'
  },
  //  获取购买人列表
  getPurInfo: {
    url: '/api/goods/goods_buy_log',
    method: 'post'
  },
  //  获取手机号码
  staff: {
    url: '/h5_api/user/staff',
    method: 'post'
  },
  test: 'test'
}
