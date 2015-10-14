let {Tabs, message, Alert} = ANTD,
    HeightWeight = require('./single/HeightWeight.jsx'),
    Blood = require("./single/Blood.jsx"),
    O2 = require("./single/O2.jsx"),
    Chinese = require("./single/Chinese.jsx"),
    Loading = require('./Components/Loading.jsx'),
    Banner = require('./Components/Banner.jsx'),
    Icon = require('./Components/Icon.jsx'),
    Echarts = require('./Components/Echarts.jsx');
let TabPane = Tabs.TabPane;
let {baseGaugeOpt} = require("./option.coffee");

//message.config({top: 80});

class Report extends React.Component {
    state = {
        title: "体检记录",
        report: {},
        loaded: false
    };

    fetchFailedHandler() {
        //message.error("获取体检数据失败");
        this.setState({
            title: "体检报告",
            loaded: true
        });
    }

    componentDidMount() {
        let reportId = this.props.params.reportId;
        if (!_.isEmpty(window._reportData[reportId])) {
            this.setState({
                title: window._reportData[reportId].title,
                report: window._reportData[reportId].report,
                loaded: true
            });
            return;
        }
        let url = "/api/report?reportId=" + reportId;
        $.getJSON(url).then((res) => {
            console.log(res);
            if (res.statusCode === 200) {
                //message.success('获取体检数据成功', 0.5);
                let time = new Date(res.data.timestamp * 1000),
                    title = `${time.getFullYear()}年${time.getMonth() + 1}月${time.getDate()}日`;
                window._reportData[reportId] = {
                    title: title,
                    report: res.data
                };
                this.setState({
                    title: title,
                    report: res.data,
                    loaded: true
                });
            } else {
                this.fetchFailedHandler();
            }
        }).fail((e) => {
            console.error(e);
            this.fetchFailedHandler();
        });
    }

    getHeightWeight() {
        let {height, weight, bodyFatRate} = this.state.report;
        if (this.state.loaded) {
            if (height && weight) {
                return <HeightWeight height={~~height} weight={~~weight} rate={~~bodyFatRate}/>
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
        let {systolicPressure, diastolicPressure, beatsPerMinute} = this.state.report;
        if (this.state.loaded) {
            if (systolicPressure && diastolicPressure) {
                return <Blood high={~~systolicPressure} low={~~diastolicPressure} beat={~~beatsPerMinute}/>
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
        let {spo2h} = this.state.report;
        if (this.state.loaded) {
            if (spo2h) {
                return <O2 OO={~~spo2h}/>
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
        return (
            <div id="report" className="top-tab-wrapper">
                <Banner title={this.state.title} backUrl={"/report.html/#/list/" + this.props.params.openId}/>
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
