import util from '../util.jsx'

export function getUserInfo (userId, refresh = false) {
  if (!refresh && window._userInfoCache[userId]) {
    return Promise.resolve(window._userInfoCache[userId])
  }
  return util.fetchAPI('/api/user/info?id=' + userId)
    .then((res) => {
      window._userInfoCache[userId] = res
      return res
    })
}
