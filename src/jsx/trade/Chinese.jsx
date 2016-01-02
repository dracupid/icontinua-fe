import Echarts from '../Components/Echarts.jsx'
import Tips from '../Components/Tips.jsx'
import util from '../util.coffee'
import { baseLineOpt } from '../option.coffee'

class Chinese extends React.Component {
  static propTypes = {
    data: React.PropTypes.array.isRequired
  }

  formattedData () {
    let res = {
      xs: [],
      score: []
    }
    let v
    let data = this.props.data

    for (let k in data) {
      v = data[k]
      if (v.cacheScore) {
        res.xs.unshift(util.formatTime(v.timestamp))
        res.score.unshift(parseFloat(v.cacheScore))
      }
    }
    return res
  }

  getOption () {
    let data = this.formattedData()
    let option = {
      legend: {
        data: ['生物电']
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
          name: '得分',
          type: 'value',
          max: 10,
          min: 0
        }
      ],
      series: [
        {
          name: '生物电',
          type: 'line',
          data: data.score
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

export default Chinese
