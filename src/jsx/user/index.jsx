/**
 * 用户中心路由
 */
import Footer from '../Components/Footer.jsx'
import main from './main.jsx'
import edit from './edit.jsx'
import Photo from './Photo.jsx'
let {Route, HashRouter} = ReactRouter

ReactDOM.render((
  <div>
    <HashRouter>
      <div>
        <Route exact path='/' component={main} />
        <Route path='/edit' component={edit} />
        <Route path='/photo' component={Photo} />
      </div>
    </HashRouter>
    <Footer />
  </div>
), document.getElementById('main'))
