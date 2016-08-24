/**
 * 列表项组件
 */
import util from '../util.jsx'

let {Icon} = ANTD

function BannerBlock ({icon, text, url, style}) {
  return <div className='btn-block block' onClick={() => { url && (util.toUrl(url)) }} style={style}>
    {icon ? <div className='block-icon block-icon-left'><Icon type={icon} /></div> : null}
    <div className='block-text'>
      {text}
    </div>
    <div className='block-icon block-icon-right'>
      <Icon type='right' />
    </div>
  </div>
}

export default BannerBlock
