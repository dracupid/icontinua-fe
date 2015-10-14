let {Tabs, message, Alert} = ANTD,
    Loading = require('./Components/Loading.jsx'),
    Echarts = require('./Components/Echarts.jsx'),
    HeightWeight = require("./trade/HeightWeight.jsx"),
    Blood = require("./trade/Blood.jsx"),
    O2 = require("./trade/O2.jsx"),
    Chinese = require("./trade/Chinese.jsx"),
    Icon = require('./Components/Icon.jsx');
let TabPane = Tabs.TabPane;

//message.config({top: 46});

class ReportTrade extends React.Component {
    state = {
        reportHistory: {},
        loaded: false
    };

    fetchFailedHandler() {
        //message.error("获取体检数据失败");
        this.setState({
            loaded: true
        });
    }

    formatData(list) {
        let res = {};

        _(list).sortBy("timestamp").forEach((item) => {
            res[item.timestamp] = item
        }).run();

        return res

    }

    componentDidMount() {
        if (!_.isEmpty(window._reportTradeData)) {
            this.setState({
                reportHistory: window._reportTradeData,
                loaded: true
            });
            return;
        }
        let url = "/api/reportHistory?openId=" + this.props.openId;
        $.getJSON(url).then((res) => {
            console.log(res);
            if (res.statusCode === 200) {
                let data = this.formatData(res.data);
                window._reportTradeData = data;
                //message.success('获取体检历史数据成功', 0.5);
                this.setState({
                    reportHistory: data,
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
        if (this.state.loaded) {
            if (_(this.state.reportHistory).pluck("height").compact().run().length > 0) {
                return <HeightWeight data={this.state.reportHistory}/>
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
        if (this.state.loaded) {
            if (_(this.state.reportHistory).pluck("systolicPressure").compact().run().length > 0) {
                return <Blood data={this.state.reportHistory}/>
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
        if (this.state.loaded) {
            if (_(this.state.reportHistory).pluck("spo2h").compact().run().length > 0) {
                return <O2 data={this.state.reportHistory}/>
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
        if (this.state.loaded) {
            if (_(this.state.reportHistory).pluck("cacheScore").compact().run().length > 0) {
                return <Chinese data={this.state.reportHistory}/>
            } else {
                return <Alert
                    message="没有您的生物电数据"
                    type="info"/>
            }
        } else {
            return <Loading />
        }
    }

    render() {
        return (
            <div id="report-trade" className="top-tab-wrapper">
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

module.exports = ReportTrade;
