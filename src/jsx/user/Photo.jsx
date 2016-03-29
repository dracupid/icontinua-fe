let {Icon, Button, message} = ANTD
import Banner from '../Components/Banner.jsx'
import {takePhoto, uploadPhoto} from '../wechat.jsx'
import util from '../util.jsx'
import {getUserInfo} from './util.jsx'

function ImgBlock (props) {
  alert(props.url)
  return <div style={{backgroundImage: `url(${props.url}?thumb=1)`}} className='img-item' {...props}>
    <div className='btn-delete' onClick={props.onDelete}>
      <Button type='ghost' shape='circle-outline' size='small'><Icon type='cross'/></Button>
    </div>
  </div>
}

class Photo extends React.Component {
  state = {
    data: {},
    imgUrl: null,
    fullScreen: false,
    curImg: null
  };

  loading = false;

  takePhoto () {
    takePhoto()
      .then((url) => {
        this.setState({imgUrl: url})
      })
  }

  deletePhoto (img) {
    return (e) => {
      e.stopPropagation()
      util.fetchAPI(`/api/user/photo/delete?id=${this.props.params.userId}&imgId=${img}`)
        .then(() => {
          message.info('照片删除成功')
          let data = this.state.data
          if (data.photos) {
            _.remove(data.photos, (item) => {
              return item === img
            })
          }
          this.setState({data})
        })
        .catch(() => {
          message.error('照片删除失败, 请重试')
        })
    }
  }

  upload () {
    if (this.loading === true) return
    this.loading = true
    uploadPhoto(this.state.imgUrl)
      .then((id) => {
        return util.fetchAPI(`/api/user/photo?id=${this.props.params.userId}&imgId=${id}`)
      })
      .then(({data: url}) => {
        message.info('照片上传成功')
        let data = this.state.data
        if (data.photos) {
          data.photos.push(url)
        } else {
          data.photos = [url]
        }
        this.setState({imgUrl: null, data})
        this.loading = false
      })
      .catch(() => {
        message.error('照片上传失败, 请重试')
        this.loading = false
      })
  }

  componentDidMount () {
    getUserInfo(this.props.params.userId)
      .then((data) => {
        this.setState({data})
      })
  }

  triggerFullScreen (img) {
    this.setState({
      fullScreen: !this.state.fullScreen,
      curImg: img
    })
  }

  render () {
    let btn = (() => {
      if (this.state.imgUrl) {
        return <div className='btn-photo btn-photo-two'>
          <Button type='primary' size='large' onClick={this.takePhoto.bind(this)}>
            <Icon type='reload'/>
            重新拍照
          </Button>
          <Button type='primary' size='large' onClick={this.upload.bind(this)}>
            <Icon type='upload'/>
            上传
          </Button>
        </div>
      } else {
        return <div className='btn-photo' onClick={this.takePhoto.bind(this)}>
          <Button type='primary' size='large'>
            <Icon type='camera'/>
            拍照上传
          </Button>
        </div>
      }
    })()

    let imgs = _.map(this.state.data.photos, (i, index) => {
      let url = i.indexOf('://') > 0 ? i : ('/resource/' + i)
      return <ImgBlock
        url={url} key={index} onClick={this.triggerFullScreen.bind(this, url)}
        onDelete={this.deletePhoto(i)}/>
    })

    let imageBlocks = (() => {
      let ret = []
      let i = 0
      let tmp
      while (true) {
        tmp = _.slice(imgs, i, i + 3)
        if (_.isEmpty(tmp)) break
        ret.push(<div className='img-grid-wrapper' key={i}>{tmp}</div>)
        i += 3
      }
      return ret
    })()

    return <div>
      <Banner title='化验单拍照' backUrl={util.getUrlByHash(this.props.params.userId)}/>
      {btn}
      {this.state.imgUrl ? <img src={this.state.imgUrl} className='upload-img'/> : null}
      {imageBlocks}
      <div
        className='pop-image' style={{display: this.state.fullScreen ? 'block' : 'none'}}
        onClick={this.triggerFullScreen.bind(this, null)}>
        <img src={this.state.curImg}/>
      </div>
    </div>
  }
}

export default Photo
