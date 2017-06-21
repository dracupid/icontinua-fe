import { openAddress } from '../wechat'
import API from '../API/rent'
import Banner from '../Components/Banner'
import PlainDeviceItem from './PlainDeviceItem'
import DeliveryInfo from './DeliveryInfo'
import BottomBanner from './BottomBanner'
import util from '../util'
let {Tree, Icon} = ANTD
const TreeNode = Tree.TreeNode

function DeviceItem (props) {
  return <div className='item-block'>
    <img className='item-img' src={props.imgURL} />
    <div className='item-info'>
      <span className='item-name'>{props.name}</span>
      <span className='item-intro'>{props.intro}</span>
      <span className='item-rent'>租金（天／台）：¥{props.rentYuan.toFixed(1)}</span>
      <span className='item-deposit'>押金（台）：¥{props.depositYuan.toFixed(1)}</span>
    </div>
    {props.selected ? <NumberSelector initialValue={1} onChange={props.onNumChange} min={1} max={100} /> : null}
  </div>
}

class NumberSelector extends React.Component {
  state = {
    value: this.props.initialValue || 0
  }

  minusOne (e) {
    e.stopPropagation()
    const value = this.state.value - (this.props.step || 1)
    if (value >= this.props.min || 0) { this.setState({value}, () => this.props.onChange(value)) }
  }

  addOne (e) {
    e.stopPropagation()
    const value = this.state.value + (this.props.step || 1)
    if (value <= this.props.max || 100) { this.setState({value: value}, () => this.props.onChange(value)) }
  }

  render () {
    return <div className='number-selector-wrapper' onClick={(e) => { e.stopPropagation() }}>
      <div className={'number-selector ' + (this.props.size || '')}>
        <Icon type='minus' onClick={::this.minusOne} />
        <div className='num'>{this.state.value}</div>
        <Icon type='plus' onClick={::this.addOne} />
      </div>
    </div>
  }
}

export default class RentDevicePage extends React.Component {
  state = {
    realName: '',
    phone: '',
    address: '',
    devices: [],
    deviceMap: {},
    deviceCount: {},
    submitted: false,
    tenancy: 15
  }

  componentDidMount () {
    let deviceMap = {}
    API.listRentDevices()
      .then((data) => {
        data.forEach((type) => {
          type.items.forEach(item => {
            deviceMap[item.did] = item
          })
        })
        this.setState({devices: data, deviceMap})
      })
      .catch(() => {
        alert('获取设备列表失败')
      })
  }

  openAddress () {
    openAddress().then((res) => {
      this.setState({
        realName: res.userName,
        phone: res.telNumber,
        address: `${res.provinceName}  ${res.cityName} ${res.countryName} ${res.detailInfo}`
      })
    }).catch(() => {
      alert('地址填写失败，请重试')
    })
  }

  calMoney (includeTenancy = false) {
    let totalRent = 0
    let totalDeposit = 0
    let totalCount = 0
    let deviceCount = this.state.deviceCount
    for (let did in deviceCount) {
      let info = this.state.deviceMap[did]
      totalCount += deviceCount[did]
      totalRent += info.rentYuan * deviceCount[did] * (includeTenancy ? this.state.tenancy : 1)
      totalDeposit += info.depositYuan * deviceCount[did]
    }
    return {totalRent, totalDeposit, totalCount}
  }

  onCheck (r) {
    let deviceCount = {}
    r.forEach((item) => {
      if (item.indexOf('TYPE_') < 0) deviceCount[item] = 1
    })

    this.setState({deviceCount})
  }

  onSelect (r, d) {
    let key = d.node.props.eventKey
    let deviceCount = this.state.deviceCount
    if (key in deviceCount) {
      delete deviceCount[key]
    } else {
      deviceCount[key] = 1
    }
    this.setState({deviceCount})
  }

  submit () {
    let {totalCount} = this.calMoney()
    if (totalCount === 0) {
      alert('您还没有选择设备')
    } else {
      this.setState({submitted: true})
    }
  }

  pay () {
    let {realName, address, phone} = this.state
    if (!realName) {
      // alert("清先填写收货信息") //////////////////////////////////////////////////////////////////////////////////
      // return

      realName = '测试1'
      address = '测试地址'
      phone = '18888888888'
    }
    let {totalRent, totalDeposit} = this.calMoney(true)
    let devices = _.map(this.state.deviceCount, (v, k) => { return {did: k, count: v} })
    API.payOrder(devices, realName, address, phone, this.state.tenancy, totalRent, totalDeposit)
      .then(({timeStamp, nonceStr, _package, signType, paySign}) => {
        // return tenPay(timeStamp, nonceStr, _package, signType, paySign)
        return Promise.resolve()
      })
      .then(() => {
        alert('测试支付成功')
        util.toHash('history')
      })
      .catch((e) => {
        console.log(e)
        alert('支付失败')
      })
  }

  changeNum (id, value) {
    let deviceCount = this.state.deviceCount
    deviceCount[id] = value
    this.setState({deviceCount})
  }

  changeTenancy (value) {
    this.setState({tenancy: value})
  }

  render () {
    if (!this.state.submitted) {
      let {totalRent, totalDeposit, totalCount} = this.calMoney()

      let expandedKeys = []
      const loopNodes = ((data) => data.map((item) => {
        if (item) {
          let cKey = 'TYPE_' + item.type
          expandedKeys.push(cKey)
          return <TreeNode title={item.type} key={cKey} style={{fontSize: '1.2em'}}>
            {item.items.map(device => <TreeNode
              title={<DeviceItem {...device} selected={!!this.state.deviceCount[device.did]}
                onNumChange={this.changeNum.bind(this, device.did)} />} key={device.did} />)}
          </TreeNode>
        }
      }))(this.state.devices)

      return <div>
        <Banner title='设备列表' goBack rightComponent={
          <a className='btn-history' href={'/html/rent.html#/history'}>历史订单</a>
        } />
        <Tree checkable
          defaultExpandedAll
          expandedKeys={expandedKeys}
          checkedKeys={_.keys(this.state.deviceCount)}
          onSelect={::this.onSelect}
          onCheck={::this.onCheck}>
          {loopNodes}
        </Tree>
        <BottomBanner dayRent={totalRent} totalDeposit={totalDeposit} onClick={::this.submit}
          btnContent={'结算(' + (totalCount || 0) + ')'} />
      </div>
    } else {
      let {totalRent, totalDeposit} = this.calMoney(true)

      const loopNodes = _.map(this.state.deviceCount, (count, id) => {
        return <PlainDeviceItem {...this.state.deviceMap[id]} key={id} count={count} tenancy={this.state.tenancy} />
      })

      return <div className='submitted'>
        <Banner title='确认订单' onBack={() => this.setState({submitted: false})} />
        <DeliveryInfo realName={this.state.realName} phone={this.state.phone} address={this.state.address}
          onClick={::this.openAddress} />

        <div className='delivery-info-wrapper'>
          <div>租用时间（天）</div>
          <NumberSelector initialValue={this.state.tenancy} onChange={::this.changeTenancy} min={15} max={999}
            step={15} size='large' />
        </div>

        <div>{loopNodes}</div>
        <BottomBanner totalRent={totalRent} totalDeposit={totalDeposit} onClick={::this.pay} btnContent='微信支付'
          showTotal />
      </div>
    }
  }
}
