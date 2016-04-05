let {notification} = ANTD

notification.config({
  top: 60
})

let IosNotification = {
  message: '抱歉，商店暂不支持ios应用直接下载，请到AppStore搜索应用',
  key: 'ios'
}

let weixinNotification = {
  message: '请点击右上角，选择『在浏览器中打开』下载应用',
  key: 'weixin'
}

let env = (function (ua) {
  let env = {}

  if (ua.match(/(Android);?[\s\/]+([\d.]+)?/)) (env.android = true)
  if (ua.match(/(iPad).*OS\s([\d_]+)/) || ua.match(/(iPhone\sOS)\s([\d_]+)/)) (env.ios = true)

  if (/MicroMessenger/i.test(ua)) env.weixin = true
  if (!(env.ios || env.android)) env.android = true

  return env
})(navigator.userAgent)

export default {
  toApkUrlFun (url) {
    return function () {
      switch (true) {
        case env.ios:
          notification.error(IosNotification)
          break
        case env.weixin:
          notification.error(weixinNotification)
          break
        default:
          location.href = url
      }
    }
  },
  formatDownload (num) {
    if (num > 100000) {
      return _.round(num / 10000) + '万'
    } else if (num > 9500) {
      return _.round(num / 10000, 1) + '万'
    } else if (num > 1000) {
      return _.round(num / 1000) + '千'
    } else {
      return num
    }
  }
}
