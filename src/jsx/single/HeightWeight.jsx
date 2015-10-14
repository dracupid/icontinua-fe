let Echarts = require('../Components/Echarts.jsx'),
    Tips = require('../Components/Tips.jsx'),
    {baseGaugeOpt} = require('../option.coffee');

class KVMap extends React.Component {
    static defaultProps = {
        obj: {}
    };

    render() {
        let items = [],
            obj = this.props.obj;
        for (let key in obj) {
            if (obj[key]) {
                items.push(
                    <div className='kv-item' key={key + obj[key]}>
                        <div className='key'> {key} </div>
                        <div className='value'> {obj[key]} </div>
                    </div>
                )
            }
        }
        return (
            <div className="kv-map">{items}</div>
        )
    }
}

let BMIPoints = [18.5, 25, 28],
    BMIText = ['偏瘦', '正常', '偏胖', '肥胖'];

class HeightWeight extends React.Component {
    static propTypes = {
        height: React.PropTypes.any.isRequired,
        weight: React.PropTypes.any.isRequired
    };

    getBMI() {
        let {weight, height} = this.props;
        return (weight / (height * height / 10000)).toFixed(1);
    }

    getBMIText() {
        let BMI = this.getBMI();
        if (BMI < BMIPoints[0]) {
            return BMIText[0];
        }

        for (let i = BMIPoints.length - 1; i >= 0; i--) {
            if (BMI >= BMIPoints[i]) {
                return BMIText[i + 1];
            }
        }
        return BMIText[0];
    }

    getWeightOpt() {
        let {weight, height} = this.props,
            weightPoints = BMIPoints.map((point) => {
                return point * height * height / 10000
            });
        let min = _.round(Math.min(weightPoints[0] - 10, weight - 10), -1),
            max = _.round(Math.max(weightPoints[2] + 10, weight + 10), -1);

        min < 0 && (min = 0);

        let percents = weightPoints.map((weight) => {
            return ((weight - min) / (max - min)).toFixed(1);
        });

        return _.defaultsDeep({
            series: [
                {
                    detail: {
                        formatter: '{value}KG'
                    },
                    axisLine: {
                        lineStyle: {
                            color: [
                                [percents[0], '#DDDF0D'], // 过轻
                                [percents[1], '#55BF3B'], // 正常
                                [percents[2], '#DDDF0D'], // 过重
                                [1, '#DF5353']            // 非常肥胖
                            ]
                        }
                    },
                    data: [{
                        value: weight
                        //name: this.getBMIText()
                    }],
                    min: min,
                    max: max
                }
            ]
        }, baseGaugeOpt);
    }

    getTips() {
        let tips = [
                "该增加体重了",
                "请继续保持",
                "该多运动减肥",
                "快去减肥吧"
            ],
            text = this.getBMIText(),
            index = BMIText.indexOf(text);

        return `您的体重${text}， ${tips[index]}!`
    }

    render() {
        let fatRate;
        if (this.props.rate) {
            fatRate = this.props.rate + '%'
        }
        return (
            <div>
                <div className="height-wrapper">
                    <img src="/img/body.png"/>

                    <div className="line"></div>
                    <div className="text">{this.props.height}CM</div>
                    <KVMap obj={{BMI: this.getBMI(), 体脂: fatRate}}/>
                </div>
                <Echarts option={this.getWeightOpt()} height="300" width="100%"/>
                <Tips text={this.getTips()} fix={true}/>
            </div>
        )
    }
}

module.exports = HeightWeight;
