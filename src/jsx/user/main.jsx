/**
 * 用户中心主页
 */
let {Icon} = ANTD
import util from '../util.jsx'
import BannerBlock from './../Components/BannerBlock.jsx'
import Banner from '../Components/Banner.jsx'
import API from '../API/user.jsx'

/**
 * 用户信息组件
 */
function UserInfo ({avatar, nickname, sex, age, id}) {
  return <div className='user-info-banner block'>
    <img src={avatar} className='avatar' />
    <div className='user-info-wrapper'>
      <div>{nickname}</div>
      <div>{'性别：' + (sex == null ? '未知' : util.parseSex(sex))}</div>
      <div>{'年龄：' + (age || '未知')}</div>
    </div>
    <div className='user-info-edit' onClick={() => { location.hash = '#/edit/' + id }}>
      <Icon type='edit' />
    </div>
  </div>
}

class Main extends React.Component {
  state = {
    data: null
  };

  componentDidMount () {
    API.getUserInfo(this.props.params.userId)
      .then((data) => {
        this.setState({data})
      })
  }

  render () {
    return <div>
      <Banner title='个人中心' />
      {this.state.data == null ? null : <div>
        <UserInfo {...this.state.data} id={this.props.params.userId} />
        <div className='block-wrapper'>
          <BannerBlock text='查看体检报告' icon='file-text' url={'/reports#/' + this.props.params.userId} />
          <BannerBlock style={{display: util.getParam('channel') !== 'HuiLianHuZhou' ? 'flex' : 'none'}}
            text={<span>化验单拍照识别<span className='beta'>测试版</span></span>} icon='camera-o' url={util.getUrlByHash('/photo/' + this.props.params.userId)} />
        </div>
      </div>
      }
    </div>
  }
}

export default Main
