import Echarts from '../Components/Echarts.jsx'
import Tips from '../Components/Tips.jsx'
import Rank from '../Components/Rank.jsx'
import { baseGaugeOpt } from '../option.jsx'
let {info} = ANTD.Modal

class KVMap extends React.Component {
  static defaultProps = {
    obj: {}
  };

  static propTypes = {
    obj: React.PropTypes.object
  };

  static info (title, content) {
    info({
      title,
      content,
      width: '90%'
    })
  }

  render () {
    let items = []
    let obj = this.props.obj
    for (let key in obj) {
      if (obj[key]) {
        if (window._advice[key]) {
          items.push(
            <div className='key' key={key} onClick={KVMap.info.bind(this, key, window._advice[key])}
                 style={{textDecoration: 'underline'}}>
              {key}
            </div>
          )
        } else {
          items.push(<div className='key' key={key}>{key}</div>)
        }
        items.push(<div className='value' key={obj[key]}>{obj[key]}</div>)
      }
    }
    let columnNum = Math.ceil(items.length / 6)
    let ret = []
    for (let i = 0; i < columnNum; i++) {
      ret.push(
        <div key={i} className={'kv-map flex-' + (i + 1)}>{items.slice(i * 6, (i + 1) * 6)}</div>
      )
    }
    return <div className='kv-map-wrapper'>{ret}</div>
  }
}

class HeightWeight extends React.Component {
  static propTypes = {
    height: React.PropTypes.any.isRequired,
    weight: React.PropTypes.any.isRequired,
    bodyFat: React.PropTypes.any,
    bodyMuscle: React.PropTypes.any,
    bodyKcal: React.PropTypes.any,
    bodyWater: React.PropTypes.any,
    bodyViscera: React.PropTypes.any
  };

  getWeightOpt (bmi = false) {
    let {weight, height, others} = this.props
    weight = weight.value
    height = height.value

    if (! bmi) {
      return _.defaultsDeep({
        series: [
          {
            detail: {
              formatter: '\n\n体重\n{value}KG'
            },
            data: [{
              value: weight
            }],
            min: 0,
            max: 250
          }
        ]
      }, baseGaugeOpt)
    }

    let weightPoints = others.BMI.bounds.map((point) => {
      return point * height * height / 10000
    })
    let min = _.round(Math.min(weightPoints[0] - 10, weight - 10), -1)
    let max = _.round(Math.max(weightPoints[2] + 10, weight + 10), -1)

    min < 0 && (min = 0)

    let percents = weightPoints.map((weight) => {
      return ((weight - min) / (max - min)).toFixed(1)
    })

    return _.defaultsDeep({
      series: [
        {
          detail: {
            formatter: '\n\n体重\n{value}KG'
          },
          axisLine: {
            lineStyle: {
              color: [
                [percents[0], '#DDDF0D'], // 过轻
                [percents[1], '#55BF3B'], // 正常
                [percents[2], '#DDDF0D'], // 过重
                [1, '#DF5353'] // 非常肥胖
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
    }, baseGaugeOpt)
  }

  render () {
    let {bodyFat, bodyMuscle, bodyKcal, bodyWater, bodyViscera, others, height, weight} = this.props
    bodyFat = bodyFat && (bodyFat + ' %')
    bodyMuscle = bodyMuscle && (bodyMuscle + ' %')
    bodyKcal = bodyKcal && (bodyKcal + ' Kcal')
    bodyWater = bodyWater && (bodyWater + ' %')
    bodyViscera = bodyViscera && (bodyViscera + ' %')

    return (
      <div>
        <div className='height-wrapper'>
          <img src='/img/body.png'/>

          <div className='line'></div>
          <div className='text'>身高<br/>{height.value}CM</div>
          <KVMap obj={{BMI: (weight.value / (height.value * height.value / 10000)).toFixed(1), 体脂率: bodyFat, 肌肉量: bodyMuscle,
    基础代谢率: bodyKcal, 含水量: bodyWater, 内脏脂肪量: bodyViscera}}/>
        </div>
        <Echarts option={this.getWeightOpt(this.props.fullLoaded)} height='300' width='100%'/>
        {this.props.fullLoaded ? <Tips text={others.BMI.advice} fix/> : null}
        {this.props.fullLoaded ? <Rank obj={{身高: height.rank, 体重: weight.rank}}/> : null}
      </div>
    )
  }
}

export default HeightWeight
