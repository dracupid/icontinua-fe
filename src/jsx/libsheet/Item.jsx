/**
 * 化验单具体项目解读页面
 */
import API from '../API/libsheet.jsx'
import Banner from '../Components/Banner.jsx'
import util from '../util.jsx'
import Tips from '../Components/Tips.jsx'

class Item extends React.Component {
  state = {
    name: '',
    data: {}
  };

  getData () {
    return API.fetchItem(this.props.params.name)
      .then((data) => {
        this.setState({data, name: this.props.params.name})
      })
  }

  componentDidMount () {
    this.getData()
  }

  render () {
    let {name: curName, catalog} = this.props.params
    if (this.state.name !== curName) {
      this.getData()
    }

    return <div className='libsheet-item'>
      <Banner title={curName} backUrl={catalog ? util.getUrlByHash(catalog) : null}/>
      <Tips title='描述'>
        <div dangerouslySetInnerHTML={{__html: this.state.data.item_description}}/>
      </Tips>
      <Tips title='测量值解读'>
        <div dangerouslySetInnerHTML={{__html: this.state.data.item_value}}/>
      </Tips>
      <Tips title='参考值'>
        <div dangerouslySetInnerHTML={{__html: this.state.data.item_reference}}/>
      </Tips>
    </div>
  }
}

export default Item
