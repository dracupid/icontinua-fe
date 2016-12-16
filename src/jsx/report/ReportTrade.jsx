/**
 * 历史数据趋势页面组件
 */
import HeightWeight from './trade/HeightWeight.jsx'
import Blood from './trade/Blood.jsx'
import O2 from './trade/O2.jsx'
import Chinese from './trade/Chinese.jsx'
import Loading from '../Components/Loading.jsx'

let {Tabs, Alert} = ANTD
let TabPane = Tabs.TabPane

/**
 * 是否存在某个测量项的历史数据
 * @param data
 * @param name
 * @returns {boolean}
 */
function hasItem (data, name) {
  return _(data).pluck(name).compact().run().length > 0
}

class ReportTrade extends React.Component {
  static propTypes = {
    data: React.PropTypes.object
  };

  getHeightWeight () {
    let {data} = this.props
    if (data !== null) {
      return hasItem(data, 'height')
        ? <HeightWeight data={data} />
        : <Alert message='您还没有测量过身体数据' type='info' showIcon />
    } else {
      return <Loading />
    }
  }

  getBlood () {
    let {data} = this.props
    if (data !== null) {
      return hasItem(data, 'sbp')
        ? <Blood data={data} />
        : <Alert message='您还没有测量过血压' type='info' showIcon />
    } else {
      return <Loading />
    }
  }

  getO2 () {
    let {data} = this.props
    if (data !== null) {
      return hasItem(data, 'spo2h')
        ? <O2 data={data} />
        : <Alert message='您还没有测量过血氧' type='info' showIcon />
    } else {
      return <Loading />
    }
  }

  getChinese () {
    let {data} = this.props
    if (data !== null) {
      return hasItem(data, 'cacheId')
        ? <Chinese data={data} />
        : <Alert message='您还没有进行过生物电检测' type='info' showIcon />
    } else {
      return <Loading />
    }
  }

  render () {
    return (
      <div id='report-trade' className='top-tab-wrapper'>
        <Tabs size='mini' animated={false}>
          <TabPane tab='身体' key='1'>{this.getHeightWeight()}</TabPane>
          <TabPane tab='血压' key='2'>{this.getBlood()}</TabPane>
          <TabPane tab='血氧' key='3'>{this.getO2()}</TabPane>
          <TabPane tab='生物电' key='4'>{this.getChinese()}</TabPane>
        </Tabs>
      </div>
    )
  }
}

export default ReportTrade
