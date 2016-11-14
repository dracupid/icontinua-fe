import Menu from 'antd/lib/menu/index.js'
import Icon from 'antd/lib/icon/index.js'
const {Item, SubMenu} = Menu

export default function () {
  return <Menu
    theme='dark'
    mode='inline'
    style={{width: 200}}
  >
    <SubMenu key='m1' title={<span><Icon type='mobile' />设备管理</span>}>
      <Item key='1-1'><a href='#/device/stat'>推广统计</a></Item>
    </SubMenu>
    <Item key='2'><span><Icon type='qrcode' /><a href='#/channel'>渠道二维码管理</a></span></Item>

  </Menu>
}
