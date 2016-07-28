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
   * @param blob 图片二进制对象
   */
  uploadPhoto: (userId, blob) => API(`/api/user/photo?id=${userId}`, {method: 'POST', body: blob, noCache: true}),
  /**
   * 删除照片
   * @param userId 用户ID
   * @param img 图片名称
   */
  deletePhoto: (userId, img) => API(`/api/user/photo/delete?id=${userId}&imgId=${img}`),
  /**
   * 化验单识别
   * @param imgName 图片名称
   */
  sendRecognize: (imgName) => API(`http://icontinua.com/recognize/libsheet?url=http://cdn-img.icontinua.com/photo/${imgName}.jpg&id=${imgName}&async=true`),
  /**
   * 轮训化验单识别状态
   * @param imgName 图片名称
   */
  pollingState: (imgName) => API(`http://icontinua.com/recognize/find?id=${imgName}`, {noCache: true})
}
