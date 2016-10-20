let {Form, Input, Button} = ANTD
const FormItem = Form.Item
import API from '../API/login.jsx'
import Util from '../util.jsx'
class Login extends React.Component {
  state = {
    qrcode: '',
    id: null,
  };

  static redirect() {
    location.href = decodeURIComponent(Util.getParam('url') || '/reports')
  }

  onSubmit (e) {
    e.preventDefault()
    let username = this.props.form.getFieldProps('username').value
    API.login(username)
      .then(Login.redirect)
      .catch(() => {
        console.error('登录失败')
      })
    return false
  }

  componentDidMount () {
    API.getQrcode()
      .then((res) => {
        console.log(res)
        this.setState({qrcode: res.url, id: res.id})
        setInterval(() => {
          API.polling(this.state.id)
            .then((result) => {
              if (result) {
                Login.redirect()
              }
            })
        }, 1500)
      })

  }

  render () {
    const {getFieldProps} = this.props.form

    return (
      <div>
        <Form inline method='post' onSubmit={::this.onSubmit}>
          <FormItem
            label='账户'
          >
            <Input placeholder='请输入账户名' name='username'
                   {...getFieldProps('username')}
            />
          </FormItem>
          <FormItem
            label='密码'
          >
            <Input type='password' placeholder='请输入密码'
                   name='password'
                   {...getFieldProps('password')}
            />
          </FormItem>
          <Button type='primary' htmlType='submit'>登录</Button>
        </Form>
        <img src={this.state.qrcode}/>
      </div>

    )
  }
}

Login = Form.create()(Login)

ReactDOM.render((
  <Login />
), document.getElementById('main'))
