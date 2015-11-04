let Echarts = require('../Components/Echarts.jsx'),
    Tips = require('../Components/Tips.jsx'),
    util = require('../util.coffee'),
    {baseGaugeOpt} = require('../option.coffee');

class Blood extends React.Component {
    _getOpt(val, text, unit, lines, _min, _max) {
        let min = util.getMin([val], 10, _min),
            max = util.getMax([val], 10, _max);

        let percents = lines.map((item) => {
            return ((item - min) / (max - min));
        });
        return _.defaultsDeep({
            series: [
                {
                    detail: {
                        formatter: `{value} ${unit}`
                    },

                    axisLine: {
                        lineStyle: {
                            color: [
                                [percents[0], '#DDDF0D'],
                                [percents[1], '#55BF3B'],
                                [percents[2], '#DDDF0D'],
                                [1, '#DF5353']
                            ]
                        }
                    },
                    data: [{
                        value: val,
                        name: text
                    }],
                    min: min,
                    max: max
                }]
        }, baseGaugeOpt);
    }

    render() {
        let {resultLow, resultHigh, resultMain} = this.props,
            width = "200%", height = '300';
        return (
            <div className="blood-tab">
                <div className="flex-box">
                    <div className="echart-mini-wrapper">
                        <div style={{position: 'relative'}}>
                            <Echarts
                                option={this._getOpt(this.props.high, "收缩压", 'mmHg', resultHigh.bounds, 60, 160, true)}
                                height={height}
                                width={width} className="mini top-left"/>
                        </div>
                    </div>

                    <div className="echart-mini-wrapper">
                        <div style={{position: 'relative'}}>
                            <Echarts
                                option={this._getOpt(this.props.low, "舒张压", 'mmHg', resultLow.bounds, 40, 120, true)}
                                height={height}
                                width={width} className="mini top-right"/>
                        </div>
                    </div>
                </div>
                <Echarts option={this._getOpt(this.props.beat, "心率", 'bpm', [60, 100, 120], 40, 140)} height="300"
                         className="bottom-echart"/>
                <Tips text={resultMain.advice} fix={true}/>
            </div>
        )
    }
}

module.exports = Blood;
