/**
 * 应用商城路由
 */
let {Route, Router, hashHistory} = ReactRouter
import DeviceReport from './device.jsx'
import Footer from '../Components/Footer.jsx'

ReactDOM.render((
  <div>
    <Router history={hashHistory}>
      <Route path='/' component={DeviceReport} />
      <Route path='/:channel' component={DeviceReport} />
      <Route path='/device/:deviceId' component={DeviceReport} />
    </Router>
    <Footer.InlineFooter />
  </div>
), document.getElementById('main'))
