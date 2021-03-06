/**
 * 搜索结果页面
 */
import Banner from './Banner'
import AppList from './../AppList'

function MainApps (props) {
  let {keyword} = props.match.params
  return <div>
    <Banner back title={keyword + '的搜索结果'} />
    <AppList search keyword={keyword} />
  </div>
}

export default MainApps
