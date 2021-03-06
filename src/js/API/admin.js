import API from './index'

function dateString (date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

export default {
  listChannel: () => API('/api/admin/channel/list', {noCache: true}),
  listDevice: () => API('/api/admin/device/list', {noCache: true}),
  statDevice: (did) => API('/api/admin/device/stat?id=' + did),
  statChannel: (name) => API('/api/admin/channel/stat?name=' + name),
  deleteChannel: (name, appid) => API(`/api/admin/channel/delete?name=${name}&appid=${appid || ''}`),
  createChannel: (name) => {
    if (!name) {
      return Promise.reject(new Error('channel name cannot be null'))
    }
    return API('/api/admin/channel/create?name=' + name)
  },
  rank201612: (from, to) => API(`/api/rank/201612?needPhone=false&from=${dateString(from)}&to=${dateString(to)}`, {noCache: true}),

  winPrize201612: (userId, date) => {
    let dateStr = dateString(date)
    return API(`/api/prize/201612/win?userId=${userId}&date=${dateStr}`)
  },
  losePrize201612: (userId) => API('/api/prize/201612/lose?userId=' + userId),
  listPrize201612: () => API('/api/prize/201612/list', {noCache: true})
}
