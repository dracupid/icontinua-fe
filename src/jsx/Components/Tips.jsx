function Tips (props) {
  return (
    <div className={'report-tip-block' + (props.fix ? ' fix' : '')}>
      <h2>{props.title || '建议'}</h2>
      <div className='tip-text'>
        {props.text || ''}
      </div>
      <br/>
    </div>
  )
}

Tips.propTypes = {
  fix: React.PropTypes.bool,
  text: React.PropTypes.string
}

export default Tips
