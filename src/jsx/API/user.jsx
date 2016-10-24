import API from './index.jsx'

export default {
  /**
   * 获取用户信息
   * @param refresh 是否刷新
   */
  getUserInfo: (refresh = false) => API('/api/user/info', {noCache: refresh}),
  /**
   * 更新用户信息
   * @param paramObj 用户信息对象
   */
  updateUserInfo: (paramObj) => {
    let params = _(paramObj)
      .map((v, k) => v == null ? null : `${k}=${v}`)
      .compact()
      .join('&')
    return API(`/api/user/info/update?${params}`)
  },
  /**
   * 增加图片
   * @param blob 图片二进制对象
   */
  uploadPhoto: (blob) => API(`/api/user/photo`, {method: 'POST', body: blob, noCache: true}),
  /**
   * 删除照片
   * @param img 图片名称
   */
  deletePhoto: (img) => API(`/api/user/photo/delete?imgId=${img}`),

  /**
   * 发送验证码
   * @param phone 手机号码
   * @param ensureExist 是否验证手机号码存在

   */
  sendCode: (phone, ensureExist = false) => API(`/api/user/phone/send_code?phone=${phone}&ensureExist=${ensureExist}`),

  /**
   * 绑定手机号码
   * @param phone 手机号码
   * @param code 验证码
   */
  updatePhone: (phone, code) => API(`/api/user/phone/update?phone=${phone}&code=${code}`)
}
