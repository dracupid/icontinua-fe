/**
 * 化验单页面路由
 */
import Footer from '../Components/Footer'
import List from './List'
import Item from './Item'
let {Route, HashRouter} = ReactRouter

ReactDOM.render((
  <div>
    <HashRouter>
      <div>
        <Route exact path='/' component={List} />
        <Route exact path='/:name' component={List} />
        <Route path='/:name/-/:items' component={List} />
        <Route path='/:name/-/' component={List} />
        <Route exact path='/item/:name' component={Item} />
        <Route path='/item/:catalog/:name' component={Item} />
      </div>
    </HashRouter>
    <Footer />
  </div>

), document.getElementById('main'))
