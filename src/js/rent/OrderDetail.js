import Banner from '../Components/Banner'
import DeliveryInfo from './DeliveryInfo'
import API from '../API/rent'
import ItemBlock from './ItemBlock'
import util from '../util'
import { formatState } from './rentUtil'
import PlainDeviceItem from './PlainDeviceItem'
import BottomBanner from './BottomBanner'

export default class OrderDetail extends React.Component {
  state = {
    data: {},
    loaded: false
  }

  componentDidMount () {
    API.orderInfo(this.props.match.params.id)
      .then((data) => {
        this.setState({data, loaded: true})
      })
      .catch((e) => {
        alert('获取历史记录失败')
        throw e
      })
  }

  render () {
    let data = this.state.data
    return <div className='order-info'>
      <Banner title='订单详情' goBack />
      {this.state.loaded ? <div>
        <ItemBlock title='交易状态' content={formatState(data.state)} />
        <DeliveryInfo realName={data.realName} phone={data.phone} address={data.address} />
        <div style={{marginBottom: '20px', color: '#ff5000'}} >
          <ItemBlock title='优惠信息' content={'¥' + (data.discountFen / 100).toFixed(2)} />
        </div>
        <div style={{marginBottom: '20px'}}>
          <ItemBlock title='下单时间' content={util.formatDateTime(data.timestamp)} />
          <ItemBlock title='快递单号' content={data.deliveryNo || '暂无'} />
          <ItemBlock title='订单号' content={data.orderId} />
          <ItemBlock title='租用时间' content={data.tenancy + '天'} />
          <BottomBanner totalRent={data.totalRentFen / 100} totalDeposit={data.totalDepositFen / 100} discount = {data.discountFen / 100} showTotal />
        </div>
        {data.devices.map(i => <PlainDeviceItem {...i.device} count={i.count} key={i.did} tenancy={data.tenancy} />)}
      </div>
        : null
      }
    </div>
  }
}
