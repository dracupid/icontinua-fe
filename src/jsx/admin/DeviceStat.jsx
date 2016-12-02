import Breadcrumb from 'antd/lib/breadcrumb/index.js'
import API from '../API/admin.jsx'
import BasicStat from './BasicStat.jsx'

export default class Channel extends React.Component {
  state = {
    data: null
  }

  componentDidMount () {
    API.statDevice(this.props.params.id)
      .then((data) => {
        this.setState({data})
      })
  }

  render () {
    return <div>
      <Breadcrumb>
        <Breadcrumb.Item>设备管理</Breadcrumb.Item>
        <Breadcrumb.Item>推广统计</Breadcrumb.Item>
        <Breadcrumb.Item>{this.props.params.id}</Breadcrumb.Item>
      </Breadcrumb>
      <br />
      {(() => {
        if (this.state.data) {
          let {
            total_subscribe: totalSubscribe,
            total_reports: totalReports,
            user_num_subscribe: userNumSubscribe,
            user_num_reports: userNumReports
          } = this.state.data
          return <div>
            <div style={{margin: 5}}>
              {`总关注：${userNumSubscribe}人，关注${totalSubscribe}次；总测量：${userNumReports}人，测量${totalReports}次`}
            </div>
            <BasicStat dataScan={{arr: this.state.data.reports || [], name: '测量', uniqKey: 'userId'}}
              dataSubscribe={{arr: this.state.data.subscribe || [], name: '关注', uniqKey: 'uid'}} />
          </div>
        }
      })()}
    </div>
  }
}
