import util from './util.jsx'

let ready = false
let cache = null

let {protocol, hostname, pathname} = window.location
let pageUrl = protocol + '/' + hostname + pathname

let isWeixin = !/MicroMessenger/i.test(navigator.userAgent)

let shareData = {
  title: '我的体检报告@爱康体',
  desc: '查看我的"爱康体"体检报告',
  imgUrl: 'http://icontinua.com/img/logo.png'
}

if (!isWeixin) {
  util.fetchAPI('/api/wechat/config?url=' + pageUrl)
    .then((data) => {
      wx.config(_.assign({
        debug: true,
        jsApiList: [
          'checkJsApi',
          'onMenuShareTimeline',
          'onMenuShareAppMessage',
          'onMenuShareQQ',
          'onMenuShareWeibo'
        ]
      }, data.data))

      wx.ready(() => {
        ready = true
        cache && setReport(cache)
        cache = null
      })

      wx.error((e) => {
        console.error(e)
      })
    }).catch((e) => {
      console.error(e)
    })
}

export function setReport (reportId) {
  if (!isWeixin) {
    return
  }

  if (!ready) {
    cache = reportId
    return
  }

  shareData.link = `${pageUrl}#/share/${reportId}`

  wx.onMenuShareTimeline(shareData)
  wx.onMenuShareAppMessage(shareData)
  wx.onMenuShareQQ(shareData)
  wx.onMenuShareWeibo(shareData)
  wx.onMenuShareQZone(shareData)
}
