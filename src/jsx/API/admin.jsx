import API from './index.jsx'

export default {
  listChannel: () => API('/api/admin/channel/list'),
  listDevice: () => API('/api/admin/device/list'),
  statDevice: (did) => API('/api/admin/device/stat?id=' + did),
  statChannel: (name) => API('/api/admin/channel/stat?name=' + name),
  deleteChannel: (name) => API('/api/admin/channel/delete?name=' + name),
  createChannel: (name) => {
    if (!name) {
      return Promise.reject()
    }
    return API('/api/admin/channel/create?name=' + name)
  }
}
