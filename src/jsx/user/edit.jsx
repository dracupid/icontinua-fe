import {getUserInfo} from './util.jsx'
import util from '../util.jsx'
import Banner from '../Components/Banner.jsx'
import EditBlock from './EditBlock.jsx'
let {message} = ANTD

class Edit extends React.Component {
  state = {
    editing: false,
    data: {},
    newData: {}
  };

  componentDidMount () {
    getUserInfo(this.props.params.userId)
      .then((data) => {
        this.setState({data})
      })
  }

  onSubmit () {
    if (this.state.editing) {
      let data = _.merge(this.state.data, this.state.newData)
      let params = _.map(data, (v, k) => {
        return `${k}=${v}`
      }).join('&')

      util.fetchAPI(`/api/user/update?id=${this.props.params.userId}&${params}`)
        .then(() => {
          message.info('更新个人资料成功')
          this.setState({editing: false, data})
        }, () => {
          message.error('更新个人资料失败, 请重试')
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
    let {avatar, nickname, sex, age} = this.state.data
    return <div>
      <Banner
        title='我的资料' backUrl={util.getUrlByHash(`/${this.props.params.userId}`)}
        rightComponent={<div className='user-edit-save' onClick={this.onSubmit.bind(this)}>{this.state.editing ? '保存' : '编辑'}</div>}/>
      <div className='block-wrapper' style={{marginTop: 0}}>
        <EditBlock tag='头像' value={<img src={avatar} className='avatar'/>} noedit/>
        <EditBlock
          tag='用户名' type='text' value={nickname} editing={this.state.editing}
          onChange={this.onChangeBuilder('nickname')}/>
        <EditBlock
          tag='性别' type='radio' data={{'1': '男', '2': '女'}} defaultValue={sex}
          value={util.parseSex(sex)} editing={this.state.editing} onChange={this.onChangeBuilder('sex')}/>
        <EditBlock
          tag='年龄' type='number' min={1} max={130}
          value={age} editing={this.state.editing} onChange={this.onChangeBuilder('age')}/>
      </div>
    </div>
  }
}

export default Edit
