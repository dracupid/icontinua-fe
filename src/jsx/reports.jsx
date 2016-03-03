import Banner from './Components/Banner.jsx'
import ReportList from './ReportList.jsx'
import ReportTrade from './ReportTrade.jsx'
let {Tabs, Popover, Icon, Modal, Button, Form, InputNumber, Radio, message} = ANTD
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
    data: null,
    editing: false,
    applyEditing: false
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
      this.setState(window._reportListData)
      return
    }
    let url = '/api/reports?diagnose=true&id=' + this.props.params.userId
    $.getJSON(url).then((res) => {
      console.log(res)
      if (res.status === 200) {
        res.data.data = this.formatData(res.data.data)
        window._reportListData = res.data
        _.forEach(res.data, (e) => {
          window._reportData[e.id] = e
        })
        this.setState(res.data)
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

  showModal () {
    this.setState({
      editing: true
    });
  }

  handleOk () {
    this.setState({applyEditing: true});
    $.getJSON(`/api/user/update?id=${this.props.params.userId}&age=${this.state.age}&sex=${this.state.sex}`)
    .then((res) => {
      if (res.status === 200) {
        this.setState({applyEditing: false, editing: false});
      } else {
        message.error('更新用户信息失败');
        this.setState({applyEditing: false, editing: true});
      }
    }, () => {
      message.error('更新用户信息失败');
      this.setState({applyEditing: false, editing: true});
    })
  }

  handleCancel () {
    this.setState({editing: false});
  }

  render () {
    let popoverComp = null
    let sex
    if (this.state.sex) {
      sex = (this.state.sex == "1" ? "男" : "女")
    } else {
      sex = ''
    }

    if (this.state.avatar) {
      popoverComp = <Popover
        overlay={<div className="user-info-wrapper">
                  <div className="user-info-left">
                    <div>{"性别: " + sex}</div>
                    <div>{"年龄: " + (this.state.age || '')}</div>
                  </div>
                  <div className="user-info-edit" onClick={this.showModal.bind(this)}>
                    <Icon type="edit"/>
                  </div>

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
              <ReportList userId={this.props.params.userId} data={this.state.data}/>
            </TabPane>
            <TabPane tab={
    <div>
                                <i className='bg-trade'/>
                                <p>{this.state.tabTitles[1]}</p>
                            </div>
    } key='1'>
              <ReportTrade userId={this.props.params.userId} data={this.state.data}/>
            </TabPane>
          </Tabs>
        </div>

        <Modal ref="modal"
               visible={this.state.editing}
               width="90%"
               title="修改用户信息" onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}
               footer={[
            <Button key="back" type="ghost" size="large" onClick={this.handleCancel.bind(this)}>取 消</Button>,
            <Button key="submit" type="primary" size="large" loading={this.state.applyEditing} onClick={this.handleOk.bind(this)}>
              提 交
            </Button>
          ]}>
          <Form horizontal>
            <Form.Item
              label="性别："
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}>
              <Radio.Group value={this.state.sex} onChange={this.onChangeSex.bind(this)}>
                <Radio.Button value="1">男</Radio.Button>
                <Radio.Button value="2">女</Radio.Button>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              id="control-input"
              label="年龄："
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 14 }}>
              <InputNumber min={1} max={130} defaultValue={parseInt(this.state.age)}
                           onChange={this.onChangeAge.bind(this)}/>
            </Form.Item>
          </Form>
        </Modal>
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
