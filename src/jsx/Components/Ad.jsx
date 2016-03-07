let {Alert} = ANTD

function Ad (props) {
  return <Alert message={props.title} type="info"
                description={<div>{props.text}<img className="img-middle" style={{width:'50%'}} src={props.img}/>
                <h3 style={{textAlign: 'center'}}>长按图片识别二维码</h3></div>}/>
}

export default Ad
