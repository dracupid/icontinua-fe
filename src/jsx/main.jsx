let { Router, Route, Link } = ReactRouter,
    report = require('./report.jsx'),
    reports = require('./reports.jsx');

window._reportData = {};
window._chineseReportData = {};

React.render((
    <Router >
        <Route path="/" component={reports} />
        <Route path="/:openId" component={reports}/>
        <Route path="/:openId/:reportId" component={report}/>
    </Router>
), document.body);
