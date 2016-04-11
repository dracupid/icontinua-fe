import API from './index.jsx'

export default {
  advice () {
    return API('/data/advice.json', {raw: true})
      .then((res) => {
        window._advice = res
        return res
      })
  },
  report: (id) => {
    if (!id) {
      return Promise.reject('reportId not provided.')
    }
    return API('/api/report?rank=true&diagnose=true&reportId=' + id)
  },
  reportList: (userId) => {
    if (!userId) {
      return Promise.reject('userId not provided.')
    }
    return API('/api/report/list?id=' + userId)
  },
  falthReport: (id) => API('/api/falthReport?id=' + id, {raw: true})
}

