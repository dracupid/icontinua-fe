let {Icon, Radio, InputNumber} = ANTD

class EditBlock extends React.Component {
  state = {
    inputValue: null,
    confirmedValue: null
  };

  onRefresh () {
    this.setState({
      inputValue: this.props.defaultValue || this.props.value
    })
  }

  onChange (v) {
    v = v.target.value
    this.setState({inputValue: v})
    this.props.onChange && this.props.onChange(v)
  }

  render () {
    let {tag, value, editing, noedit, defaultValue} = this.props
    let middle = (() => {
      if (editing) {
        switch (this.props.type) {
          case 'text':
            return <input className="ant-input" value={this.state.inputValue || value}
                          onChange={this.onChange.bind(this)}/>
          case 'radio':
            return <Radio.Group onChange={this.onChange.bind(this)} value={this.state.inputValue || defaultValue}>
              {_.map(this.props.data, (v, k) => {
                return <Radio key={k} value={k}>{v}</Radio>
              })}
            </Radio.Group>
          case 'number':
            return <InputNumber size="large" min={this.props.min} max={this.props.max} defaultValue={value}
                                onChange={this.onChange.bind(this)}/>
        }
      } else {
        return <div className='block-text text-value'>{value}</div>
      }
    })()

    let rightIcon = (() => {
      if (!noedit) {
        if (editing) {
          return <div className='block-icon block-icon-right' onClick={this.onRefresh.bind(this)}>
            <Icon type='reload' style={{color: 'green'}}/>
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
