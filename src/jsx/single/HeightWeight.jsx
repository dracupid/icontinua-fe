import Echarts from '../Components/Echarts.jsx'
import Tips from '../Components/Tips.jsx'
import {baseGaugeOpt} from '../option.coffee'
let {info} = ANTD.Modal;

class KVMap extends React.Component {
    static defaultProps = {
        obj: {}
    };

    static info(title, content) {
        info({
            title,
            content,
            width: '90%'
        });
    }

    render() {
        let items = [],
            obj = this.props.obj;
        for (let key in obj) {
            if (obj[key]) {
                if (window._advice[key]) {
                    items.push(
                        <div className='key' key={key}
                             onClick={KVMap.info.bind(this, key, window._advice[key])}
                             style={{textDecoration: 'underline'}}>
                            {key}
                        </div>
                    );
                } else {
                    items.push(<div className='key' key={key}>{key}</div>);
                }
                items.push(<div className='value' key={obj[key]}>{obj[key]}</div>);
            }
        }
        let columnNum = Math.ceil(items.length / 6), ret = [];
        for (let i = 0; i < columnNum; i++) {
            ret.push(
                <div key={i} className={"kv-map flex-" + (i + 1)}>{items.slice(i * 6, (i + 1) * 6)}</div>
            )
        }
        return <div className="kv-map-wrapper">{ret}</div>;
    }
}

class HeightWeight extends React.Component {
    static propTypes = {
        height: React.PropTypes.any.isRequired,
        weight: React.PropTypes.any.isRequired
    };

    getWeightOpt() {
        let {weight, height, result} = this.props,
            weightPoints = result.BMI.bounds.map((point) => {
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
                    }],
                    min: min,
                    max: max
                }
            ]
        }, baseGaugeOpt);
    }

    render() {
        let {bodyFat, bodyMuscle, bodyKcal, bodyWater, bodyViscera, result} = this.props;
        bodyFat = bodyFat && (bodyFat + ' %');
        bodyMuscle = bodyMuscle && (bodyMuscle + ' %');
        bodyKcal = bodyKcal && (bodyKcal + ' Kcal');
        bodyWater = bodyWater && (bodyWater + ' %');
        bodyViscera = bodyViscera && (bodyViscera + ' %');

        if (this.props.bodyFat) {
            bodyFat = this.props.bodyFat + '%'
        }
        return (
            <div>
                <div className="height-wrapper">
                    <img src="/img/body.png"/>

                    <div className="line"></div>
                    <div className="text">{this.props.height}CM</div>
                    <KVMap obj={{BMI: result.BMI.value.toFixed(1), 体脂: bodyFat, 肌肉量: bodyMuscle,
                    基础代谢率: bodyKcal, 含水量: bodyWater, 内脏脂肪量: bodyViscera}}/>
                </div>
                <Echarts option={this.getWeightOpt()} height="300" width="100%"/>
                <Tips text={result.BMI.advice} fix={true}/>
            </div>
        )
    }
}

export default HeightWeight
