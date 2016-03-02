import Banner from './Components/Banner.jsx'
import ReportList from './ReportList.jsx'
import ReportTrade from './ReportTrade.jsx'
let {Tabs, Popover} = ANTD
let TabPane = Tabs.TabPane

class Reports extends React.Component {
  static propTypes = {
    params: React.PropTypes.object.isRequired
  };

  constructor (props) {
    super(props)
  }

  state = {
    tabTitles: ['体检记录', '变化趋势'],
    currentTab: 0,
    data: null
  };

  fetchFailedHandler () {
    this.setState({
      data: []
    })
  }

  formatData (list) {
    let res = {}
    _(list).sortBy('timestamp').reverse().forEach((item) => {
      res[item.id] = item
    }).run()
    return res
  }

  componentDidMount () {
    if (window._reportListData !== null) {
      this.setState({
        data: window._reportListData
      })
      return
    }
    let url = '/api/history?diagnose=true&openId=' + this.props.params.openId
    $.getJSON(url).then((res) => {
      console.log(res)
      if (res.status === 200) {
        let data = this.formatData(res.data.data)
        window._reportListData = data
        _.forEach(data, (e) => {
          window._reportData[e.id] = e
        })
        this.setState({
          data: data,
          avatar: res.data.avatar,
          age: res.data.age,
          sex: res.data.sex,
          nickname: res.data.nickname
        })
      } else {
        this.fetchFailedHandler()
      }
    }).fail((e) => {
      console.error(e)
      this.fetchFailedHandler()
    })
  }

  changeHandler (e) {
    this.setState({currentTab: e})
    return true
  }

  render () {
    let popoverComp = null
    if (this.state.avatar) {
      popoverComp = <Popover
        overlay={<div>
                <span>{"性别: " + (this.state.sex == "1" ? "男" : "女")}</span><br/>
                <span>{"年龄: " + this.state.age}</span>
                </div>
              }
        prefixCls="user-info-prop ant-popover"
        title={this.state.nickname || '爱康体用户'} trigger="click" placement="bottomRight">
        <div className="banner-right"><img src={this.state.avatar} alt=""/></div>
      </Popover>
    }
    return (
      <div id='report-list'>
        <Banner title={this.state.tabTitles[this.state.currentTab]} rightComponent={popoverComp}/>

        <div className='bottom-tab-wrapper'>
          <Tabs onChange={this.changeHandler.bind(this)} activeKey={this.state.currentTab + ''}>
            <TabPane tab={
    <div>
                                <i className='bg-record'/>
                                <p>{this.state.tabTitles[0]}</p>
                            </div>
    } key='0'>
              <ReportList openId={this.props.params.openId} data={this.state.data}/>
            </TabPane>
            <TabPane tab={
    <div>
                                <i className='bg-trade'/>
                                <p>{this.state.tabTitles[1]}</p>
                            </div>
    } key='1'>
              <ReportTrade openId={this.props.params.openId} data={this.state.data}/>
            </TabPane>
          </Tabs>
        </div>
      </div>
    )
  }
}
export default Reports
