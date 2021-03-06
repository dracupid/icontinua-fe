/**
 * 修改用户信息页面
 */
import util from '../util'
import Banner from '../Components/Banner'
import EditBlock from './EditBlock'
import API from '../API/user'
let {message} = ANTD

class Edit extends React.Component {
  state = {
    editing: false,
    data: {},
    newData: {}
  };

  componentDidMount () {
    API.getUserInfo()
      .then((data) => {
        this.setState({data})
      })
  }

  /**
   * 信息提交
   */
  onSubmit () {
    if (this.state.editing) {
      let data = _.merge(this.state.data, this.state.newData)

      API.updateUserInfo(data)
        .then(() => {
          message.info('更新个人资料成功')
          this.setState({editing: false, data})
        }, () => {
          message.error('更新个人资料失败, 请重试!')
        })
    } else {
      this.setState({editing: true})
    }
  }

  onChangeBuilder (item) {
    let self = this
    return (v) => {
      let newData = self.state.newData
      newData[item] = v
      self.setState({newData})
    }
  }

  render () {
    let {avatar, nickname, sex, age, phone, ssid, address} = this.state.data
    return <div>
      <Banner
        title='我的资料' backUrl={util.getUrlByHash(`/`)}
        rightComponent={<div className='user-edit-save' onClick={::this.onSubmit}>{this.state.editing ? '保存' : '编辑'}</div>} />
      <div className='block-wrapper' style={{marginTop: 0}}>
        <EditBlock tag='头像' value={<img src={util.removeProtocol(avatar)} className='avatar' />} noedit />
        <EditBlock
          tag='用户名' type='text' value={nickname} editing={this.state.editing}
          onChange={this.onChangeBuilder('nickname')} />
        <EditBlock
          tag='性别' type='radio' data={{'1': '男', '2': '女'}} defaultValue={sex}
          value={util.parseSex(sex)} editing={this.state.editing} onChange={this.onChangeBuilder('sex')} />
        <EditBlock
          tag='年龄' type='number' min={1} max={130}
          value={age} editing={this.state.editing} onChange={this.onChangeBuilder('age')} />
        <EditBlock
          tag='联系电话' type='phone' pattern={/^\d*$/}
          value={phone} editing={this.state.editing} onChange={this.onChangeBuilder('phone')} />
        <EditBlock
          tag='社保卡号' type='text' pattern={/^\d*$/}
          value={ssid} editing={this.state.editing} onChange={this.onChangeBuilder('ssid')} />
        <EditBlock
          tag='收货地址' type='text'
          value={address} editing={this.state.editing} onChange={this.onChangeBuilder('address')} />
      </div>
    </div>
  }
}

export default Edit
