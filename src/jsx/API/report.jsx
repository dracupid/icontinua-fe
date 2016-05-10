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
      if (sid.indexOf('AKT') === 0) {
        sid = sid.slice(3)
      }
      return API('/api/report-sid?sid=' + sid)
    }
    else {
      return Promise.reject('reportId not provided.')
    }
  },
  /**
   * 获取报告列表
   * @param userId 用户UUID
   */
  reportList: (userId) => {
    if (!userId) {
      return Promise.reject('userId not provided.')
    }
    return API('/api/report/list?id=' + userId)
  },
  /**
   * 获取中医报告
   * @param id
   */
  falthReport: (id) => API('/api/falthReport?id=' + id, {raw: true})
}

