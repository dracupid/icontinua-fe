import Echarts from '../Components/Echarts.jsx'
// import Tips from '../Components/Tips.jsx'
import util from '../util.jsx'
import { baseLineOpt } from '../option.jsx'

class O2 extends React.Component {
  static propTypes = {
    data: React.PropTypes.array.isRequired
  };

  formattedData () {
    let res = {
      xs: [],
      O2: []
    }
    let v
    let data = this.props.data

    for (let k in data) {
      v = data[k]
      if (v.spo2h) {
        res.xs.unshift(util.formatTime(v.timestamp))
        res.O2.unshift(parseFloat(v.spo2h))
      }
    }
    return res
  }

  getOption () {
    let data = this.formattedData()
    let option = {
      legend: {
        data: ['血氧']
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
          name: '血氧(%)',
          type: 'value',
          max: util.getMax(data.O2),
          min: util.getMin(data.O2)
        }
      ],
      series: [
        {
          name: '血氧',
          type: 'line',
          data: data.O2
        }
      ]
    }
    return _.defaults(option, baseLineOpt)
  }

  render () {
    return (
      <div>
        <Echarts option={this.getOption()} height='300' width='100%'/>
      </div>
    )
  }
}

export default O2
