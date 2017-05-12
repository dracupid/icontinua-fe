/**
 * 应用商城路由
 */
import main from './main.jsx'
import AppDetail from './AppDetail.jsx'
import Search from './Components/SearchResult.jsx'
import Footer from '../Components/Footer.jsx'
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
