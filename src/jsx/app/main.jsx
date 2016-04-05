import util from '../util.jsx'
import Loading from '../Components/Loading.jsx'
import CatalogList from './Components/CatalogList.jsx'
import Banner from './Components/Banner.jsx'
import AppList from './AppList.jsx'

let {Tabs} = ANTD
let TabPane = Tabs.TabPane

class MainApps extends React.Component {
  state = {
    data: null,
    nextTab: '热门'
  };

  componentDidMount () {
    util.fetchAPI('/api/app/main?limit=4')
      .then((data) => {
        this.setState({data})
      })
  }

  changeTab (e) {
    if (e === (this.props.params.tag || '热门')) {
      return
    }
    location.href = '/apps#/tag/' + e
  }

  renderList () {
    if (this.state.data == null) {
      return <Loading />
    } else {
      let curTab = this.props.params.tag || '热门'
      let panels = this.state.data.topTags.map((v) => {
        return <TabPane tab={v} key={v}>{<AppList tagName={v}/>}</TabPane>
      })
      return <Tabs onChange={::this.changeTab} size='small' activeKey={curTab} animation={null}>
        <TabPane tab='热门' key='热门'><CatalogList data={this.state.data}/></TabPane>
        {panels}
      </Tabs>
    }
  }

  render () {
    return <div>
      <Banner />
      {this.renderList()}
    </div>
  }
}

export default MainApps
