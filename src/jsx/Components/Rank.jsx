import Tips from "./Tips.jsx"

function Rank (props) {
  let text = "";
  _.map(props.obj, (v, k) => {
    if (v === 0) {
      text += `你的${k}在同性别同年龄段用户中是最高的。`
    } else if (v === 100) {
      text += `你的${k}在同性别同年龄段用户中是最低的。`
    } else {
      text += `你的${k}在同性别同年龄段用户中位于${v}%的位置。`
    }
  })
  return <Tips text={text} title="比较"/>
}

Rank.propTypes = {
  obj: React.PropTypes.object.isRequired
}
export default Rank
