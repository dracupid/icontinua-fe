import API from '../API/rent'
import Banner from '../Components/Banner'
import util from '../util'
import PlainDeviceItem from './PlainDeviceItem'
let {Button, Icon} = ANTD

function formatState (state) {
  switch (state) {
    case 'CREATED':
      return '待支付'
    case 'PAID':
      return '待发货'
    case 'DELIVERED':
      return '已发货'
    case 'RETURNED':
      return '已归还'
  }

}

function Order (props) {
  let btns = []
  if (props.state === 'CREATED')
    btns.push(<Button key="pay">去支付</Button>)

  let totalCount = props.devices.reduce((prev, cur) => {
    return prev + cur.count
  }, 0)
  return <div className="item-block history-item">
    <div className="h-item-title">
      <div>{util.formatDateTime(props.timestamp)}</div>
      <div style={{color: '#ff5000'}}>{formatState(props.state)}</div>
    </div>
    <div className="h-item-content">
      {props.devices.map(i => <PlainDeviceItem {...i.device} count={i.count} key={i.did} tenancy={props.tenancy}/>)}
    </div>
    <div className="h-item-price">
      <p>共{totalCount}件商品，合计¥{(props.totalRentFen + props.totalDepositFen) / 100}（含押金¥{props.totalDepositFen / 100}）</p>
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


