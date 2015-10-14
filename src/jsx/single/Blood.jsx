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

    getTips() {
        let {low, high} = this.props,
            lowText = "",
            highText = "",
            error = false;
        if (low >= 60 && low <= 80) {
            lowText = "正常";
        } else if (low < 60) {
            error = true;
            lowText = "偏低";
        } else {
            error = true;
            lowText = "偏高";
        }

        if (high >= 90 && high <= 120) {
            highText = "正常"
        } else if (high < 90) {
            error = true;
            highText = "偏低"
        } else {
            error = true;
            highText = "偏高"
        }

        return `您的舒张压${lowText}，收缩压${highText}，${error ? "请多加注意。" : "请继续保持。"}`

    }

    render() {
        let width = "200%";
        return (
            <div className="blood-tab">
                <div className="flex-box">
                    <div className="echart-mini-wrapper">
                        <div style={{position: 'relative'}}>
                            <Echarts option={this._getOpt(this.props.high, "收缩压", 'mmHg', [90, 120, 140], 60, 160, true)} height="300"
                                width={width} className="mini top-left"/>
                        </div>
                    </div>

                    <div className="echart-mini-wrapper">
                        <div style={{position: 'relative'}}>
                            <Echarts option={this._getOpt(this.props.low, "舒张压", 'mmHg', [60, 80, 90], 40, 120, true)} height="300"
                                 width={width} className="mini top-right"/>
                        </div>
                    </div>
                </div>
                <Echarts option={this._getOpt(this.props.beat, "心率", 'bpm', [60, 100, 120], 40, 140)} height="300"
                         className="bottom-echart"/>
                <Tips text={this.getTips()} fix={true}/>
            </div>
        )
    }
}

module.exports = Blood;
