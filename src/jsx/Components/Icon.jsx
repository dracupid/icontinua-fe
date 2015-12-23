function Icon (props) {
  return <img className='anticon tab-icon' src={props.src} {...props} />
}

Icon.propTypes = {
  src: React.PropTypes.string.isRequired
}
export default Icon
