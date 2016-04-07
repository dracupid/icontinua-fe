function getUrlByHash (hash) {
  return location.pathname + '#/' + (hash[0] === '/' ? hash.slice(1) : hash)
}

function toUrlFun (url) {
  return function () {
    location.href = url
  }
}

export default {
  parseSex (sex) {
    if (!sex) {
      return '未知'
    }
    return (parseInt(sex, 10) === 1) ? '男' : '女'
  },

  getUrlByHash,
  toUrlFun,

  toHashUrlFun (hash) {
    return toUrlFun(getUrlByHash(hash))
  }
}
