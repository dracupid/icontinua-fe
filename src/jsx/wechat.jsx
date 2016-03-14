import util from './util.jsx'

let ready = false
let cache = null

let {protocol, hostname, pathname} = location

util.fetchAPI('/api/wechat/config?url=' + protocol + '/' + hostname + pathname
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
        }, data.data));

        wx.ready(() => {
          ready = true;
          cache && setReport(cache)
          cache = null;
        });
      }
    ));

export function setReport (reportId) {
  if (!ready) {
    cache = reportId;
    return;
  }
  return wx.onMenuShareAppMessage({
    title: '我的体检报告',
    desc: '查看我的体检报告',
    link: `http://${hostname}/reports#/share/${reportId}`,
    imgUrl: 'http://img3.douban.com/view/movie_poster_cover/spst/public/p2166127561.jpg'
  });
}
