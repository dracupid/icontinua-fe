import Echarts from '../../Components/Echarts.jsx'
import Tips from '../../Components/Tips.jsx'
import Rank from '../../Components/Rank.jsx'
import reportUtil from '../util.jsx'
import {baseGaugeOpt} from '../../report/option.jsx'
let {getValue} = reportUtil

class Blood extends React.Component {
  static propTypes = {
    high: React.PropTypes.object.isRequired,
    low: React.PropTypes.object.isRequired,
    beat: React.PropTypes.number.isRequired
  };

  _getOpt (val, text, unit, lines, _min, _max) {
    let min = reportUtil.getMin([val], 10, _min)
    let max = reportUtil.getMax([val], 10, _max)

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
                [percents[0], '#959613'],
                [percents[1], '#55BF3B'],
                [percents[2], '#959613'],
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

  render () {
    let {high, low, bp, beat, user} = this.props
    let width = '200%'
    let height = '300'
    return (
      <div className='blood-tab'>
        <div className='flex-box'>
          <div className='echart-mini-wrapper'>
            <div style={{position: 'relative'}}>
              <Echarts
                option={this._getOpt(getValue(high), '收缩压', 'mmHg', high.bounds, 60, 160, true)}
                height={height}
                width={width} className='mini top-left'/>
            </div>
          </div>

          <div className='echart-mini-wrapper'>
            <div style={{position: 'relative'}}>
              <Echarts
                option={this._getOpt(getValue(low), '舒张压', 'mmHg', low.bounds, 40, 120, true)}
                height={height}
                width={width} className='mini top-right'/>
            </div>
          </div>
        </div>
        <Echarts
          option={this._getOpt(getValue(beat), '心率', 'bpm', [60, 100, 120], 40, 140)} height='300'
          className='bottom-echart'/>
        <Tips text={bp.advice} fix/>
        <Rank obj={{收缩压: high, 舒张压: low}} user={user}/>
      </div>
    )
  }
}

export default Blood
