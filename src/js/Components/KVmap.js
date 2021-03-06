/**
 * K-V对组件
 */
let {info} = ANTD.Modal
let _advice = require('../../data/advice.json')

class KVMap extends React.Component {
  static defaultProps = {
    obj: {}
  };

  static propTypes = {
    obj: PropTypes.object
  };

  static info (title, content) {
    info({
      title,
      content,
      width: '90%'
    })
  }

  render () {
    let items = []
    let obj = this.props.obj
    for (let key in obj) {
      if (obj[key]) {
        if (_advice[key]) {
          items.push(
            <div
              className='key' key={key} onClick={KVMap.info.bind(this, key, _advice[key])}
              style={{textDecoration: 'underline'}}>
              {key}
            </div>
          )
        } else {
          items.push(<div className='key' key={key}>{key}</div>)
        }
        items.push(<div className='value' key={obj[key]}>{obj[key]}</div>)
      }
    }
    let columnNum = Math.ceil(items.length / 6)
    let ret = []
    for (let i = 0; i < columnNum; i++) {
      ret.push(
        <div key={i} className={'kv-map flex-' + (i + 1)}>{items.slice(i * 6, (i + 1) * 6)}</div>
      )
    }
    return <div className='kv-map-wrapper' style={{fontSize: '0.9em'}}>{ret}</div>
  }
}

export default KVMap
