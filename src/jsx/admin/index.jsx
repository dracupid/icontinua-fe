/**
 * 管理平台路由
 */
import Channel from './Channel.jsx'
import Device from './Device.jsx'
import DeviceStat from './DeviceStat.jsx'
import ChannelStat from './ChannelStat.jsx'
import ChannelCreate from './ChannelCreate.jsx'
import Rank201612 from './rank/201612.jsx'
import Rank201612List from './rank/201612_list.jsx'
import Footer from '../Components/Footer.jsx'
import Header from './Header.jsx'
import Menu from './LeftMenu.jsx'
let {Route, Router, hashHistory} = ReactRouter

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
        <Route path='/rank/201612' component={Rank201612} />
        <Route path='/rank/201612/list' component={Rank201612List} />
      </Router>
    </div>
    <Footer.InlineFooter />
  </div>
), document.getElementById('main'))
