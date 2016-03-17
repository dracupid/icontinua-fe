import util from '../util.jsx'
import Loading from '../Components/Loading.jsx'
let {Button} = ANTD

function format (num) {
  if (num > 100000) {
    return _.round(num / 10000) + '万'
  } else if (num > 10000) {
    return _.round(num / 10000, 1) + '万'
  } else if (num > 1000) {
    return _.round(num / 1000) + '千'
  } else {
    return num
  }
}

function AppListItem (props) {
  return <div className='app-list-item' onClick={() => { location.href = '/apps#/item/' + props.uid }}>
    <div className='info-icon'>
      <img src={props.imgUrl}/>
    </div>
    <div className='info-text-wrapper'>
      <h3>{props.name}</h3>
      <span>{format(props.downloadNum) + '人在用'}</span>
    </div>
    <div className='app-desc-short'>
      {props.shortDesc}
    </div>
  </div>
}

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
  }

  loadPage(){
    let num = this.state.curPage + 1
    console.log("load " + num)
    this.setState({
      loading: true,
      curPage: num
    })
    util.fetchAPI(`/api/app/${this.props.type}?itemPerPage=${this.props.itemPerPage}&pageNum=${num}&name=${this.props.tagName}`)
      .then((res) => {
        this.setState({
          data: this.state.data === null ? res.data : this.state.data.concat(res.data),
          hasMore: res.data.length === parseInt(this.props.itemPerPage, 10),
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
    if (this.state.data == null) {
      return <Loading />
    } else {
      let arr = this.state.data.map((v) => {
        return <AppListItem {...v} key={v.uid}/>
      })

      let btnContent = (function(self) {
        if(self.state.loading) {
          return <div>
             加载中
          </div>
        } else{
          return "加载更多"
        }
      })(this)

      return <div>
        {arr}
        {this.state.hasMore ? <h3 className="btn-load-more" size="large" loading={this.state.loading} onClick={this.onChangePage.bind(this)}>
          {btnContent}
        </h3> : null}
      </div>
    }
  }
}

export default AppList
