/**
 * 广告横幅组件
 */

import API from '../API/ad'

export default class AdBanner extends React.Component {
  static propTypes = {
    channel: PropTypes.string,
    positionKey: PropTypes.string,
  }

  state = {
    data: null
  }

  componentDidMount () {
    switch (this.props.channel) {
      case 'zsf':
        API.zsf()
          .then((res) => {
            _.forEach(res, (r) => {
              if (r.key === this.props.positionKey)
                this.setState({data: r})
            })
          })
    }
  }

  render () {
    if (_.get(this.state, 'data.imgFile.filename')) {
      let {text, url, imgFile} = this.state.data
      let imgUrl = '//cdnst.icontinua.com/upload/' + imgFile.filename
      if (url.indexOf('http' !== 0)) url = '//' + url
      return <div className='banner-img-wrapper'>
        <a href={url}><img src={imgUrl}/></a>
        <p className='gg-text'>{text || ''}</p>
      </div>
    } else {
      return null
    }
  }
}
