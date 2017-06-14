/**
 * 健康检测报告单生成
 */
import Footer from './Components/Footer.jsx'
import API from './API/report.jsx'
import reportUtil from './util.jsx'
let {Route, HashRouter} = ReactRouter

class TableReport extends React.Component {
  state = {
    title: '体检报告',
    report: {},
    loaded: false
  }

  componentDidMount () {
    API.report(this.props.match.params.id)
      .then((data) => {
        this.setState({
          report: data,
          loaded: true
        })
      })
      .catch(() => {
        this.setState({loaded: true})
      })
  }

  static parseNormalValue (normal, unit) {
    return `${normal[0]} ~ ${normal[1]} ${unit}`
  }

  formatData () {
    let result = []
    let data = this.state.report

    if (data.height) result.push(['身高', data.height.value, ''])
    if (data.weight) result.push(['体重', data.weight.value, ''])
    if (data.bodyFat) result.push(['体脂率', data.bodyFat, ''])
    if (data.sbp) result.push(['收缩压', data.sbp.value, TableReport.parseNormalValue(data.sbp.normal, 'mmHg')])
    if (data.dbp) result.push(['舒张压', data.dbp.value, TableReport.parseNormalValue(data.dbp.normal, 'mmHg')])
    if (data.bodyFat) result.push(['体脂率', data.bodyFat, ''])
    if (data.heartRate) result.push(['心率', data.heartRate, ''])
    if (data.spo2h) result.push(['血氧', data.spo2h.value, TableReport.parseNormalValue(data.spo2h.normal, '%')])

    if (data.glu) result.push(['血糖', data.glu.value, TableReport.parseNormalValue(data.glu.normal, 'mmol/L')])
    if (data.ua) result.push(['尿酸', data.ua.value, TableReport.parseNormalValue(data.ua.normal, 'μmol/L')])
    if (data.chol) result.push(['胆固醇', data.chol.value, TableReport.parseNormalValue(data.chol.normal, 'mmol/L')])
    if (data.hb) result.push(['血红蛋白', data.hb.value, TableReport.parseNormalValue(data.hb.normal, 'mmol/L')])

    return result
  }

  render () {
    let data = this.state.report
    let dataArray = this.formatData()

    if (!this.state.loaded) {
      return <div />
    } else {
      return <div>
        <h1>健康检测报告单</h1>
        <table>
          <thead>
            <td />
            <td />
            <td>{'11111'}</td>
            <td />
            <td />
            <td />
            <td />
          </thead>
          <tr>
            <td className='title'>姓名</td>
            <td colSpan='2'>{data.user.nickname}</td>
            <td className='title'>性别</td>
            <td>{data.user.sex === '1' ? '男' : '女'}</td>
            <td className='title'>年龄</td>
            <td>{data.user.age}</td>
          </tr>
          <tr>
            <td className='title'>住址</td>
            <td colSpan='2'>{data.user.address || ''}</td>
            <td className='title'>电话</td>
            <td colSpan='3'>{data.user.phone || ''}</td>
          </tr>
          <tr>
            <td className='title' rowSpan={dataArray.length + 1} style={{width: '30px'}}>生命体征检测</td>
            <td className='item-title'>检测项目</td>
            <td className='item-title' colSpan='2'>检测结果</td>
            <td colSpan='3' className='item-title'>参考标准</td>
          </tr>

          {(() => {
            let doms = []
            for (let i = 0; i < dataArray.length; i++) {
              let item = dataArray[i]
              doms.push(<tr key={item[0]}>
                <td>{item[0]}</td>
                <td colSpan='2'>{item[1]}</td>
                <td colSpan='3'>{item[2]}</td>
              </tr>)
            }

            return doms
          })()}
          <tr>
            <td className='title'>健康风险评估</td>
            <td colSpan='6'>暂无</td>
          </tr>
          <tr>
            <td className='title'>检测日期</td>
            <td colSpan='6'>{reportUtil.formatDateTime(data.timestamp)}</td>
          </tr>
        </table>
      </div>
    }
  }
}

ReactDOM.render((
  <div>
    <HashRouter>
      <div>
        <Route path='/:id' component={TableReport} />
      </div>
    </HashRouter>
    <Footer.InlineFooter />
  </div>
), document.getElementById('main'))
