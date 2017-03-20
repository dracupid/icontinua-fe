import Table from 'antd/lib/table/index.js'
import Popconfirm from 'antd/lib/popconfirm/index.js'
import Breadcrumb from 'antd/lib/breadcrumb/index.js'
import API from '../API/admin.jsx'

export default class Channel extends React.Component {
  columns = [{
    title: '渠道名称',
    dataIndex: 'sceneStr',
    key: 'sceneStr',
  }, {
    title: '二维码',
    key: 'url',
    dataIndex: 'url',
    render: (text) => <img src={text} style={{width: 80}}/>
  }, {
    title: '管理',
    key: 'manage',
    render: (text, {sceneStr}) => {
      let scene = sceneStr
      if (_.isArray(sceneStr)) {
        sceneStr = sceneStr[0] + '-' + sceneStr[2]
      }
      return <span>
        <a href={'#/channel/s/' + sceneStr}>查看统计</a>
        <span className='ant-divider'/>
        <Popconfirm title='确定要删除这个二维码?' onConfirm={::this.deleteChannel.bind(this, scene)}>
          <a>删除</a>
        </Popconfirm>
      </span>
    }
  }];
  state = {
    dataSource: []
  }

  componentDidMount () {
    API.listChannel()
      .then((data) => {
        this.setState({
          dataSource: _.sortBy(data, 'sceneStr')
            .map((item) => {
              if (item.sceneStr.indexOf('mac') === 0) {
                item.sceneStr = [item.appid, <br/>, item.sceneStr.slice(3)]
              }
              return item;
            })
        })
      })
  }

  deleteChannel (scene) {
    let appId = null
    let sceneStr = scene
    if (_.isArray(sceneStr)) {
      appId = scene[0]
      sceneStr = 'mac' + scene[2]
    }
    API.deleteChannel(sceneStr, appId)
      .then(() => {
        let data = this.state.dataSource
        _.remove(data, (item) => item.sceneStr === scene)
        this.setState({dataSource: data})
      })
      .catch(() => {
        window.alert('删除失败')
      })
  }

  render () {
    return <div>
      <Breadcrumb>
        <Breadcrumb.Item>渠道二维码管理</Breadcrumb.Item>
      </Breadcrumb>
      <Table dataSource={this.state.dataSource} columns={this.columns} bordered
             pagination={{total: this.state.dataSource.length, pageSize: 10}}/>
    </div>
  }
}
