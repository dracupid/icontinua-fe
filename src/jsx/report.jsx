import HeightWeight from './single/HeightWeight.jsx'
import Blood from './single/Blood.jsx'
import O2 from './single/O2.jsx'
import Chinese from './single/Chinese.jsx'
import Loading from './Components/Loading.jsx'
import Banner from './Components/Banner.jsx'
import wechat from './wechat.jsx'

let {Tabs, Alert} = ANTD
let TabPane = Tabs.TabPane

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

  fetchFailedHandler () {
    this.setState({
      title: '体检报告',
      loaded: true
    })
  }

  static formatTime (t) {
    if (!t) return '体检报告'

    let date = new Date(parseInt(t, 10))
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 \n` +
      `${_.padLeft(date.getHours(), 2, 0)}:${_.padLeft(date.getMinutes(), 2, 0)}`
  }

  componentDidMount () {
    let promise = $.Deferred().resolve()
    if (window._advice == null) {
      promise = $.getJSON('/data/advice.json')
        .then((res) => {
          window._advice = res
        })
        .fail((e) => {
          console.error(e)
          this.fetchFailedHandler()
        })
    }
    promise.then(() => {
      let reportId = this.props.params.reportId
      if (!_.isEmpty(window._reportData[reportId])) {
        this.setState({
          title: Report.formatTime(window._reportData[reportId].timestamp),
          report: window._reportData[reportId],
          loaded: true
        })
        return
      }
      $.getJSON('/api/report?rank=true&diagnose=true&reportId=' + reportId)
        .then((res) => {
          if (res.status === 200) {
            window._reportData[reportId] = {
              title: Report.formatTime(res.data.timestamp),
              report: res.data
            }
            this.setState({
              title: Report.formatTime(res.data.timestamp),
              report: res.data,
              loaded: true
            })
          } else {
            this.fetchFailedHandler()
          }
        })
        .fail((e) => {
          console.error(e)
          this.fetchFailedHandler()
        })
    })
  }

  getHeightWeight () {
    let {height, weight, rank} = this.state.report
    if (this.state.loaded) {
      if (height && weight) {
        return <HeightWeight {...this.state.report} rank={{身高: rank.height, 体重: rank.weight}}/>
      } else {
        return <Alert
          message='你本次没有测量身体数据'
          type='info' showIcon/>
      }
    } else {
      return <Loading />
    }
  }

  getBlood () {
    let {sbp, dbp, heartRate, result, rank} = this.state.report
    if (this.state.loaded) {
      if (sbp && dbp) {
        return <Blood high={~~sbp} low={~~dbp} beat={~~heartRate}
                      resultHigh={result.sbp}
                      resultLow={result.dbp}
                      resultMain={result.bp}
                      rank={{收缩压: rank.sbp, 舒张压: rank.dbp}}/>
      } else {
        return <Alert
          message='你本次没有测量血压'
          type='info' showIcon/>
      }
    } else {
      return <Loading />
    }
  }

  getO2 () {
    let {spo2h, result, rank} = this.state.report
    if (this.state.loaded) {
      if (spo2h) {
        return <O2 value={~~spo2h} result={result.spo2h} rank={{血氧值: rank.spo2h}}/>
      } else {
        return <Alert
          message='你本次没有测量血氧'
          type='info' showIcon/>
      }
    } else {
      return <Loading />
    }
  }

  getChinese () {
    let {cacheId} = this.state.report
    if (this.state.loaded) {
      if (cacheId) {
        return <Chinese id={cacheId}/>
      } else {
        return <Alert
          message='你本次没有测量生物电'
          type='info' showIcon/>
      }
    } else {
      return <Loading />
    }
  }

  render () {
    wechat.setReport(this.props.params.reportId)
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
