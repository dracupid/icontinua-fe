function getValue (t) {
  if (t == null) {
    return null
  }
  return _.isObject(t) ? t.value : t;
}

export default {
  getMin (arr, offset = 5, limit = Infinity) {
    let _arr = _.map(arr, function (a) {
      return a - offset;
    });
    _arr.push(limit);
    let minVal = _.round((_.min(_arr)), -1);
    minVal < 0 && (minVal = 0);
    return minVal;
  },

  getMax (arr, offset = 5, limit = -1) {
    let _arr = _.map(arr, function (a) {
      return a + offset;
    });
    _arr.push(limit);
    return _.round((_.max(_arr)), -1);
  },

  formatTime (t) {
    t = new Date(parseInt(t, 10));
    return `${t.getFullYear()}/${t.getMonth() + 1}/${t.getDate()}`;
  },

  formatDateTime (t, breakLine = false) {
    t = new Date(parseInt(t, 10))
    return `${t.getFullYear()}年${t.getMonth() + 1}月${t.getDate()}日 ${breakLine ? '\n' : ''}` +
      `${_.padLeft(t.getHours(), 2, 0)}:${_.padLeft(t.getMinutes(), 2, 0)}`
  },

  getValue,

  getStringValue (t, suffix = '') {
    let value = getValue(t);
    return value && value + suffix
  }
};
