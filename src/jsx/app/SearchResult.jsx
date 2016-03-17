import Banner from './Banner.jsx'
import AppList from './AppList.jsx'

function MainApps (props) {
  let {keyword} = props.params
  return <div>
    <Banner back title={keyword + "的搜索结果"}/>
    <AppList type="search" key={keyword} tagName={keyword}/>
  </div>
}

export default MainApps
