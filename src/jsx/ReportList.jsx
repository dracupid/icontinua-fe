import Loading from './Components/Loading.jsx'
let {Alert, Pagination} = ANTD

const itemPerPage = 10;

class ReportList extends React.Component {
  static propTypes = {
    userId: React.PropTypes.string.isRequired,
    data: React.PropTypes.object
  };

  state = {
    curPage: 0
  }

  clickItem (reportId) {
    window.location.href = `/reports#/${this.props.userId}/${reportId}`
  }

  static formatTime (t) {
    let date = new Date(parseInt(t, 10))
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 \n` +
      `${_.padLeft(date.getHours(), 2, 0)}:${_.padLeft(date.getMinutes(), 2, 0)}`
  }

  onChangePage (pageNum) {
    this.setState({curPage: pageNum - 1})
  }

  render () {
    let timeline = []
    let {data} = this.props

    if (data === null) {
      timeline = <Loading text='正在加载你的体检记录...'/>
    } else if (Object.keys(data).length === 0) {
      timeline = (
        <Alert
          message='你还没有体检过，体验一下爱康体吧！'
          type='info' showIcon/>
      )
    } else {
      let index = 0
      let _data = _.values(data)
      let total = _data.length
      let pageData = _data.slice(this.state.curPage * itemPerPage, (this.state.curPage + 1) * itemPerPage)
      timeline = (
        <div>
          <ul className='timeline-wrapper'>
            {_.map(pageData, (item) => {
              index += 1
              return (
              <li className='timeline-item' onClick={this.clickItem.bind(this, item.id)}
                  key={item.timestamp}>
                <p className='timestamp'>
                  {ReportList.formatTime(item.timestamp)}
                  <span className='arrow2'/>
                </p>
                <div className='timeline-item-middle'>
                  <div className='timeline-item-tail'/>
                  <div className='timeline-item-id'>{index}</div>
                </div>
                <div className='timeline-item-content'>
                  <span className='arrow1'/>
                  {item.location || '未知'}
                </div>
              </li>
                )
              })}
          </ul>
          <Pagination size="small" defaultCurrent={1} total={total} pageSize={itemPerPage}
                      onChange={this.onChangePage.bind(this)}/>

        </div>
      )
    }
    return (
      <div id='list-timeline'>
        {timeline}

      </div>
    )
  }
}

export default ReportList
