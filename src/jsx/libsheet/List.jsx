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
    return <div>
      <Banner title={hasName ? curName : '化验单解读'} goBack/>
      {this.state.data.map((item) => {
        return <BannerBlock text={item} key={item} url={util.getUrlByHash(hasName ? `item/${curName}/${item}` : item)}/>
      })}
    </div>
  }
}

export default List
