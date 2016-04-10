let _cache = {}

export default function (url, opt = {}) {
  _.defaults(opt, {
    noCache: false,
    raw: false
  })

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
