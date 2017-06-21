/**
 * 用户中心主页
 */
import util from '../util'
import BannerBlock from './../Components/BannerBlock'
import Banner from '../Components/Banner'
import API from '../API/user'
import Ztgbox from '../Components/Ztgbox'
let {Icon} = ANTD

/**
 * 用户信息组件
 */
function UserInfo ({avatar, nickname, sex, age}) {
  return <div className='user-info-banner block'>
    <img src={util.removeProtocol(avatar)} className='avatar' />
    <div className='user-info-wrapper'>
      <div>{nickname}</div>
      <div>{'性别：' + (sex == null ? '未知' : util.parseSex(sex))}</div>
      <div>{'年龄：' + (age || '未知')}</div>
    </div>
    <div className='user-info-edit' onClick={() => { location.hash = '#/edit' }}>
      <Icon type='edit' />
    </div>
  </div>
}

class Main extends React.Component {
  state = {
    data: null
  };

  componentDidMount () {
    API.getUserInfo()
      .then((data) => {
        this.setState({data})
      })
  }

  render () {
    return <div>
      <Banner title='个人中心' />
      <Ztgbox id='INST170454405010' />
      {this.state.data == null ? null : <div>
        <UserInfo {...this.state.data} />
        <div className='block-wrapper'>
          <BannerBlock text='查看体检报告' icon='file-text' url='/reports#/' />
          <BannerBlock style={{display: !util.getParam('channel') ? 'flex' : 'none'}}
            text={<span>化验单拍照识别<span className='beta'>内测版</span></span>} icon='camera-o'
            url={util.getUrlByHash('/photo/')} />
          <BannerBlock style={{display: !util.getParam('channel') ? 'flex' : 'none'}}
            text={<span>共享</span>} icon='shop'
            url={util.getUrl('/html/rent.html#')} />
          <BannerBlock style={{display: !util.getParam('channel') ? 'flex' : 'none'}}
            text={<span>查看历史订单</span>} icon='database'
            url={util.getUrl('/html/rent.html#/history')} />
        </div>
      </div>
      }
    </div>
  }
}

export default Main
