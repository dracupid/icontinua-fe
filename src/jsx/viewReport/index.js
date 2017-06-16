/**
 * 应用商城路由
 */
import DeviceReport from './device'
import Footer from '../Components/Footer'
let {Route, HashRouter} = ReactRouter

ReactDOM.render((
  <div>
    <HashRouter>
      <div>
        <Route exact path='/' component={DeviceReport} />
        <Route exact path='/:channel' component={DeviceReport} />
        <Route path='/device/:deviceId' component={DeviceReport} />
      </div>
    </HashRouter>
    <Footer.InlineFooter />
  </div>
), document.getElementById('main'))
