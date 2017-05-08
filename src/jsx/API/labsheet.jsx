import API from './index.jsx'

export default {
  /**
   * 获取化验项目列表
   * @param name
   */
  // fetchList: (name) => API(`/recognize/labsheet/list?${name ? `name=${name}` : ''}`),
  /**
   * 获取化验单项目解读
   * @param name
   */
  fetchItem: (name) => API('/recognize/labsheet/item?name=' + encodeURIComponent(name).replace(/\(/g, '%28').replace(/\)/g, '%29')),
  /**
   * 化验单识别
   * @param imgName 图片名称
   */
  sendRecognize: (imgName) => API(`/recognize/labsheet?url=http://cdn-img.icontinua.com/photo/${imgName}.jpg&id=${imgName}&async=true`),
  /**
   * 轮训化验单识别状态
   * @param imgName 图片名称
   */
  pollingState: (imgName) => API(`/recognize/find?id=${imgName}`, {noCache: true}),

  update: (id, arr, info) => {
    if (arr === null && info === null) return Promise.resolve()
    let data = new FormData()
    data.append('id', id)
    if (arr != null) data.append('jsonData', JSON.stringify(arr))
    if (info != null) data.append('jsonInfo', JSON.stringify(info))
    return API('/recognize/update', {method: 'POST', body: data, noCache: true})
  }
}
