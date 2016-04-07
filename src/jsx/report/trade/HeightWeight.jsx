import Echarts from '../../Components/Echarts.jsx'
import {baseLineOpt} from '../../report/option.jsx'
import reportUtil from '../util.jsx'

class HeightWeight extends React.Component {
  static propTypes = {
    data: React.PropTypes.object.isRequired
  };

  formattedData () {
    let res = {
      xs: [],
      height: [],
      weight: []
    }
    let v
    let data = this.props.data

    for (let k in data) {
      v = data[k]
      if (v.height) {
        res.xs.unshift(reportUtil.formatTime(v.timestamp))
        res.height.unshift(parseFloat(v.height))
        res.weight.unshift(parseFloat(v.weight))
      }
    }
    return res
  }

  getOption () {
    let data = this.formattedData()
    let option = {
      legend: {
        data: ['身高', '体重']
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
          name: '身高(cm)',
          type: 'value',
          max: reportUtil.getMax(data.height),
          min: reportUtil.getMin(data.height)
        },
        {
          name: '体重(kg)',
          type: 'value',
          max: reportUtil.getMax(data.weight),
          min: reportUtil.getMin(data.weight)
        }
      ],
      series: [
        {
          name: '身高',
          type: 'line',
          yAxisIndex: 0,
          data: data.height
        },
        {
          name: '体重',
          type: 'line',
          yAxisIndex: 1,
          data: data.weight
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

export default HeightWeight
