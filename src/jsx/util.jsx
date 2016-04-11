/**
 * 获取hash URL
 * @param hash hash
 * @returns {string} URL
 */
function getUrlByHash (hash) {
  return location.pathname + '#/' + (hash[0] === '/' ? hash.slice(1) : hash)
}

/**
 * 生成url跳转函数
 * @param url URL
 * @returns {Function} 跳转函数
 */
function toUrlFun (url) {
  return function () {
    location.href = url
  }
}

export default {
  /**
   * 解析性别字符串, 1为男, 其余为女
   * @param sex
   * @returns {String} 男或女
   */
  parseSex (sex) {
    if (!sex) {
      return '未知'
    }
    return (parseInt(sex, 10) === 1) ? '男' : '女'
  },

  getUrlByHash,
  toUrlFun,

  /**
   * 生成带hash的url的跳转函数
   * @param hash hash
   * @returns {Function} 跳转函数
   */
  toHashUrlFun (hash) {
    return toUrlFun(getUrlByHash(hash))
  }
}
