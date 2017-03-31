import Util from '../util.jsx'

export default class extends React.Component {
  state = {
    loaded: false
  };

  constructor (props) {
    super(props)
  }

  renderAd () {
    Util.getScript('//static.zhongan.com/website/open/assets/js/public/ztg/1.0.0/ztgapi.js')
      .then(() => {
        this.setState({loaded: true})
      })
  }

  componentDidMount () {
    this.renderAd()
  }

  shouldComponentUpdate () {
    return false
  }

  render () {
    console.log('ztgbox')
    return <ztgbox {...this.props} />
  }
}
