import HeightWeight from './single/HeightWeight.jsx'
import Blood from './single/Blood.jsx'
import O2 from './single/O2.jsx'
import Chinese from './single/Chinese.jsx'
import Loading from './Components/Loading.jsx'
import Banner from './Components/Banner.jsx'
import {setReport} from './wechat.jsx'
import util from './util.jsx'

let {Tabs, Alert} = ANTD
let TabPane = Tabs.TabPane

function NoDataBLock (props) {
  if (props.loading) {
    return <Loading />
  } else {
    return <Alert message={props.noDataText} type='info' showIcon/>
  }
}

NoDataBLock.propTypes = {
  loading: React.PropTypes.bool,
  noDataText: React.PropTypes.string
}


class Report extends React.Component {
  static propTypes = {
    params: React.PropTypes.object.isRequired
  };

  constructor (props) {
    super(props)
  }

  state = {
    title: '体检报告',
    report: {},
    loaded: false
  };

  formatAndSetState (data) {
    this.setState({
      title: util.formatDateTime(data.timestamp),
      report: data,
      loaded: true
    })

    return {
      title: util.formatDateTime(data.timestamp),
      report: data
    }
  }

  fetchFailedHandler () {
    this.setState({
      title: '体检报告',
      loaded: true
    })
  }

  componentDidMount () {
    let promise = Promise.resolve()

    if (window._advice == null) {
      promise = fetch('/data/advice.json')
        .then((res) => {
          return res.json()
        })
        .then((res) => {
          window._advice = res
        })
        .catch((e) => {
          console.error(e)
          this.fetchFailedHandler()
        })
    }


    promise.then(() => {
      let reportId = this.props.params.reportId

      if (!_.isEmpty(window._fullReportData[reportId])) { // 完整数据
        this.formatAndSetState(window._fullReportData[reportId])
      } else {
        util.fetchAPI('/api/report?rank=true&diagnose=true&reportId=' + reportId)
          .then((res) => {
            this.formatAndSetState(res.data)
            window._fullReportData[reportId] = res.data
          })
          .catch((e) => {
            console.error(e)
            this.fetchFailedHandler()
          })
      }
    })
  }

  getHeightWeight () {
    let {height, weight} = this.state.report
    if (height && weight) {
      return <HeightWeight {...this.state.report}/>
    } else {
      return <NoDataBLock loading={!this.state.loaded} noDataText='你本次没有测量身体数据'/>
    }
  }

  getBlood () {
    let {sbp, dbp, heartRate, bp, user} = this.state.report
    if (sbp && dbp) {
      return <Blood high={sbp} low={dbp} beat={heartRate} bp={bp} user={user}/>
    } else {
      return <NoDataBLock loading={!this.state.loaded} noDataText='你本次没有测量血压'/>
    }
  }

  getO2 () {
    let {spo2h, user} = this.state.report
    if (spo2h) {
      return <O2 data={spo2h} user={user}/>
    } else {
      return <NoDataBLock loading={!this.state.loaded} noDataText='你本次没有测量血氧'/>
    }
  }

  getChinese () {
    let {cacheId} = this.state.report
    if (cacheId) {
      return <Chinese id={cacheId}/>
    } else {
      return <NoDataBLock loading={!this.state.loaded} noDataText='你本次没有测量生物电'/>
    }
  }

  render () {
    setReport(this.props.params.reportId)
    let {userId} = this.props.params
    return (
      <div id='report' className='top-tab-wrapper'>
        <Banner title={this.state.title} backUrl={userId ? '/reports#/' + userId : null}/>
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

export default Report
