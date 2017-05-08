/**
 * 化验单具体项目解读页面
 */
import API from '../API/labsheet.jsx'
import 'antd-mobile/lib/nav-bar/style/css.web.js'
import NavBar from 'antd-mobile/lib/nav-bar/index.web.js'
import Card from 'antd/lib/card'
import 'antd/lib/card/style/index.css'

class Item extends React.Component {
  state = {
    name: '',
    data: null
  }

  static formatSubResult (res) {
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
    let {name: curName} = this.props.params
    // if (this.state.name !== curName) {
    //   this.getData()
    // }

    let loading = (this.state.data === null)
    let data = this.state.data || {}

    return <div className='labsheet-item'>
      <NavBar className='navbar' iconName=''>{curName}</NavBar>
      <Card loading={loading} title='名称' className='card with-margin'>
        {this.state.name + (data.abbr ? ` (${data.abbr})` : '')}
      </Card>
      <Card loading={loading} title='测量值解读' className='card with-margin'>
        {Item.formatResult(data.result)}
      </Card>
      <Card loading={loading} title='参考值' className='card with-margin'>
        {data.refValStr}
      </Card>
    </div>
  }
}

export default Item
