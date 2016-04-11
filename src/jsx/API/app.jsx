import API from './index.jsx'

const _ITEM_PER_PAGE = 10
const _APP_NUM_LIMIT = 4

export default {
  /**
   * 获取app详情
   * @param uid
   */
  appInfo: (uid) => API('/api/app?id=' + uid),
  /**
   * 根据tag获取应用列表
   * @param pageNum
   * @param tagName
   */
  appListByTag: (pageNum, tagName) => API(`/api/app/tag?itemPerPage=${_ITEM_PER_PAGE}&pageNum=${pageNum}&name=${tagName}`),
  /**
   * 应用搜索
   * @param pageNum
   * @param tagName
   */
  appListByKeyword: (pageNum, tagName) => API(`/api/app/search?itemPerPage=${_ITEM_PER_PAGE}&pageNum=${pageNum}&name=${tagName}`),
  /**
   * 获取主页数据
   */
  main: () => API('/api/app/main?limit=' + _APP_NUM_LIMIT),
  /**
   * 每页显示应用数量
   */
  itemPerPage: _ITEM_PER_PAGE
}
