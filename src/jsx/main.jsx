let { Router, Route, Link } = ReactRouter,
    report = require('./report.jsx'),
    reports = require('./reports.jsx');
require('./wechat.coffee');

window._reportData = {};
window._reportListData = null;
window._chineseReportData = {};
window._advice = null;

(function () {
    let cacheImg = function (url) {
        let img = new Image();
        img.src = url;
    };
    cacheImg("/img/loading.gif");
    cacheImg("/img/record.png");
    cacheImg("/img/trade.png");
    cacheImg("/img/trade-a.png");
    cacheImg("/img/body.png");
    cacheImg("/img/wave.png");
})();


React.render((
    <Router>
        <Route path="/" component={reports}/>
        <Route path="/:openId" component={reports}/>
        <Route path="/share/:reportId" component={report}/>
        <Route path="/:openId/:reportId" component={report}/>
    </Router>
), document.body);
