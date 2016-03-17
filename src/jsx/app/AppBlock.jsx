let {Button} = ANTD
import appUtil from './util.jsx'

function AppBlock (props) {
  let {app} = props
  let downLoadBtn = (function () {
    if (!_.isEmpty(app.apkUrl)) {
      return <Button type='primary' size='small' onClick={appUtil.toApkUrl.bind(this, app.apkUrl)}>
        下载
      </Button>
    } else {
      return <Button type='primary' size='small' disabled>不支持下载</Button>
    }
  })()
  return <div className='app-block'>
    <div className='app-img-wrapper' onClick={appUtil.toUrl.bind(this, '/apps#/item/' + app.uid)}>
      <img src={app.imgUrl}/>
    </div>
    <span className='app-block-name'><span>{app.name}</span></span>
    {downLoadBtn}
  </div>
}

AppBlock.propTypes = {
  app: React.PropTypes.object
}

export default AppBlock
