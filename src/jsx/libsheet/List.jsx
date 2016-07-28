/**
 * 某类化验单的项目列表页
 */
import BannerBlock from '../Components/BannerBlock.jsx'
import API2 from '../API/user.jsx'
import Banner from '../Components/Banner.jsx'
import util from '../util.jsx'
// import API from '../API/libsheet.jsx'
let {Steps, Alert, Spin} = ANTD
let Step = Steps.Step

class List extends React.Component {
  state = {
    name: '',
    data: [],
    state: 'WAITING',
    errText: '',
  };

  // getData () {
  //   return API.fetchList(this.props.params.name)
  //     .then((data) => {
  //       this.setState({data, name: this.props.params.name})
  //     })
  // }
  polling (imgName, interval) {
    API2.pollingState(imgName)
      .then((data) => {
        this.setState({state: data.state, data: data.items})
        if (data.state === 'FINISHED') {
          interval && clearInterval(interval)
        } else if (data.state === 'ERROR') {
          interval && clearInterval(interval)
          this.setState({state: 'ERROR', errText: "无法识别化验单，请重新上传图片。请保证图片清晰，无明显倾斜和扭曲"})
        }
      })
      .catch((e) => {
        this.setState({state: 'ERROR', errText: "化验单识别服务故障中，请稍后再试"})
        interval && clearInterval(interval)
        throw e
      })
  }

  getData () {
    let imgName = this.props.params.name.replace('.jpg', '');
    API2.sendRecognize(imgName)
      .then(()=> {
        this.polling(imgName)
        let interval = setInterval(() => {
          this.polling(imgName, interval)
        }, 3000)
      })
      .catch((e) => {
        this.setState({state: 'ERROR', errText: "化验单识别服务故障中，请稍后再试"})
        throw e
      })
  }


  componentDidMount () {
    this.getData()
  }

  render () {
    // let curName = this.props.params.name
    // let hasName = !!curName
    // if (this.state.name !== curName) {
    //   this.getData()
    // }
    // let items = this.props.params.items && this.props.params.items.split(',')

    // // 如果匹配到项目,则高亮
    // let shouldHighlight = (str) => {
    //   if (!_.isArray(items)) return false
    //
    //   for (let i of items) {
    //     if (str.replace(/[^\u4e00-\u9fa5]+/, '') === i) return true
    //   }
    //
    //   return false
    // }
    let states
    if (this.state.state == 'ERROR') {
      states = <Alert
        message={this.state.errText}
        type="error"
        showIcon
      />
    } else {
      let stateName = ["排队中", "开始识别", "图片预处理", "识别中", "智能纠错", "已完成"]
      let current = ['WAITING', 'STARTED', 'PRE_PROCESSING', 'RECOGNIZING', 'FORMATTING', 'FINISHED'].indexOf(this.state.state)
      stateName[current] = <div><Spin /> {stateName[current]}</div>
      let status = ['process', 'process', 'process', 'process', 'process', 'finish'][current]
      states = <Steps direction="vertical" current={current} status={status} style={{padding: '20px'}}>{
        stateName.map((i) => <Step key={i} title={i}/>)
      }
      </Steps>
    }

    return <div>
      <Banner title='化验单解读'/>
      {this.state.state === 'FINISHED' ? null : states}
      {this.state.data.map((item) => {
        return <BannerBlock
          text={`${item.name} (${item.numberValue})`} key={item.name}
          url={util.getUrlByHash(`item/${encodeURIComponent(item.name)}`)}/>
      })}
    </div>
  }
}

export default List
