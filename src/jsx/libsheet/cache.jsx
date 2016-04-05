import util from '../util.jsx'

let mainList = null
let lists = {}
let items = {}

function fetchMainList () {
  if (mainList) {
    return Promise.resolve(mainList)
  } else {
    return util.fetchAPI("/api/libsheet/list")
      .then((data) => {
        mainList = data
        return Promise.resolve(mainList)
      })
  }
}

export function fetchList (name) {
  if (!name) {
    return fetchMainList();
  } else {
    if (lists[name]) {
      return Promise.resolve(lists[name])
    } else {
      return util.fetchAPI("/api/libsheet/list?name=" + name)
        .then((data) => {
          lists[name] = data
          return Promise.resolve(lists[name])
        })
    }
  }
}

export function fetchItem (name) {
  if (items[name]) {
    return Promise.resolve(items[name])
  } else {
    return util.fetchAPI("/api/libsheet/item?name=" + name)
      .then((data) => {
        items[name] = data
        return Promise.resolve(items[name])
      })
  }
}

