import util from '../util.jsx'

export function getUserInfo (userId, refresh = false) {
  return util.fetchAPI('/api/user/info?id=' + userId, {noCache: refresh})
}
