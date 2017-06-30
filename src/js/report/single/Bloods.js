/**
 * 血液报告组件
 */
import Tips from '../../Components/Tips'
import Rank from '../../Components/Rank'
import Echarts from '../../Components/Echarts'
import { baseGaugeOpt } from '../../report/option'
import reportUtil from '../util'
import API from '../../API/report'

let {Tabs, Alert, Radio} = ANTD
let TabPane = Tabs.TabPane

const {Button: RadioButton, Group: RadioGroup} = Radio
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
      {this.props.title === '血糖' ? <div style={{marginTop: 16, textAlign: 'right'}}>
        <RadioGroup defaultValue={this.props.isGLUBeforeMeal} size='large'
          onChange={this.props.cb}>
          <RadioButton value>餐前</RadioButton>
          <RadioButton value={false}>餐后</RadioButton>
        </RadioGroup>
      </div> : null}
      <Echarts key={this.props.chartKey || undefined}
        option={_getOpt(this.props.data.value.toFixed(2), this.props.title, this.props.unit, this.props.data.normal, this.props.min, this.props.max, this.props.step || 2)}
        height='300' width='100%' />
      <Tips text={this.props.data.advice} fix />
      <Rank obj={{[this.props.title]: this.props.data}} user={this.props.user} />
    </div>
  }
}

class GLU extends React.Component {
  state = {
    isGLUBeforeMeal: null
  }

  render () {
    let {glu, gluBeforeMeal, gluAfterMeal, user, isGLUBeforeMeal, id} = this.props
    if (this.state.isGLUBeforeMeal === null) {
      console.log('no state')
      isGLUBeforeMeal = (isGLUBeforeMeal == null) ? true : isGLUBeforeMeal
    } else {
      console.log('use state', this.state.isGLUBeforeMeal)

      isGLUBeforeMeal = this.state.isGLUBeforeMeal
    }

    console.log('use', isGLUBeforeMeal)

    return (glu)
      ? <BloodTabBlock title='血糖' data={isGLUBeforeMeal ? gluBeforeMeal : gluAfterMeal}
        isGLUBeforeMeal={isGLUBeforeMeal} id={id} user={user} chartKey={isGLUBeforeMeal ? 'C1' : 'C2'}
        unit='mmol/L' min={0} max={10} cb={(v) => {
          console.log(v.target.value)
          this.setState({isGLUBeforeMeal: v.target.value})
          API.gluBeforeMale(id, v.target.value)
        }} />
  : <Alert message={'你本次没有测量血糖'} type='info' showIcon />
  }
}

function getUA (props) {
  let {ua, user} = props
  return (ua)
    ? <BloodTabBlock title='尿酸' data={ua} user={user} unit='μmol/L' min={100} max={500} step={20} />
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
        <TabPane tab='血糖' key='1'><GLU {...props} /></TabPane>
        <TabPane tab='尿酸' key='2'>{getUA(props)}</TabPane>
        <TabPane tab='胆固醇' key='3'>{getCHOL(props)}</TabPane>
        <TabPane tab='血红蛋白' key='4'>{getHb(props)}</TabPane>
      </Tabs>
    </div>
  )
}

export default Bloods
