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
    </div>
  )
}

Banner.propTypes = {
  title: React.PropTypes.string.isRequired,
  backUrl: React.PropTypes.string
}

export default Banner
