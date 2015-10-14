let { Router, Route, Link } = ReactRouter,
    report = require('./report.jsx'),
    reports = require('./reports.jsx');

window._reportData = {};
window._chineseReportData = {};

React.render((
    <Router>
        <Route path="list/:openId" component={reports}/>
        <Route path="item/:reportId/:openId" component={report}/>

    </Router>
), document.body);
