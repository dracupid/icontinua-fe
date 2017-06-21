let {Button} = ANTD
export default function (props) {
  return <div className="bottom-banner">
    <div className="total-info">
      {props.totalRent ? <span>租金：<span className="value">{'¥ ' + props.totalRent.toFixed(1)}</span></span> :
       <span>租金：<span className="value">{'¥ ' + props.dayRent.toFixed(1)}/天</span></span>
      }
      <span style={{marginLeft: '15px'}}>押金：<span className="value">{'¥ ' + props.totalDeposit.toFixed(1)}</span></span>
      {props.showTotal ? <span style={{marginLeft: '15px'}}>总计：<span
        className="value">{'¥ ' + (props.totalDeposit + props.totalRent).toFixed(1)}</span></span> : null}
    </div>
    {props.btnContent ?
     <Button type="primary" className="btn-submit" onClick={props.onClick}>{props.btnContent}</Button> : null}
  </div>
}
