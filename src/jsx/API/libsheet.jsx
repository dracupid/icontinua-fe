import API from './index.jsx'

export default {
  /**
   * 获取化验项目列表
   * @param name
   */
  fetchList: (name) => API(`/api/libsheet/list?${name ? `name=${name}` : ''}`),
  /**
   * 获取化验单项目解读ø
   * @param name
   */
  fetchItem: (name) => API('/api/libsheet/item?name=' + name)
}
