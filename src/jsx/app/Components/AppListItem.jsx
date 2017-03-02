/**
 * 应用列表项
 */
import appUtil from '../util.jsx'
import util from '../../util.jsx'
import Image from '../../Components/Image.jsx'

function AppListItem ({uid, imgUrl, name, downloadNum, slogan, shortDesc}) {
  return <div className='app-list-item' onClick={util.toHashUrlFun('item/' + uid)}>
    <Image src={imgUrl} className='info-icon' />
    <div className='info-text-wrapper'>
      <h3>{name}</h3>
      <span>{name.indexOf('爱康体') >= 0 ? null : (appUtil.formatDownload(downloadNum) + '人在用')}</span>
    </div>
    <div className='app-desc-short'>
      {slogan || shortDesc}
    </div>
  </div>
}

export default AppListItem
