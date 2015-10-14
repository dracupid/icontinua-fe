module.exports =
    getMin: (arr, offset = 15, limit = Infinity)->
        _arr = _.map arr, (a) -> a - offset
        _arr.push limit
        minVal = _.round (_.min(_arr)), -1
        minVal < 0 && (minVal = 0)
        minVal

    getMax: (arr, offset = 15, limit = -1) ->
        _arr = _.map arr, (a) -> a + offset
        _arr.push limit
        _.round (_.max(_arr)), -1

    formatTime: (t) ->
        t = new Date t * 1000
        "#{t.getFullYear()}/#{t.getMonth() + 1}/#{t.getDate()}"

