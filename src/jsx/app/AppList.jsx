import util from '../util.jsx'
import Loading from '../Components/Loading.jsx'
import AppListItem from './Components/AppListItem.jsx'

class AppList extends React.Component {
  state = {
    curPage: -1,
    data: null,
    hasMore: true,
    loading: false
  };

  static defaultProps = {
    type: 'tag',
    itemPerPage: 10
  };

  loadPage () {
    let num = this.state.curPage + 1
    let {type, itemPerPage, tagName} = this.props
    this.setState({
      loading: true,
      curPage: num
    })
    util.fetchAPI(`/api/app/${type}?itemPerPage=${itemPerPage}&pageNum=${num}&name=${tagName}`)
      .then((res) => {
        this.setState({
          data: this.state.data === null ? res : this.state.data.concat(res),
          hasMore: res.length === parseInt(itemPerPage, 10),
          loading: false
        })
      })
  }

  componentDidMount () {
    this.loadPage()
  }

  onChangePage () {
    this.loadPage()
  }

  render () {
    let {data, loading} = this.state

    if (data == null) {
      return <Loading />
    } else {
      let apps = _.isEmpty(data)
        ? <h3 className='not-found'>没有找到相关应用</h3>
        : data.map((v) => {
        return <AppListItem {...v} key={v.uid}/>
      })

      return <div>
        {apps}
        {this.state.hasMore
          ? <h3 className='btn-load-more' size='large' loading={loading} onClick={::this.onChangePage}>
          {loading ? <div>加载中</div> : '加载更多'}
        </h3>
          : null}
      </div>
    }
  }
}

export default AppList
