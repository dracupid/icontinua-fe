let _cache = {}

/**
 * 获取API请求
 * @param url
 * @param opt noCache: 不使用缓存, raw: 获取原始json数据
 */
export default function (url, opt = {}) {
  _.defaults(opt, {
    noCache: false,
    raw: false
  })

  if (location.host.indexOf('cdn') > 0) {
    url = "http://icontinua.com" + (url[0] === '/' ? url : `/${url}`)
  }

  if (!opt.noCache && _cache[url]) {
    return Promise.resolve(_cache[url])
  }

  return fetch(url, opt)
    .then((res) => {
      if (res.status >= 200 && res.status < 300) {
        return res.json()
      } else {
        var error = new Error(res.statusText)
        error.res = res
        throw error
      }
    })
    .then((json) => {
      let data = opt.raw ? json : (json.data || {})
      if (!opt.noCache) _cache[url] = data
      return data
    })
}
