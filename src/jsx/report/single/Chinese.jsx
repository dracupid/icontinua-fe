/**
 * 中医报告页面
 */
import { filter, getLevelText, getStarLevel } from './chineseUtil.jsx'
import Loading from '../../Components/Loading.jsx'
import Tips from '../../Components/Tips.jsx'
import API from '../../API/report.jsx'
import Rank from '../../Components/Rank.jsx'
import util from '../../util.jsx'
import AdBanner from '../../Components/AdBanner'

let {Alert, Rate} = ANTD

function ScoreTab ({score}) {
  if (score === 0) score = 0.1
  let scale = 10 * score
  return <div className='color-tab' style={{width: `${scale}%`, backgroundSize: `${10000 / (scale)}%`}} />
}

class ReportBlock extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    level: PropTypes.number.isRequired,
    items: PropTypes.array.isRequired
  }

  render () {
    let {title, level, items} = this.props
    let starNum = getStarLevel(level)
    let notices = _.pluck(items, 'name').join('，')
    let itemDOMs = items.map((item, i) => {
      let intro = (() => {
        if (item.intro) {
          return (
            <div className='block'>
              <h3 className='title'>【简介】</h3>
              <div className='content'>{item.intro}</div>
            </div>
          )
        }
      })()

      let advise = (() => {
        if (item.advice) {
          return (
            <div className='block'>
              <h3 className='title'>【调理建议】</h3>
              <ol className='content'>{item.advice.map((e, i) => {
                return <li key={i}> {e} </li>
              })}
              </ol>
            </div>
          )
        }
      })()

      let adviceFood = (() => {
        if (item.eating) {
          return (
            <div className='block'>
              <h3 className='title'>【饮食建议】</h3>

              <div className='content'>{item.eating}</div>
            </div>
          )
        }
      })()

      return (
        <div key={i}>
          <h3 className='name'>{item.name}</h3>
          {intro}
          {advise}
          {adviceFood}
        </div>
      )
    })

    return (
      <div className='chinese-report-block'>
        <div className='report-header'>
          <h1 className='title'>{'您的' + title}</h1>

          <div className='status'>{title + '状况: ' + getLevelText(level)}</div>
          <div className='stars'>
            <h4>{`您的${title}为: `}</h4>{<Rate disabled defaultValue={starNum} />}
          </div>
          <h4>建议您注意:</h4>{notices}
        </div>
        <div className='report-body'>{itemDOMs}</div>
      </div>
    )
  }
}

class Scores extends React.Component {
  static propTypes = {
    zangfu: PropTypes.number.isRequired,
    jizhui: PropTypes.number.isRequired,
    xiaohua: PropTypes.number.isRequired,
    miniao: PropTypes.number.isRequired
  }

  render () {
    let {zangfu, jizhui, xiaohua, miniao} = this.props
    let data = {
      脏腑: zangfu,
      脊椎: jizhui,
      消化: xiaohua,
      泌尿: miniao
    }
// res = _.map(data, (v, k) => {
//   return <div className='kv' key={k}>
//     <span className='key'>{k}</span>
//     <span className='value'>{parseFloat(v).toFixed(1)}</span>
//   </div>

    let res = _.map(data, (v, k) => {
      return <div className='kv' key={k}>
        <span className='key'>{k}</span>
        {(() => {
          return <ScoreTab score={parseFloat(v)} />
        })()}
      </div>
    })

    return <div>
      <div className='legend'>
        <div><span>警告</span><span style={{marginLeft: '40%'}}>一般</span><span
          style={{right: '20px', position: 'absolute'}}>正常</span></div>
        <div className='color-tab' style={{width: '100%', backgroundSize: '100%'}} />
      </div>
      <div className='c-kv-map'>{res}</div>
    </div>
  }
}

class Chinese extends React.Component {
  static propTypes = {
    cacheId: PropTypes.string.isRequired
  }

  state = {
    data: null,
    loaded: false
  }

  componentDidMount () {
    API.falthReport(this.props.cacheId)
      .then((res) => {
        this.setState({
          data: res,
          loaded: true
        })
      }).catch((e) => {
        this.setState({
          data: null,
          loaded: true
        })
      })
  }

  render () {
    let adJz, adZf

    if (util.getParam('channel') === '3rd') {
      adJz = <AdBanner channel="zsf" positionKey="jz-1"/>
    }

    if (util.getParam('channel') === '3rd') {
      adZf = <AdBanner channel="zsf" positionKey="zf-1"/>
    }

    let {jizhui, zangfu, xiaohua, miniao, user} = this.props
    if (this.state.loaded) {
      if (this.state.data === null) {
        return <Alert
          message='没有您的生物电数据'
          type='info' showIcon />
      } else {
        let data = filter(this.state.data)
        return (
          <div style={{marginBottom: '20px'}}>
            <Tips
              text={'基于生物电技术，通过智能电子感知设备，持续诱导人体手掌皮肤生物电刺激，在人体组织内转化为离子流，依据离子流在阴、阳极间的极化运动。测量人体组织的生物电能及细胞膜的动作电位，通过3-5分钟扫描，根据应激反应数据评估全身各大组织器官的生物活性和功能状况，预测潜在的亚健康趋势，对疾病风险做出早期预警。'}
              title='简介' />
            <Scores {...data.scores} />
            <ReportBlock title='脏腑' {...data.zangfu} />{adZf}
            <ReportBlock title='脊椎' {...data.jizhui} />{adJz}
            <Rank obj={{脏腑: zangfu, 脊椎: jizhui, 消化: xiaohua, 泌尿: miniao}}
              user={user} />
          </div>
        )
      }
    } else {
      return <Loading />
    }
  }
}

export default Chinese
