# ready = false
# cache = null

# setReport = (reportId) ->
#     if not ready
#         cache = reportId
#         return
#     wx.onMenuShareAppMessage
#         title: '我的体检报告',
#         desc: '查看我的体检报告',
#         link: 'http://112.80.52.187/reports#/share/' + reportId,
#         imgUrl: 'http://img3.douban.com/view/movie_poster_cover/spst/public/p2166127561.jpg',

# $.getJSON '/api/data/wechat-config?url=' + encodeURIComponent(location.href.split('#')[0])
# .then (data) ->
#     wx.config _.assign({
#         debug: true
#         jsApiList: [
#             'checkJsApi',
#             'onMenuShareTimeline',
#             'onMenuShareAppMessage',
#             'onMenuShareQQ',
#             'onMenuShareWeibo'
#         ]
#     }, data.data)
#     wx.ready ->
#         ready = true
#         setReport(cache) if cache
#         cache = null


 module.exports = {
     setReport: -> {}
 }
