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
          let {total_subscribe, total_reports, user_num_subscribe, user_num_reports} = this.state.data
          return <div>
            <div style={{margin: 5}}>
              {`总关注：${user_num_subscribe}人，关注${total_subscribe}次；总测量：${user_num_reports}人，测量${total_reports}次`}
            </div>
            <BasicStat dataScan={{arr: this.state.data.report || [], name: '测量', uniqKey: 'userId'}}
              dataSubscribe={{arr: this.state.data.subscribe || [], name: '关注', uniqKey: 'uid'}} />
          </div>
        }
      })()}
    </div>
  }
}
