import report from './report.jsx'
import reports from './reports.jsx'
import './wechat.jsx'

let { Router, Route } = ReactRouter

window._reportListData = null
window._reportData = {}
window._fullReportData = {}
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
    <Route path='/:userId' component={reports}/>
    <Route path='/share/:reportId' component={report}/>
    <Route path='/:userId/:reportId' component={report}/>
  </Router>
  ), document.getElementById('main'))
