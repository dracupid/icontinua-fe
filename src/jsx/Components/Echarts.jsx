document.body.appendChild(document.createElement('script')).src = '/js/lib/echarts.min.js'

import Loading from './Loading.jsx'

class Echarts extends React.Component {
  static propTypes = {
    option: React.PropTypes.object.isRequired,
    width: React.PropTypes.any.isRequired,
    height: React.PropTypes.string.isRequired,
    className: React.PropTypes.string
  };
  static defaultProps = {
    width: '100%',
    height: '500px'
  };

  initEcharts () {
    let option = this.props.option
    let myChart = window.echarts.init(ReactDOM.findDOMNode(this.refs.echarts), 'macarons')
    myChart.setOption(option, true)
  }

  renderChart () {
    if (window.echarts) {
        this.initEcharts()
    } else {
      let timer = setInterval(() => {
        if (window.echarts) {
          clearInterval(timer)
          this.forceUpdate(this.initEcharts.bind(this))
        }
      }, 100)
    }
  }

  componentDidMount () {
    this.renderChart()
  }

  shouldComponentUpdate () {
    return false
  }

  render () {
    if (window.echarts) {
      return <div
        ref='echarts' className={'echarts ' + (this.props.className || '')}
        style={{height: this.props.height + 'px', width: this.props.width}}/>
    } else {
      return <Loading text='正在生成图表...'/>
    }
  }
}

export default Echarts
