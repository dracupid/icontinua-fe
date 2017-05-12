/**
 * 加载中组件
 */
let {Spin} = ANTD

function Loading ({text}) {
  return (
    <div className='loading'>
      <Spin size='large' />
      <p style={{fontSize: 14, marginTop: 10}}> {text || '数据加载中...'} </p>
    </div>
  )
}

Loading.propTypes = {
  text: PropTypes.string
}

export default Loading
