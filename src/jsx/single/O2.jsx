import Tips from '../Components/Tips.jsx'

function O2 (props) {
  let {advice, result} = props.result
  let className = 'spo2h-report' + (result === 'NORMAL' ? '' : ' alert')
  return (
    <div>
      <div className={className}>
        <div className='flex-box'>
          <p>SpO<span className='sub'>2</span>%</p>
          <p>{props.value}%</p>
        </div>
        <img src='/img/wave.png'/>
      </div>
      <Tips text={advice}/>
    </div>
  )
}

O2.propTypes = {
  result: React.PropTypes.object.isRequired,
  value: React.PropTypes.number
}

export default O2
