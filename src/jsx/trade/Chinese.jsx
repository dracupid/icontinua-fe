import Echarts from '../Components/Echarts.jsx'
// import Tips from '../Components/Tips.jsx'
import util from '../util.jsx'
import { baseLineOpt } from '../option.jsx'

class Chinese extends React.Component {
  static propTypes = {
    data: React.PropTypes.array.isRequired
  };

  formattedData () {
    let res = {
      xs: [],
      score: [],
      jizhui: [],
      zangfu: [],
      xiaohua: [],
      miniao: []
    }
    let v
    let data = this.props.data

    for (let k in data) {
      v = data[k]
      if (v.cacheId) {
        res.xs.unshift(util.formatTime(v.timestamp))
        res.score.unshift(parseFloat(v.cacheScore))
        res.jizhui.unshift(parseFloat(v.jizhui))
        res.zangfu.unshift(parseFloat(v.zangfu))
        res.xiaohua.unshift(parseFloat(v.xiaohua))
        res.miniao.unshift(parseFloat(v.miniao))
      }
    }
    return res
  }

  getOption () {
    let data = this.formattedData()
    let option = {
      legend: {
        data: ['脊椎', '脏腑', '消化', '泌尿']
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
          name: '脊椎',
          type: 'line',
          data: data.jizhui
        },
        {
          name: '脏腑',
          type: 'line',
          data: data.zangfu
        },
        {
          name: '消化',
          type: 'line',
          data: data.xiaohua
        },
        {
          name: '泌尿',
          type: 'line',
          data: data.miniao
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
