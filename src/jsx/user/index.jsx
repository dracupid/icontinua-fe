import {Route, Router, hashHistory} from '../ReactRouter.jsx'
import Footer from '../Components/Footer.jsx'
import main from './main.jsx'
import edit from './edit.jsx'

window._userInfoCache = {}

ReactDOM.render((
  <div>
    <Router history={hashHistory}>
      <Route path='/' component={main}/>
      <Route path='/edit/:userId' component={edit}/>
      <Route path='/:userId' component={main}/>
    </Router>
    <Footer />
  </div>

), document.getElementById('main'))
