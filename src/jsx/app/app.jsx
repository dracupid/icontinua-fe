import Router from '../../../node_modules/react-router/lib/Router'
import Route from '../../../node_modules/react-router/lib/Route'
import hashHistory from '../../../node_modules/react-router/lib/hashHistory'

import main from './main.jsx'
import AppDetail from './AppDetail.jsx'

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path='/' component={main}/>
    <Route path='/tag/:tag' component={main}/>
    <Route path='/item/:uid' component={AppDetail}/>
  </Router>
), document.getElementById('main'))
