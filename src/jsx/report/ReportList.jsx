/**
 * 报告列表页面组件
 */
import Loading from './../Components/Loading.jsx'
import Ad from './../Components/Ad.jsx'
import reportUtil from './util.jsx'
let {Alert, Pagination} = ANTD

const itemPerPage = 10

class ReportList extends React.Component {
  static propTypes = {
    userId: React.PropTypes.string,
    data: React.PropTypes.object
  };

  state = {
    curPage: 0
  };

  clickItem (reportId) {
    let {userId} = this.props
    if (!userId) return
    window.location.href = `/reports#/${userId}/${reportId}`
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
              return <li className='timeline-item' onClick={this.clickItem.bind(this, item.id)} key={item.timestamp}>
                <p className='timestamp'>
                  {reportUtil.formatDateTime(item.timestamp, true)}
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
            })}
          </ul>
          <Pagination
            size='small' current={this.state.curPage + 1} total={total} pageSize={itemPerPage}
            onChange={::this.onChangePage}/>

        </div>
      )
    }
    return (
      <div id='list-timeline'>
        <Ad
          title='一元就能中iphone 可别错过好运气！注册送钱！ 免费试玩！'
          text={<div>皮皮夺宝（<a href='http://www.ppduobao.com'>www.ppduobao.com</a>）是一种时尚新奇的购物体验方式，能满足年轻消费者的购物需求的新型购物网。</div>}
          img='/img/res/pipi.jpg'/>
        {timeline}
      </div>
    )
  }
}

export default ReportList
