import Tips from './Tips.jsx'

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
    let lowAge = age - age % 5
    return `${lowAge} - ${lowAge + 5}岁`
  } else if (age >= 100) {
    return `100岁以上`
  } else {
    let lowAge = age - age % 10
    return `${lowAge} - ${lowAge + 10}岁`
  }
}

function Rank (props) {
  let text = _.map(props.obj, (v, k) => {
    let prefix = `你的${k}`

    if (v === 0) {
      return <span>{prefix + '是'}<High>最高</High>的。</span>
    } else if (v === 100) {
      return <span>{prefix + '是'}<Low>最低的</Low>。</span>
    } else if (v <= 40) {
      return <span>{prefix + '位于'}<Low>{v}%</Low>的位置。</span>
    } else if (v <= 60) {
      return <span>{prefix + '位于'}<Middle>{v}%</Middle>的位置。</span>
    } else {
      return <span>{prefix + '位于'}<High>{v}%</High>的位置。</span>
    }
  })
  return <Tips text={<div>
    {`在${ageGroup(props.user.age)}的${ props.user.sex == "1" ? "男" : "女" }性用户中：`}
    {text}
    </div>} title='排名情况'/>
}

Rank.propTypes = {
  obj: React.PropTypes.object.isRequired,
  user: React.PropTypes.object.isRequired
}
export default Rank
