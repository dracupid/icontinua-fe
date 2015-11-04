let {Tabs, message, Alert} = ANTD,
    HeightWeight = require('./single/HeightWeight.jsx'),
    Blood = require("./single/Blood.jsx"),
    O2 = require("./single/O2.jsx"),
    Chinese = require("./single/Chinese.jsx"),
    Loading = require('./Components/Loading.jsx'),
    Banner = require('./Components/Banner.jsx'),
    Icon = require('./Components/Icon.jsx'),
    Echarts = require('./Components/Echarts.jsx'),
    wechat = require('./wechat.coffee');
let TabPane = Tabs.TabPane;
let {baseGaugeOpt} = require("./option.coffee");

class Report extends React.Component {
    state = {
        title: "体检报告",
        report: {},
        loaded: false
    };

    fetchFailedHandler() {
        this.setState({
            title: "体检报告",
            loaded: true
        });
    }

    static formatTime(t) {
        if (!t) return '体检报告';
        let time = new Date(t);
        return `${time.getFullYear()}年${time.getMonth() + 1}月${time.getDate()}日`
    }

    componentDidMount() {
        let promise = $.Deferred().resolve();
        if (window._advice == null) {
            promise = $.getJSON("/data/advice.json")
                .then((res) => {
                    window._advice = res
                })
                .fail((e) => {
                    console.error(e);
                    this.fetchFailedHandler();
                });
        }
        promise.then(() => {
            let reportId = this.props.params.reportId;
            if (!_.isEmpty(window._reportData[reportId])) {
                this.setState({
                    title: Report.formatTime(window._reportData[reportId].timestamp),
                    report: window._reportData[reportId],
                    loaded: true
                });
                return;
            }
            $.getJSON("/api/report?diagnose=true&reportId=" + reportId)
                .then((res) => {
                    console.log(res);
                    if (res.status === 200) {
                        window._reportData[reportId] = {
                            title: Report.formatTime(res.data.timestamp),
                            report: res.data
                        };
                        this.setState({
                            title: Report.formatTime(res.data.timestamp),
                            report: res.data,
                            loaded: true
                        });
                    } else {
                        this.fetchFailedHandler();
                    }
                })
                .fail((e) => {
                    console.error(e);
                    this.fetchFailedHandler();
                });
        })
    }

    getHeightWeight() {
        let {height, weight} = this.state.report;
        if (this.state.loaded) {
            if (height && weight) {
                return <HeightWeight {...this.state.report}/>
            } else {
                return <Alert
                    message="没有您的身体数据"
                    type="info"/>
            }
        } else {
            return <Loading />
        }
    }

    getBlood() {
        let {sbp, dbp, heartRate, result} = this.state.report;
        if (this.state.loaded) {
            if (sbp && dbp) {
                return <Blood high={~~sbp} low={~~dbp} beat={~~heartRate}
                              resultHigh={result.sbp}
                              resultLow={result.dbp}
                              resultMain={result.bp}/>
            } else {
                return <Alert
                    message="没有您的血压数据"
                    type="info"/>
            }
        } else {
            return <Loading />
        }
    }

    getO2() {
        let {spo2h, result} = this.state.report;
        if (this.state.loaded) {
            if (spo2h) {
                return <O2 value={~~spo2h} result={result.spo2h}/>
            } else {
                return <Alert
                    message="没有您的血氧数据"
                    type="info"/>
            }
        } else {
            return <Loading />
        }
    }

    getChinese() {
        let {cacheId} = this.state.report;
        if (this.state.loaded) {
            if (cacheId) {
                return <Chinese id={cacheId}/>
            } else {
                return <Alert
                    message="没有您的中医数据"
                    type="info"/>
            }
        } else {
            return <Loading />
        }
    }

    render() {
        wechat.setReport(this.props.params.reportId);
        let {openId} = this.props.params;
        return (
            <div id="report" className="top-tab-wrapper">
                <Banner title={this.state.title} backUrl={openId ? "/reports#/" + openId : null}/>
                <Tabs size="mini">
                    <TabPane tab="身体" key="1">{this.getHeightWeight()}</TabPane>
                    <TabPane tab="血压" key="2">{this.getBlood()}</TabPane>
                    <TabPane tab="血氧" key="3">{this.getO2()}</TabPane>
                    <TabPane tab="生物电" key="4">{this.getChinese()}</TabPane>
                </Tabs>
            </div>
        )
    }
}
module.exports = Report;
