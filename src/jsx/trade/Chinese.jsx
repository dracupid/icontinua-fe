let Echarts = require('../Components/Echarts.jsx'),
    Tips = require('../Components/Tips.jsx'),
    util = require('../util.coffee'),
    {baseLineOpt} = require('../option.coffee');

class Chinese extends React.Component {
    formattedData() {
        let res = {
            xs: [],
            score: []
        }, v, data = this.props.data;

        for (let k in data) {
            v = data[k];
            if (v.cacheScore) {
                res.xs.push(util.formatTime(v.timestamp));
                res.score.push(~~v.cacheScore);
            }
        }
        return res
    }

    getOption() {
        let data = this.formattedData();
        let option = {
            legend: {
                data: ['生物电']
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
                    name: '得分',
                    type: 'value',
                    max: 10,
                    min: 0
                }
            ],
            series: [
                {
                    name: '生物电',
                    type: 'line',
                    data: data.score
                }
            ]
        };
        return _.defaults(option, baseLineOpt);

    }

    render() {
        return (
            <div>
                <Echarts option={this.getOption()} height="300" width="100%"/>
                <Tips text="您的生物电正常，请继续保持!"/>
            </div>
        )
    }
}

module.exports = Chinese;
