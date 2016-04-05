import Banner from './Components/Banner.jsx'
import ReportList from './ReportList.jsx'
import ReportTrade from './ReportTrade.jsx'
import util from './util.jsx'
import Footer from './Components/Footer.jsx'
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

  formatData (list) {
    let res = {}
    _(list).sortBy('timestamp').reverse().forEach((item) => {
      res[item.id] = item
    }).run()
    return res
  }

  componentDidMount () {
    let url = '/api/report/list?id=' + this.props.params.userId
    util.fetchAPI(url)
      .then((res) => {
        res.data = this.formatData(res.data)
        this.setState(res)
      })
      .catch((e) => {
        console.error(e)
        this.setState({
          data: []
        })
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
        location.href = '/html/user.html#/' + this.props.params.userId
      }}>
        <img src={this.state.avatar} alt=''/>
      </div>
    }
    return (
      <div id='report-list'>
        <Banner title={this.state.tabTitles[this.state.currentTab]} rightComponent={avatar}/>

        <div className='bottom-tab-wrapper'>
          <Tabs onChange={::this.changeHandler} activeKey={this.state.currentTab + ''} animation={null}>
            <TabPane tab={<div><i className='bg-record'/><p>{this.state.tabTitles[0]}</p></div>} key='0'>
              <ReportList userId={this.props.params.userId} data={this.state.data}/>
              <Footer style={{marginBottom: '52px'}}/>
            </TabPane>
            <TabPane tab={<div><i className='bg-trade'/><p>{this.state.tabTitles[1]}</p></div>} key='1'>
              <ReportTrade userId={this.props.params.userId} data={this.state.data}/>
              <Footer/>
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
