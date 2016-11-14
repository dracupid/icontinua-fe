import DatePicker from 'antd/lib/date-picker/index.js'
import moment from 'moment'
window.moment = moment

export default class extends React.Component {
  state = {
    startDate: null,
    endDate: null,
    endOpen: false
  };

  disabledStartDate (startDate) {
    if (!startDate || !this.state.endDate) {
      return false
    }
    return startDate.valueOf() > this.state.endDate.valueOf()
  }

  disabledEndDate (endDate) {
    if (!endDate || !this.state.startDate) {
      return false
    }
    return endDate.valueOf() <= this.state.startDate.valueOf()
  }

  onStartChange (value) {
    value.second(0).minute(0).hour(0)
    this.setState({startDate: value})
    this.props.onChange(value, this.state.endDate)
  }

  onEndChange (value) {
    value.second(0).minute(0).hour(0)
    this.setState({endDate: value})
    this.props.onChange(this.state.startDate, value)
  }

  handleStartOpenChange (open) {
    if (!open) {
      this.setState({endOpen: true})
    }
  }

  handleEndOpenChange (open) {
    this.setState({endOpen: open})
  }

  render () {
    return <div style={this.props.style} className={this.props.className}>
      按日期筛选：从
      <DatePicker
        disabledDate={::this.disabledStartDate}
        value={this.state.startDate}
        placeholder='开始日期'
        onChange={::this.onStartChange}
        onOpenChange={::this.handleStartOpenChange}
      />
      到
      <DatePicker
        disabledDate={::this.disabledEndDate}
        value={this.state.endDate}
        placeholder='结束日期'
        onChange={::this.onEndChange}
        open={this.state.endOpen}
        onOpenChange={::this.handleEndOpenChange}
      />
    </div>
  }
}
