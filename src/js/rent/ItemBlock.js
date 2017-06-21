export default function (props) {
  return <div className={'c-item-block ' + (props.className || '')}>
    <div className="c-item-title">{props.title}</div>
    <div className="c-item-content">{props.content}</div>
  </div>

}
