import Tips from '../Components/Tips.jsx'
import Rank from '../Components/Rank.jsx'

function O2 (props) {
  let {advice, result, intro, value, rank} = props.data
  let className = 'spo2h-report' + (result === 'NORMAL' ? '' : ' alert')
  return (
    <div>
      <div className={className}>
        <div className='flex-box'>
          <p>SpO<span className='sub'>2</span>%</p>
          <p>{value}%</p>
        </div>
        <img src='/img/wave.png'/>
      </div>
      {props.fullLoaded ? <Tips text={intro} title='简介'/> : null}
      {props.fullLoaded ? <Tips text={advice}/> : null}
      {props.fullLoaded ? <Rank obj={{血氧: rank}}/> : null}
    </div>
  )
}

O2.propTypes = {
  data: React.PropTypes.object.isRequired
}

export default O2
