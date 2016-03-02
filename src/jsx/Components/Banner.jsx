function Banner (props) {
  return (
    <div className='banner'>
      {(() => {
        if (props.backUrl) {
          return (<a href={props.backUrl} style={{color: 'inherit'}}>
            <i className='anticon anticon-left left-icon'/>
          </a>)
        }
      })()}
      <h2>{props.title}</h2>
      {props.rightComponent}
    </div>
  )
}

Banner.propTypes = {
  title: React.PropTypes.string.isRequired,
  backUrl: React.PropTypes.string,
  rightComponent: React.PropTypes.object
}

export default Banner
