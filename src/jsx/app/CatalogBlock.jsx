import AppBlock from './AppBlock.jsx'

function CatalogBlock (props) { // todo: move to appblock
  let appBlocks = props.apps.map((app) => {
    return <AppBlock app={app} key={app.uid}/>
  })

  return <div>
    <div className="app-block-title">
      <h3>{props.name}</h3>
      <h4><a href={`/apps#/tag/${props.name}`}>更多</a></h4>
    </div>
    <div className='app-block-wrapper'>
      {appBlocks}
    </div>
  </div>
}

CatalogBlock.propTypes = {
  apps: React.PropTypes.array.isRequired,
  name: React.PropTypes.string.isRequired
}

export default CatalogBlock
