import Table from 'antd/lib/table/index.js'
import DualDatePicker from './DualDatePicker.jsx'
import Radio from 'antd/lib/radio/index.js'
import moment from 'moment'
import Util from '../util.jsx'
import aUtil from './util.jsx'

let {Button: RadioButton, Group: RadioGroup} = Radio
window.moment = moment

export default class Stat extends React.Component {
  static propTypes = {
    dataScan: React.PropTypes.object.isRequired, // { arr, name, uniqKey}
    dataSubscribe: React.PropTypes.object.isRequired
  };

  state = {
    dataSource: [],
    type: 'week',
    startDate: null,
    endDate: null
  }

  columns = [{
    title: '时间段',
    dataIndex: 'time',
    key: 'time'
  }, {
    title: this.props.dataSubscribe.name + '人数',
    key: 'subscribe_u',
    dataIndex: 'subscribe_u'
  }, {
    title: this.props.dataSubscribe.name + '次数',
    key: 'subscribe',
    dataIndex: 'subscribe'
  }, {
    title: this.props.dataScan.name + '人数',
    key: 'scan_u',
    dataIndex: 'scan_u'
  }, {
    title: this.props.dataScan.name + '次数',
    key: 'scan',
    dataIndex: 'scan'
  }];

  componentWillMount () {
    this.props.dataScan.arr = _(this.props.dataScan.arr).sortBy('timestamp').reverse().run()
    this.props.dataSubscribe.arr = _(this.props.dataSubscribe.arr).sortBy('timestamp').reverse().run()
    this.statBy(this.state.type)
  }

  onDateChange (startDate, endDate) {
    this.setState({startDate, endDate}, this.statBy.bind(this, 'any'))
  }

  onTypeChange (v) {
    this.statBy(v.target.value)
  }

  filter (data) {
    return _.filter(data, (item) => {
      return moment(item.timestamp).isBetween(
        moment(this.state.startDate || '2000-01-01'),
        moment(this.state.endDate || '2099-01-01'))
    })
  }

  statBy (type) {
    let {dataScan, dataSubscribe} = this.props
    let scan
    let subscribe

    if (type === 'week') {
      scan = aUtil.groupByYearWeek(dataScan.arr)
      subscribe = aUtil.groupByYearWeek(dataSubscribe.arr)
    } else if (type === 'day') {
      scan = aUtil.groupByYearDay(dataScan.arr)
      subscribe = aUtil.groupByYearDay(dataSubscribe.arr)
    } else {
      scan = this.filter(dataScan.arr)
      subscribe = this.filter(dataSubscribe.arr)
      let dataSource = [{
        scan: dataScan.arr.length,
        scan_u: _.uniq(dataScan.arr, dataScan.uniqKey).length,
        subscribe: dataSubscribe.arr.length,
        subscribe_u: _.uniq(dataSubscribe.arr, dataSubscribe.uniqKey).length,
        time: (this.state.startDate ? Util.formatDate(this.state.startDate.valueOf()) : '') +
        '-' +
        (this.state.endDate ? Util.formatDate(this.state.endDate.valueOf()) : '')
      }]
      this.setState({type, dataSource})
      return
    }

    let d1 = {}
    let d2 = {}
    for (let r in scan) {
      d1[r] = {
        scan: scan[r].length,
        scan_u: _.uniq(scan[r], dataScan.uniqKey).length
      }
    }

    for (let r in subscribe) {
      d2[r] = {
        subscribe: subscribe[r].length,
        subscribe_u: _.uniq(subscribe[r], dataSubscribe.uniqKey).length
      }
    }

    let dataSource = _.map(_.defaultsDeep(d1, d2, true), (v, k) => {
      v.scan = v.scan || 0
      v.scan_u = v.scan_u || 0
      v.subscribe = v.subscribe || 0
      v.subscribe_u = v.subscribe_u || 0
      v.time = type === 'week'
        ? `${Util.formatDate(k)}-${Util.formatDate(moment(parseInt(k)).add(6, 'days').valueOf())}`
        : Util.formatDate(k)
      return v
    })

    this.setState({type, dataSource})
  }

  render () {
    return <div>
      <RadioGroup defaultValue={this.state.type} size='large' onChange={::this.onTypeChange} style={{marginBottom: 10}}>
        <RadioButton value='week'>按周</RadioButton>
        <RadioButton value='day'>按日</RadioButton>
        <RadioButton value='any'>自定义范围</RadioButton>
      </RadioGroup>
      {this.state.type === 'any' ? <DualDatePicker onChange={::this.onDateChange} /> : null}

      <Table dataSource={this.state.dataSource} columns={this.columns} bordered
        pagination={{total: this.state.dataSource.length, pageSize: 15}} />
    </div>
  }
}
