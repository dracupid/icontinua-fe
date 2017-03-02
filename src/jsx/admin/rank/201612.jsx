import API from '../../API/admin.jsx'
import Breadcrumb from 'antd/lib/breadcrumb/index.js'
import Table from 'antd/lib/table/index.js'
import util from '../../util.jsx'
import Radio from 'antd/lib/radio/index.js'
import DatePicker from 'antd/lib/date-picker/index.js'
import Switch from 'antd/lib/switch/index.js'
import moment from 'moment'
let {Button: RadioButton, Group: RadioGroup} = Radio
import HWBChart from './HWBChart.jsx'

export default class extends React.Component {
  state = {
    dataSourceMale: null,
    dataSourceFeMale: null,
    type: 'male',
    startDate: moment('2016-11-01'),
    endDate: moment(Date.now()),
    hideWinner: true,
    onlyVIP: true
  }

  columns = [{
    title: '排名',
    key: 'rank',
    render: (t1, t2, index) => index + 1
  }, {
    title: '用户名',
    dataIndex: 'nickname',
    key: 'nickname'
  }, {
    title: '年龄',
    key: 'age',
    dataIndex: 'age'
  }, {
    title: '手机号',
    key: 'phone',
    dataIndex: 'phone'
  }, {
    title: '关注时间',
    key: 'subscribeTime',
    dataIndex: 'subscribeTime',
    render: (text) => util.formatDateTime(text)
  }, {
    title: '有效测量次数',
    key: 'times',
    dataIndex: 'times'
  }, {
    title: '起始BMI',
    key: 'bmiFrom',
    dataIndex: 'bmiFrom',
    render: (text) => text.toFixed(2)

  }, {
    title: '最终BMI',
    key: 'bmiTo',
    dataIndex: 'bmiTo',
    render: (text) => text.toFixed(2)

  }, {
    title: '改善度',
    key: 'change',
    dataIndex: 'change',
    render: (text) => text.toFixed(2)
  }, {
    title: '中奖情况',
    key: 'winDate',
    dataIndex: 'winDate',
    render: (text, record) => {
      if (text) {
        return (<span>
          {util.formatDate(text)}
          <span className='ant-divider' />
          <a onClick={this.losePrize.bind(this, record.id, record)}>取消中奖</a>
        </span>)
      } else {
        return <a onClick={this.winPrize.bind(this, record.id, record)}>设为中奖</a>
      }
    }
  }];

  winPrize (uid, record) {
    API.winPrize201612(uid, this.state.endDate.toDate())
      .then(() => {
        record.winDate = this.state.endDate.toDate().valueOf()
        this.setState({})
      })
      .catch((e) => alert('设置中奖失败' + e))
  }

  losePrize (uid, record) {
    API.losePrize201612(uid)
      .then(() => {
        record.winDate = null
        this.setState({})
      }).catch((e) => alert('取消中奖失败' + e))
  }

  componentDidMount () {
    API.rank201612(this.state.startDate.toDate(), this.state.endDate.toDate())
      .then((dataSource) => {
        this.setState({dataSourceMale: dataSource.male, dataSourceFeMale: dataSource.female})
      })
  }

  onTypeChange (v) {
    this.setState({type: v.target.value})
  }

  onDateChange (dates) {
    let [startDate, endDate] = dates
    this.setState({startDate, endDate}, () => {
      this.componentDidMount()
    })
  }

  onChangeHide (v) {
    this.setState({hideWinner: v})
  }

  onChangeOnlyVIP (v) {
    this.setState({onlyVIP: v})
  }

  formatData (id, v) {
    let data = _.map(v, (item, i) => {
      return <div key={id + i}>{`${(item.h).toFixed(1)} / ${(item.w).toFixed(1)} => ${(item.bmi).toFixed(2)}`}</div>
    })

    return <div>{data}</div>
  }

  render () {
    let dataSource = this.state.type === 'male' ? this.state.dataSourceMale : this.state.dataSourceFeMale

    if (this.state.hideWinner && dataSource != null) {
      dataSource = dataSource.filter((item) => item.winDate == null)
    }

    if (this.state.onlyVIP && dataSource != null) {
      dataSource = dataSource.filter((item) => !!item.phone)
    }

    return <div>
      <Breadcrumb>
        <Breadcrumb.Item>活动排名</Breadcrumb.Item>
        <Breadcrumb.Item>2016-12 杭州</Breadcrumb.Item>
      </Breadcrumb>
      <br />
      <DatePicker.RangePicker placeholder={['开始日期', '结束日期']} onChange={::this.onDateChange}
        defaultValue={[this.state.startDate, this.state.endDate]} />
      <br />
      <div style={{float: 'right', marginRight: '10px'}}>隐藏已中奖用户 <Switch defaultChecked={this.state.hideWinner}
        onChange={::this.onChangeHide} /></div>
      <div style={{float: 'right', marginRight: '10px'}}>只显示会员 <Switch defaultChecked={this.state.onlyVIP}
        onChange={::this.onChangeOnlyVIP} /></div>
      <br />

      <RadioGroup defaultValue={this.state.type} size='large' onChange={::this.onTypeChange} style={{marginBottom: 10}}>
        <RadioButton value='male'>男性</RadioButton>
        <RadioButton value='female'>女性</RadioButton>
      </RadioGroup>

      <Table rowKey='id' dataSource={dataSource} columns={this.columns} bordered pagination={false}
        loading={dataSource == null}
        expandedRowRender={record => <HWBChart data={record.data} />} />

    </div>
  }
  //              {/*expandedRowRender={record => <div>{this.formatData(record.id, record.data)}</div>}/>*/}
}
