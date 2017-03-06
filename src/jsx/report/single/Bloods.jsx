/**
 * 血液报告组件
 */
import Tips from '../../Components/Tips.jsx'
import Rank from '../../Components/Rank.jsx'
import Echarts from '../../Components/Echarts.jsx'
import {baseGaugeOpt} from '../../report/option.jsx'
import reportUtil from '../util.jsx'

let {Tabs, Alert} = ANTD
let TabPane = Tabs.TabPane

/**
 * 获取图表参数
 */
function _getOpt (val, text, unit, lines, _min, _max, step) {
  let min = reportUtil.getMin([val], step, _min)
  let max = reportUtil.getMax([val], step, _max)

  let percents = lines.map((item) => {
    return ((item - min) / (max - min))
  })
  return _.defaultsDeep({
    series: [
      {
        detail: {
          formatter: `{value} ${unit}`
        },
        axisLine: {
          lineStyle: {
            color: [
              [percents[0], '#DF5353'],
              [percents[1], '#55BF3B'],
              [1, '#DF5353']
            ]
          }
        },
        data: [{
          value: val,
          name: text
        }],
        min: min,
        max: max
      }]
  }, baseGaugeOpt)
}

class BloodTabBlock extends React.Component {
  render () {
    return <div>
      <Echarts option={_getOpt(this.props.data.value, this.props.title, this.props.unit, this.props.data.normal, this.props.min, this.props.max, this.props.step || 2)} height='300' width='100%' />
      <Tips text={this.props.data.advice} fix />
      <Rank obj={{[this.props.title]: this.props.data}} user={this.props.user} />
    </div>
  }
}
// <Echarts option={this._getOpt(value, this.props.title, this.props.unit, this.data.normal, 0, 0)} height='300' width='100%'/>

function getGLU (props) {
  let {glu, user} = props
  return (glu)
    ? <BloodTabBlock title='血糖' data={glu} user={user} unit='mmol/L' min={0} max={10} />
    : <Alert message={'你本次没有测量血糖'} type='info' showIcon />
}

function getUA (props) {
  let {ua, user} = props
  return (ua)
    ? <BloodTabBlock title='尿酸' data={ua} user={user} unit='μmol/L' min={1000} max={5000} step={200} />
    : <Alert message={'你本次没有测量尿酸'} type='info' showIcon />
}

function getCHOL (props) {
  let {chol, user} = props
  return (chol)
    ? <BloodTabBlock title='胆固醇' data={chol} user={user} unit='mmol/L' min={0} max={10} />
    : <Alert message={'你本次没有测量胆固醇'} type='info' showIcon />
}

function getHb (props) {
  let {hb, user} = props
  return (hb)
    ? <BloodTabBlock title='血红蛋白' data={hb} user={user} unit='mmol/L' min={0} max={20} />
    : <Alert message={'你本次没有测量血红蛋白'} type='info' showIcon />
}

function Bloods (props) {
  return (
    <div>
      <Tabs animated={false} size='mini' style={{marginTop: '-20px'}}>
        <TabPane tab='血糖' key='1'>{getGLU(props)}</TabPane>
        <TabPane tab='尿酸' key='2'>{getUA(props)}</TabPane>
        <TabPane tab='胆固醇' key='3'>{getCHOL(props)}</TabPane>
        <TabPane tab='血红蛋白' key='4'>{getHb(props)}</TabPane>
      </Tabs>
    </div>
  )
}

export default Bloods
