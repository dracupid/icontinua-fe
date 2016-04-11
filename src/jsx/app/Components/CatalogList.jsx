/**
 * 应用分类列表
 */
import CatalogBlock from './CatalogBlock.jsx'

function CatalogList ({data}) {
  return <div className='app-catalog-list'>{
    data.topTags.map((v) => {
      return <CatalogBlock name={v} apps={data[v]} key={v}/>
    })
  }</div>
}

export default CatalogList
