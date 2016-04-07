import {filter, getStarLevel, getLevelText} from './chineseUtil.jsx'
import Loading from '../../Components/Loading.jsx'
import Tips from '../../Components/Tips.jsx'
import API from '../../API/report.jsx'

let {Affix, Alert} = ANTD

class ReportBlock extends React.Component {
  static propTypes = {
    title: React.PropTypes.string.isRequired,
    level: React.PropTypes.number.isRequired,
    items: React.PropTypes.array.isRequired
  };

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

    let onStars = new Array(starNum)
    let offStars = new Array(5 - starNum)
    let onStar = <div className='star on'/>
    let offStar = <div className='star off'/>

    _.fill(onStars, onStar)
    _.fill(offStars, offStar)

    return (
      <div className='chinese-report-block'>
        <div className='report-header'>
          <h1 className='title'>{'您的' + title}</h1>

          <div className='status'>{title + '状况: ' + getLevelText(level)}</div>
          <div className='stars'>
            <h4>{`您的${title}为: `}</h4>{onStars.concat(offStars)}
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
    zangfu: React.PropTypes.number.isRequired,
    jizhui: React.PropTypes.number.isRequired,
    xiaohua: React.PropTypes.number.isRequired,
    miniao: React.PropTypes.number.isRequired
  };

  render () {
    let {zangfu, jizhui, xiaohua, miniao} = this.props
    let data = {
      脏腑: zangfu,
      脊椎: jizhui,
      消化: xiaohua,
      泌尿: miniao
    }
    let res = _.map(data, (v, k) => {
      return <div className='kv' key={k}>
        <span className='key'>{k}</span>
        <span className='value'>{parseFloat(v).toFixed(1)}</span>
      </div>
    })

    return <div className='c-kv-map'>{res}</div>
  }
}

class Chinese extends React.Component {
  static propTypes = {
    id: React.PropTypes.string.isRequired
  };

  state = {
    data: null,
    loaded: false
  };

  componentDidMount () {
    let id = this.props.id
    API.falthReport('/api/falthReport?id=' + id, {raw: true}).then((res) => {
      this.setState({
        data: res,
        loaded: true
      })
    })
  }

  render () {
    if (this.state.loaded) {
      if (this.state.data === null) {
        return <Alert
          message='没有您的生物电数据'
          type='info' showIcon/>
      } else {
        let data = filter(this.state.data)
        return (
          <div style={{marginBottom: '20px'}}>
            <Tips
              text={'基于生物电技术，通过智能电子感知设备，持续诱导人体手掌皮肤生物电刺激，在人体组织内转化为离子流，依据离子流在阴、阳极间的极化运动。测量人体组织的生物电能及细胞膜的动作电位，通过3-5分钟扫描，根据应激反应数据评估全身各大组织器官的生物活性和功能状况，预测潜在的亚健康趋势，对疾病风险做出早期预警。'}
              title='简介'/>
            <Affix>
              <Scores {...data.scores}/>
            </Affix>
            <ReportBlock title='脏腑' {...data.zangfu}/>
            <ReportBlock title='脊椎' {...data.jizhui}/>
          </div>
        )
      }
    } else {
      return <Loading />
    }
  }
}

export default Chinese
