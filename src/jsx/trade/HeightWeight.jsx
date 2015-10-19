let Echarts = require('../Components/Echarts.jsx'),
    Tips = require('../Components/Tips.jsx'),
    util = require('../util.coffee'),
    {baseLineOpt} = require('../option.coffee');

class HeightWeight extends React.Component {
    formattedData() {
        let res = {
            xs: [],
            height: [],
            weight: []
        }, v, data = this.props.data;

        for (let k in data) {
            v = data[k];
            if (v.height) {
                res.xs.push(util.formatTime(v.timestamp));
                res.height.push(~~v.height);
                res.weight.push(~~v.weight);
            }
        }
        return res
    }

    getOption() {
        let data = this.formattedData();
        let option = {
            legend: {
                data: ['身高', '体重']
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
                    name: '身高(cm)',
                    type: 'value',
                    max: util.getMax(data.height),
                    min: util.getMin(data.height)
                },
                {
                    name: '体重(kg)',
                    type: 'value',
                    max: util.getMax(data.weight),
                    min: util.getMin(data.weight)
                }
            ],
            series: [
                {
                    name: '身高',
                    type: 'line',
                    yAxisIndex: 0,
                    data: data.height
                },
                {
                    name: '体重',
                    type: 'line',
                    yAxisIndex: 1,
                    data: data.weight
                }
            ]
        };
        return _.defaults(option, baseLineOpt);

    }

    render() {

        return (
            <div>
                <Echarts option={this.getOption()} height="300" width="100%"/>
                <Tips text="您的体型正常，请继续保持!"/>
            </div>
        )
    }
}

module.exports = HeightWeight;
