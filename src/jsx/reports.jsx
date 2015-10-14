let {Tabs} = ANTD,
    Banner = require('./Components/Banner.jsx'),
    ReportList = require('./ReportList.jsx'),
    ReportTrade = require('./ReportTrade.jsx'),
    Icon = require('./Components/Icon.jsx'),
    TabPane = Tabs.TabPane;

class Reports extends React.Component {
    state = {
        tabTitles: ["体检记录", "变化趋势"],
        currentTab: 0
    };

    changeHandler = (e) => {
        this.setState({currentTab: e});
    };

    render() {
        return (
            <div id="report-list">
                <Banner title={this.state.tabTitles[this.state.currentTab]}/>

                <div className="bottom-tab-wrapper">
                    <Tabs onChange={this.changeHandler}>
                        <TabPane tab={
                            <div>
                                <i className="bg-record"/>
                                <p>{this.state.tabTitles[0]}</p>
                            </div>
                        } key="0">
                            <ReportList openId={this.props.params.openId}/>
                        </TabPane>
                        <TabPane tab={
                            <div>
                                <i className="bg-trade"/>
                                <p>{this.state.tabTitles[1]}</p>
                            </div>
                        } key="1">
                            <ReportTrade openId={this.props.params.openId}/>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        );
    }
}
module.exports = Reports;
