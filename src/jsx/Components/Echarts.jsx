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
        let option = this.props.option,
            myChart = echarts.init(React.findDOMNode(this.refs.echarts), 'macarons');
        myChart.setOption(option, true);

    }

    componentDidMount() {
        this.renderChart();
    }

    shouldComponentUpdate() {
        return false;
    }

    render() {
        return (
            <div ref="echarts" className={"echarts " + this.props.className}
                 style={{height: this.props.height + 'px', width: this.props.width}}/>
        )
    }
}
module.exports = Echarts;
