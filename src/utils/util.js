/* eslint-disable no-useless-escape */
/* eslint-disable no-irregular-whitespace */
/* eslint-disable eqeqeq */

// const md5 = require('crypto-js/md5');

// 腾讯云&阿里云特殊域名和参数（transformQualityUrl方法用到）
const tencentDomainlist = [
  'goclick.heywoodsminiprogram.com',
  'yuetu.heywoodsminiprogram.com',
  'ad.heywoodsminiprogram.com'
  // 'dev.heka4.site'
]
const tencentHandleDomainlist = [
  'webpgoclick.heywoodsminiprogram.com',
  'webpyuetu.heywoodsminiprogram.com',
  'webpad.heywoodsminiprogram.com'
]
const aliyunDomainlist = [
  'sm.heywoodsminiprogram.com',
  'shopping-material.oss-cn-shenzhen.aliyuncs.com'
]
const aliyunparameter = [
  'x-oss-process=style/gojpg',
  'x-oss-process=style/tojpg'
]

/**
 * 将普通的url转化成Webp链接（内含机型判断）
 * (对外暴露的方法)
 * https://cloud.tencent.com/document/product/460/6929
 * https://help.aliyun.com/document_detail/44703.html?spm=a2c4g.11186623.6.1298.185a17f1UhfJ5n
 * @param {String} url
 * @return {String}
 */
// function transformWebpUrl(url) {
//   if (/x-oss-process=image\/format,webp/.test(url) || !url) {
//     // 已经转成了Webp链接 或者 url不存在
//     return url
//   }
//   if (/x-oss-process=image\//.test(url)) {
//     //可能对图片进行过处理
//     return url.replace(/(x-oss-process=image\/)/, "$1format,webp/")
//   }
//   var u = navigator.userAgent; var app = navigator.appVersion;
//   var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
//   // console.log('phoneInfo', phoneInfo)
//   if (isAndroid == 'Android') { //如果是安卓
//     //如果是安卓，转webp
//     const domain = url.split('/')[2] //原域名
//     const tencentIndex = tencentDomainlist.indexOf(domain)
//     const aliyunIndex = aliyunDomainlist.indexOf(domain)
//     const webpRxt = 'x-oss-process=image/format,webp' //阿里云转格式后缀
//     if (tencentIndex !== -1) {
//       //腾讯云列表含有此域名
//       const handleDomain = tencentHandleDomainlist[tencentIndex] //处理域名
//       // let webpRxt = 'imageView2/format/webp'; //转格式后缀
//       url = url.replace(domain, handleDomain) //域名处理后原链接
//       url += url.indexOf('?') !== -1 ? '&' + webpRxt : '?' + webpRxt
//     } else if (aliyunIndex !== -1) {
//       //阿里云列表含有此域名
//       if (url.indexOf('?') !== -1) {
//         let parameterIndex = -1
//         //若含有以上aliyunparameter的特殊参数，直接去除
//         for (const item in aliyunparameter) {
//           if (url.indexOf(aliyunparameter[item]) !== -1) {
//             parameterIndex = Number(item)
//             break
//           }
//         }
//         //域名处理后原链接
//         url = parameterIndex !== -1 ? url.replace(constant.aliyunparameter[parameterIndex], webpRxt) : url + '&' + webpRxt
//       } else {
//         url += '?' + webpRxt
//       }
//     }
//   }
//   // console.log('transformWebpUrl_url', url)
//   return url
// }

/**
 * 将普通的url进行质量压缩（内含机型判断,安卓机先转webp格式）
 * (对外暴露的方法)
 * https://cloud.tencent.com/document/product/460/6929
 * https://help.aliyun.com/document_detail/44703.html?spm=a2c4g.11186623.6.1298.185a17f1UhfJ5n
 * @param {String} url
 * @param {Number} sizeData (指定目标缩略图的最短边尺寸，如果传0，则表示不缩放，安卓机只转webp)
 * @return {String}
 */
function transformQualityUrl (url, sizeData) {
  if (!url) {
    return
  }
  if (url.indexOf('sign') !== -1) { // 已带鉴权的去掉
    let signIndex = url.indexOf('sign')
    url = url.slice(0, signIndex - 1)
  }
  if (sizeData == 0) {
    sizeData = '0'
  }
  if (!sizeData) {
    sizeData = '200'
  }
  sizeData = sizeData.toString()
  // eslint-disable-next-line no-unused-vars
  var u = navigator.userAgent; var app = navigator.appVersion
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 // g
  let webpRxt
  if (isAndroid && url.indexOf('gif') == -1) { // 如果是安卓并且不是gif
    webpRxt = 'x-oss-process=image/format,webp' // 转格式
    if (sizeData !== '0') {
      webpRxt += '/resize,s_' + sizeData // 缩放
    }
  } else { // 安卓或者gif除外
    if (sizeData !== '0') {
      webpRxt = 'x-oss-process=image/resize,s_' + sizeData // 缩放
    } else {
      return url
    }
  }
  url = delWebpRxt(url)
  let domain = url.split('/')[2] // 原域名
  let tencentIndex = tencentDomainlist.indexOf(domain)
  let aliyunIndex = aliyunDomainlist.indexOf(domain)
  if (tencentIndex !== -1) { // 腾讯云列表含有此域名
    let handleDomain = tencentHandleDomainlist[tencentIndex] // 处理域名
    url = url.replace(domain, handleDomain) // 域名处理后原链接
    url += url.indexOf('?') !== -1 ? '&' + webpRxt : '?' + webpRxt
  } else if (aliyunIndex !== -1) { // 阿里云列表含有此域名
    if (url.indexOf('?') !== -1) {
      let parameterIndex = -1
      // 若含有以上aliyunparameter的特殊参数，直接去除
      for (let item in aliyunparameter) {
        if (url.indexOf(aliyunparameter[item]) !== -1) {
          parameterIndex = Number(item)
          break
        }
      }
      // 域名处理后原链接
      url = parameterIndex !== -1 ? url.replace(aliyunparameter[parameterIndex], webpRxt) : url + '&' + webpRxt
    } else {
      url += '?' + webpRxt
    }
  }
  return url
}

/**
 * 将普通的url去除webp后缀
 * (对外暴露的方法)
 * @param {String} url
 * @return {String}
 */
function delWebpRxt (url) {
  // 阿里云转格式后缀
  let webpRxt = '?x-oss-process=image/format,webp'
  let webpRxt2 = '&x-oss-process=image/format,webp'
  if (url.indexOf(webpRxt) !== -1) {
    url = url.replace(webpRxt, '?')
  } else if (url.indexOf(webpRxt2) !== -1) {
    url = url.replace(webpRxt2, '')
  }
  return url
}

function isToday (date) { // 判断时间是否是当天
  return new Date().toDateString() === new Date(date).toDateString()
}

//  计算距离某天的时间
function someDateTime (time) {
  let endTime = new Date(time).getTime()
  let nowTime = new Date().getTime()
  let diff = endTime - nowTime
  var hours = parseInt(diff / (1000 * 60 * 60))
  var minutes = parseInt((diff % (1000 * 60 * 60)) / (1000 * 60))
  var seconds = parseInt((diff % (1000 * 60)) / 1000)
  hours = hours / 10 > 1 ? hours : '0' + hours
  minutes = minutes / 10 > 1 ? minutes : '0' + minutes
  seconds = seconds / 10 > 1 ? seconds : '0' + seconds
  return `${hours}小时${minutes}分${seconds}秒`
}

function isObject (obj) {
  // 区分数组和对象的情况
  return Object.prototype.toString.call(obj) === '[object Object]'
}

//  获取url参数
function getQueryVariable (variable) {
  var query = window.location.search.substring(1)
  var vars = query.split('&')
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=')
    if (pair[0] === variable) {
      return pair[1]
    }
  }
  return false
}

//  富文本图片懒加载
function letslazyload (dom) {
  let regexp1 = new RegExp(/(\<img )([^>]*)(src=")([^"]*")([^>]*)(\>)/, 'g')
  dom = dom.replace(regexp1, function (match, p1, p2, p3, p4, p5, p6) {
    return p1 + p2 + 'data-src="' + p4 + p5 + p6
  })
  return dom
}

export {
  someDateTime,
  transformQualityUrl,
  isToday,
  getQueryVariable,
  isObject,
  letslazyload
}
