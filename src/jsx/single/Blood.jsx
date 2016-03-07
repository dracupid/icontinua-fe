import Echarts from '../Components/Echarts.jsx'
import Tips from '../Components/Tips.jsx'
import Rank from '../Components/Rank.jsx'
import util from '../util.jsx'
import { baseGaugeOpt } from '../option.jsx'

class Blood extends React.Component {
  static propTypes = {
    high: React.PropTypes.object.isRequired,
    low: React.PropTypes.object.isRequired,
    beat: React.PropTypes.object.isRequired
  };

  _getOpt (full = false, val, text, unit, lines, _min, _max) {
    if (!full) {
      return _.defaultsDeep({
        series: [
          {
            detail: {
              formatter: `{value} ${unit}`
            },
            data: [{
              value: val,
              name: text
            }],
            min: 0,
            max: 200
          }]
      }, baseGaugeOpt)
    }

    let min = util.getMin([val], 10, _min)
    let max = util.getMax([val], 10, _max)

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
                [percents[0], '#DDDF0D'],
                [percents[1], '#55BF3B'],
                [percents[2], '#DDDF0D'],
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
    let {high, low, bp,beat} = this.props
    let width = '200%'
    let height = '300'
    return (
      <div className='blood-tab'>
        <div className='flex-box'>
          <div className='echart-mini-wrapper'>
            <div style={{position: 'relative'}}>
              <Echarts
                option={this._getOpt(this.props.fullLoaded, high.value, '收缩压', 'mmHg', high.bounds, 60, 160, true)}
                height={height}
                width={width} className='mini top-left'/>
            </div>
          </div>

          <div className='echart-mini-wrapper'>
            <div style={{position: 'relative'}}>
              <Echarts
                option={this._getOpt(this.props.fullLoaded, low.value, '舒张压', 'mmHg', low.bounds, 40, 120, true)}
                height={height}
                width={width} className='mini top-right'/>
            </div>
          </div>
        </div>
        <Echarts
          option={this._getOpt(this.props.fullLoaded, beat.value, '心率', 'bpm', [60, 100, 120], 40, 140)} height='300'
          className='bottom-echart'/>
        {this.props.fullLoaded ? <Tips text={bp.advice} fix/> : null}
        {this.props.fullLoaded ? <Rank obj={{收缩压: high.rank, 舒张压: low.rank}}/> : null}
      </div>
    )
  }
}

export default Blood
