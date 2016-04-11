/**
 * 标题内容块组件
 */
function Tips (props) {
  return (
    <div className={'report-tip-block' + (props.fix ? ' fix' : '')}>
      <h2>{props.title || '建议'}</h2>
      <div className='tip-text'>
        {props.text || props.children}
      </div>
      <br/>
    </div>
  )
}

Tips.propTypes = {
  fix: React.PropTypes.bool
}

export default Tips
