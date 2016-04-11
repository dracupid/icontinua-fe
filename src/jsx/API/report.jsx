import API from './index.jsx'

export default {
  /**
   * 获取测量项介绍
   */
  advice () {
    return API('/data/advice.json', {raw: true})
      .then((res) => {
        window._advice = res
        return res
      })
  },
  /**
   * 获取报告详情
   * @param id 报告ID
   */
  report: (id) => {
    if (!id) {
      return Promise.reject('reportId not provided.')
    }
    return API('/api/report?rank=true&diagnose=true&reportId=' + id)
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

