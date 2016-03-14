import Echarts from '../Components/Echarts.jsx'
import Tips from '../Components/Tips.jsx'
import Rank from '../Components/Rank.jsx'
import KVMap from '../Components/KVmap.jsx'
import { baseGaugeOpt } from '../option.jsx'
import util from '../util.jsx'
let {getValue, getStringValue} = util

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

  getWeightOpt () {
    let {weight, height, bmi} = this.props
    weight = weight.value
    height = height.value

    let weightPoints = bmi.bounds.map((point) => {
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
    let {bodyFat, bodyMuscle, bodyKcal, bodyWater, bodyViscera, bmi, height, weight, user} = this.props

    return (
      <div>
        <div className='height-wrapper'>
          <img src='/img/body.png'/>
          <div className='line'></div>
          <div className='text'>身高<br/>{height.value}CM</div>
          <KVMap obj={{BMI: getValue(bmi).toFixed(1), 体脂率: getStringValue(bodyFat, ' %'),
            肌肉量: getStringValue(bodyMuscle, ' %'), 基础代谢率: getStringValue(bodyKcal, ' Kcal'),
            含水量: getStringValue(bodyWater, ' %'), 内脏脂肪量: getStringValue(bodyViscera, ' %')}}/>
        </div>
        <Echarts option={this.getWeightOpt()} height='300' width='100%'/>
        <Tips text={bmi.advice} fix/>
        <Rank obj={{身高: height.rank, 体重: weight.rank}} user={user}/>
      </div>
    )
  }
}

export default HeightWeight
