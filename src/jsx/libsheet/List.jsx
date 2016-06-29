/**
 * 某类化验单的项目列表页
 */
import BannerBlock from '../Components/BannerBlock.jsx'
// import API from '../API/libsheet.jsx'
import API2 from '../API/user.jsx'
import Banner from '../Components/Banner.jsx'
import util from '../util.jsx'
let {message} = ANTD

class List extends React.Component {
  state = {
    name: '',
    data: []
  };

  // getData () {
  //   return API.fetchList(this.props.params.name)
  //     .then((data) => {
  //       this.setState({data, name: this.props.params.name})
  //     })
  // }

  getData() {
    let hide = message.loading('正在识别化验单中...', 0)
    API2.recognize(this.props.params.name)
      .then((data) => {
        console.log(data)
        this.setState({data, name: this.props.params.name})
        hide()
      })
      .catch((e) => {
        hide()
        message.error('无法识别化验单')
        throw e
      })
  }


  componentDidMount () {
    this.getData()
  }

  render () {
    let curName = this.props.params.name
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

    return <div>
      <Banner title='化验单解读'/>
      {this.state.data.map((item) => {
        return <BannerBlock
          text={`${item.key} (${item.value})`} key={item.key} url={util.getUrlByHash(`item/${encodeURIComponent(item.key)}`)} />
      })}
    </div>
  }
}

export default List
