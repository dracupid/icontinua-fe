let { notification } = ANTD

notification.config({
  top: 60
})

let env = (function (ua) {
  let env = {}

  var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/)
  var iPad = ua.match(/(iPad).*OS\s([\d_]+)/)
  var iPod = ua.match(/(iPod)(.*OS\s([\d_]+))?/)
  var iphone = !iPad && ua.match(/(iPhone\sOS)\s([\d_]+)/)
  var chrome = ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/)

  if (android) {
    env.android = true
    env.osVer = android[2]
  }
  if (iphone && !iPod) {
    env.ios = true
    env.osVer = iphone[2].replace(/_/g, '.')
  }
  if (iPad) {
    env.ios = true
    env.osVer = iPad[2].replace(/_/g, '.')
  }
  if (iPod) {
    env.ios = true
    env.osVer = iPod[3] ? iPod[3].replace(/_/g, '.') : null
  }
  if (chrome) {
    env.chrome = true
    env.browserVer = chrome[1]
  }
  if (/MicroMessenger/i.test(ua)) {
    env.weixin = true
  }

  if (!(env.ios || env.android)) {
    env.android = true
  }

  return env
})(navigator.userAgent)

export default {
  toUrl (url) {
    location.href = url
  },
  toApkUrl (url) {
    if (env.ios) {
      notification.error({
        message: '抱歉，商店暂不支持ios应用直接下载，请到AppStore搜索应用',
        key: 'ios'
      })
      return
    }
    if (env.weixin) {
      notification.error({
        message: '请点击右上角，选择『在浏览器中打开』下载应用',
        key: 'weixin'
      })
      return
    }
    location.href = url
  }
}
