/**
 * 获取测量项的值,自动适配数字或对象中的value项
 * @param t 测量项
 * @returns {*} 值
 */
function getValue (t) {
  if (t == null) {
    return null
  }
  return _.isObject(t) ? t.value : t
}

export default {
  /**
   * 获取最小值
   * @param arr 数字序列
   * @param offset 偏移量
   * @param limit 最小值限制控制
   */
  getMin (arr, offset = 5, limit = Infinity) {
    let _arr = _.map(arr, function (a) {
      return a - offset
    })
    _arr.push(limit)
    let minVal = _.round((_.min(_arr)), -1)
    minVal < 0 && (minVal = 0)
    return minVal
  },

  /**
   * 获取最大值
   * @param arr 数字序列
   * @param offset 偏移量
   * @param limit 最大值限制控制
   */
  getMax (arr, offset = 5, limit = -1) {
    let _arr = _.map(arr, function (a) {
      return a + offset
    })
    _arr.push(limit)
    return _.round((_.max(_arr)), -1)
  },

  /**
   * 格式化日期字符串
   * @param t 时间字符串
   * @returns {string}
     */
  formatTime (t) {
    t = new Date(parseInt(t, 10))
    return `${t.getFullYear()}/${t.getMonth() + 1}/${t.getDate()}`
  },

  /**
   * 格式化日期时间字符串
   * @param t 时间字符串
   * @param breakLine
   * @returns {string}
     */
  formatDateTime (t, breakLine = false) {
    t = new Date(parseInt(t, 10))
    return `${t.getFullYear()}年${t.getMonth() + 1}月${t.getDate()}日 ${breakLine ? '\n' : ''}` +
      `${_.padLeft(t.getHours(), 2, 0)}:${_.padLeft(t.getMinutes(), 2, 0)}`
  },

  getValue,

  /**
   * 获取带suffix的value字符串
   * @param t 测量项
   * @param suffix 后缀
   * @returns {string}
     */
  getStringValue (t, suffix = '') {
    let value = getValue(t)
    return value && value + suffix
  }
}
