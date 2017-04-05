import API from '../API/login.jsx'
import APIU from '../API/user.jsx'
import Util from '../util.jsx'
let {Form, Input, Button, Tabs, Icon} = ANTD
const FormItem = Form.Item

function redirect () {
  location.href = decodeURIComponent(Util.getParam('url') || '/reports').replace(/^\/?cloudhealth/, '')
}
const formItemLayout = {
  labelCol: {span: 6},
  wrapperCol: {span: 14}
}

class WechatLogin extends React.Component {
  state = {
    qrcode: '',
    id: null
  };

  componentDidMount () {
    API.getQrcode()
      .then((res) => {
        console.log(res)
        this.setState({qrcode: res.url, id: res.id})
        setInterval(() => {
          API.polling(this.state.id)
            .then((result) => {
              if (result) {
                redirect()
              }
            })
        }, 1500)
      })
  }

  render () {
    return <img src={this.state.qrcode} style={{width: '200px'}} />
  }
}

class SSIDLogin extends React.Component {
  onSubmit (e) {
    e.preventDefault()
    let username = this.props.form.getFieldsValue().username
    API.loginSSID(username)
      .then(redirect)
      .catch(() => {
        console.error('登录失败')
      })
    return false
  }

  render () {
    const {getFieldDecorator} = this.props.form

    return <Form method='post' onSubmit={::this.onSubmit}>
      <FormItem label='社保卡号' {...formItemLayout}>
        {getFieldDecorator('username')(
          <Input placeholder='请输入社保卡号' />
        )}
      </FormItem>
      <FormItem wrapperCol={{span: 16, offset: 6}} style={{marginTop: 24}}>
        <Button type='primary' htmlType='submit'>登录</Button>
      </FormItem>
    </Form>
  }
}

class PhoneLogin extends React.Component {
  // 参照 user/bindPhone
  onSend () {
    let {phone} = this.props.form.getFieldsValue()
    console.log(phone)
    APIU.sendCode(phone, true)
  }

  onSubmit (e) {
    e.preventDefault()
    let {phone, code} = this.props.form.getFieldsValue()
    API.loginPhone(phone, code)
      .then(redirect)
      .catch(() => {
        console.error('登录失败')
      })
    return false
  }

  render () {
    const {getFieldDecorator} = this.props.form

    return <Form horizontal method='post' onSubmit={::this.onSubmit}>
      <FormItem label='手机号码' {...formItemLayout}>
        {getFieldDecorator('phone')(
          <div className='flex-inline'>
            <Input placeholder='请输入手机号码' />
            <Button type='primary' onClick={::this.onSend}>发送验证码</Button>
          </div>
        )}
      </FormItem>
      <FormItem label='验证码' {...formItemLayout}>
        {getFieldDecorator('code')(
          <Input placeholder='请输入验证码' />
        )}
      </FormItem>
      <FormItem wrapperCol={{span: 16, offset: 6}} style={{marginTop: 24}}>
        <Button type='primary' htmlType='submit'>登录</Button>
      </FormItem>
    </Form>
  }
}
PhoneLogin = Form.create()(PhoneLogin)
SSIDLogin = Form.create()(SSIDLogin)

class Login extends React.Component {
  render () {
    return (
      <Tabs defaultActiveKey='1' animated={false}>
        <Tabs.TabPane tab={<span><Icon type='phone' />手机登录</span>} key='1'>
          <PhoneLogin />
        </Tabs.TabPane>
        <Tabs.TabPane tab={<span><Icon type='qrcode' />微信登录</span>} key='2'>
          <WechatLogin />
        </Tabs.TabPane>
      </Tabs>
    )
  }
}
// <Tabs.TabPane tab={<span><Icon type='credit-card' />社保登录</span>} key='3'>
//  <SSIDLogin />
// </Tabs.TabPane>

ReactDOM.render((
  <Login />
), document.getElementById('main'))
