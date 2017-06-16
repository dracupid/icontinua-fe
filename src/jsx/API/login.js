import API from './index'

export default {
  loginSSID: (username) => API(`/api/auth/login?username=${username}&type=SSID`, {noCache: true}),
  loginPhone: (username, code) => API(`/api/auth/login?username=${username}&code=${code}&type=PHONE`, {noCache: true}),
  getQrcode: () => API(`/api/auth/login/wechat/qrcode`),
  polling: (id) => API(`/api/auth/login/wechat/polling?id=${id}`, {noCache: true})
}
