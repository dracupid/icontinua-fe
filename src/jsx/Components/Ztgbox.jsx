import Util from '../util.jsx'

export default class extends React.Component {
  state = {
    loaded: false
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
    if (!Util.getParam('channel')) { return <div style={this.props.style}> <ztgbox data-type='0' data-size={`${window.innerWidth}*60`} data-promote={this.props.id} /> </div> } else { return null }
  }
}
