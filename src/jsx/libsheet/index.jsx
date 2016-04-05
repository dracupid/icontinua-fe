let {Route, Router, hashHistory} = ReactRouter
import Footer from '../Components/Footer.jsx'
import List from './List.jsx'
import Item from './Item.jsx'

window._userInfoCache = {}

ReactDOM.render((
  <div>
    <Router history={hashHistory}>
      <Route path='/' component={List}/>
      <Route path='/:name' component={List}/>
      <Route path='/item/:name' component={Item}/>
      <Route path='/item/:catalog/:name' component={Item}/>
    </Router>
    <Footer />
  </div>

), document.getElementById('main'))