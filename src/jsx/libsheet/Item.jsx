/**
 * 化验单具体项目解读页面
 */
import API from '../API/libsheet.jsx'
import Banner from '../Components/Banner.jsx'
import util from '../util.jsx'
let {Card} = ANTD

class Item extends React.Component {
  state = {
    name: '',
    data: null
  };

  static formatRefVal (refVal) {
    if (!refVal) return '暂无'
    return `${refVal[0]} - ${refVal[1]} ${refVal[2]}`
  }

  static formatSubResult(res) {
    let ret = []
    if (_.isArray(res)) {
      for (let i of res) {
        ret.push(<li>{i}</li>)
      }
    } else {
      ret.push(<p>{res}</p>)
    }
    return ret
  }

  static formatResult (result) {
    if (_.isEmpty(result)) return '暂无'
    if (_.isObject(result)) {
      let ret = []
      if (result.high) {
        ret.push(<h3>偏高:</h3>)
        ret = ret.concat(Item.formatSubResult(result.high))
      }
      if (result.low) {
        ret.push(<h3>偏低:</h3>)
        ret = ret.concat(Item.formatSubResult(result.low))
      }
      return ret
    }

    return result
  }

  getData () {
    let {name} = this.props.params
    return API.fetchItem(name)
      .then((data) => {
        this.setState({data, name})
      })
  }

  componentDidMount () {
    this.getData()
  }

  render () {
    let {name: curName, catalog} = this.props.params
    // if (this.state.name !== curName) {
    //   this.getData()
    // }

    let loading = (this.state.data === null)
    let data = this.state.data || {}

    return <div className='libsheet-item'>
      <Banner title={curName} backUrl={catalog ? util.getUrlByHash(catalog) : null}/>
      <Card loading={loading} title="名称" className="card with-margin">
        {this.state.name + (data.abbr ? ` (${data.abbr})` : "")}
      </Card>
      <Card loading={loading} title="测量值解读" className="card with-margin">
        {Item.formatResult(data.result)}
      </Card>
      <Card loading={loading} title="参考值" className="card with-margin">
        {Item.formatRefVal(data.refVal)}
      </Card>
    </div>
  }

  /*
   <!-- <Tips title='描述'>
   <div dangerouslySetInnerHTML={{__html: this.state.data.item_description}}/>
   </Tips>
   <Tips title='测量值解读'>
   <div dangerouslySetInnerHTML={{__html: this.state.data.item_value}}/>
   </Tips>
   <Tips title='参考值'>
   <div dangerouslySetInnerHTML={{__html: this.state.data.item_reference}}/>
   </Tips> -->
   */
}

export default Item
