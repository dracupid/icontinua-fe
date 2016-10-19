/**
 * 报告页面路由
 */
import report from './report.jsx'
import reports from './reports.jsx'
import '../wechat.jsx'
let {Route, Router, hashHistory} = ReactRouter

/**
 * 图片预加载
 * @param url
 */
let cacheImg = function (url) {
  let img = new window.Image()
  img.src = url
}
cacheImg('//cdnst.icontinua.com/img/body.png')
cacheImg('//cdnst.icontinua.com/img/wave.png')

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path='/' component={reports} />
    <Route path='/:reportId' component={report} />
    <Route path='/s/:sid' component={report} />
    <Route path='/share/:reportId' component={report} />
  </Router>
), document.getElementById('main'))
