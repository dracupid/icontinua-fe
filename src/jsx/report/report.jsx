/**
 * 单次报告详情页面
 */
import HeightWeight from './single/HeightWeight.jsx'
import Blood from './single/Blood.jsx'
import O2 from './single/O2.jsx'
import Chinese from './single/Chinese.jsx'
import Loading from './../Components/Loading.jsx'
import Banner from './../Components/Banner.jsx'
import {setReport} from './../wechat.jsx'
import Footer from './../Components/Footer.jsx'
import API from '../API/report.jsx'
import reportUtil from './util.jsx'

let {Tabs, Alert} = ANTD
let TabPane = Tabs.TabPane

/**
 * 无数据的组件
 */
function NoDataBLock ({loading, noDataText}) {
  return loading ? <Loading /> : <Alert message={noDataText} type='info' showIcon/>
}

NoDataBLock.propTypes = {
  loading: React.PropTypes.bool,
  noDataText: React.PropTypes.string
}

class Report extends React.Component {
  static propTypes = {
    params: React.PropTypes.object.isRequired
  };

  state = {
    title: '体检报告',
    report: {},
    loaded: false
  };

  /**
   * 数据格式化
   * @param data
   * @returns {{title: (*|string), report: *}}
   */
  formatAndSetState (data) {
    this.setState({
      title: reportUtil.formatDateTime(data.timestamp),
      report: data,
      loaded: true
    })

    return {
      title: reportUtil.formatDateTime(data.timestamp),
      report: data
    }
  }

  componentDidMount () {
    API.report(this.props.params.reportId)
      .then(::this.formatAndSetState)
      .catch((e) => {
        this.setState({
          title: '体检报告',
          loaded: true
        })
        throw e
      })
  }

  getHeightWeight () {
    let {height, weight} = this.state.report
    return (height && weight)
      ? <HeightWeight {...this.state.report}/>
      : <NoDataBLock loading={!this.state.loaded} noDataText='你本次没有测量身体数据'/>
  }

  getBlood () {
    let {sbp, dbp, heartRate, bp, user} = this.state.report
    return (sbp && dbp)
      ? <Blood high={sbp} low={dbp} beat={heartRate} bp={bp} user={user}/>
      : <NoDataBLock loading={!this.state.loaded} noDataText='你本次没有测量血压'/>
  }

  getO2 () {
    let {spo2h, user} = this.state.report
    return (spo2h)
      ? <O2 data={spo2h} user={user}/>
      : <NoDataBLock loading={!this.state.loaded} noDataText='你本次没有测量血氧'/>
  }

  getChinese () {
    let {cacheId} = this.state.report
    return (cacheId)
      ? <Chinese id={cacheId}/>
      : <NoDataBLock loading={!this.state.loaded} noDataText='你本次没有测量生物电'/>
  }

  render () {
    setReport(this.props.params.reportId, this.state.report.user)
    let {userId} = this.props.params
    return (
      <div id='report' className='top-tab-wrapper'>
        <Banner title={this.state.title} backUrl={userId ? '/reports#/' + userId : null}/>
        <Tabs animation={null} size='mini'>
          <TabPane tab='身体' key='1'>{this.getHeightWeight()}</TabPane>
          <TabPane tab='血压' key='2'>{this.getBlood()}</TabPane>
          <TabPane tab='血氧' key='3'>{this.getO2()}</TabPane>
          <TabPane tab='生物电' key='4'>{this.getChinese()}</TabPane>
        </Tabs>
        <Footer />
      </div>
    )
  }
}

export default Report
