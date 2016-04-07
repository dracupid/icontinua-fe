import API from './index.jsx'

const _ITEM_PER_PAGE = 10
const _APP_NUM_LIMIT = 4

export default {
  appInfo: (uid) => API('/api/app?id=' + uid),
  appListByTag: (pageNum, tagName) => API(`/api/app/tag?itemPerPage=${_ITEM_PER_PAGE}&pageNum=${pageNum}&name=${tagName}`),
  appListByKeyword: (pageNum, tagName) => API(`/api/app/search?itemPerPage=${_ITEM_PER_PAGE}&pageNum=${pageNum}&name=${tagName}`),
  main: () => API('/api/app/main?limit=' + _APP_NUM_LIMIT),
  itemPerPage: _ITEM_PER_PAGE
}
