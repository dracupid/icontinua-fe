import Table from 'antd/lib/table/index.js'
import Breadcrumb from 'antd/lib/breadcrumb/index.js'
import API from '../API/admin'
import Util from '../util'
export default class Device extends React.Component {
  columns = [{
    title: '设备ID',
    dataIndex: 'did',
    key: 'did',
    render: (text) => <a href={`#/device/s/${text}`}>{text}</a>

  }, {
    title: '设备位置',
    key: 'location',
    dataIndex: 'location'
  }, {
    title: '上次启动时间',
    key: '_timestamp',
    dataIndex: '_timestamp'
  }];
  state = {
    dataSource: []
  }

  componentDidMount () {
    API.listDevice()
      .then((data) => {
        data = _(data).sortBy('timestamp').reverse().run()
        data.forEach((item) => { item._timestamp = Util.formatDateTime(item.timestamp) })
        this.setState({dataSource: data})
      })
  }

  render () {
    return <div>
      <Breadcrumb>
        <Breadcrumb.Item>设备管理</Breadcrumb.Item>
        <Breadcrumb.Item>推广统计</Breadcrumb.Item>
      </Breadcrumb>

      <Table dataSource={this.state.dataSource} columns={this.columns} bordered
        pagination={{total: this.state.dataSource.length, pageSize: 15}} />
    </div>
  }
}
