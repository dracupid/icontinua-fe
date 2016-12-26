import API from '../../API/admin.jsx'
import Table from 'antd/lib/table/index.js'
import util from '../../util.jsx'

export default class extends React.Component {
  state = {
    dataSource: null,
    type: 'male'
  }

  buildDateFilters () {
    let arr = []
    _.forEach(this.state.dataSource, (item) => { arr.push(util.formatDate(item.winDate)) })
    return _.uniq(arr).map((item) => { return {text: item, value: item} })
  }

  columns = [{
    title: '用户名',
    dataIndex: 'nickname',
    key: 'nickname'
  }, {
    title: '性别',
    key: 'sex',
    dataIndex: 'sex',
    filters: [
      {text: '男', value: '1'},
      {text: '女', value: '2'}
    ],
    render: (text) => text === '1' ? '男' : '女',
    filterMultiple: false,
    onFilter: (value, record) => record.sex === value
  }, {
    title: '年龄',
    key: 'age',
    dataIndex: 'age'
  }, {
    title: '手机号',
    key: 'phone',
    dataIndex: 'phone'
  }, {
    title: '中奖时间',
    key: 'winDate',
    dataIndex: 'winDate',
    render: (text, record) => {
      return (<span>
        {util.formatDate(text)}
        <span className='ant-divider' />
        <a onClick={this.losePrize.bind(this, record.id, record)}>取消中奖</a>
      </span>)
    },
    filterMultiple: false,
    onFilter: (value, record) => util.formatDate(record.winDate) === value
  }];

  losePrize (uid) {
    API.losePrize201612(uid)
      .then(() => {
        _.remove(this.state.dataSource, (item) => item.id === uid)
        this.setState({})
      }).catch((e) => alert('取消中奖失败' + e))
  }

  componentDidMount () {
    API.listPrize201612()
      .then((dataSource) => {
        dataSource = _.sortBy(dataSource, 'winDate')
        this.setState({dataSource})
      })
  }

  render () {
    this.columns[this.columns.length - 1].filters = this.buildDateFilters()
    return <div>
      <Table dataSource={this.state.dataSource} columns={this.columns} bordered
        pagination={{total: (this.state.dataSource || []).length, pageSize: 15}} loading={this.state.dataSource == null} />

    </div>
  }
}

