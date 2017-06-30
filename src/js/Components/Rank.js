/**
 * 排名组件
 */
import Tips from './Tips'

function High (props) {
  return <span style={{color: '#DF5353', fontWeight: 600}}>{props.children}</span>
}

function Middle (props) {
  return <span style={{color: '#959613', fontWeight: 600}}>{props.children}</span>
}

function Low (props) {
  return <span style={{color: '#55BF3B', fontWeight: 600}}>{props.children}</span>
}

function ageGroup (age) {
  if (age < 20) {
    let lowAge = age - (age % 5)
    return `${lowAge} - ${lowAge + 5}岁`
  } else if (age >= 100) {
    return '100岁以上'
  } else {
    let lowAge = age - (age % 10)
    return `${lowAge} - ${lowAge + 10}岁`
  }
}

function Rank (props) {
  let text = _.map(props.obj, (v, k) => {
    let prefix = `你的${k}`
    let rank = _.round(v.rank, 2)

    if (rank === 0) {
      return <span key={k}>{prefix + '是'}<High>最高</High>的。</span>
    } else if (rank === 100) {
      return <span key={k}>{prefix + '是'}<Low>最低的</Low>。</span>
    } else if (rank <= 40) {
      return <span key={k}>{prefix + '位于'}<Low>{rank}%</Low>的位置。</span>
    } else if (rank <= 60) {
      return <span key={k}>{prefix + '位于'}<Middle>{rank}%</Middle>的位置。</span>
    } else {
      return <span key={k}>{prefix + '位于'}<High>{rank}%</High>的位置。</span>
    }
  })

  let refBlock = _.map(props.obj, (v, k) => {
    let cur = v.value
    let ref = v.refValue
    let prefix = `${k}的平均值为${ref}，`
    if (!ref) { return null }
    if (ref < cur) {
      return <span key={'ref' + k}>{prefix + '你的测量值'}<High>偏高</High>。</span>
    } else if (ref > cur) {
      return <span key={'ref' + k}>{prefix + '你的测量值'}<Low>偏低</Low>。</span>
    } else {
      return <span key={'ref' + k}>{prefix + '你是'}<Middle>平均</Middle>水平。</span>
    }
  })

  if (!_.isEmpty(_.compact(refBlock))) {
    text.push(<br key='br1' />, <br key='br2' />, '根据统计数据，同性别同年龄段人群中：')
    text = text.concat(refBlock)
  }

  return <Tips text={<div>
    {`在${ageGroup(props.user.age)}的${parseInt(props.user.sex, 10) === 1 ? '男' : '女'}性用户中：`}
    {text}
  </div>} title='排名情况' />
}

Rank.propTypes = {
  obj: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}
export default Rank
