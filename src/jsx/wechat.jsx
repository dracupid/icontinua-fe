//let ready = false;
//let cache = null;
//
//let hostname = location.hostname;
//
//function setReport (reportId) {
//  if (!ready) {
//    cache = reportId;
//    return;
//  }
//  return wx.onMenuShareAppMessage({
//    title: '我的体检报告',
//    desc: '查看我的体检报告',
//    link: `http://${hostname}/reports#/share/${reportId}`,
//    imgUrl: 'http://img3.douban.com/view/movie_poster_cover/spst/public/p2166127561.jpg'
//  });
//}
//
//$.getJSON('/api/data/wechat-config?url=' + encodeURIComponent(location.href.split('#')[0])
//    .then(function (data) {
//        wx.config(_.assign({
//          debug: true,
//          jsApiList: [
//            'checkJsApi',
//            'onMenuShareTimeline',
//            'onMenuShareAppMessage',
//            'onMenuShareQQ',
//            'onMenuShareWeibo'
//          ]
//        }, data.data));
//
//        wx.ready(function () {
//          ready = true;
//          if (cache) {
//            setReport(cache);
//          }
//          cache = null;
//        });
//      }
//    ));


module.exports = {
  setReport() {
    return {};
  }
};
