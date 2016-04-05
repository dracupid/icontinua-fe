let {Icon, Radio, InputNumber} = ANTD

class EditBlock extends React.Component {
  state = {
    inputValue: null,
    confirmedValue: null
  };

  onChange (v) {
    v = (v.target && v.target.value) || v
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
          case 'text':
            return <input
              type='text'
              className='ant-input' value={value}
              onChange={::this.onChange}/>
          case 'radio':
            return <Radio.Group onChange={::this.onChange} value={defaultValue}>
              {_.map(this.props.data, (v, k) => {
                return <Radio key={k} value={k}>{v}</Radio>
              })}
            </Radio.Group>
          case 'number':
            return <InputNumber
              size='large' min={this.props.min} max={this.props.max} defaultValue={value}
              onChange={::this.onChange}/>
        }
      } else {
        if (defaultValue && this.props.data) {
          defaultValue = this.props.data[defaultValue]
        }
        return <div className='block-text text-value'>{defaultValue || value}</div>
      }
    })()

    let rightIcon = (() => {
      if (!noedit) {
        if (editing) {
          return <div className='block-icon block-icon-right'>
            <Icon type='edit' style={{color: 'green'}}/>
          </div>
        }
      }
    })()

    return <div className='btn-block block edit-block'>
      <div className='block-text text-tag'>
        <div>{tag}</div>
      </div>
      {<div className='block-text text-value'>{middle}</div>}
      {rightIcon}
    </div>
  }
}

export default EditBlock
