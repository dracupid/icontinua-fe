let {Timeline, Alert, message} = ANTD,
    Loading = require('./Components/Loading.jsx');

class ReportList extends React.Component {
    state = {
        data: null
    };

    fetchFailHandler() {
        this.setState({
            data: []
        });
    }

    static sortList(reportList) {
        return _(reportList).sortBy('timestamp').reverse().run();
    }

    componentDidMount() {
        if (!_.isEmpty(window._reportListData)) {
            this.setState({
                data: window._reportListData
            });
            return;
        }
        let url = "/api/reportList?openId=" + this.props.openId;
        $.getJSON(url).then((res) => {
            console.log(res);
            if (res.statusCode === 200) {
                let data = ReportList.sortList(res.data.reportList);
                window._reportListData = data;
                this.setState({
                    data: data
                });
            } else {
                this.fetchFailHandler();
            }
        }).fail((e) => {
            console.error(e);
            this.fetchFailHandler()
        });
    }

    clickItem = (reportId) => {
        location.href = `/reports#/${this.props.openId}/${reportId}`
    };

    static formatTime(t) {
        let date = new Date(parseInt(t, 10));
        return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 \n ${_.padLeft(date.getHours(), 2, 0)}:${_.padLeft(date.getMinutes(), 2, 0)}`
    }

    render() {
        let timeline = [];
        if (this.state.data == null) {
            timeline = <Loading text="正在加载体检记录..."/>
        } else if (this.state.data.length == 0) {
            timeline = (
                <Alert
                    message="没有找到您的体检记录"
                    type="info"/>
            )
        } else {
            timeline = (
                <Timeline>
                    {this.state.data.map((item) => {
                        return (
                            <div onClick={this.clickItem.bind(this, item.id)}>
                            <Timeline.Item color="green" key={item.timestamp} >
                                <p>
                                    {item.place}
                                    <div className="arrow1" />
                                </p>
                                <p className="timestamp">
                                    {ReportList.formatTime(item.timestamp * 1000)}
                                    <div className="arrow2" />
                                </p>
                            </Timeline.Item>
                            </div>
                        );
                    })}
                </Timeline>
            );
        }
        return (
            <div id="list-timeline">
                {timeline}
            </div>
        )
    }
}

module.exports = ReportList;
