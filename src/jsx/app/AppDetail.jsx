/**
 * 应用详情页面
 */
import Loading from '../Components/Loading.jsx'
import Banner from './Components/Banner.jsx'
import appUtil from './util.jsx'
import Img from '../Components/Image.jsx'
import API from '../API/app.jsx'
let {Button, Carousel} = ANTD

/**
 * 格式化应用描述
 * @param text
 * @returns {string}
 */
function formatDesc (text) {
  if (text == null) return ''

  return _.flatten(text.trim().split(/\s\s+/).map((part) => {
    return [part, <br/>, <br/>]
  }))
}

function AppInfo (props) {
  let {imgUrl, name, score, downloadNum, apkUrl, shortDesc} = props.app
  return <div className='app-detail-info'>
    <div className='app-detail-top'>
      <Img src={imgUrl} className='info-icon'/>
      <div className='info-text-wrapper'>
        <h3>{name}</h3>
        <span>{score}<strong>分</strong></span>
        <span>{appUtil.formatDownload(downloadNum) + '人在用'}</span>
      </div>
      <Button type='primary' size='small' onClick={appUtil.toApkUrlFun(apkUrl)}>下载</Button>
    </div>
    <div className='app-detail-down'>
      {shortDesc}
    </div>
  </div>
}

class AppDetail extends React.Component {
  state = {
    data: null,
    title: undefined
  };

  componentDidMount () {
    API.appInfo(this.props.params.uid)
      .then((res) => {
        if (_.isEmpty(res)) {
          location.href = '/apps'
          return
        }
        this.setState({data: res, title: res.name})
      })
  }

  renderInfo () {
    if (this.state.data == null) {
      return <Loading />
    } else {
      let {snapshot, description} = this.state.data
      let snapshotData = snapshot.map((imgUrl) => {
        return <div><Img src={imgUrl} className='snapshot-img'/></div>
      })

      // 应用快照
      let snapshots = _.isEmpty(snapshot)
        ? null
        : <Carousel dots='false' autoplay>{snapshotData}</Carousel>

      return <div>
        <AppInfo app={this.state.data}/>
        {snapshots}
        <div className='app-desc'>
          {formatDesc(description)}
        </div>
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
