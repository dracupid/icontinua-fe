let {Button} = ANTD
export default function (props) {
  let content
  if (props.totalRent) {
    content = <div className='total-info'>
      <span>合计 <span
        className='value'>{'¥ ' + (props.totalDeposit + props.totalRent - (props.discount || 0)).toFixed(2)}</span></span>
      &nbsp;(<span>租金 <span className='value'>{'¥ ' + props.totalRent.toFixed(2)}</span></span>&nbsp;+&nbsp;
      <span>押金 <span className='value'>{'¥ ' + props.totalDeposit.toFixed(2)}</span></span>)
    </div>
  } else {
    content = <div className='total-info'>
      <span>租金 <span className='value'>{'¥ ' + props.dayRent.toFixed(2)}/天</span></span>
      <span style={{marginLeft: '15px'}}>押金 <span className='value'>{'¥ ' + props.totalDeposit.toFixed(2)}</span></span>
    </div>
  }
  return <div className='bottom-banner'>
    {content}
    {props.btnContent ? <Button type='primary' className='btn-submit' onClick={props.onClick}>{props.btnContent}</Button> : null}
  </div>
}
