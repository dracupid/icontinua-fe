let { Router, Route } = ReactRouter
let Report = require('./admin/ReportList.jsx')
let UserList = require('./admin/UserList.jsx')

ReactDOM.render((
  <Router >
    <Route path='/' component={UserList}/>
    <Route path='/:openId' component={Report}/>
  </Router>
  ), document.getElementById('main'))
