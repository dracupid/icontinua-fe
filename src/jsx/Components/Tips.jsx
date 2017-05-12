/**
 * 标题内容块组件
 */
let {Card} = ANTD

function Tips (props) {
  return (
    <Card loading={props.loading} title={props.title || '建议'} className={'card' + (props.fix ? ' fix' : '')}>
      {props.text || props.children}
    </Card>
  )
}

Tips.propTypes = {
  fix: PropTypes.bool,
  loading: PropTypes.bool
}

export default Tips
