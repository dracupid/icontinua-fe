/**
 * 报告历史页面主页
 */
import Banner from './../Components/Banner.jsx'
import ReportList from './ReportList.jsx'
import ReportTrade from './ReportTrade.jsx'
import API from '../API/report.jsx'
import Footer from '../Components/Footer.jsx'
import util from '../util.jsx'
let {Tabs} = ANTD
let TabPane = Tabs.TabPane

class Reports extends React.Component {
  static propTypes = {
    params: React.PropTypes.object.isRequired
  };

  state = {
    tabTitles: ['体检记录', '变化趋势'],
    currentTab: 0,
    data: null
  };

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
        res.data = this.formatData(res.data)
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
    return (
      <div id='report-list'>
        <Banner title={this.state.tabTitles[this.state.currentTab]} rightComponent={avatar} />

        <div className='bottom-tab-wrapper'>
          <Tabs onChange={::this.changeHandler} activeKey={this.state.currentTab + ''} tabPosition="bottom" animated={false}>
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
