let {Tabs} = ANTD,
    Banner = require('./Components/Banner.jsx'),
    ReportList = require('./ReportList.jsx'),
    ReportTrade = require('./ReportTrade.jsx'),
    Icon = require('./Components/Icon.jsx'),
    TabPane = Tabs.TabPane;

class Reports extends React.Component {
    state = {
        tabTitles: ["体检记录", "变化趋势"],
        currentTab: 0,
        data: null
    };

    fetchFailedHandler() {
        this.setState({
            data: []
        });
    }

    formatData(list) {
        let res = {};
        _(list).sortBy("timestamp").reverse().forEach((item) => {
            res[item.id] = item
        }).run();
        return res
    }

    componentDidMount() {
        if (window._reportListData !== null) {
            this.setState({
                data: window._reportListData
            });
            return;
        }
        let url = "/api/history?openId=" + this.props.params.openId;
        $.getJSON(url).then((res) => {
            console.log(res);
            if (res.status === 200) {
                let data = this.formatData(res.data);
                window._reportListData = data;
                _.forEach(data, (e) => {
                    window._reportData[e.id] = e;
                });
                this.setState({
                    data: data
                });
            } else {
                this.fetchFailedHandler();
            }
        }).fail((e) => {
            console.error(e);
            this.fetchFailedHandler();
        });
    }

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
                            <ReportList openId={this.props.params.openId} data={this.state.data}/>
                        </TabPane>
                        <TabPane tab={
                            <div>
                                <i className="bg-trade"/>
                                <p>{this.state.tabTitles[1]}</p>
                            </div>
                        } key="1">
                            <ReportTrade openId={this.props.params.openId} data={this.state.data}/>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        );
    }
}
module.exports = Reports;
