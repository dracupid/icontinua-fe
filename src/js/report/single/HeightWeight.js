/**
 * 身体报告页面
 */
import Echarts from '../../Components/Echarts'
import Tips from '../../Components/Tips'
import Rank from '../../Components/Rank'
import KVMap from '../../Components/KVmap'
import { baseGaugeOpt } from '../option'
import reportUtil from '../util'
import Targets from '../../Components/Targets'

let {getValue, getStringValue, setValue} = reportUtil

class HeightWeight extends React.Component {
  static propTypes = {
    height: PropTypes.any.isRequired,
    weight: PropTypes.any.isRequired,
    bodyFat: PropTypes.any,
    bodyMuscle: PropTypes.any,
    bodyKcal: PropTypes.any,
    bodyWater: PropTypes.any,
    bodyViscera: PropTypes.any
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
    let {bodyFat, bodyMuscle, bodyKcal, bodyWeight, bodyWater, bodyViscera, boneWeight, tissueFluid, potassium, bmi, height, weight, user, cellWeight, proteinWeight} = this.props
    if (user.age) {
      bodyFat = setValue(bodyFat, getValue(bodyFat) || reportUtil.calFat(user.sex, user.age, getValue(bmi)))
      bodyKcal = setValue(bodyFat, getValue(bodyKcal) || reportUtil.calBMR(bodyFat, getValue(weight)))
    }

    let bodyImage = `//cdnst.icontinua.com/img/body/${HeightWeight.getBodyImgName(bodyFat, user.sex)}.png`

    return (
      <div>
        <div className='height-wrapper'>
          <img src={bodyImage} />
          <div className='line' />
          <div className='text'>身高<br />{_.round(height.value, 1)}CM</div>
          <KVMap
            obj={{
              BMI指数: getValue(bodyWeight || bmi).toFixed(1),
              脂肪率: getStringValue(bodyFat, ' %'),
              肌肉量: getStringValue(bodyMuscle, ' %'),
              基础代谢率: getStringValue(bodyKcal, ' kcal'),
              人体水含量: getStringValue(bodyWater, ' %'),
              内脏脂肪: getStringValue(bodyViscera, '%'),
              骨重量: getStringValue(boneWeight, 'kg'),
              体细胞重量: getStringValue(cellWeight, '%'),
              细胞间液含量: getStringValue(tissueFluid, '%'),
              钾含量: getStringValue(potassium, 'mol'),
              蛋白质含量: getStringValue(proteinWeight, 'kg')
            }} />
        </div>
        <Echarts option={this.getWeightOpt()} height='300' width='100%' />
        <Tips text={bmi.advice} fix />
        <Targets type='体型' data={this.props} />
        <Rank obj={{身高: height, 体重: weight}} user={user} />
      </div>
    )
  }
}

export default HeightWeight
