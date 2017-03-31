/**
 * 身体报告页面
 */
import Echarts from '../../Components/Echarts.jsx'
import Tips from '../../Components/Tips.jsx'
import Rank from '../../Components/Rank.jsx'
import KVMap from '../../Components/KVmap.jsx'
import {baseGaugeOpt} from '../option.jsx'
import reportUtil from '../util.jsx'

let {getValue, getStringValue, setValue} = reportUtil

function calFat (sex, age, bmi) {
  let fat = (1.2 * bmi) + (0.23 * age) - 5.4 - (10.8 * (sex === '1' ? 1 : 0))
  return fat.toFixed(1)
}

function calBMR (fat, weight) {
  return Math.round(370 + ((21.6 * (100 - fat) * weight) / 100))
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

  /**
   * 获取图片图表参数
   */
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
                [percents[0], '#959613'], // 过轻
                [percents[1], '#55BF3B'], // 正常
                [percents[2], '#959613'], // 过重
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

  static getBodyImgName (bodyFat, sex) {
    let name = ''
    if (sex === '1') {
      name += 'male_'
      if (bodyFat <= 8) name += '8'
      else if (bodyFat > 8 && bodyFat <= 12) name += '12'
      else if (bodyFat > 12 && bodyFat <= 15) name += '15'
      else if (bodyFat > 15 && bodyFat <= 20) name += '20'
      else if (bodyFat > 20 && bodyFat <= 25) name += '25'
      else if (bodyFat > 25 && bodyFat <= 30) name += '30'
      else name += '35'
    } else {
      // female
      name += 'female_'
      if (bodyFat <= 15) name += '15'
      else if (bodyFat > 15 && bodyFat <= 20) name += '20'
      else if (bodyFat > 20 && bodyFat <= 25) name += '25'
      else if (bodyFat > 25 && bodyFat <= 30) name += '30'
      else if (bodyFat > 30 && bodyFat <= 35) name += '35'
      else if (bodyFat > 35 && bodyFat <= 40) name += '40'
      else name += '45'
    }
    return name
  }

  render () {
    let {bodyFat, bodyMuscle, bodyKcal, bodyWater, bodyViscera, bmi, height, weight, user} = this.props
    if (user.age) {
      bodyFat = setValue(bodyFat, getValue(bodyFat) || calFat(user.sex, user.age, getValue(bmi)))
      bodyKcal = setValue(bodyFat, getValue(bodyKcal) || calBMR(bodyFat, getValue(weight)))
    }

    let bodyImage = `//cdnst.icontinua.com/img/body/${HeightWeight.getBodyImgName(bodyFat, user.sex)}.png`

    console.log(bodyImage)

    return (
      <div>
        <div className='height-wrapper'>
          <img src={bodyImage} />
          <div className='line' />
          <div className='text'>身高<br />{_.round(height.value, 1)}CM</div>
          <KVMap
            obj={{
              BMI指数: getValue(bmi).toFixed(1),
              脂肪率: getStringValue(bodyFat, ' %'),
              肌肉量: getStringValue(bodyMuscle, ' %'),
              基础代谢率: getStringValue(bodyKcal, ' kcal'),
              水分: getStringValue(bodyWater, ' %'),
              内脏脂肪: getStringValue(bodyViscera, '')}} />
        </div>
        <Echarts option={this.getWeightOpt()} height='300' width='100%' />
        <Tips text={bmi.advice} fix />
        <Rank obj={{身高: height, 体重: weight}} user={user} />
      </div>
    )
  }
}

export default HeightWeight
