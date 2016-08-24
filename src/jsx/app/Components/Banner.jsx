/**
 * 搜索banner
 */
import SearchInput from './Search.jsx'
import util from '../../util.jsx'
let {Icon} = ANTD

class Banner extends React.Component {
  state = {
    searching: false
  };

  static defaultProps = {
    title: '爱康体应用市场',
    back: false
  };

  toggleSearch () {
    this.setState({searching: !this.state.searching})
  }

  static onSearch (key) {
    location.href = util.getUrlByHash('s/' + key)
  }

  render () {
    let {searching} = this.state
    let {title, back} = this.props

    let middle = searching
      ? <SearchInput placeholder='请输入应用名称' onSearch={Banner.onSearch} />
      : <h2>{title}</h2>

    let right = searching
      ? <Icon type='cross' onClick={::this.toggleSearch} />
      : <Icon type='search' onClick={::this.toggleSearch} />

    let left = back
      ? <Icon type='left' onClick={() => { window.history.back() }} />
      : <Icon />

    return <div>
      <div className='header'>
        {left}
        <div className='app-search-box'>
          {middle}
        </div>
        {right}
      </div>
    </div>
  }
}

export default Banner
