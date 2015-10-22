module.exports.getStarLevel = (level) ->
    Math.ceil(level / 2);

module.exports.getLevelText = (level) ->
    if 8 < level <= 10 then "优秀"
    else if level > 6 then "良好"
    else if level > 2 then "一般"
    else "差"

formatZangfu = (items, balance) ->
    itemArr = []
    children = items.children
    limit = Math.min children.length, 5

    for i in [0...limit]
        curItem = children[i]
        if curItem.value > balance
            itemArr.push
                name: curItem.name
                intro: if curItem.rptStr_1 then curItem.rptStr_1.split(/\n/) else ""
                advice: if curItem.rptStr_2 then curItem.rptStr_2.split(/\n/) else ""
                eating: if curItem.rptStr_3 then curItem.rptStr_3.split(/\n/) else ""

    items: itemArr
    level: items.level

formatJizhui = (items, balance) ->
    itemArr = []
    children = items.children
    limit = Math.min children.length, 5

    for i in [0...limit]
        curItem = children[i]
        if curItem.value > balance
            itemArr.push
                name: curItem.name
                itemId: curItem.itemid.toUpperCase()
                intro: if curItem.rptStr_1 then curItem.rptStr_1.split(/\n/) else ""
                advice: if curItem.rptStr_2 then curItem.rptStr_2.split(/\n/) else ""

    items: itemArr
    level: items.level

module.exports.filter = (r) ->
    return '' if not r
    res =
        id: r.recordid
        score: r.score
        balance: r.balance
        zangfu: formatZangfu r.fiveElementItems, r.balance
        jizhui: formatJizhui r.vertebraItems, r.balance
        scores: r.scores
    return res
