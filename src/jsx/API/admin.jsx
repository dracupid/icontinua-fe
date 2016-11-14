import API from './index.jsx'

export default {
  listChannel: () => API('/api/admin/channel/list'),
  listDevice: () => API('/api/admin/device/list'),
  statDevice: (did) => API('/api/admin/device/stat?id=' + did),
  statChannel: (name) => API('/api/admin/channel/stat?name=' + name)
}