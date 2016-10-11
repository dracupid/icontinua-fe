import API from './index.jsx'

export default {
  /**
   * 根据设备ID获取体检记录
   * @param did 设备ID
   */
  fetchData: (did) => API('/api/report/view?deviceId=' + did)

}
