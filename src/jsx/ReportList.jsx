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
            let index = 0;
            timeline = (
                <ul className="timeline-wrapper">
                    {_.map(data, ((item) => {
                        index += 1;
                        return (
                        <li className="timeline-item" onClick={this.clickItem.bind(this, item.id)} key={item.timestamp}>
                            <p className="timestamp">
                                {ReportList.formatTime(item.timestamp)}
                                <span className="arrow2"/>
                            </p>
                            <div className="timeline-item-middle">
                                <div className="timeline-item-tail"/>
                                <div className="timeline-item-id">{index}</div>
                            </div>
                            <div className="timeline-item-content">
                                <span className="arrow1"/>
                                {item.location || "未知"}
                            </div>
                        </li>
                            );
                        }))}
                </ul>
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
