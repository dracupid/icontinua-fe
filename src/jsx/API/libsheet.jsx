import API from './index.jsx'

export default {
  fetchList: (name) => API(`/api/libsheet/list?${name ? `name=${name}` : ''}`),
  fetchItem: (name) => API('/api/libsheet/item?name=' + name)
}
