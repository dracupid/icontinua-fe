/**
 * 应用商城主页
 */
import Loading from '../Components/Loading'
import CatalogList from './Components/CatalogList'
import Banner from './Components/Banner'
import AppList from './AppList'
import API from '../API/app'
import util from '../util'

let {Tabs} = ANTD
let TabPane = Tabs.TabPane

class MainApps extends React.Component {
  state = {
    data: null,
    nextTab: '热门'
  };

  componentDidMount () {
    API.main()
      .then((data) => {
        this.setState({data})
      })
  }

  changeTab (e) {
    if (e === (this.props.match.params.tag || '热门')) {
      return
    }

    util.toUrl('/apps#/tag/' + e)
  }

  renderList () {
    if (this.state.data == null) {
      return <Loading />
    } else {
      let curTab = this.props.match.params.tag || '热门'
      let panels = this.state.data.topTags.map((v) => {
        return <TabPane tab={v} key={v}>{<AppList keyword={v} />}</TabPane>
      })
      return <Tabs onChange={::this.changeTab} animated={false} size='small' activeKey={curTab}>
        <TabPane tab='热门' key='热门'><CatalogList data={this.state.data} /></TabPane>
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
