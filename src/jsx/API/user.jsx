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
   * 发送验证码
   * @param phone 手机号码
   */
  sendCode: (phone) => API(`/api/user/phone/send_code?phone=${phone}`),

  /**
   * 绑定手机号码
   * @param userId 用户ID
   * @param phone 手机号码
   * @param code 验证码
   */
  updatePhone: (userId, phone, code) => API(`/api/user/phone/update?userID=${userId}&phone=${phone}&code=${code}`)
}
