/**
 * 管理平台路由
 */
let {Route, Router, hashHistory} = ReactRouter
import Channel from './Channel.jsx'
import Device from './Device.jsx'
import DeviceStat from './DeviceStat.jsx'
import ChannelStat from './ChannelStat.jsx'
import ChannelCreate from './ChannelCreate.jsx'
import Footer from '../Components/Footer.jsx'
import Header from './Header.jsx'
import Menu from './LeftMenu.jsx'

ReactDOM.render((
  <div>
    <Header />
    <div className='container'>
      <Menu />
      <Router history={hashHistory}>
        <Route path='/' />
        <Route path='/channel' component={Channel} />
        <Route path='/device/stat' component={Device} />
        <Route path='/device/s/:id' component={DeviceStat} />
        <Route path='/channel/s/:name' component={ChannelStat} />
        <Route path='/channel/create' component={ChannelCreate} />
      </Router>
    </div>
    <Footer.InlineFooter />
  </div>
), document.getElementById('main'))
