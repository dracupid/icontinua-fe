/**
 * 某类化验单的项目列表页
 */
import BannerBlock from '../Components/BannerBlock.jsx'
import API from '../API/libsheet.jsx'
import Banner from '../Components/Banner.jsx'
import util from '../util.jsx'

class List extends React.Component {
  state = {
    name: '',
    data: []
  };

  getData () {
    return API.fetchList(this.props.params.name)
      .then((data) => {
        this.setState({data, name: this.props.params.name})
      })
  }

  componentDidMount () {
    this.getData()
  }

  render () {
    let curName = this.props.params.name
    let hasName = !!curName
    if (this.state.name !== curName) {
      this.getData()
    }
    let items = this.props.params.items && this.props.params.items.split(',')

    // 如果匹配到项目,则高亮
    let shouldHighlight = (str) => {
      if (!_.isArray(items)) return false

      for (let i of items) {
        if (str.replace(/[^\u4e00-\u9fa5]+/, '') === i) return true
      }

      return false
    }

    return <div>
      <Banner title={hasName ? curName : '化验单解读'}/>
      {this.state.data.map((item) => {
        return <BannerBlock
          text={item} key={item} url={util.getUrlByHash(hasName ? `item/${curName}/${item}` : item)}
          icon={shouldHighlight(item) ? 'check' : null}/>
      })}
    </div>
  }
}

export default List
