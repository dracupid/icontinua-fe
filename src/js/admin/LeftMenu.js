import Menu from 'antd/lib/menu/index.js'
import Icon from 'antd/lib/icon/index.js'
const {Item, SubMenu, ItemGroup} = Menu

export default function () {
  return <Menu
    theme='dark'
    mode='inline'
    style={{width: 200}}
  >
    <SubMenu key='1' title={<span><Icon type='mobile' />设备管理</span>}>
      <Item key='1-1'><a href='#/device/stat'>推广统计</a></Item>
    </SubMenu>
    <SubMenu key='2' title={<span><Icon type='qrcode' />渠道二维码管理</span>}>
      <Item key='2-1'><a href='#/channel/create'>生成二维码</a></Item>
      <Item key='2-2'><a href='#/channel'>推广统计</a></Item>
    </SubMenu>
    <SubMenu key='3' title={<span><Icon type='area-chart' />活动管理</span>}>
      <ItemGroup title='2016-12 杭州'>
        <Item key='3-1'><a href='#/rank/201612'>中奖用户管理</a></Item>
        <Item key='3-2'><a href='#/rank/201612/list'>获奖名单</a></Item>
      </ItemGroup>
    </SubMenu>

  </Menu>
}
