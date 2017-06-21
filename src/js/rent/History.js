import API from '../API/rent'
import Banner from '../Components/Banner'
import util from '../util'
import PlainDeviceItem from './PlainDeviceItem'
import { formatState } from './rentUtil'
let {Button} = ANTD

function repayOrder (id) {
  API.rePay(id)
    .then(() => {
      alert('支付成功')
    })
    .catch(() => {
      alert('支付失败')
    })
}

function Order (props) {
  let btns = []
  if (props.state === 'CREATED')
    btns.push(<Button key="pay" onClick={repayOrder.bind(this, props.orderId)}>去支付</Button>)

  let totalCount = props.devices.reduce((prev, cur) => {
    return prev + cur.count
  }, 0)
  return <div className="history-item" onClick={util.toHash.bind(this, 'order/' + props.orderId)}>
    <div className="h-item-title">
      <div>{util.formatDateTime(props.timestamp)}</div>
      <div style={{color: '#ff5000'}}>{formatState(props.state)}</div>
    </div>
    <div className="h-item-content">
      {props.devices.map(i => <PlainDeviceItem {...i.device} count={i.count} key={i.did} tenancy={props.tenancy}/>)}
    </div>
    <div className="h-item-price">
      <p>共{totalCount}件商品，合计<span className="value">{' ¥ ' + (props.totalRentFen + props.totalDepositFen) / 100}</span>
        （含押金<span className="value">{' ¥ ' + props.totalDepositFen / 100}</span>）</p>
    </div>
    {btns.length > 0 ? <div className="h-item-btns">{btns}</div> : null}

  </div>
}

export default class History extends React.Component {
  state = {
    data: []
  }

  componentDidMount () {
    API.rentHistory()
      .then((data) => {
        this.setState({data})
      })
      .catch((e) => {
        alert('获取历史记录失败')
        throw e
      })
  }

  render () {
    return <div>
      <Banner title="历史订单" goBack/>
      <div>
        {this.state.data.map(item => <Order {...item} key={item.orderId}/>)}
      </div>
    </div>
  }
}


