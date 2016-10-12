/**
 * 化验单识别页面
 */
let {Icon, Button, message, Upload, Spin} = ANTD
import Banner from '../Components/Banner.jsx'
import util from '../util.jsx'
import API from '../API/user.jsx'
import Cropper from '../../react-cropper.js'
import 'blueimp-canvas-to-blob'

Object.assign = _.assign

function fileToBase64 (file) {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      resolve(reader.result)
    }
    reader.readAsDataURL(file)
  })
}

/**
 * 用户拍照的图片组件
 */
function ImgBlock (props) {
  let thumbUrl = '//cdn-img.icontinua.com/photo/' + props.url + '@0o_0l_60Q_400w.src'
  return <div style={{backgroundImage: `url(${thumbUrl})`}} className='img-item' {...props}>
    <div className='btn-recognize' onClick={props.onRecognize}>
      <Button className='btn-recognize'>识别</Button>
    </div>

    <div className='btn-delete' onClick={props.onDelete}>
      <Button type='ghost' shape='circle-outline' size='small'><Icon type='cross' /></Button>
    </div>
  </div>
}

class Photo extends React.Component {
  state = {
    data: {},
    fullScreen: false, // 是否全屏显示
    curImg: null, // 当前全屏图片
    imgFile: null,
    imgDataURL: null,
    uploading: false // 是否正在上传图片,一次只能上传一张图片
  };

  /**
   * 调用API删除照片
   * @param img 图片文件名
   */
  deletePhoto (img) {
    return (e) => {
      e.stopPropagation()
      API.deletePhoto(this.props.params.userId, img)
        .then(() => {
          message.info('照片删除成功')
          let data = this.state.data
          // 去除本地照片显示
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

  /**
   * 调用API识别化验单照片
   * @param img 图片名称
   */
  recognizePhoto (img) {
    return (e) => {
      e.stopPropagation()
      util.toUrl(`/html/libsheet.html#/${img}`)
    }
  }

  /**
   * 图片上传
   */
  upload () {
    this.setState({uploading: true})
    this.refs.cropper.getCroppedCanvas({fillColor: 'white'}).toBlob((blob) => {
      API.uploadPhoto(this.props.params.userId, blob)
        .then((url) => {
          message.info('照片上传成功')
          let data = this.state.data
          if (data.photos) {
            data.photos.push(url)
          } else {
            data.photos = [url]
          }
          this.setState({imgDataURL: null, data, uploading: false})
        })
        .catch((e) => {
          message.error('照片上传失败, 请重试')
          this.setState({uploading: false})
          throw e
        })
    }, 'image/jpeg')
  }

  componentDidMount () {
    API.getUserInfo(this.props.params.userId)
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

  onUploadImage ({file}) {
    // this.refs.cropper && this.refs.cropper.reset()
    fileToBase64(file.originFileObj)
      .then((res) => {
        this.setState({
          imgFile: file,
          imgDataURL: res
        })
      })
  }

  onCrop () {
    // this.cropper = this.refs.cropper.getCroppedCanvas()
  }

  rotate (degree) {
    this.refs.cropper.rotate(degree)
  }

  adjustImg () {
    let data = this.cropper.getImageData()
    if (data.width < data.height) {
      // this.cropper.rotate(-90)
    }
    // alert(JSON.stringify(data))
    // alert(JSON.stringify(this.cropper.getCanvasData()))
  }

  render () {
    // 拍照/上传按钮
    let btn = (() => {
      if (this.state.imgDataURL) {
        return <div className='btn-photo btn-photo-two'>
          <Button type='primary' size='large' onClick={() => this.setState({imgDataURL: null})}>
            <Icon type='reload' />
            重新拍照
          </Button>
          {this.state.uploading
            ? <Button type='primary' size='large'>
              <Spin /> 上传中
            </Button>
            : <Button type='primary' size='large' onClick={::this.upload}>
              <Icon type='upload' />上传
            </Button>
          }
          <br />
          <br />
          <Button type='primary' size='large' onClick={this.rotate.bind(this, -90)}>
            <Icon type='reload' />
            左旋90度
          </Button>
          <Button type='primary' size='large' onClick={this.rotate.bind(this, 90)}>
            <Icon type='reload' />
            右旋90度
          </Button>
        </div>
      } else {
        return <div className='btn-photo'>
          <Upload action='//' accept='image/*' onChange={::this.onUploadImage} showUploadList={false}>
            <Button type='primary' size='large' className='needsclick'>
              <Icon className='needsclick' type='camera' /><span className='needsclick'>拍照上传</span>
            </Button>
          </Upload>
        </div>
      }
    })()

    // 图片列表
    let imgs = _.map(this.state.data.photos, (i, index) => {
      return <ImgBlock
        url={i} key={index} onClick={this.triggerFullScreen.bind(this, i)}
        onDelete={this.deletePhoto(i)}
        onRecognize={this.recognizePhoto(i)} />
    })

    // 图片流,每行显示三张图片
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
      <Banner title='化验单识别' backUrl={util.getUrlByHash(this.props.params.userId)} />
      {btn}
      <div>
        {this.state.imgDataURL
          ? <Cropper
            ref='cropper'
            src={this.state.imgDataURL} style={{height: 400, width: '100%'}}
           // crop={::this.onCrop}
            viewMode={2}
            guides={false}
            dragMode='move'
           // checkOrientation={false}
            built={this.adjustImg}
           // preview='.img-preview'
         />
          : null}
      </div>
      {imageBlocks}
      <div
        className='pop-image' style={{display: this.state.fullScreen ? 'block' : 'none'}}
        onClick={this.triggerFullScreen.bind(this, null)}>
        <img src={'//cdn.icontinua.com/photo/' + this.state.curImg} />
      </div>
    </div>
  }
}

export default Photo
