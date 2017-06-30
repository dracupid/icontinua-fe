const {Card, Button, Modal, Form, InputNumber, Input} = ANTD
import API from '../API/report'
let FormItem = Form.Item

const formItemLayout = {
  labelCol: {span: 6},
  wrapperCol: {span: 18}
}

class HWForm extends React.Component {
  render () {
    const {getFieldDecorator} = this.props.form
    return <Form>
      <FormItem label='身高(cm)' {...formItemLayout}>
        {getFieldDecorator('height')(
          <InputNumber min={0} max={200} step={0.1} />
        )}
      </FormItem>
      <FormItem label='体重(kg)' {...formItemLayout}>
        {getFieldDecorator('weight')(
          <InputNumber min={0} max={300} step={0.1} />
        )}
      </FormItem>
      <FormItem label='体脂(%)' {...formItemLayout}>
        {getFieldDecorator('bodyFat')(
          <InputNumber min={0} max={100} step={0.1} />
        )}
      </FormItem>
      <FormItem label='其他描述' {...formItemLayout}>
        {getFieldDecorator('hwText', {
          rules: [{required: false}]
        })(
          <Input placeholder='' />
        )}
      </FormItem>
    </Form>
  }
}

const groups = {
  体型: ['height', 'weight', 'bodyFat', 'hwText'],
  血压: ['sbp', 'dbp', 'bpText'],
  血糖: ['glu', 'glutext'],
  尿酸: ['ua', 'uatext'],
  胆固醇: ['chol', 'choltext'],
  血红蛋白: ['hb', 'hbtext'],
  生物电: ['jizhui', 'zangfu', 'xiaohua', 'miniao', 'zyText']
}

export default class Targets extends React.Component {
  state = {
    loading: true,
    data: {},
    curType: '',
    showModal: false,
    submitting: false
  }

  static isSet (groupName, data) {
    let names = groups[groupName]
    for (let i = 0; i < names.length; i++) {
      if (data[names[i]] != null) return true
    }
    return false
  }

  componentDidMount () {
    API.getTargets()
      .then((data) => this.setState({data, loading: false}))
      .catch((e) => {
        this.setState({loading: false})
        throw e
      })
  }

  static getTitle (text, btnText, onClick) {
    return <div className='card-title-with-btn'>
      <h3 className='ant-card-head-title'>{text}</h3>
      <Button size='large' onClick={onClick}>{btnText}</Button>
    </div>
  }

  static getLevel (value) {
    switch (value) {
      case 0:
        return '警告'
      case 1:
        return '一般'
      case 2:
        return '正常'
      default:
        return '未设置'
    }
  }

  showModal () { this.setState({showModal: true}) }

  hideModal () { this.setState({showModal: false}) }

  onSubmit () {
    this.refs.curForm.validateFields((err, values) => {
      if (!err) {
        console.log(values)
        let data = _.assign(this.state.data, values)
        this.setState({submitting: true})
        API.setTargets(values)
          .then(() => {
            this.setState({submitting: false, showModal: false, data})
          })
          .catch((e) => {
            this.setState({submitting: false})
            throw e
          })
      }
    })
  }

  getModal (FormComponent) {
    const WrapperForm = Form.create()(FormComponent)
    return <Modal title='修改目标' visible={this.state.showModal} onOk={::this.onSubmit}
      confirmLoading={this.state.submitting}
      onCancel={::this.hideModal}>
      <WrapperForm ref='curForm' />
    </Modal>
  }

  render () {
    let {data} = this.state
    let {type} = this.props
    if (!(type in groups)) return null
    let form = HWForm

    if (type === '体型') {
      return <Card loading={this.state.loading} title={Targets.getTitle('我的目标', '修改目标', ::this.showModal)}
        className='card'>
        {this.getModal(HWForm)}
        {Targets.isSet(type, data) ? <div>
          <p>身高：{data.height ? data.height + ' cm' : '未设置'}</p>
          <p>体重：{data.weight ? data.weight + ' kg' : '未设置'}</p>
          <p>体脂：{data.bodyFat ? data.bodyFat + ' %' : '未设置'}</p>
          <p>其他描述：{data.hwText ? data.hwText : '无'}</p>
        </div>
          : '尚未设置目标'}
      </Card>
    } else if (type === '血压') {
      return <Card loading={this.state.loading} title={Targets.getTitle('我的目标', '修改目标', ::this.showModal)}
        className='card'>
        {this.getModal(form)}
        {Targets.isSet(type, data) ? <div>
          <p>舒张压：{data.dbp ? data.dbp + ' mmHg' : '未设置'}</p>
          <p>收缩压：{data.sbp ? data.sbp + ' mmHg' : '未设置'}</p>
          <p>其他描述：{data.bpText ? data.hwText : '无'}</p>
        </div>
          : '尚未设置目标'}
      </Card>
    } else if (type === '血糖') {
      return <Card loading={this.state.loading} title={Targets.getTitle('我的目标', '修改目标', ::this.showModal)}
        className='card'>
        {this.getModal(form)}
        {Targets.isSet(type, data) ? <div>
          <p>血糖：{data.glu ? data.glu + ' mmol/L' : '未设置'}</p>
          <p>其他描述：{data.glutext ? data.glutext : '无'}</p>
        </div>
          : '尚未设置目标'}
      </Card>
    } else if (type === '尿酸') {
      return <Card loading={this.state.loading} title={Targets.getTitle('我的目标', '修改目标', ::this.showModal)}
        className='card'>
        {this.getModal(form)}
        {Targets.isSet(type, data) ? <div>
          <p>尿酸：{data.ua ? data.ua + ' μmol/L' : '未设置'}</p>
          <p>其他描述：{data.uatext ? data.uatext : '无'}</p>
        </div>
          : '尚未设置目标'}
      </Card>
    } else if (type === '胆固醇') {
      return <Card loading={this.state.loading} title={Targets.getTitle('我的目标', '修改目标', ::this.showModal)}
        className='card'>
        {this.getModal(form)}
        {Targets.isSet(type, data) ? <div>
          <p>胆固醇：{data.chol ? data.chol + ' mmol/L' : '未设置'}</p>
          <p>其他描述：{data.choltext ? data.choltext : '无'}</p>
        </div>
          : '尚未设置目标'}
      </Card>
    } else if (type === '血红蛋白') {
      return <Card loading={this.state.loading} title={Targets.getTitle('我的目标', '修改目标', ::this.showModal)}
        className='card'>
        {this.getModal(form)}
        {Targets.isSet(type, data) ? <div>
          <p>血红蛋白：{data.hb ? data.hb + ' mmol/L' : '未设置'}</p>
          <p>其他描述：{data.hbText ? data.hbText : '无'}</p>
        </div>
          : '尚未设置目标'}
      </Card>
    } else if (type === '生物电') {
      return <Card loading={this.state.loading} title={Targets.getTitle('自我评价', '进行评价', ::this.showModal)}
        className='card'>
        {this.getModal(form)}
        {Targets.isSet(type, data) ? <div>
          <p>脏腑：{data.zangfu ? Targets.getLevel(data.zangfu) : '未设置'}</p>
          <p>脊椎：{data.jizhui ? Targets.getLevel(data.jizhui) : '未设置'}</p>
          <p>消化：{data.xiaohua ? Targets.getLevel(data.xiaohua) : '未设置'}</p>
          <p>泌尿：{data.miniao ? Targets.getLevel(data.miniao) : '未设置'}</p>
          <p>其他描述：{data.zyText ? data.zyText : '无'}</p>
        </div>
          : '尚未进行评价'}
      </Card>
    } else return null
  }
}
