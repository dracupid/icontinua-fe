/**
 * 搜索结果页面
 */
import Banner from './Banner.jsx'
import AppList from './../AppList.jsx'

function MainApps ({params: {keyword}}) {
  return <div>
    <Banner back title={keyword + '的搜索结果'}/>
    <AppList search keyword={keyword}/>
  </div>
}

export default MainApps
