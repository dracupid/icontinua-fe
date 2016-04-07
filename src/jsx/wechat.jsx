import API from './API/index.jsx'
let {message} = ANTD
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
  link: 'http://icontinua.com/html/intro.html',
  imgUrl: 'http://icontinua.com/img/logo.png'
}

if (isWeixin) {
  API('/wechat/config?url=' + encodeURIComponent(href.split('#')[0])).then((data) => {
    wx.config(_.assign({
      debug: false,
      jsApiList: [
        'checkJsApi',
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareWeibo',
        'onMenuShareQZone',
        'chooseImage',
        'uploadImage'
      ]
    }, data))

    wx.ready(() => {
      ready = true
      setReport(cache)
      cache = null
    })

    wx.error((e) => {
      console.error(e)
    })
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

export function takePhoto () {
  if (!isWeixin) {
    message.error('请在微信中打开网页进行拍照')
  }
  return new Promise((resolve, reject) => {
    wx.chooseImage({
      count: 1,
      success (res) {
        return resolve(res.localIds[0])
      },
      fail (res) {
        return reject(res)
      }
    })
  })
}

export function uploadPhoto (id) {
  return new Promise((resolve, reject) => {
    wx.uploadImage({
      localId: id, // 需要上传的图片的本地ID，由chooseImage接口获得
      isShowProgressTips: 1, // 默认为1，显示进度提示
      success (res) {
        return resolve(res.serverId) // 返回图片的服务器端ID
      },
      fail (res) {
        return reject(res)
      }
    })
  })
}
