export default function PlainDeviceItem (props) {
  return <div className="item-block">
    <img className="item-img" src={props.imgURL}/>
    <div className="item-info">
      <span className="item-name">{props.name}</span>
      <span className="item-intro">{props.intro}</span>
      <span className="item-rent">租金：¥{(props.rentYuan * props.tenancy).toFixed(1)}</span>
      <span className="item-deposit">押金：¥{(props.depositYuan).toFixed(1)}</span>
    </div>
    <div className="item-count">x{props.count}</div>
  </div>
}
