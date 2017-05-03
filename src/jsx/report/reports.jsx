/**
 * 报告历史页面主页
 */
import Banner from './../Components/Banner.jsx'
import AdBanner from '../Components/AdBanner'
import ReportList from './ReportList.jsx'
import ReportTrade from './ReportTrade.jsx'
import API from '../API/report.jsx'
import Footer from '../Components/Footer.jsx'
import util from '../util.jsx'
import Ztgbox from '../Components/Ztgbox.jsx'
let {Tabs} = ANTD
let TabPane = Tabs.TabPane

class Reports extends React.Component {
  static propTypes = {
    params: React.PropTypes.object.isRequired
  }

  state = {
    tabTitles: ['体检记录', '变化趋势'],
    currentTab: 0,
    data: null
  }

  // 将数据按时间排序,并格式化为一个对象
  formatData (list) {
    let res = {}
    _(list).sortBy('timestamp').reverse().forEach((item) => {
      res[item.id] = item
    }).run()
    return res
  }

  componentDidMount () {
    API.reportList()
      .then((res) => {
        let _rawData = res.data
        res.data = this.formatData(res.data)

        // http://www.cmsci.net/cloudhealth/weekly-report/issues/32
        if (!res.phone) {
          const BONUS = 3 // 只显示前三次
          let nanjings = _.filter(_rawData, (item) => item.channel === 'NanJing')
          if (nanjings.length > BONUS) {
            nanjings.slice(0, nanjings.length - BONUS).forEach((item) => delete res[item.id])
          }
        }

        this.setState(res)
      })
      .catch((e) => {
        this.setState({
          data: {}
        })
        throw e
      })
  }

  changeHandler (e) {
    this.setState({currentTab: e})
    return true
  }

  render () {
    let avatar = null

    if (this.state.avatar) {
      avatar = <div className='header-right' onClick={() => {
        util.toUrl('/html/user.html#/')
      }}>
        <img src={util.removeProtocol(this.state.avatar)} alt='' />
      </div>
    }

    let ad
    if (!util.getParam('channel')) {
      ad = <div>
        <Ztgbox id='INST170342363016' />
        <p className='gg-text'>方便保（不需体检，点击上面立办理），保得起（112元起／年），用得上（意外或疾病），保障好（最高理赔100万，肿瘤200万），有奖励（5元起／单）</p>
      </div>
    } else if (util.getParam('channel') === '3rd') {
      ad = <AdBanner channel="zsf" positionKey="main"/>
    }

    return (
      <div id='report-list'>
        <Banner title={this.state.tabTitles[this.state.currentTab]} rightComponent={avatar} />
        {ad}
        <div className='bottom-tab-wrapper'>
          <Tabs onChange={::this.changeHandler} activeKey={this.state.currentTab + ''} tabPosition='bottom'
            animated={false}>
            <TabPane tab={<div><i className='bg-record' /><p>{this.state.tabTitles[0]}</p></div>} key='0'>
              <ReportList data={this.state.data} />
              <Footer style={{marginBottom: '52px'}} />
            </TabPane>
            <TabPane tab={<div><i className='bg-trade' /><p>{this.state.tabTitles[1]}</p></div>} key='1'>
              <ReportTrade data={this.state.data} />
              <Footer />
            </TabPane>
          </Tabs>
        </div>
      </div>
    )
  }

  onChangeAge (value) {
    this.setState({age: value})
  }

  onChangeSex (e) {
    this.setState({sex: e.target.value})
  }
}
export default Reports
