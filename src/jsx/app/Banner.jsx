import SearchInput from '../Components/Search.jsx'
import util from '../util.jsx'
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
    this.setState({
      searching: !this.state.searching
    })
  }

  doSearch (key) {
    util.fetchAPI('/api/app/search?name=' + key)
      .then((res) => {
        console.log(res)
      })
  }

  render () {
    let middle = (function (self) {
      if (self.state.searching) {
        return <SearchInput placeholder='请输入应用名称' onSearch={self.doSearch.bind(self)}/>
      } else {
        return <h2>{self.props.title}</h2>
      }
    })(this)

    let right = (function (self) {
      if (self.state.searching) {
        return <Icon type='cross' onClick={self.toggleSearch.bind(self)}/>
      } else {
        return <Icon type='search' onClick={self.toggleSearch.bind(self)}/>
      }
    })(this)

    let left = (function (self) {
      if (self.props.back) {
        return <Icon type='left' onClick={function () { window.history.back() }}/>
      } else {
        return <Icon/>
      }
    })(this)

    return <div>
      <div className='header-store'>
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
