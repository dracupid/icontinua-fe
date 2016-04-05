let {Route, Router, hashHistory} = ReactRouter
import Footer from '../Components/Footer.jsx'
import main from './main.jsx'
import edit from './edit.jsx'
import Photo from './Photo.jsx'

window._userInfoCache = {}

ReactDOM.render((
  <div>
    <Router history={hashHistory}>
      <Route path='/' component={main}/>
      <Route path='/edit/:userId' component={edit}/>
      <Route path='/photo/:userId' component={Photo}/>
      <Route path='/:userId' component={main}/>
    </Router>
    <Footer />
  </div>

), document.getElementById('main'))
