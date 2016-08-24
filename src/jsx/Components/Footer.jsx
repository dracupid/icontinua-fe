/**
 * 页脚组件
 */
import util from '../util.jsx'

function Footer (props) {
  let style = _.clone(props.style) || {}
  style.lineHeight = 'inherit'
  if (util.getParam('channel') === 'HuiLianHuZhou') {
    // let style = _.clone(props.style) || {}
    // style.lineHeight = 'inherit'
    return <footer {...props} style={style}>湖州惠联营销策划有限公司 浙ICP备15025197号-1 <br /> 联系电话：18606829979</footer>
  }
  return <footer {...props}><p>© 2016 杭州佑唐信息科技有限公司</p><p>浙ICP备16007076号 </p>
    <p>

      <a style={{color: 'inherit'}} href='http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010602005949'>
        <p>浙公网安备 33010602005949号</p></a>
    </p>
  </footer>
}

export default Footer
