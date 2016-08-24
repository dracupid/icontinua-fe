/**
 * 应用商城路由
 */
let {Route, Router, hashHistory} = ReactRouter
import main from './main.jsx'
import AppDetail from './AppDetail.jsx'
import Search from './Components/SearchResult.jsx'
import Footer from '../Components/Footer.jsx'

ReactDOM.render((
  <div>
    <Router history={hashHistory}>
      <Route path='/' component={main} />
      <Route path='/tag/:tag' component={main} />
      <Route path='/s/:keyword' component={Search} />
      <Route path='/item/:uid' component={AppDetail} />
    </Router>
    <Footer />
  </div>
), document.getElementById('main'))
