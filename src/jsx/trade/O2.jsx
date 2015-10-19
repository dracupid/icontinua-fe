let Echarts = require('../Components/Echarts.jsx'),
    Tips = require('../Components/Tips.jsx'),
    util = require('../util.coffee'),
    {baseLineOpt} = require('../option.coffee');

class O2 extends React.Component {
    formattedData() {
        let res = {
            xs: [],
            O2: []
        }, v, data = this.props.data;

        for (let k in data) {
            v = data[k];
            if (v.spo2h) {
                res.xs.push(util.formatTime(v.timestamp));
                res.O2.push(~~v.spo2h);
            }
        }
        return res
    }

    getOption() {
        let data = this.formattedData();
        let option = {
            legend: {
                data: ['血氧']
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
                    name: '血氧(%)',
                    type: 'value',
                    max: util.getMax(data.O2),
                    min: util.getMin(data.O2)
                }
            ],
            series: [
                {
                    name: '血氧',
                    type: 'line',
                    data: data.O2
                }
            ]
        };
        return _.defaults(option, baseLineOpt);

    }

    render() {

        return (
            <div>
                <Echarts option={this.getOption()} height="300" width="100%"/>
                <Tips text="您的血氧正常，请继续保持!"/>
            </div>
        )
    }
}

module.exports = O2;
