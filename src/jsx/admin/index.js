/**
 * 管理平台路由
 */
import Channel from './Channel'
import Device from './Device'
import DeviceStat from './DeviceStat'
import ChannelStat from './ChannelStat'
import ChannelCreate from './ChannelCreate'
import Rank201612 from './rank/201612'
import Rank201612List from './rank/201612_list'
import Footer from '../Components/Footer'
import Header from './Header'
import Menu from './LeftMenu'
let {Route, HashRouter} = ReactRouter

ReactDOM.render((
  <div>
    <Header />
    <div className='container'>
      <Menu />
      <HashRouter>
        <div>
          <Route exact path='/' />
          <Route exact path='/channel' component={Channel} />
          <Route path='/device/stat' component={Device} />
          <Route path='/device/s/:id' component={DeviceStat} />
          <Route path='/channel/s/:name' component={ChannelStat} />
          <Route path='/channel/create' component={ChannelCreate} />
          <Route exact path='/rank/201612' component={Rank201612} />
          <Route path='/rank/201612/list' component={Rank201612List} />
        </div>
      </HashRouter>
    </div>
    <Footer.InlineFooter />
  </div>
), document.getElementById('main'))
