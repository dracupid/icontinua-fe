import report from './report.jsx'
import reports from './reports.jsx'
import './wechat.coffee'

let { Router, Route } = ReactRouter

window._reportData = {}
window._reportListData = null
window._chineseReportData = {}
window._advice = null

;(function () {
  let cacheImg = function (url) {
    let img = new window.Image()
    img.src = url
  }
  cacheImg('/img/record.png')
  cacheImg('/img/trade.png')
  cacheImg('/img/trade-a.png')
  cacheImg('/img/body.png')
  cacheImg('/img/wave.png')
})()

ReactDOM.render((
  <Router>
    <Route path='/' component={reports}/>
    <Route path='/:openId' component={reports}/>
    <Route path='/share/:reportId' component={report}/>
    <Route path='/:openId/:reportId' component={report}/>
  </Router>
  ), document.getElementById('main'))
