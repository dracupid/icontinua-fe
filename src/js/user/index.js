/**
 * 用户中心路由
 */
import Footer from '../Components/Footer'
import main from './main'
import edit from './edit'
import Photo from './Photo'
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
