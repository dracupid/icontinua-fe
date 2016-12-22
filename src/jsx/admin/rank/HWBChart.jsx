/**
 * 身体趋势页面
 */
import Echarts from '../../Components/Echarts.jsx'
import {baseLineOpt} from '../../report/option.jsx'
import reportUtil from '../../report/util.jsx'

export default class extends React.Component {
  static propTypes = {
    data: React.PropTypes.array.isRequired
  };

  formattedData () {
    let res = {
      xs: [],
      height: [],
      weight: [],
      bmi: []
    }
    _.forEach(this.props.data, (v) => {
      res.xs.push(reportUtil.formatDate(v.timestamp))
      res.height.push(v.h)
      res.weight.push(v.w)
      res.bmi.push(v.bmi.toFixed(2))
    })

    return res
  }

  getOption () {
    let data = this.formattedData()
    let option = {
      dataZoom: null,
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
          min: 0
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
        },
        {
          name: 'BMI',
          type: 'line',
          yAxisIndex: 1,
          data: data.bmi
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
