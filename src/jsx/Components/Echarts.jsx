document.body.appendChild(document.createElement('script')).src = "/js/lib/echarts.source.min.js"
let Loading = require('./Loading.jsx');

class Echarts extends React.Component {
    static propTypes = {
        option: React.PropTypes.object.isRequired,
        width: React.PropTypes.any.isRequired,
        height: React.PropTypes.string,
        mini: React.PropTypes.bool
    };
    static defaultProps = {
        width: '100%',
        height: '500px'
    };

    renderChart() {
        if (window.echarts) {
            let option = this.props.option,
                myChart = window.echarts.init(React.findDOMNode(this.refs.echarts), 'macarons');
            myChart.setOption(option, true);
        }
    }

    componentDidMount() {
        this.renderChart();
    }

    shouldComponentUpdate() {
        return false;
    }

    render() {
        if (window.echarts) {
            return (
                <div ref="echarts" className={"echarts " + (this.props.className || '')}
                     style={{height: this.props.height + 'px', width: this.props.width}}/>
            )
        } else {
            return <Loading text="正在生成图表..."/>
        }

    }
}
module.exports = Echarts;
