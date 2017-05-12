/**
 * Echarts 组件
 */
import Loading from './Loading.jsx'
import Util from '../util.jsx'

class Echarts extends React.Component {
  static propTypes = {
    option: PropTypes.object.isRequired,
    width: PropTypes.any.isRequired,
    height: PropTypes.string.isRequired,
    className: PropTypes.string
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
    Util.getScript(`${location.host.indexOf('icontinua') >= 0 ? '//cdnst.icontinua.com' : ''}/js/lib/echarts.min.js`)
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
        style={{height: this.props.height + 'px', width: this.props.width}} />
    } else {
      return <Loading text='正在生成图表...' />
    }
  }
}

export default Echarts
