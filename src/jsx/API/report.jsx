import API from './index.jsx'

export default {
  /**
   * 获取报告详情
   * @param id 报告ID
   * @param sid 报告shortId
   */
  report: (id, sid) => {
    if (id) {
      return API('/api/report?rank=true&diagnose=true&reportId=' + id)
    } else if (sid) {
      sid = sid.trim().replace(/[A-Z]/g, '') // 没有大写字母
      // if (sid.indexOf('AKT') === 0) {
      //   sid = sid.slice(3)
      // }
      return API('/api/report-sid?sid=' + sid)
    } else {
      return Promise.reject('reportId not provided.')
    }
  },
  /**
   * 获取报告列表
   */
  reportList: () => {
    return API('/api/s/report/list')
  },
  /**
   * 获取中医报告
   * @param id
   */
  falthReport: (id) => API('/api/falthReport?id=' + id, {raw: true})
}
