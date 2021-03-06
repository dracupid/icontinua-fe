/**
 * 应用icon块
 */
import appUtil from './../util'
import Image from '../../Components/Image'
import util from '../../util'
let {Button} = ANTD

let disabledBtn = <Button type='primary' size='small' disabled>不支持下载</Button>

function AppBlock ({appData: {apkUrl, name, imgUrl, uid}}) {
  let downLoadBtn = _.isEmpty(apkUrl)
    ? disabledBtn
    : <Button type='primary' size='small' onClick={appUtil.toApkUrlFun(apkUrl)}>下载</Button>

  return <div className='app-block'>
    <Image src={imgUrl} className='app-img-wrapper' onClick={util.toHashUrlFun(`item/${uid}`)} />
    <span className='app-block-name'>{name}</span>
    {downLoadBtn}
  </div>
}

AppBlock.propTypes = {
  appData: PropTypes.object.isRequired
}

export default AppBlock
