import report from './report.jsx'
import reports from './reports.jsx'
import '../wechat.jsx'
let {Route, Router, hashHistory} = ReactRouter

let cacheImg = function (url) {
  let img = new window.Image()
  img.src = url
}
cacheImg('/img/body.png')
cacheImg('/img/wave.png')

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path='/' component={reports}/>
    <Route path='/:userId' component={reports}/>
    <Route path='/share/:reportId' component={report}/>
    <Route path='/:userId/:reportId' component={report}/>
  </Router>
), document.getElementById('main'))
