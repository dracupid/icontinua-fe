/**
 * 报告页面路由
 */
import report from './report'
import reports from './reports'
import '../wechat'
let {Route, HashRouter} = ReactRouter

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
  <HashRouter>
    <div>
      <div>
        <Route exact path='/' component={reports} />
        <Route exact path='/:reportId' component={report} />
        <Route path='/s/:sid' component={report} />
        <Route path='/share/:reportId' component={report} />
      </div>
    </div>
  </HashRouter>
), document.getElementById('main'))
