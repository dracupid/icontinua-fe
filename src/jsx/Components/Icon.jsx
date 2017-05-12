/**
 * 图标组件
 */
function Icon (props) {
  return <img className='anticon tab-icon' src={props.src} {...props} />
}

Icon.propTypes = {
  src: PropTypes.string.isRequired
}
export default Icon
