let {Icon} = ANTD

export default function DeliveryInfo (props) {
  return <div className='delivery-info-wrapper' onClick={props.onClick || null}>
    {(() => {
      if (props.realName) {
        return <div className='delivery-info'>
          <div className='d-user-info'>
            <span>收货人：{props.realName}</span><span>{props.phone}</span>
          </div>
          <div>收货地址：{props.address}</div>
        </div>
      } else {
        return <div>请填写收货信息</div>
      }
    })()}
    {props.onClick ? <Icon type='right' className='d-icon' /> : null}

  </div>
}
