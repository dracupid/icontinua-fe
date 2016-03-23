let {Icon} = ANTD

function Banner (props) {
  let left = (() => {
    if (props.backUrl) {
      return (<a href={props.backUrl}>
        <i className='anticon anticon-left left-icon'/>
      </a>)
    } else {
      return <Icon/>
    }
  })()

  let right = (() => {
    if (props.rightComponent) {
      return props.rightComponent
    } else {
      return <Icon/>
    }
  })()
  return (
    <div className='header'>
      {left}
      <h2>{props.title}</h2>

      {right}
    </div>
  )
}

Banner.propTypes = {
  title: React.PropTypes.string.isRequired,
  backUrl: React.PropTypes.string,
  rightComponent: React.PropTypes.object
}

export default Banner
