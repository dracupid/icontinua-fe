import HeightWeight from './trade/HeightWeight.jsx'
import Blood from './trade/Blood.jsx'
import O2 from './trade/O2.jsx'
import Chinese from './trade/Chinese.jsx'
import Loading from './Components/Loading.jsx'

let {Tabs, Alert} = ANTD
let TabPane = Tabs.TabPane

class ReportTrade extends React.Component {
  static propTypes = {
    data: React.PropTypes.array
  };

  getHeightWeight () {
    let {data} = this.props
    if (data !== null) {
      if (_(data).pluck('height').compact().run().length > 0) {
        return <HeightWeight data={data}/>
      } else {
        return <Alert message='您还没有测量过身体数据' type='info' showIcon/>
      }
    } else {
      return <Loading />
    }
  }

  getBlood () {
    let {data} = this.props
    if (data !== null) {
      if (_(data).pluck('sbp').compact().run().length > 0) {
        return <Blood data={data}/>
      } else {
        return <Alert message='您还没有测量过血压' type='info' showIcon/>
      }
    } else {
      return <Loading />
    }
  }

  getO2 () {
    let {data} = this.props
    if (data !== null) {
      if (_(data).pluck('spo2h').compact().run().length > 0) {
        return <O2 data={data}/>
      } else {
        return <Alert message='您还没有测量过血氧' type='info' showIcon/>
      }
    } else {
      return <Loading />
    }
  }

  getChinese () {
    let {data} = this.props
    if (data !== null) {
      if (_(data).pluck('cacheScore').compact().run().length > 0) {
        return <Chinese data={data}/>
      } else {
        return <Alert message='您还没有进行过生物电检测' type='info' showIcon/>
      }
    } else {
      return <Loading />
    }
  }

  render () {
    return (
      <div id='report-trade' className='top-tab-wrapper'>
        <Tabs size='mini'>
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
