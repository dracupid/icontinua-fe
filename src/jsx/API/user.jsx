import API from './index.jsx'

export default {
  getUserInfo: (userId, refresh = false) => API('/api/user/info?id=' + userId, {noCache: refresh}),
  updateUserInfo: (userId, paramObj) => {
    let params = _(paramObj)
      .map((v, k) => v == null ? null : `${k}=${v}`)
      .compact()
      .join('&')
    return API(`/api/user/update?id=${userId}&${params}`)
  },
  addPhoto: (userId, imgId) => API(`/api/user/photo?id=${userId}&imgId=${imgId}`),
  deletePhoto: (userId, img) => API(`/api/user/photo/delete?id=${userId}&imgId=${img}`),
  recognize: (img) => API(`/api/recognize/libSheet?filename=${img}`)
}
