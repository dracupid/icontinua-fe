import moment from 'moment'

export default {
  groupByYearWeek (arr) {
    return _.groupBy(arr, (i) => {
      let m = moment(i.timestamp)
      return m.startOf('isoweek').valueOf()
    })
  },

  groupByYearDay (arr) {
    return _.groupBy(arr, (i) => {
      let m = moment(i.timestamp)
      return m.startOf('day').valueOf()
    })
  }
}
