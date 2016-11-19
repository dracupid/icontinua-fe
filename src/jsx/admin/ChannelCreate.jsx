import Form from 'antd/lib/form/index.js'
import Input from 'antd/lib/input/index.js'
import Button from 'antd/lib/button/index.js'
import Row from 'antd/lib/row/index.js'
import Col from 'antd/lib/col/index.js'
import API from '../API/admin.jsx'

class Create extends React.Component {
  state = {
    img: '',
    name: ''
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        API.createChannel(values.name)
          .then((img) => {
            this.setState({img, name: values.name})
          })
      }
    })
  }

  render () {
    const {getFieldDecorator} = this.props.form
    return (
      <Row type='flex'>
        <Col span={12}>
          <Form onSubmit={::this.handleSubmit} className='login-form' style={{width: '100%'}}>
            <Form.Item label='渠道名称' labelCol={{span: 6}} wrapperCol={{span: 14}}>
              {getFieldDecorator('name', {
                rules: [{required: true, message: '渠道名称未填写'}]
              })(
                <Input placeholder='不能超过64个字母' />
              )}
            </Form.Item>
            <Form.Item wrapperCol={{span: 14, offset: 6}}>
              <Button type='primary' htmlType='submit' className='login-form-button'>
                创建
              </Button>
            </Form.Item>
          </Form>
        </Col>
        {this.state.name && this.state.img
          ? <Col span={12}>
            <img src={this.state.img} style={{width: 280}} />
            <p style={{fontSize: 18}}>{`↑ 渠道${this.state.name}的二维码 ↑`}</p>
          </Col>
          : null
        }

      </Row>
    )
  }
}

export default Form.create()(Create)
