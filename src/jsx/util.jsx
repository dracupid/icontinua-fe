module.exports = {
  getMin(arr, offset = 5, limit = Infinity) {
    let _arr = _.map(arr, function (a) {
      return a - offset;
    });
    _arr.push(limit);
    let minVal = _.round((_.min(_arr)), -1);
    minVal < 0 && (minVal = 0);
    return minVal;
  },

  getMax(arr, offset = 5, limit = -1) {
    let _arr = _.map(arr, function (a) {
      return a + offset;
    });
    _arr.push(limit);
    return _.round((_.max(_arr)), -1);
  },

  formatTime(t) {
    t = new Date(t);
    return `${t.getFullYear()}/${t.getMonth() + 1}/${t.getDate()}`;
  }
};
