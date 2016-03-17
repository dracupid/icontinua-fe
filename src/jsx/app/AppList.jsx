import util from '../util.jsx'
import Loading from '../Components/Loading.jsx'

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
    curPage: 0,
    data: null
  };

  componentDidMount () {
    util.fetchAPI(`/api/app/tag?pageNum=${this.state.curPage}&name=${this.props.tagName}`)
      .then((res) => {
        this.setState({
          data: res.data
        })
      })
  }

  render () {
    if (this.state.data == null) {
      return <Loading />
    } else {
      let arr = this.state.data.map((v) => {
        return <AppListItem {...v} key={v.uid}/>
      })
      return <div>{arr}</div>
    }
  }
}

export default AppList
