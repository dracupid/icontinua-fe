import Breadcrumb from 'antd/lib/breadcrumb/index.js'
import API from '../API/admin.jsx'
import BasicStat from './BasicStat.jsx'

export default class Device extends React.Component {
  state = {
    data: null
  }

  componentDidMount () {
    API.statChannel(this.props.params.name)
      .then((data) => {
        this.setState({data})
      })
  }

  render () {
    return <div>
      <Breadcrumb>
        <Breadcrumb.Item>渠道二维码管理</Breadcrumb.Item>
        <Breadcrumb.Item>推广统计</Breadcrumb.Item>
        <Breadcrumb.Item>{this.props.params.name}</Breadcrumb.Item>
      </Breadcrumb>
      <br />

      {(() => {
        if (this.state.data) {
          let {total_subscribe, total_scan, user_num_subscribe, user_num_scan} = this.state.data
          return <div>
            <div style={{margin: 5}}>
              {`总关注：${user_num_subscribe}人，关注${total_subscribe}次；总扫码：${user_num_scan}人，扫码${total_scan}次`}
            </div>
            <BasicStat dataScan={{arr: this.state.data.scan || [], name: '扫码', uniqKey: 'uid'}}
              dataSubscribe={{arr: this.state.data.subscribe || [], name: '关注', uniqKey: 'uid'}} />
          </div>
        }
      })()}
    </div>
  }
}

