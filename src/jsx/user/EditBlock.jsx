/**
 * 可编辑条目块
 */
let {Icon, Radio, InputNumber, Button} = ANTD
import BindPhone from './bindPhone.jsx'

class EditBlock extends React.Component {
  state = {
    inputValue: null, // 输入值
    confirmedValue: null, // 修改后的保存值
    binding: false
  };

  showBindingModal () {
    this.setState({binding: true})
  }

  hideBindingModal () {
    this.setState({binding: false})
  }

  onChange (v) {
    if (v.target && typeof v.target.value !== 'undefined') {
      v = v.target.value
    }

    if (this.props.pattern && !this.props.pattern.test(v)) {
      return
    }
    this.setState({inputValue: v})
    this.props.onChange && this.props.onChange(v)
  }

  render () {
    let {tag, value, editing, noedit, defaultValue} = this.props
    value = this.state.inputValue || value || ''
    defaultValue = this.state.inputValue || defaultValue || ''

    let middle = (() => {
      if (editing) {
        switch (this.props.type) {
          case 'text': // 文本
            return <input
              type='text'
              className='ant-input' value={value}
              onChange={::this.onChange} />
          case 'radio': // 单选
            return <Radio.Group onChange={::this.onChange} value={defaultValue}>
              {_.map(this.props.data, (v, k) => {
                return <Radio key={k} value={k}>{v}</Radio>
              })}
            </Radio.Group>
          case 'number': // 数字
            return <InputNumber
              size='large' min={this.props.min} max={this.props.max} defaultValue={value}
              onChange={::this.onChange} />
          case 'phone': // 手机号码
            return <div>
              <span style={{fontSize: '12px'}}>{value}</span>
              <Button type='ghost' onClick={::this.showBindingModal} style={{marginLeft: '8px'}}>{value ? '更换'
                : '会员验证'}</Button>
            </div>
        }
      } else {
        if (defaultValue && this.props.data) {
          defaultValue = this.props.data[defaultValue]
        }
        return <div className='block-text text-value'>{defaultValue || value}</div>
      }
    })()

    let rightIcon = (!noedit && editing)
      ? <div className='block-icon block-icon-right'><Icon type='edit' style={{color: 'green'}} /></div>
      : null

    return <div className='btn-block block edit-block'>
      <div className='block-text text-tag'>
        <div>{tag}</div>
      </div>
      {<div className='block-text text-value'>{middle}</div>}
      {rightIcon}

      <BindPhone
        visible={this.state.binding}
        onCancel={::this.hideBindingModal}
        onSuccess={::this.onChange}
      />
    </div>
  }
}

export default EditBlock
