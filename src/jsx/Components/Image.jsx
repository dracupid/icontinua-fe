import Image from 'react-imageloader'
let {Icon} = ANTD

let preload = <Icon type="loading" style={{fontSize: '28px'}} className="12"/>
let loadFailed = <Icon type="ellipsis" style={{fontSize: '28px'}} className="12"/>

function preLoadFun () {
  return preload
}

export default function (props) {
  let imgProps = {
    onClick: props.onClick
  }
  return <Image preloader={preLoadFun} wrapper={React.DOM.div} imgProps={imgProps} {...props} >
    {loadFailed}
  </Image>
}
