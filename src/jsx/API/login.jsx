import API from './index.jsx'

export default {
  login: (username) => API(`/api/auth/login?username=${username}&type=SSID`, {noCache: true}),
  getQrcode: () => API(`/api/auth/login/wechat/qrcode`),
  polling: (id) => API(`/api/auth/login/wechat/polling?id=${id}`, {noCache: true})
}
