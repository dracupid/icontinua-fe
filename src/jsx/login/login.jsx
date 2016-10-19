let {Form, Input, Button} = ANTD
const FormItem = Form.Item;
import API from '../API/index.jsx'
import Util from '../util.jsx'
class Login extends React.Component {
  onSubmit (e) {
    e.preventDefault()
    let username = this.props.form.getFieldProps('username').value
    API(`/api/auth/login?username=${username}&type=SSID`, {noCache: true})
      .then(() => {
        location.href = decodeURIComponent(Util.getParam('url') || '')
      })
      .catch(() => {
        console.error("登录失败")
      })
    return false
  }

  render () {
    const {getFieldProps} = this.props.form;

    return (
      <div>
        <Form inline method="post" onSubmit={::this.onSubmit}>
          <FormItem
            label="账户"
          >
            <Input placeholder="请输入账户名" name="username"
                   {...getFieldProps('username')}
            />
          </FormItem>
          <FormItem
            label="密码"
          >
            <Input type="password" placeholder="请输入密码"
                   name="password"
                   {...getFieldProps('password')}
            />
          </FormItem>
          <Button type="primary" htmlType="submit">登录</Button>
        </Form>
      </div>

    );
  }
}

Login = Form.create()(Login);

ReactDOM.render((
  <Login />
), document.getElementById('main'))
