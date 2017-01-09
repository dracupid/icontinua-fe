/**
 * 页脚组件
 */
import util from '../util.jsx'

function Footer (props) {
  let style = _.clone(props.style) || {}
  style.lineHeight = 'inherit'

  switch (util.getParam('channel')) {
    case 'HuiLianHuZhou':
      return <footer {...props} style={style}>湖州惠联营销策划有限公司 浙ICP备15025197号-1 <br /> 联系电话：18606829979</footer>
    case '3rd':
      return <div></div>
    default:
      return <footer {...props}><p>© 2016-2017 杭州佑唐信息科技有限公司</p><p>浙ICP备16007076号 </p>
        <p>

          <a style={{color: 'inherit'}}
             href='http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010602005949'>
            <span>浙公网安备 33010602005949号</span></a>
        </p>
      </footer>
  }
}

Footer.propTypes = {
  inline: React.PropTypes.bool,
  style: React.PropTypes.object
}

function InlineFooter (props) {
  return <footer {...props}>© 2016-2017 杭州佑唐信息科技有限公司 | 浙ICP备16007076号
    <p>
      <a style={{color: 'inherit'}} href='http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010602005949'>
        <span>浙公网安备 33010602005949号</span></a>
    </p>
  </footer>
}

Footer.InlineFooter = InlineFooter

export default Footer

