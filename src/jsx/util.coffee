module.exports =
    getMin: (arr, offset = 5, limit = Infinity) ->
        _arr = _.map arr, (a) -> a - offset
        _arr.push limit
        minVal = _.round (_.min(_arr)), -1
        minVal < 0 && (minVal = 0)
        minVal

    getMax: (arr, offset = 5, limit = -1) ->
        _arr = _.map arr, (a) -> a + offset
        _arr.push limit
        _.round (_.max(_arr)), -1

    formatTime: (t) ->
        t = new Date t
        "#{t.getFullYear()}/#{t.getMonth() + 1}/#{t.getDate()}"
