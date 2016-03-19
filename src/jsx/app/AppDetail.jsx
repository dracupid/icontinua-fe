import util from '../util.jsx'
import Loading from '../Components/Loading.jsx'
import Banner from './Banner.jsx'
let {Button, Carousel} = ANTD
import appUtil from './util.jsx'

function format (num) {
  if (num > 100000) {
    return _.round(num / 10000) + '万'
  } else if (num > 9500) {
    return _.round(num / 10000, 1) + '万'
  } else if (num > 1000) {
    return _.round(num / 1000) + '千'
  } else {
    return num
  }
}

function formatDesc (text) {
  if (text == null) {
    return ''
  }
  let arr = text.trim().split(/\s\s+/).map((part) => {
    return [part, <br/>, <br/>]
  })
  return _.flatten(arr)
}

function AppInfo (props) {
  let {app} = props
  return <div className='app-detail-info'>
    <div className='app-detail-top'>
      <div className='info-icon'>
        <img src={app.imgUrl}/>
      </div>
      <div className='info-text-wrapper'>
        <h3>{app.name}</h3>
        <span>{app.score}<strong>分</strong></span>
        <span>{format(app.downloadNum) + '人在用'}</span>
      </div>
      <Button type='primary' size='small' onClick={appUtil.toApkUrl.bind(this, app.apkUrl)}>
        下载
      </Button>
    </div>
    <div className='app-detail-down'>
      {app.shortDesc}
    </div>
  </div>
}

function AppDesc (props) {
  return <div className='app-desc'>
    {formatDesc(props.text)}
  </div>
}

class AppDetail extends React.Component {
  state = {
    data: null,
    title: undefined
  };

  componentDidMount () {
    util.fetchAPI('/api/app?id=' + this.props.params.uid)
      .then((res) => {
        if (!res.data) {
          location.href = '/apps'
          return
        }
        this.setState({data: res.data, title: res.data.name})
      })
  }

  renderInfo () {
    if (this.state.data == null) {
      return <Loading />
    } else {
      let snapshots = (() => {
        let data = this.state.data.snapshot;
        if (_.isEmpty(data)) {
          return null
        }
        return <Carousel dots="false" autoplay>
          {data.map((imgUrl, i) => {
            return <div><img src={imgUrl} key={i} className="snapshot-img"/></div>
            })}
        </Carousel>
      })()
      return <div>
        <AppInfo app={this.state.data}/>
        {snapshots}
        <AppDesc text={this.state.data.description}/>
      </div>
    }
  }

  render () {
    return <div>
      <Banner title={this.state.title} back/>
      {this.renderInfo()}
    </div>
  }
}

export default AppDetail
