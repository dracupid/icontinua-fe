/**
 * 血液报告组件
 */

let {Tabs, Alert, Card} = ANTD
let TabPane = Tabs.TabPane

function get16D (props) {
  let {text16D} = props
  return (text16D)
    ? <Card title={''} className={'card' + (props.fix ? ' fix' : '')}><pre>{text16D}</pre></Card>
    : null
}

function ElseBlock (props) {
  return (
    <div>
      {/* <Tabs animated={false} size='mini' style={{marginTop: '-20px'}}> */}
      {/* <TabPane tab='健康评估' key='1'>{get16D(props)}</TabPane> */}
      {/* </Tabs> */}
      {get16D(props)}
    </div>
  )
}

export default ElseBlock
