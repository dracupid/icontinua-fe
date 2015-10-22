let {Timeline, Alert, message} = ANTD,
    Loading = require('./Components/Loading.jsx');

class ReportList extends React.Component {
    clickItem = (reportId) => {
        location.href = `/reports#/${this.props.openId}/${reportId}`
    };

    static formatTime(t) {
        let date = new Date(parseInt(t, 10));
        return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 \n` +
            `${_.padLeft(date.getHours(), 2, 0)}:${_.padLeft(date.getMinutes(), 2, 0)}`
    }

    render() {
        let timeline = [],
            {data} = this.props;
        if (data === null) {
            timeline = <Loading text="正在加载体检记录..."/>
        } else if (Object.keys(data).length == 0) {
            timeline = (
                <Alert
                    message="没有找到您的体检记录"
                    type="info"/>
            )
        } else {
            timeline = (
                <Timeline>
                    {_.map(data, ((item) => {
                        return (
                            <div onClick={this.clickItem.bind(this, item.id)}>
                                <Timeline.Item color="green" key={item.timestamp}>
                                    {item.location || "未知"}
                                    <div className="arrow1"/>
                                    <p className="timestamp">
                                        {ReportList.formatTime(item.timestamp)}
                                    </p>
                                    <div className="arrow2"/>
                                </Timeline.Item>
                            </div>
                        );
                    }))}
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
