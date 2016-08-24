/**
 * 头部组件
 */
import util from '../util.jsx'

let {Icon} = ANTD

function Banner (props) {
  let left = (() => {
    if (props.backUrl) {
      return <a href={util.getUrl(props.backUrl)}><i className='anticon anticon-left left-icon' /></a>
    } else if (props.goBack) {
      return <a onClick={() => { window.history.back() }}><i className='anticon anticon-left left-icon' /></a>
    } else {
      return <Icon />
    }
  })()

  let right = props.rightComponent || <Icon />

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
