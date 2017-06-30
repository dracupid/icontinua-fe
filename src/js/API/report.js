import API from './index'

export default {
  /**
   * 获取报告详情
   * @param id 报告ID
   * @param sid 报告shortId
   */
  report: (id, sid) => {
    let promise
    if (id) {
      promise = API('/api/report?rank=true&diagnose=true&reportId=' + id)
    } else if (sid) {
      sid = sid.trim().replace(/[A-Z]/g, '') // 没有大写字母
      // if (sid.indexOf('AKT') === 0) {
      //   sid = sid.slice(3)
      // }
      promise = API('/api/report-sid?sid=' + sid)
    } else {
      return Promise.reject(new Error('reportId not provided.'))
    }

    return promise.then((data) => {
      // channel 包含 only-chinese，只显示生物电结果
      if (data.channel && data.channel.indexOf('only-chinese') >= 0) {
        let {id, location, channel, sid, timestamp, cacheId, user, jizhui, zangfu, xiaohua, miniao} = data
        return {id, location, channel, sid, timestamp, cacheId, user, jizhui, zangfu, xiaohua, miniao}
      } else {
        return data
      }
    })
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
  falthReport: (id) => API('/api/falthReport?id=' + id, {raw: true}),

  gluBeforeMale: (id, isBeforeMale) => API(`/api/report/glu/beforeMeal?reportId=${id}&isBeforeMeal=${isBeforeMale}`, {noCache: true})
}
