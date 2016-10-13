import Table from 'antd/lib/table/index.js'
import Button from 'antd/lib/button/index.js'
import API from '../API/viewReport.jsx'
import CSV from 'comma-separated-values'
import {saveAs} from 'file-saver'

function DownloadCSV (props) {
  return <Button type='primary' style={{marginLeft: '10px'}} onClick={() => {
    let csv = new CSV(props.data, {header: props.header}).encode()
    saveAs(new Blob([csv], {type: 'text/plain;charset=utf-8'}), props.name + '.csv')
  }}>下载数据</Button>
}

class ReportList extends React.Component {
  static defaultProps = {
    did: '74:23:44:BF:36:DC'
  }

  static formatDateTime (t) {
    t = new Date(parseInt(t, 10))
    return `${t.getFullYear()}年${t.getMonth() + 1}月${t.getDate()}日 ` +
      `${_.padLeft(t.getHours(), 2, 0)}:${_.padLeft(t.getMinutes(), 2, 0)}`
  }

  static formatForCSV (data) {
    if (!data) return []

    return data.map((i) => {
      return [
        i.nickname,
        i.sex,
        i.age,
        i.phone,
        i.timestamp,
        i.location,
        i.height,
        i.weight,
        i.bodyFat,
        i.bp,
        i.heartRate,
        i.spo2h,
        i.zangfu,
        i.jizhui,
        i.xiaohua,
        i.miniao
      ].map((i) => _.isEmpty(i) ? '' : i)
    })
  }

  columns = [{
    title: '用户',
    dataIndex: 'nickname',
    key: 'nickname'
  }, {
    title: '性别',
    dataIndex: 'sex',
    key: 'sex'
  }, {
    title: '年龄',
    dataIndex: 'age',
    key: 'age'
  }, {
    title: '手机号码',
    dataIndex: 'phone',
    key: 'phone'
  }, {
    title: '时间',
    dataIndex: 'timestamp',
    key: 'timestamp'
  }, {
    title: '地点',
    dataIndex: 'location',
    key: 'location'
  }, {
    title: '身高',
    dataIndex: 'height',
    key: 'height'
  }, {
    title: '体重',
    dataIndex: 'weight',
    key: 'weight'
  }, {
    title: '体脂',
    dataIndex: 'bodyFat',
    key: 'bodyFat'
  }, {
    title: '血压',
    dataIndex: 'bp',
    key: 'bp'
  }, {
    title: '心率',
    dataIndex: 'heartRate',
    key: 'heartRate'
  }, {
    title: '血氧',
    dataIndex: 'spo2h',
    key: 'spo2h'
  }, {
    title: '脏腑',
    dataIndex: 'zangfu',
    key: 'zangfu'
  }, {
    title: '脊椎',
    dataIndex: 'jizhui',
    key: 'jizhui'
  }, {
    title: '消化',
    dataIndex: 'xiaohua',
    key: 'xiaohua'
  }, {
    title: '泌尿',
    dataIndex: 'miniao',
    key: 'miniao'
  }];

  state = {
    loading: true,
    _data: null
  };

  loadData () {
    API.fetchData(this.props.did)
      .then((data) => {
        let _data = _.clone(data, true)
        data.forEach((item, index) => {
          item.key = index
          item.nickname = item.user.nickname
          item.phone = item.user.phone
          item.sex = item.user.sex === '1' ? '男' : '女'
          item.age = item.user.age
          item.timestamp = ReportList.formatDateTime(item.timestamp)
          item.bp = _.isUndefined(item.dbp) ? '' : `${item.dbp}/${item.sbp}`
        })
        this.setState({loading: false, _data, data})
      })
      .catch((e) => {
        this.setState({loading: false})
        throw e
      })
  }

  componentDidMount () {
    this.loadData()
  }

  render () {
    return <div>
      <div className='title'>{`设备ID：${this.props.did}，共${this.state.data ? this.state.data.length : 0}条`}
        <DownloadCSV data={ReportList.formatForCSV(this.state.data)} name={`${this.props.did}-${+new Date()}`}
                     header={_.pluck(this.columns, 'title')}/>
      </div>
      {this.state.loading
        ? <Table columns={this.columns} loading={this.state.loading}/>
        : <Table dataSource={this.state.data} columns={this.columns}/>}
    </div>
  }
}

export default ReportList
