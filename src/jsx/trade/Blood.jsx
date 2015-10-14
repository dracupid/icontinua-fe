let Echarts = require('../Components/Echarts.jsx'),
    Tips = require('../Components/Tips.jsx'),
    util = require('../util.coffee'),
    {baseLineOpt} = require('../option.coffee');

class Blood extends React.Component {
    formattedData() {
        let res = {
            xs: [],
            high: [],
            low: [],
            beat: []
        }, v, data = this.props.data;

        for (let k in data) {
            v = data[k];
            if (v.systolicPressure) {
                res.xs.push(util.formatTime(k));
                res.high.push(~~v.systolicPressure);
                res.low.push(~~v.diastolicPressure);
                res.beat.push(~~v.beatsPerMinute);
            }
        }
        return res
    }

    getOption() {
        let data = this.formattedData();
        let option = {
            legend: {
                data: ['伸缩压', '舒张压', '心率']
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: data.xs
                }
            ],
            yAxis: [
                {
                    name: '血压(mmHg)',
                    type: 'value',
                    max: util.getMax(data.high),
                    min: util.getMin(data.low)
                },
                {
                    name: '心率(bpm)',
                    type: 'value',
                    max: util.getMax(data.beat),
                    min: util.getMin(data.beat)
                }
            ],
            series: [
                {
                    name: '伸缩压',
                    type: 'line',
                    yAxisIndex: 0,
                    data: data.high
                }, {
                    name: '舒张压',
                    type: 'line',
                    yAxisIndex: 0,
                    data: data.low
                }, {
                    name: '心率',
                    type: 'line',
                    yAxisIndex: 1,
                    data: data.beat
                }
            ]
        };
        return _.defaults(option, baseLineOpt);

    }

    render() {

        return (
            <div>
                <Echarts option={this.getOption()} height="300" width="100%"/>
                <Tips text="您的血压正常，请继续保持!"/>
            </div>
        )
    }
}

module.exports = Blood;
