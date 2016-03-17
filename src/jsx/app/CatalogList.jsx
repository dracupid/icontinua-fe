import CatalogBlock from './CatalogBlock.jsx'

function CatalogList (props) {
  let list = props.data.topTags.map((v) => {
    let data = props.data[v]
    return <CatalogBlock name={v} apps={data} key={v}/>
  })

  return <div>
    {list}
  </div>
}

export default CatalogList
