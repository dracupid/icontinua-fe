import API from './index.jsx'

export default {
  /**
   * 获取化验项目列表
   * @param name
   */
  // fetchList: (name) => API(`/api/libsheet/list?${name ? `name=${name}` : ''}`),
  /**
   * 获取化验单项目解读
   * @param name
   */
  fetchItem: (name) => API('/api/libsheet/item?name=' + name),
  /**
   * 化验单识别
   * @param imgName 图片名称
   */
  sendRecognize: (imgName) => API(`http://icontinua.com/recognize/libsheet?url=http://cdn-img.icontinua.com/photo/${imgName}.jpg&id=${imgName}&async=true`),
  /**
   * 轮训化验单识别状态
   * @param imgName 图片名称
   */
  pollingState: (imgName) => API(`http://icontinua.com/recognize/find?id=${imgName}`, {noCache: true}),

  update: (id, obj) => {
    let data = new FormData()
    data.append('id', id)
    data.append('jsonData', JSON.stringify(obj))
    return API('http://icontinua.com/recognize/update', {method: 'POST', body: data, noCache: true})
  }
}
