/**
 * 应用分类块
 */
import AppBlock from './AppBlock'

function CatalogBlock ({apps, name}) {
  let appBlocks = apps.map((app) => {
    return <AppBlock appData={app} key={app.uid} />
  })

  return <div>
    <div className='app-block-title'>
      <h3>{name}</h3>
      <h4><a href={`/apps#/tag/${name}`}>更多</a></h4>
    </div>
    <div className='app-block-wrapper'>
      {appBlocks}
    </div>
  </div>
}

CatalogBlock.propTypes = {
  apps: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired
}

export default CatalogBlock
