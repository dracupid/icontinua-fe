/**
 * 应用icon块
 */
let {Button} = ANTD
import appUtil from './../util.jsx'
import Image from '../../Components/Image.jsx'
import util from '../../util.jsx'

let disabledBtn = <Button type='primary' size='small' disabled>不支持下载</Button>

function AppBlock ({appData: {apkUrl, name, imgUrl, uid}}) {
  let downLoadBtn = _.isEmpty(apkUrl)
    ? disabledBtn
    : <Button type='primary' size='small' onClick={appUtil.toApkUrlFun(apkUrl)}>下载</Button>

  return <div className='app-block'>
    <Image src={imgUrl} className='app-img-wrapper' onClick={util.toHashUrlFun(`item/${uid}`)}/>
    <span className='app-block-name'>{name}</span>
    {downLoadBtn}
  </div>
}

AppBlock.propTypes = {
  appData: React.PropTypes.object.isRequired
}

export default AppBlock
