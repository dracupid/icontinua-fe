/**
 * 广告横幅组件
 */

export default function AdBanner (props) {
  let {text, url, imgUrl} = props
  return <div className='banner-img-wrapper'>
    <a href={url}><img src={imgUrl} /></a>
    <p className='gg-text'>{text || ''}</p>
  </div>
}

AdBanner.propTypes = {
  text: React.PropTypes.string,
  url: React.PropTypes.string,
  imgUrl: React.PropTypes.string
}
