import API from './index.jsx'

export default {
  /**
   * 获取用户信息
   * @param userId 用户ID
   * @param refresh 是否刷新
   */
  getUserInfo: (userId, refresh = false) => API('/api/user/info?id=' + userId, {noCache: refresh}),
  /**
   * 更新用户信息
   * @param userId 用户ID
   * @param paramObj 用户信息对象
   */
  updateUserInfo: (userId, paramObj) => {
    let params = _(paramObj)
      .map((v, k) => v == null ? null : `${k}=${v}`)
      .compact()
      .join('&')
    return API(`/api/user/update?id=${userId}&${params}`)
  },
  /**
   * 增加图片
   * @param userId 用户ID
   * @param imgId 图片ID
   */
  addPhoto: (userId, imgId) => API(`/api/user/photo?id=${userId}&imgId=${imgId}`),
  /**
   * 删除照片
   * @param userId 用户ID
   * @param img 图片名称
   */
  deletePhoto: (userId, img) => API(`/api/user/photo/delete?id=${userId}&imgId=${img}`),
  /**
   * 化验单识别
   * @param img 图片名称
   */
  recognize: (img) => API(`/api/recognize/libSheet?filename=${img}`)
}
