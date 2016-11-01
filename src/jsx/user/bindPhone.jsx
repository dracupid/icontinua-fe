/**
 * 绑定手机号码弹层
 */
let {Button, Modal, message} = ANTD
import API from '../API/user.jsx'

function isValidPhone (phone) {
  return /^\d{11}$/.test(phone)
}

function isValidCode (phone) {
  return /^\d{4}$/.test(phone)
}

class BindPhoneModal extends React.Component {
  static propTypes = {
    visible: React.PropTypes.bool.isRequired,
    onCancel: React.PropTypes.func.isRequired,
    onSuccess: React.PropTypes.func.isRequired
  };

  state = {
    phone: '', // 输入值
    code: '', // 修改后的保存值
    phoneValid: false,
    codeValid: false,
    sendTime: null,
    timeText: null,
    sending: false
  };

  onCancel () {
    this.setState({
      phone: '',
      code: '',
      phoneValid: false,
      codeValid: false,
      sending: false
    })
    this.props.onCancel()
  }

  onSubmit () {
    this.setState({sending: true})
    API.updatePhone(this.state.phone, this.state.code)
      .then(() => {
        this.setState({sending: false})
        message.success('会员验证成功', 2)
        this.props.onSuccess(this.state.phone)
        this.onCancel()
      })
      .catch(() => {
        this.setState({sending: false})
        message.error('验证码错误，请重试', 2)
      })
  }

  timeout (timer) {
    let interval = +new Date() - this.state.sendTime
    if (interval < 120000) {
      this.setState({timeText: `${120 - Math.round(interval / 1000)}s后重试`})
    } else {
      this.setState({timeText: null})
      clearInterval(timer)
    }
  }

  onSend () {
    // 此处发送验证码
    API.sendCode(this.state.phone)
      .then(() => {
        // 成功后重置时间
        this.setState({sendTime: +new Date()})

        let timer = setInterval(() => {
          this.timeout(timer)
        }, 1000)
        this.timeout(timer)
      })
      .catch(() => {
        message.error('验证码发送失败，请重试', 2)
      })
  }

  onChangePhone (v) {
    v = v.target.value

    if (!/\d*/.test(v)) return

    this.setState({phone: v, phoneValid: isValidPhone(v)})
  }

  onChangeCode (v) {
    v = v.target.value

    if (!/\d*/.test(v)) return

    this.setState({code: v, codeValid: isValidCode(v)})
  }

  render () {
    return <Modal
      visible={this.props.visible}
      title='会员验证'
      onCancel={this.props.onCancel}
      footer={[
        <Button key='ok' type='ghost' size='large' onClick={::this.onSubmit}
          loading={this.state.sending}
          disabled={!(this.state.phoneValid && this.state.codeValid)}>确定</Button>,
        <Button key='cancel' type='ghost' size='large' onClick={::this.onCancel}>取消</Button>
      ]}
    >
      <div className='phone-block block'>
        <div className='block-text text-tag'>
          手机号码
        </div>
        <input
          type='text'
          className='ant-input block-text text-value' value={this.state.phone}
          onChange={::this.onChangePhone} />
      </div>

      <div className='phone-block block'>
        <div className='block-text text-tag'>
          验证码
        </div>
        <input
          type='text'
          className='ant-input block-text text-value' value={this.state.code}
          onChange={::this.onChangeCode} />
        <Button type='primary' style={{marginLeft: '5px'}} onClick={::this.onSend}
          disabled={!this.state.phoneValid || this.state.timeText}>
          {this.state.timeText || '发送'}
        </Button>
      </div>
    </Modal>
  }
}

export default BindPhoneModal
