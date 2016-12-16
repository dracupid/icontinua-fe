import API from './index.jsx'

export default {
  listChannel: () => API('/api/admin/channel/list', {noCache: true}),
  listDevice: () => API('/api/admin/device/list', {noCache: true}),
  statDevice: (did) => API('/api/admin/device/stat?id=' + did),
  statChannel: (name) => API('/api/admin/channel/stat?name=' + name),
  deleteChannel: (name) => API('/api/admin/channel/delete?name=' + name),
  createChannel: (name) => {
    if (!name) {
      return Promise.reject()
    }
    return API('/api/admin/channel/create?name=' + name)
  },
  rank201612: () => API("/api/rank/201612", {noCache: true}),

  winPrize201612: (userId, date) => {
    let dateStr = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    return API(`/api/prize/201612/win?userId=${userId}&date=${dateStr}`)
  },
  losePrize201612: (userId) => API("/api/prize/201612/lose?userId=" + userId),
  listPrize201612: () => API("/api/prize/201612/list", {noCache: true})
}
