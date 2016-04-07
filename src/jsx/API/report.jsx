import API from './index.jsx'

export default {
  advice () {
    return API('/data/advice.json', {raw: true})
      .then((res) => {
        window._advice = res
        return res
      })
  },
  report: (id) => API('/api/report?rank=true&diagnose=true&reportId=' + id),
  reportList: (userId) => API('/api/report/list?id=' + userId),
  falthReport: (id) => API('/api/falthReport?id=' + id, {raw: true})
}

