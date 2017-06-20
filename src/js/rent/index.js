/**
 * 设备租赁页面路由
 */
import Footer from '../Components/Footer'
import RentDevicePage from './RentDevicePage'
import History from './History'
let {Route, HashRouter} = ReactRouter

ReactDOM.render((
  <div>
    <HashRouter>
      <div>
        <Route exact path='/' component={RentDevicePage}/>
        <Route exact path='/history' component={History}/>
      </div>
    </HashRouter>
    {/*<Footer />*/}
  </div>
), document.getElementById('main'))
