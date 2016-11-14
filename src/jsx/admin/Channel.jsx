import Table from 'antd/lib/table/index.js'
import Breadcrumb from 'antd/lib/breadcrumb/index.js'
import API from '../API/admin.jsx'
export default class Channel extends React.Component {
  columns = [{
    title: '渠道名称',
    dataIndex: 'sceneStr',
    key: 'sceneStr'
  }, {
    title: '二维码',
    key: 'url',
    dataIndex: 'url',
    render: (text) => <img src={text} style={{width: 80}} />
  }, {
    title: '管理',
    key: 'manage',
    render: (text, data) => {
      return <span>
        <a href={'#/channel/s/' + data.sceneStr}>查看统计</a>
        {/* <span className="ant-divider"/> */}
        {/* <a>删除</a> */}
      </span>
    }
  }];
  state = {
    dataSource: []
  }

  componentDidMount () {
    API.listChannel()
      .then((data) => {
        this.setState({dataSource: data})
      })
  }

  render () {
    return <div>
      <Breadcrumb>
        <Breadcrumb.Item>渠道二维码管理</Breadcrumb.Item>
      </Breadcrumb>

      <Table dataSource={this.state.dataSource} columns={this.columns} bordered
        pagination={{total: this.state.dataSource.length, pageSize: 5}} />
    </div>
  }
}
