/**
 * 血压趋势页面
 */
import Echarts from '../../Components/Echarts.jsx'
import {baseLineOpt} from '../../report/option.jsx'
import reportUtil from '../util.jsx'

class Blood extends React.Component {
  static propTypes = {
    data: React.PropTypes.object.isRequired
  };

  formattedData () {
    let res = {
      xs: [],
      high: [],
      low: [],
      beat: []
    }
    let v
    let data = this.props.data

    for (let k in data) {
      v = data[k]
      if (v.sbp) {
        res.xs.unshift(reportUtil.formatDate(v.timestamp))
        res.high.unshift(~~v.sbp)
        res.low.unshift(~~v.dbp)
        res.beat.unshift(~~v.heartRate)
      }
    }
    return res
  }

  getOption () {
    let data = this.formattedData()
    let option = {
      legend: {
        data: ['伸缩压', '舒张压', '心率']
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: data.xs
        }
      ],
      yAxis: [
        {
          name: '血压(mmHg)',
          type: 'value',
          max: reportUtil.getMax(data.high),
          min: reportUtil.getMin(data.low)
        },
        {
          name: '心率(bpm)',
          type: 'value',
          max: reportUtil.getMax(data.beat),
          min: reportUtil.getMin(data.beat)
        }
      ],
      series: [
        {
          name: '伸缩压',
          type: 'line',
          yAxisIndex: 0,
          data: data.high
        }, {
          name: '舒张压',
          type: 'line',
          yAxisIndex: 0,
          data: data.low
        }, {
          name: '心率',
          type: 'line',
          yAxisIndex: 1,
          data: data.beat
        }
      ]
    }
    return _.defaults(option, baseLineOpt)
  }

  render () {
    return (
      <div>
        <Echarts option={this.getOption()} height='300' width='100%' />
      </div>
    )
  }
}

export default Blood
