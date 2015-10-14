module.exports.baseGaugeOpt =
    series: [
        type: "gauge"
        clickable: false
        pointer:
            width: 4

        detail:
            textStyle:
                fontSize: 20
                fontWeight: 700
                color: "#666"

            offsetCenter: ["0%", "10%"]

        splitLine:
            length: 20

        axisLine:
            lineStyle:
                width: 10

        startAngle: 200
        endAngle: -20
    ]

module.exports.baseLineOpt =
    tooltip:
        trigger: "axis"
    dataZoom:
        show: true
        realtime: true
        start: 0
        end: 100
    toolbox:
        show: false
    calculable: true
    grid:
        x: 40
        x2: 30


