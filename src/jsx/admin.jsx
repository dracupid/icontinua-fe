let{ Router, Route, Link } = ReactRouter,
    Report = require("./admin/ReportList.jsx"),
    UserList = require("./admin/UserList.jsx");


ReactDOM.render((
    <Router >
        <Route path="/" component={UserList} />
        <Route path="/:openId" component={Report}/>
    </Router>
), document.getElementById('main'));
