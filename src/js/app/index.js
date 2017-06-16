/**
 * 应用商城路由
 */
import main from './main'
import AppDetail from './AppDetail'
import Search from './Components/SearchResult'
import Footer from '../Components/Footer'
let {Route, HashRouter} = ReactRouter

ReactDOM.render((
  <div>
    <HashRouter>
      <div>
        <Route exact path='/' component={main} />
        <Route path='/tag/:tag' component={main} />
        <Route path='/s/:keyword' component={Search} />
        <Route path='/item/:uid' component={AppDetail} />
      </div>
    </HashRouter>
    <Footer />
  </div>
), document.getElementById('main'))
