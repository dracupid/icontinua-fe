let {Tabs, message, Alert} = ANTD,
    Loading = require('./Components/Loading.jsx'),
    Echarts = require('./Components/Echarts.jsx'),
    HeightWeight = require("./trade/HeightWeight.jsx"),
    Blood = require("./trade/Blood.jsx"),
    O2 = require("./trade/O2.jsx"),
    Chinese = require("./trade/Chinese.jsx"),
    Icon = require('./Components/Icon.jsx');
let TabPane = Tabs.TabPane;

class ReportTrade extends React.Component {
    getHeightWeight() {
        let {data} = this.props.data;
        if (data !== null) {
            if (_(data).pluck("height").compact().run().length > 0) {
                return <HeightWeight data={data}/>
            } else {
                return <Alert message="没有您的身体数据" type="info"/>
            }
        } else {
            return <Loading />
        }
    }

    getBlood() {
        let {data} = this.props.data;
        if (data !== null) {
            if (_(data).pluck("systolicPressure").compact().run().length > 0) {
                return <Blood data={data}/>
            } else {
                return <Alert message="没有您的血压数据" type="info"/>
            }
        } else {
            return <Loading />
        }
    }

    getO2() {
        let {data} = this.props.data;
        if (data !== null) {
            if (_(data).pluck("spo2h").compact().run().length > 0) {
                return <O2 data={data}/>
            } else {
                return <Alert message="没有您的血氧数据" type="info"/>
            }
        } else {
            return <Loading />
        }
    }

    getChinese() {
        let {data} = this.props.data;
        if (data !== null) {
            if (_(data).pluck("cacheScore").compact().run().length > 0) {
                return <Chinese data={data}/>
            } else {
                return <Alert message="没有您的生物电数据" type="info"/>
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
