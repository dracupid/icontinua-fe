let {filter, getStarLevel, getLevelText} = require("./chinese.coffee"),
    Loading = require('../Components/Loading.jsx'),
    {message, Alert} = ANTD;

class ReportBlock extends React.Component {
    render() {
        let {title, level, items} = this.props,
            starNum = getStarLevel(level),
            notices = _.pluck(items, "name").join("，"),
            itemDOMs = items.map((item, i) => {
                return (
                    <div key={i}>
                        <h3 className="name">{item.name}</h3>
                        { (() => {
                            if (item.intro) {
                                return (
                                <div className="block">
                                    <h3 className="title">【简介】</h3>

                                    <div className="content">{item.intro}</div>
                                </div>
                                    )
                                }
                            })()}
                        { (() => {
                            if (item.advice) {
                                return (
                                <div className="block">
                                    <h3 className="title">【调理建议】</h3>
                                    <ol className="content">{item.advice.map((e, i) => {
                                        return <li key={i}> {e} </li>
                                        })}
                                    </ol>
                                </div>
                                    )
                                }
                            })()}
                        { (() => {
                            if (item.eating) {
                                return (
                                <div className="block">
                                    <h3 className="title">【饮食建议】</h3>

                                    <div className="content">{item.eating}</div>
                                </div>
                                    )
                                }
                            })()}
                    </div>
                )
            });

        let onStars = new Array(starNum),
            offStars = new Array(5 - starNum),
            onStar = <div className="star on"/>,
            offStar = <div className="star off"/>;

        _.fill(onStars, onStar);
        _.fill(offStars, offStar);

        return (
            <div className="chinese-report-block">
                <div className="report-header">
                    <h1 className="title">{"您的" + title}</h1>

                    <div className="status">{title + "状况: " + getLevelText(level)}</div>
                    <div className="stars">
                        <h4>{`您的${title}为: `}</h4>{onStars.concat(offStars)}
                    </div>
                    <h4>建议您注意:</h4>{notices}
                </div>
                <div className="report-body">{itemDOMs}</div>
            </div>
        )
    }
}

class Scores extends React.Component {
    render() {
        let {zangfu, jizhui, xiaohua, miniao} = this.props,
            data = {
                脏腑: zangfu,
                脊椎: jizhui,
                消化: xiaohua,
                泌尿: miniao
            },
            res = _.map(data, (v, k) => {
                return <div className="kv" key={k}>
                    <span className="key">{k}</span>
                    <span className="value">{parseFloat(v).toFixed(1)}</span>
                </div>
            });

        return <div className="c-kv-map">{res}</div>;
    }
}

class Chinese extends React.Component {
    state = {
        data: null,
        loaded: false
    };

    fetchFailedHandler() {
        this.setState({
            data: null,
            loaded: true
        });
    }

    componentDidMount() {
        let id = this.props.id;
        if (!_.isEmpty(window._chineseReportData[id])) {
            this.setState({
                data: window._chineseReportData[id],
                loaded: true
            });
            return;
        }
        let url = "/api/falthReport?id=" + id;
        $.getJSON(url).then((res) => {
            console.log(res);
            window._chineseReportData[id] = res;
            this.setState({
                data: res,
                loaded: true
            });
        }).fail((e) => {
            console.error(e);
            this.fetchFailedHandler();
        });
    }

    render() {
        if (this.state.loaded) {
            if (this.state.data === null) {
                return <Alert
                    message="没有您的生物电数据"
                    type="info"/>
            } else {
                let data = filter(this.state.data);
                return (
                    <div style={{marginBottom: '20px'}}>
                        <Scores {...data.scores}/>
                        <ReportBlock title="脏腑" {...data.zangfu}/>
                        <ReportBlock title="脊椎" {...data.jizhui}/>
                    </div>
                )
            }
        } else {
            return <Loading />
        }

    }
}

module.exports = Chinese;
