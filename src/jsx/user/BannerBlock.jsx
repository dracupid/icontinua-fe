let {Icon} = ANTD

function BannerBlock ({icon, text, url}) {
  return <div className='btn-block block' onClick={() => { url && (location.href = url) }}>
    <div className='block-icon'>
      <Icon type={icon}/>
    </div>
    <div className='block-text'>
      {text}
    </div>
    <div className='block-icon block-icon-right'>
      <Icon type='right'/>
    </div>
  </div>
}

export default BannerBlock
