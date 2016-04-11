let MAX_ITEM_NUM = 5

/**
 * 获取星级
 * @param level
 * @returns {number}
 */
module.exports.getStarLevel = function (level) {
  return Math.ceil(level / 2)
}

/**
 * 获取级别的文本描述
 * @param level
 * @returns {string}
 */
module.exports.getLevelText = function (level) {
  if (level > 8 && level <= 10) {
    return '优秀'
  } else if (level > 6) {
    return '良好'
  } else if (level > 2) {
    return '一般'
  } else {
    return '差'
  }
}

/**
 * 格式化脏腑数据
 */
let formatZangfu = function (items, balance) {
  let itemArr = []
  let children = items.children
  let limit = Math.min(children.length, MAX_ITEM_NUM)

  for (let i = 0, curItem; i < children.length; i++) {
    curItem = children[i]
    if (curItem.value > balance) {
      itemArr.push({
        name: curItem.name,
        intro: curItem.rptStr_1 ? curItem.rptStr_1.split(/\n/) : '',
        advice: curItem.rptStr_2 ? curItem.rptStr_2.split(/\n/) : '',
        eating: curItem.rptStr_3 ? curItem.rptStr_3.split(/\n/) : ''
      })
    }
  }

  return {
    items: itemArr.slice(0, limit),
    level: parseFloat(items.level)
  }
}

/**
 * 格式化脊椎数据
 * @param items
 * @param balance
 * @returns {{items: Array.<T>, level: Number}}
 */
let formatJizhui = function (items, balance) {
  let itemArr = []
  let children = items.children
  let limit = Math.min(children.length, MAX_ITEM_NUM)

  for (let i = 0, curItem; i < children.length; i++) {
    curItem = children[i]
    if (curItem.value > balance) {
      itemArr.push({
        name: curItem.name,
        itemId: curItem.itemid.toUpperCase(),
        intro: curItem.rptStr_1 ? curItem.rptStr_1.split(/\n/) : '',
        advice: curItem.rptStr_2 ? curItem.rptStr_2.split(/\n/) : ''
      })
    }
  }
  return {
    items: itemArr.slice(0, limit),
    level: parseFloat(items.level)
  }
}

module.exports.filter = function (r) {
  if (!r) {
    return ''
  }
  return {
    id: r.recordid,
    score: r.score,
    balance: r.balance,
    zangfu: formatZangfu(r.fiveElementItems, r.balance),
    jizhui: formatJizhui(r.vertebraItems, r.balance),
    scores: r.scores
  }
}
