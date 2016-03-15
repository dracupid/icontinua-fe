import util from './util.jsx'

let ready = false
let cache = null

let {hostname, pathname, href} = window.location
let pageUrl = 'http://' + hostname + pathname

let isWeixin = /MicroMessenger/i.test(navigator.userAgent)

let shareData = {
  title: '我的体检报告 @爱康体',
  desc: '查看我的"爱康体"体检报告',
  imgUrl: 'http://icontinua.com/img/logo.png',
  link: 'http://icontinua.com'
}

let defaultShareData = {
  title: '快来体验爱康体吧',
  desc: '体验"爱康体"，读懂你自己',
  link: 'http://icontinua.com',
  imgUrl: 'http://icontinua.com/img/logo.png'
}

if (isWeixin) {
  util.fetchAPI('/wechat/config?url=' + encodeURIComponent(href.split('#')[0])).then((data) => {
    wx.config(_.assign({
      debug: false,
      jsApiList: [
        'checkJsApi',
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareWeibo',
        'onMenuShareQZone'
      ]
    }, data.data))

    wx.ready(() => {
      ready = true
      setReport(cache)
      cache = null
    })

    wx.error((e) => {
      console.error(e)
    })
  }).catch((e) => {
    console.error(e)
  })
}

function share (data) {
  let timeLineData = _.clone(data)
  timeLineData.title = data.desc

  wx.onMenuShareTimeline(timeLineData)
  wx.onMenuShareAppMessage(data)
  wx.onMenuShareQQ(data)
  wx.onMenuShareWeibo(data)
  wx.onMenuShareQZone(data)
}

export function setReport (reportId, user) {
  if (!isWeixin) {
    return
  }

  if (!ready) {
    cache = reportId
    return
  }

  let data
  if (!reportId) {
    data = defaultShareData
  } else {
    data = _.clone(shareData)
    data.link = `${pageUrl}#/share/${reportId}`
    if (user) {
      data.title = data.title.replace('我', user.nickname)
      data.desc = data.desc.replace('我', user.nickname)
    }
  }
  share(data)
}
