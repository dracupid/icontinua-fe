/**
 * Echarts 组件
 */
import Loading from './Loading.jsx'

function getScript (url) {
  return new Promise(function (resolve, reject) {
    let s = document.createElement('script')
    s.async = 'async'
    s.src = url
    let h = document.getElementsByTagName('head')[0]
    s.onload = s.onreadystatechange = function (__, isAbort) {
      if (isAbort || !s.readyState || /loaded|complete/.test(s.readyState)) {
        s.onload = s.onreadystatechange = null
        if (h && s.parentNode) {
          h.removeChild(s)
        }
        s = undefined
        if (isAbort) {
          reject('Load Abort')
        } else {
          resolve()
        }
      } else {
        reject('Load Failed')
      }
    }
    h.insertBefore(s, h.firstChild)
  })
}

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

  state = {
    loaded: false
  };

  constructor (props) {
    super(props)
    getScript(`/js/lib/echarts.min.js`)
      .then(() => {
        this.setState({loaded: true})
        this.forceUpdate(::this.initEcharts)
      })
  }

  initEcharts () {
    let option = this.props.option
    let myChart = window.echarts.init(ReactDOM.findDOMNode(this.refs.echarts), 'macarons')
    myChart.setOption(option, true)
  }

  renderChart () {
    if (this.state.loaded) {
      this.initEcharts()
    }
  }

  componentDidMount () {
    this.renderChart()
  }

  shouldComponentUpdate () {
    return false
  }

  render () {
    if (this.state.loaded) {
      return <div
        ref='echarts' className={'echarts ' + (this.props.className || '')}
        style={{height: this.props.height + 'px', width: this.props.width}}/>
    } else {
      return <Loading text='正在生成图表...'/>
    }
  }
}

export default Echarts
