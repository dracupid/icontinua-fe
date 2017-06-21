/**
 * 设备租赁页面路由
 */
// import Footer from '../Components/Footer'
import RentDevicePage from './RentDevicePage'
import History from './History'
import OrderDetail from './OrderDetail'
let {Route, HashRouter} = ReactRouter

ReactDOM.render((
  <div>
    <HashRouter>
      <div>
        <Route exact path='/' component={RentDevicePage} />
        <Route exact path='/history' component={History} />
        <Route exact path='/order/:id' component={OrderDetail} />
      </div>
    </HashRouter>
    {/* <Footer /> */}
  </div>
), document.getElementById('main'))
