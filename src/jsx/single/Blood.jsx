import Echarts from '../Components/Echarts.jsx'
import Tips from '../Components/Tips.jsx'
import Rank from '../Components/Rank.jsx'
import util from '../util.jsx'
import { baseGaugeOpt } from '../option.jsx'

class Blood extends React.Component {
  static propTypes = {
    resultLow: React.PropTypes.object.isRequired,
    resultHigh: React.PropTypes.object.isRequired,
    resultMain: React.PropTypes.object.isRequired,
    high: React.PropTypes.number.isRequired,
    low: React.PropTypes.number.isRequired,
    beat: React.PropTypes.number.isRequired
  };

  _getOpt (val, text, unit, lines, _min, _max) {
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
    let {resultLow, resultHigh, resultMain} = this.props
    let width = '200%'
    let height = '300'
    return (
      <div className='blood-tab'>
        <div className='flex-box'>
          <div className='echart-mini-wrapper'>
            <div style={{position: 'relative'}}>
              <Echarts
                option={this._getOpt(this.props.high, '收缩压', 'mmHg', resultHigh.bounds, 60, 160, true)}
                height={height}
                width={width} className='mini top-left'/>
            </div>
          </div>

          <div className='echart-mini-wrapper'>
            <div style={{position: 'relative'}}>
              <Echarts
                option={this._getOpt(this.props.low, '舒张压', 'mmHg', resultLow.bounds, 40, 120, true)}
                height={height}
                width={width} className='mini top-right'/>
            </div>
          </div>
        </div>
        <Echarts
          option={this._getOpt(this.props.beat, '心率', 'bpm', [60, 100, 120], 40, 140)} height='300'
          className='bottom-echart'/>
        <Tips text={resultMain.advice} fix/>
        <Rank obj={this.props.rank}/>
      </div>
    )
  }
}

export default Blood
