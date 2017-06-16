/**
 * 某类化验单的项目列表页
 */
import API from '../API/labsheet'
import 'antd-mobile/lib/list/style/css.web.js'
import 'antd-mobile/lib/activity-indicator/style/css.web.js'
import 'antd-mobile/lib/nav-bar/style/css.web.js'
import 'antd-mobile/lib/top-notice/style/css.web.js'
import 'antd-mobile/lib/input-item/style/css.web.js'
import 'antd-mobile/lib/toast/style/css.web.js'
import 'antd-mobile/lib/steps/style/css.web.js'
import List from 'antd-mobile/lib/list/index.web.js'
import ActivityIndicator from 'antd-mobile/lib/activity-indicator/index.web.js'
import NavBar from 'antd-mobile/lib/nav-bar/index.web.js'
import TopNotice from 'antd-mobile/lib/top-notice/index.web.js'
import InputItem from 'antd-mobile/lib/input-item/index.web.js'
import Toast from 'antd-mobile/lib/toast/index.web.js'
import Steps from 'antd-mobile/lib/steps/index.web.js'
import util from '../util'
import Card from 'antd/lib/card'
let Step = Steps.Step

function arrayEqual (a, b) {
  if (a.length === b.length) {
    for (let i = 0; i < a.length; i++) {
      if (!_.isEqual(a[i], b[i])) {
        return false
      }
    }
    return true
  } else {
    return false
  }
}

class ListSheet extends React.Component {
  state = {
    name: '',
    data: [],
    originData: [],
    state: null,
    errText: '',
    editing: false,
    info: null,
    originInfo: null
  };

  updateData () {
    for (let i = 0; i < this.state.data.length; i++) {
      let d = this.state.data[i]
      if (d.valueType === 'NUMBER') {
        let float = parseFloat(d.numberValue)
        d.numberValue = _.isNaN(float) ? 0 : float
      }
    }

    let arr = null
    let info = null
    if (!arrayEqual(this.state.data, this.state.originData)) {
      arr = this.state.data
    }
    if (!_.isEqual(this.state.info, this.state.originInfo)) {
      info = this.state.info
    }

    return API.update(this.props.match.params.name.replace('.jpg', ''), arr, info)
  }

  polling (imgName, interval) {
    API.pollingState(imgName)
      .then((data) => {
        this.setState({
          state: data.state,
          data: data.items,
          info: data.info,
          originInfo: _.clone(data.info, true),
          originData: _.clone(data.items, true)
        })
        if (data.state === 'FINISHED' || data.state === 'CONFIRMED') {
          interval && clearInterval(interval)
        } else if (data.state === 'ERROR') {
          interval && clearInterval(interval)
          this.setState({state: 'ERROR', errText: '无法识别化验单，请重新上传图片并保证图片质量'})
        }
      })
      .catch((e) => {
        this.setState({state: 'ERROR', errText: '化验单识别服务故障中，请稍后再试'})
        interval && clearInterval(interval)
        throw e
      })
  }

  getData () {
    let imgName = this.props.match.params.name.replace('.jpg', '')
    API.sendRecognize(imgName)
      .then(() => {
        let interval = setInterval(() => {
          this.polling(imgName, interval)
        }, 2000)
        this.polling(imgName, interval)
      })
      .catch((e) => {
        this.setState({state: 'ERROR', errText: '化验单识别服务故障中，请稍后再试'})
        throw e
      })
  }

  onValueChangeFun (index) {
    return (value) => {
      let data = this.state.data
      if (data[index].valueType === 'NUMBER') {
        if (/^[-0-9.]*$/.test(value)) {
          data[index].numberValue = value
          data[index].valueEdited = true
        }
      } else {
        data[index].stringValue = value
        data[index].valueEdited = true
      }
      this.setState({data})
    }
  }

  onKeyChangeFun (index) {
    return (value) => {
      let data = this.state.data
      data[index].name = value
      data[index].nameEdited = true
      this.setState({data})
    }
  }

  onInfoChangeFun (name) {
    return (value) => {
      let info = this.state.info
      this.state.info[name] = value
      this.setState({info})
    }
  }

  componentDidMount () {
    this.getData()
  }

  render () {
    // let curName = this.props.params.name
    // let hasName = !!curName
    // if (this.state.name !== curName) {
    //   this.getData()
    // }
    // let items = this.props.params.items && this.props.params.items.split(',')

    // // 如果匹配到项目,则高亮
    // let shouldHighlight = (str) => {
    //   if (!_.isArray(items)) return false
    //
    //   for (let i of items) {
    //     if (str.replace(/[^\u4e00-\u9fa5]+/, '') === i) return true
    //   }
    //
    //   return false
    // }
    let states
    if (this.state.state === 'ERROR') {
      states = <TopNotice type='error'>{this.state.errText}</TopNotice>
    } else {
      let stateName = ['排队中', '开始识别', '图片预处理', '识别化验项目', '识别病人信息', '已完成']
      let current = ['WAITING', 'STARTED', 'PRE_PROCESSING', 'RECOGNIZING', 'RECOGNIZING_INFO', 'FINISHED'].indexOf(this.state.state)
      stateName[current] = <div> {stateName[current]}</div>
      let status = ['process', 'process', 'process', 'process', 'process', 'finish'][current]
      states = <Steps direction='vertical' size='mini' current={current} status={status} style={{padding: '20px'}}>{
        stateName.map((i, index) => <Step key={i} title={i}
          icon={(current === index && current !== status.length - 1) ? 'loading'
                                            : null} />)
      }
      </Steps>
    }

    let editBtn = <div onClick={() => { this.setState({editing: true}) }}>编辑</div>
    let confirmBtn = <div onClick={() => {
      Toast.loading('正在提交...')
      this.updateData()
        .then(() => {
          Toast.hide()
          Toast.success('修改成功', 2)
          this.setState({editing: false, originData: _.clone(this.state.data), originInfo: _.clone(this.state.info)})
        }).catch(() => {
          Toast.hide()
          Toast.fail('修改失败', 2)
        })
    }
    }>确定</div>

    return <div>
      <NavBar className='navbar' iconName='' rightContent={this.state.editing ? confirmBtn : editBtn}>化验单解读</NavBar>
      {(() => {
        switch (this.state.state) {
          case null:
            return <ActivityIndicator text='正在加载识别结果...' />
          case 'FINISHED':
            return null
          default:
            return states
        }
      })()}

      {
        this.state.info
          ? <Card title='病人信息' className='card'>
            <div>性别：{this.state.editing
            ? <InputItem
              style={{display: 'inline-block'}}
              value={this.state.info.sex || ''}
              onChange={::this.onInfoChangeFun('sex')}
                   />
            : this.state.info.sex || '未知'}</div>
            <div>年龄：{this.state.editing
            ? <InputItem
              style={{display: 'inline-block'}}
              value={this.state.info.age || ''}
              onChange={::this.onInfoChangeFun('age')}
                   />
            : this.state.info.age || '未知'}</div>
            <div>诊断：{this.state.editing
            ? <InputItem
              style={{display: 'inline-block'}}
              value={this.state.info.diagnose || ''}
              onChange={::this.onInfoChangeFun('diagnose')}
                   />
            : this.state.info.diagnose || '未知'}</div>
          </Card>
          : null
      }

      {this.state.data.length !== 0
        ? <List style={{padding: 0}}>
          <List.Body>
            {this.state.data.map((item, i) => {
              return this.state.editing
                ? <div className='flex-name' key={'name' + i}>
                  <InputItem
                    className={item.nameEdited ? 'edited' : ''}
                    value={item.name || ''}
                    onChange={::this.onKeyChangeFun(i)}
                  />
                  <InputItem
                    className={item.valueEdited ? 'edited' : ''}
                    value={item.numberValue || item.stringValue || ''}
                    onChange={::this.onValueChangeFun(i)}
                  />
                </div>
                 : <List.Item
                   className={item.nameEdited || item.valueEdited ? 'edited' : ''}
                   key={'value' + i}
                   arrow='horizontal'
                   extra={item.numberValue || item.stringValue || ''}
                   onClick={util.toHashUrlFun(`item/${encodeURIComponent(item.name)}`)}
                      >{item.name}</List.Item>
            })}
          </List.Body>
        </List>
        : null
      }
    </div>
  }
}

export default ListSheet
