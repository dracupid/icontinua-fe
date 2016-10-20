let _cache = {}

/**
 * 获取API请求
 * @param url
 * @param opt noCache: 不使用缓存, raw: 获取原始json数据
 */
export default function (url, opt = {}) {
  _.defaults(opt, {
    noCache: false,
    raw: false,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (url.indexOf('icontinua.com') > 0 && location.host.indexOf('icontinua.com') < 0) { // 跨域请求
    delete opt.credentials
    delete opt.headers
  }

  if (!opt.noCache && _cache[url]) {
    return Promise.resolve(_cache[url])
  }

  return fetch(url, opt)
    .then((res) => {
      if (res.status >= 200 && res.status < 300) {
        return res.json()
      } else {
        try {
          res.json()
            .then((json) => {
              console.log(json)
              if (json.errno === 44000) { // 需要登录
                location.href = `/login?url=${encodeURIComponent(location.href)}`
              }
            })
        } catch (e) {
        }
        var error = new Error(res.statusText)
        error.res = res
        throw error
      }
    })
    .then((json) => {
      let data = opt.raw ? json : (json.data == null ? {} : json.data)
      if (!opt.noCache) _cache[url] = data
      return data
    })
}
