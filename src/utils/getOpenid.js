import { requestApi } from '../request/request'
import { getQueryVariable } from './util'
// import errorReport from '@/sdk/monitors'

function getCode () {
  let data = {
    redirect_url: window.location.href
  }
  return new Promise((resolve, reject) => {
    requestApi({ name: 'getCode', data }).then((res) => {
      if (res.code === 1) {
        // 关闭页面
        window.location = res.data.url
        resolve(true)
      } else {
        // errorReport('userLoginError')
        resolve(false)
      }
    })
  })
}
const getOpenId = function () {
  return new Promise(async (resolve, reject) => {
    let code = getQueryVariable('code')
    let urlParams = window.location.href.split('#')[1].split('/')
    if (!code) {
      await getCode()
    } else {
      requestApi({
        name: 'getOpenId',
        data: {
          code,
          gid: urlParams[2] || '',
          key: urlParams[3] || '',
          page_type: 'single'
        } }).then(async (res) => {
        console.log('getOpenId', res)
        if (res.code === 1) {
          localStorage.setItem('newSystemOpenId', res.data.openid)
          resolve(res.data.openid)
        } else if (res.code === 40007 || res.code === 40004) {
          await getCode()
        } else {
          // errorReport('userLoginError')
          resolve(false)
        }
      })
    }
  })
}

export default getOpenId
