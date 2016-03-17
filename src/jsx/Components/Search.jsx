let { Icon, Input, Button } = ANTD
let InputGroup = Input.Group

class SearchInput extends React.Component {
  state = {
    value: '',
    focus: false
  };

  handleInputChange (e) {
    this.setState({
      value: (e.target.value + '').trim()
    })
  }

  handleFocusBlur (e) {
    this.setState({
      focus: e.target === document.activeElement
    })
  }

  handleSearch () {
    if (this.props.onSearch) {
      this.props.onSearch(this.state.value)
    }
  }

  render () {
    return (
      <InputGroup className={'ant-search-input' + this.state.focus ? ' ant-search-input-focus' : ''}>
        <Input
          {...this.props}
          value={this.state.value} onChange={this.handleInputChange.bind(this)}
          onFocus={this.handleFocusBlur.bind(this)} onBlur={this.handleFocusBlur.bind(this)}/>
        <div className='ant-input-group-wrap'>
          <Button
            className='ant-search-btn ant-search-btn'
            onClick={this.handleSearch.bind(this)}>
            <Icon type='search'/>
          </Button>
        </div>
      </InputGroup>
    )
  }
}
export default SearchInput
