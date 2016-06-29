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

  static formatRefVal (refVal) {
    if (!refVal) return ''
    return `${refVal[0]} - ${refVal[1]} ${refVal[2]}`
  }

  static formatResult (result) {
    if (_.isEmpty(result)) return ''
    if (_.isObject(result)) {
      let ret = []
      if (result.high){
        ret.push(<h3>偏高:</h3>)
        for (let i of result.high){
          ret.push(<li>{i}</li>)
        }
      }
      if (result.low) {
        ret.push(<h3>偏低:</h3>)
        for (let i of result.low){
          ret.push(<li>{i}</li>)
        }
      }
      return ret
    }

    return result
  }

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

    let {data} = this.state
    console.log(data)

    return <div className='libsheet-item'>
      <Banner title={curName} backUrl={catalog ? util.getUrlByHash(catalog) : null}/>
      <Tips title='名称'>
        <p>{this.state.name + (data.abbr ? ` (${data.abbr})` : "")}</p>
      </Tips>
      <Tips title='测量值解读'>
        {Item.formatResult(data.result)}
      </Tips>
      <Tips title='参考值'>
        <p>{Item.formatRefVal(data.refVal)}</p>
      </Tips>

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
