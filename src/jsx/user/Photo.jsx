let {Icon, Button, message} = ANTD
import Banner from '../Components/Banner.jsx'
import {takePhoto, uploadPhoto} from '../wechat.jsx'
import util from '../util.jsx'
import {getUserInfo} from './util.jsx'

function ImgBlock (props) {
  let thumbUrl = props.url.replace("http://cdn.icontinua.com", "http://cdn-img.icontinua.com") + '@0o_0l_50Q_128w.src'
  return <div style={{backgroundImage: `url(${thumbUrl})`}} className='img-item' {...props}>
    <div className="btn-recognize" onClick={props.onRecognize}>
      <Button className="btn-recognize">识别</Button>
    </div>

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

  recognizePhoto (img) {
    return (e) => {
      e.stopPropagation()
      let hide = message.loading('正在识别化验单中...', 0);
      util.fetchAPI(`/api/recognize/libSheet?filename=${img}`)
        .then((data) => {
          hide()
          location.href = '/html/libsheet.html#/' + data
        })
        .catch(() => {
          hide()
          message.error('无法识别化验单')
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
      .then((url) => {
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
      let url = i.indexOf('://') > 0 ? i : ('http://cdn.icontinua.com/photo/' + i)
      return <ImgBlock
        url={url} key={index} onClick={this.triggerFullScreen.bind(this, url)}
        onDelete={this.deletePhoto(i)}
        onRecognize={this.recognizePhoto(i)}/>
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
      <Banner title='化验单识别' backUrl={util.getUrlByHash(this.props.params.userId)}/>
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
