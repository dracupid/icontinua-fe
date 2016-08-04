/**
 * 获取hash URL
 * @param hash hash
 * @returns {string} URL
 */
function getUrlByHash (hash) {
  return location.pathname + location.search + '#/' + (hash[0] === '/' ? hash.slice(1) : hash)
}

function getUrl(url) {
  return url.replace("#/", location.search + "#/")
}

function toUrl (url) {
  location.href = getUrl(url)
}

function toHash (hash) {
  location.href = location.pathname + location.search + '#/' + (hash[0] === '/' ? hash.slice(1) : hash)
}
/**
 * 生成url跳转函数
 * @param url URL
 * @returns {Function} 跳转函数
 */
function toUrlFun (url) {
  return function () {
    toUrl(url)
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
  toUrl,
  getUrl,

  /**
   * 生成带hash的url的跳转函数
   * @param hash hash
   * @returns {Function} 跳转函数
   */
  toHashUrlFun (hash) {
    return toUrlFun(getUrlByHash(hash))
  },

  getParam (name) {
    let qs = location.search
    if (qs[0] == '?') qs = qs.slice(1)
    for (let kv of qs.split('&')) {
      if (kv.indexOf(name + '=') == 0) {
        return kv.slice(name.length + 1)
      }
    }
    return null;
  }
}
