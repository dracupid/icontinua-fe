/**
 * 用户中心路由
 */
import Footer from '../Components/Footer.jsx'
import main from './main.jsx'
import edit from './edit.jsx'
import Photo from './Photo.jsx'
let {Route, Router, hashHistory} = ReactRouter

ReactDOM.render((
  <div>
    <Router history={hashHistory}>
      <Route path='/' component={main} />
      <Route path='/edit' component={edit} />
      <Route path='/photo' component={Photo} />
    </Router>
    <Footer />
  </div>
), document.getElementById('main'))
