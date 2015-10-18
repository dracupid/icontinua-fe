/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _ReactRouter = ReactRouter;
	var Router = _ReactRouter.Router;
	var Route = _ReactRouter.Route;
	var Link = _ReactRouter.Link;
	var report = __webpack_require__(1);
	var reports = __webpack_require__(14);

	window._reportData = {};
	window._reportListData = null;
	window._chineseReportData = {};

	React.render(React.createElement(
	    Router,
	    null,
	    React.createElement(Route, { path: '/', component: reports }),
	    React.createElement(Route, { path: '/:openId', component: reports }),
	    React.createElement(Route, { path: '/:openId/:reportId', component: report })
	), document.body);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _ANTD = ANTD;
	var Tabs = _ANTD.Tabs;
	var message = _ANTD.message;
	var Alert = _ANTD.Alert;
	var HeightWeight = __webpack_require__(2);
	var Blood = __webpack_require__(6);
	var O2 = __webpack_require__(8);
	var Chinese = __webpack_require__(9);
	var Loading = __webpack_require__(11);
	var Banner = __webpack_require__(12);
	var Icon = __webpack_require__(13);
	var Echarts = __webpack_require__(3);
	var TabPane = Tabs.TabPane;

	var _require = __webpack_require__(5);

	var baseGaugeOpt = _require.baseGaugeOpt;

	var Report = (function (_React$Component) {
	    _inherits(Report, _React$Component);

	    function Report() {
	        _classCallCheck(this, Report);

	        _get(Object.getPrototypeOf(Report.prototype), "constructor", this).apply(this, arguments);

	        this.state = {
	            title: "体检记录",
	            report: {},
	            loaded: false
	        };
	    }

	    _createClass(Report, [{
	        key: "fetchFailedHandler",
	        value: function fetchFailedHandler() {
	            this.setState({
	                title: "体检报告",
	                loaded: true
	            });
	        }
	    }, {
	        key: "componentDidMount",
	        value: function componentDidMount() {
	            var _this = this;

	            var reportId = this.props.params.reportId;
	            if (!_.isEmpty(window._reportData[reportId])) {
	                this.setState({
	                    title: window._reportData[reportId].title,
	                    report: window._reportData[reportId].report,
	                    loaded: true
	                });
	                return;
	            }
	            var url = "/api/report?reportId=" + reportId;
	            $.getJSON(url).then(function (res) {
	                console.log(res);
	                if (res.statusCode === 200) {
	                    var time = new Date(res.data.timestamp * 1000),
	                        title = time.getFullYear() + "年" + (time.getMonth() + 1) + "月" + time.getDate() + "日";
	                    window._reportData[reportId] = {
	                        title: title,
	                        report: res.data
	                    };
	                    _this.setState({
	                        title: title,
	                        report: res.data,
	                        loaded: true
	                    });
	                } else {
	                    _this.fetchFailedHandler();
	                }
	            }).fail(function (e) {
	                console.error(e);
	                _this.fetchFailedHandler();
	            });
	        }
	    }, {
	        key: "getHeightWeight",
	        value: function getHeightWeight() {
	            var _state$report = this.state.report;
	            var height = _state$report.height;
	            var weight = _state$report.weight;
	            var bodyFatRate = _state$report.bodyFatRate;

	            if (this.state.loaded) {
	                if (height && weight) {
	                    return React.createElement(HeightWeight, { height: ~ ~height, weight: ~ ~weight, rate: ~ ~bodyFatRate });
	                } else {
	                    return React.createElement(Alert, {
	                        message: "没有您的身体数据",
	                        type: "info" });
	                }
	            } else {
	                return React.createElement(Loading, null);
	            }
	        }
	    }, {
	        key: "getBlood",
	        value: function getBlood() {
	            var _state$report2 = this.state.report;
	            var systolicPressure = _state$report2.systolicPressure;
	            var diastolicPressure = _state$report2.diastolicPressure;
	            var beatsPerMinute = _state$report2.beatsPerMinute;

	            if (this.state.loaded) {
	                if (systolicPressure && diastolicPressure) {
	                    return React.createElement(Blood, { high: ~ ~systolicPressure, low: ~ ~diastolicPressure, beat: ~ ~beatsPerMinute });
	                } else {
	                    return React.createElement(Alert, {
	                        message: "没有您的血压数据",
	                        type: "info" });
	                }
	            } else {
	                return React.createElement(Loading, null);
	            }
	        }
	    }, {
	        key: "getO2",
	        value: function getO2() {
	            var spo2h = this.state.report.spo2h;

	            if (this.state.loaded) {
	                if (spo2h) {
	                    return React.createElement(O2, { OO: ~ ~spo2h });
	                } else {
	                    return React.createElement(Alert, {
	                        message: "没有您的血氧数据",
	                        type: "info" });
	                }
	            } else {
	                return React.createElement(Loading, null);
	            }
	        }
	    }, {
	        key: "getChinese",
	        value: function getChinese() {
	            var cacheId = this.state.report.cacheId;

	            if (this.state.loaded) {
	                if (cacheId) {
	                    return React.createElement(Chinese, { id: cacheId });
	                } else {
	                    return React.createElement(Alert, {
	                        message: "没有您的中医数据",
	                        type: "info" });
	                }
	            } else {
	                return React.createElement(Loading, null);
	            }
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            return React.createElement(
	                "div",
	                { id: "report", className: "top-tab-wrapper" },
	                React.createElement(Banner, { title: this.state.title, backUrl: "/reports#/" + this.props.params.openId }),
	                React.createElement(
	                    Tabs,
	                    { size: "mini" },
	                    React.createElement(
	                        TabPane,
	                        { tab: "身体", key: "1" },
	                        this.getHeightWeight()
	                    ),
	                    React.createElement(
	                        TabPane,
	                        { tab: "血压", key: "2" },
	                        this.getBlood()
	                    ),
	                    React.createElement(
	                        TabPane,
	                        { tab: "血氧", key: "3" },
	                        this.getO2()
	                    ),
	                    React.createElement(
	                        TabPane,
	                        { tab: "生物电", key: "4" },
	                        this.getChinese()
	                    )
	                )
	            );
	        }
	    }]);

	    return Report;
	})(React.Component);

	module.exports = Report;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Echarts = __webpack_require__(3);
	var Tips = __webpack_require__(4);

	var _require = __webpack_require__(5);

	var baseGaugeOpt = _require.baseGaugeOpt;

	var KVMap = (function (_React$Component) {
	    _inherits(KVMap, _React$Component);

	    function KVMap() {
	        _classCallCheck(this, KVMap);

	        _get(Object.getPrototypeOf(KVMap.prototype), 'constructor', this).apply(this, arguments);
	    }

	    _createClass(KVMap, [{
	        key: 'render',
	        value: function render() {
	            var items = [],
	                obj = this.props.obj;
	            for (var key in obj) {
	                if (obj[key]) {
	                    items.push(React.createElement(
	                        'div',
	                        { className: 'kv-item', key: key + obj[key] },
	                        React.createElement(
	                            'div',
	                            { className: 'key' },
	                            ' ',
	                            key,
	                            ' '
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'value' },
	                            ' ',
	                            obj[key],
	                            ' '
	                        )
	                    ));
	                }
	            }
	            return React.createElement(
	                'div',
	                { className: 'kv-map' },
	                items
	            );
	        }
	    }], [{
	        key: 'defaultProps',
	        value: {
	            obj: {}
	        },
	        enumerable: true
	    }]);

	    return KVMap;
	})(React.Component);

	var BMIPoints = [18.5, 25, 28],
	    BMIText = ['偏瘦', '正常', '偏胖', '肥胖'];

	var HeightWeight = (function (_React$Component2) {
	    _inherits(HeightWeight, _React$Component2);

	    function HeightWeight() {
	        _classCallCheck(this, HeightWeight);

	        _get(Object.getPrototypeOf(HeightWeight.prototype), 'constructor', this).apply(this, arguments);
	    }

	    _createClass(HeightWeight, [{
	        key: 'getBMI',
	        value: function getBMI() {
	            var _props = this.props;
	            var weight = _props.weight;
	            var height = _props.height;

	            return (weight / (height * height / 10000)).toFixed(1);
	        }
	    }, {
	        key: 'getBMIText',
	        value: function getBMIText() {
	            var BMI = this.getBMI();
	            if (BMI < BMIPoints[0]) {
	                return BMIText[0];
	            }

	            for (var i = BMIPoints.length - 1; i >= 0; i--) {
	                if (BMI >= BMIPoints[i]) {
	                    return BMIText[i + 1];
	                }
	            }
	            return BMIText[0];
	        }
	    }, {
	        key: 'getWeightOpt',
	        value: function getWeightOpt() {
	            var _props2 = this.props;
	            var weight = _props2.weight;
	            var height = _props2.height;
	            var weightPoints = BMIPoints.map(function (point) {
	                return point * height * height / 10000;
	            });
	            var min = _.round(Math.min(weightPoints[0] - 10, weight - 10), -1),
	                max = _.round(Math.max(weightPoints[2] + 10, weight + 10), -1);

	            min < 0 && (min = 0);

	            var percents = weightPoints.map(function (weight) {
	                return ((weight - min) / (max - min)).toFixed(1);
	            });

	            return _.defaultsDeep({
	                series: [{
	                    detail: {
	                        formatter: '{value}KG'
	                    },
	                    axisLine: {
	                        lineStyle: {
	                            color: [[percents[0], '#DDDF0D'], // 过轻
	                            [percents[1], '#55BF3B'], // 正常
	                            [percents[2], '#DDDF0D'], // 过重
	                            [1, '#DF5353'] // 非常肥胖
	                            ]
	                        }
	                    },
	                    data: [{
	                        value: weight
	                        //name: this.getBMIText()
	                    }],
	                    min: min,
	                    max: max
	                }]
	            }, baseGaugeOpt);
	        }
	    }, {
	        key: 'getTips',
	        value: function getTips() {
	            var tips = ["该增加体重了", "请继续保持", "该多运动减肥", "快去减肥吧"],
	                text = this.getBMIText(),
	                index = BMIText.indexOf(text);

	            return '您的体重' + text + '， ' + tips[index] + '!';
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var fatRate = undefined;
	            if (this.props.rate) {
	                fatRate = this.props.rate + '%';
	            }
	            return React.createElement(
	                'div',
	                null,
	                React.createElement(
	                    'div',
	                    { className: 'height-wrapper' },
	                    React.createElement('img', { src: '/img/body.png' }),
	                    React.createElement('div', { className: 'line' }),
	                    React.createElement(
	                        'div',
	                        { className: 'text' },
	                        this.props.height,
	                        'CM'
	                    ),
	                    React.createElement(KVMap, { obj: { BMI: this.getBMI(), 体脂: fatRate } })
	                ),
	                React.createElement(Echarts, { option: this.getWeightOpt(), height: '300', width: '100%' }),
	                React.createElement(Tips, { text: this.getTips(), fix: true })
	            );
	        }
	    }], [{
	        key: 'propTypes',
	        value: {
	            height: React.PropTypes.any.isRequired,
	            weight: React.PropTypes.any.isRequired
	        },
	        enumerable: true
	    }]);

	    return HeightWeight;
	})(React.Component);

	module.exports = HeightWeight;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Echarts = (function (_React$Component) {
	    _inherits(Echarts, _React$Component);

	    function Echarts() {
	        _classCallCheck(this, Echarts);

	        _get(Object.getPrototypeOf(Echarts.prototype), 'constructor', this).apply(this, arguments);
	    }

	    _createClass(Echarts, [{
	        key: 'renderChart',
	        value: function renderChart() {
	            var option = this.props.option,
	                myChart = echarts.init(React.findDOMNode(this.refs.echarts), 'macarons');
	            myChart.setOption(option, true);
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            this.renderChart();
	        }
	    }, {
	        key: 'shouldComponentUpdate',
	        value: function shouldComponentUpdate() {
	            return false;
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return React.createElement('div', { ref: 'echarts', className: "echarts " + this.props.className,
	                style: { height: this.props.height + 'px', width: this.props.width } });
	        }
	    }], [{
	        key: 'propTypes',
	        value: {
	            option: React.PropTypes.object.isRequired,
	            width: React.PropTypes.any.isRequired,
	            height: React.PropTypes.string,
	            mini: React.PropTypes.bool
	        },
	        enumerable: true
	    }, {
	        key: 'defaultProps',
	        value: {
	            width: '100%',
	            height: '500px'
	        },
	        enumerable: true
	    }]);

	    return Echarts;
	})(React.Component);

	module.exports = Echarts;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Tips = (function (_React$Component) {
	    _inherits(Tips, _React$Component);

	    function Tips() {
	        _classCallCheck(this, Tips);

	        _get(Object.getPrototypeOf(Tips.prototype), 'constructor', this).apply(this, arguments);
	    }

	    _createClass(Tips, [{
	        key: 'render',
	        value: function render() {
	            return React.createElement(
	                'div',
	                { className: "report-tip-block" + (this.props.fix ? ' fix' : '') },
	                React.createElement(
	                    'h2',
	                    null,
	                    '建议'
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'tip-text' },
	                    this.props.text
	                )
	            );
	        }
	    }]);

	    return Tips;
	})(React.Component);

	module.exports = Tips;

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports.baseGaugeOpt = {
	  series: [
	    {
	      type: "gauge",
	      clickable: false,
	      pointer: {
	        width: 4
	      },
	      detail: {
	        textStyle: {
	          fontSize: 20,
	          fontWeight: 700,
	          color: "#666"
	        },
	        offsetCenter: ["0%", "10%"]
	      },
	      splitLine: {
	        length: 20
	      },
	      axisLine: {
	        lineStyle: {
	          width: 10
	        }
	      },
	      startAngle: 200,
	      endAngle: -20
	    }
	  ]
	};

	module.exports.baseLineOpt = {
	  tooltip: {
	    trigger: "axis"
	  },
	  dataZoom: {
	    show: true,
	    realtime: true,
	    start: 0,
	    end: 100
	  },
	  toolbox: {
	    show: false
	  },
	  calculable: true,
	  grid: {
	    x: 40,
	    x2: 30
	  }
	};


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Echarts = __webpack_require__(3);
	var Tips = __webpack_require__(4);
	var util = __webpack_require__(7);

	var _require = __webpack_require__(5);

	var baseGaugeOpt = _require.baseGaugeOpt;

	var Blood = (function (_React$Component) {
	    _inherits(Blood, _React$Component);

	    function Blood() {
	        _classCallCheck(this, Blood);

	        _get(Object.getPrototypeOf(Blood.prototype), 'constructor', this).apply(this, arguments);
	    }

	    _createClass(Blood, [{
	        key: '_getOpt',
	        value: function _getOpt(val, text, unit, lines, _min, _max) {
	            var min = util.getMin([val], 10, _min),
	                max = util.getMax([val], 10, _max);

	            var percents = lines.map(function (item) {
	                return (item - min) / (max - min);
	            });
	            return _.defaultsDeep({
	                series: [{
	                    detail: {
	                        formatter: '{value} ' + unit
	                    },

	                    axisLine: {
	                        lineStyle: {
	                            color: [[percents[0], '#DDDF0D'], [percents[1], '#55BF3B'], [percents[2], '#DDDF0D'], [1, '#DF5353']]
	                        }
	                    },
	                    data: [{
	                        value: val,
	                        name: text
	                    }],
	                    min: min,
	                    max: max
	                }]
	            }, baseGaugeOpt);
	        }
	    }, {
	        key: 'getTips',
	        value: function getTips() {
	            var _props = this.props;
	            var low = _props.low;
	            var high = _props.high;
	            var lowText = "";
	            var highText = "";
	            var error = false;
	            if (low >= 60 && low <= 80) {
	                lowText = "正常";
	            } else if (low < 60) {
	                error = true;
	                lowText = "偏低";
	            } else {
	                error = true;
	                lowText = "偏高";
	            }

	            if (high >= 90 && high <= 120) {
	                highText = "正常";
	            } else if (high < 90) {
	                error = true;
	                highText = "偏低";
	            } else {
	                error = true;
	                highText = "偏高";
	            }

	            return '您的舒张压' + lowText + '，收缩压' + highText + '，' + (error ? "请多加注意。" : "请继续保持。");
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var width = "200%";
	            return React.createElement(
	                'div',
	                { className: 'blood-tab' },
	                React.createElement(
	                    'div',
	                    { className: 'flex-box' },
	                    React.createElement(
	                        'div',
	                        { className: 'echart-mini-wrapper' },
	                        React.createElement(
	                            'div',
	                            { style: { position: 'relative' } },
	                            React.createElement(Echarts, { option: this._getOpt(this.props.high, "收缩压", 'mmHg', [90, 120, 140], 60, 160, true), height: '300',
	                                width: width, className: 'mini top-left' })
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'echart-mini-wrapper' },
	                        React.createElement(
	                            'div',
	                            { style: { position: 'relative' } },
	                            React.createElement(Echarts, { option: this._getOpt(this.props.low, "舒张压", 'mmHg', [60, 80, 90], 40, 120, true), height: '300',
	                                width: width, className: 'mini top-right' })
	                        )
	                    )
	                ),
	                React.createElement(Echarts, { option: this._getOpt(this.props.beat, "心率", 'bpm', [60, 100, 120], 40, 140), height: '300',
	                    className: 'bottom-echart' }),
	                React.createElement(Tips, { text: this.getTips(), fix: true })
	            );
	        }
	    }]);

	    return Blood;
	})(React.Component);

	module.exports = Blood;

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = {
	  getMin: function(arr, offset, limit) {
	    var _arr, minVal;
	    if (offset == null) {
	      offset = 15;
	    }
	    if (limit == null) {
	      limit = Infinity;
	    }
	    _arr = _.map(arr, function(a) {
	      return a - offset;
	    });
	    _arr.push(limit);
	    minVal = _.round(_.min(_arr), -1);
	    minVal < 0 && (minVal = 0);
	    return minVal;
	  },
	  getMax: function(arr, offset, limit) {
	    var _arr;
	    if (offset == null) {
	      offset = 15;
	    }
	    if (limit == null) {
	      limit = -1;
	    }
	    _arr = _.map(arr, function(a) {
	      return a + offset;
	    });
	    _arr.push(limit);
	    return _.round(_.max(_arr), -1);
	  },
	  formatTime: function(t) {
	    t = new Date(t * 1000);
	    return (t.getFullYear()) + "/" + (t.getMonth() + 1) + "/" + (t.getDate());
	  }
	};


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Tips = __webpack_require__(4);

	var O2 = (function (_React$Component) {
	    _inherits(O2, _React$Component);

	    function O2() {
	        _classCallCheck(this, O2);

	        _get(Object.getPrototypeOf(O2.prototype), "constructor", this).apply(this, arguments);
	    }

	    _createClass(O2, [{
	        key: "isNormal",
	        value: function isNormal() {
	            return this.props.OO >= 90;
	        }
	    }, {
	        key: "getTips",
	        value: function getTips() {
	            if (this.isNormal()) {
	                return "您的血氧值正常，请继续保持";
	            } else {
	                return "您的血氧值偏低，请注意";
	            }
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            var className = "spo2h-report" + (this.isNormal() ? "" : " red");
	            return React.createElement(
	                "div",
	                null,
	                React.createElement(
	                    "div",
	                    { className: className },
	                    React.createElement(
	                        "div",
	                        { className: "flex-box" },
	                        React.createElement(
	                            "p",
	                            null,
	                            "SpO",
	                            React.createElement(
	                                "span",
	                                { className: "sub" },
	                                "2"
	                            ),
	                            "%"
	                        ),
	                        React.createElement(
	                            "p",
	                            null,
	                            this.props.OO,
	                            "%"
	                        )
	                    ),
	                    React.createElement("img", { src: "/img/wave.png" })
	                ),
	                React.createElement(Tips, { text: this.getTips() })
	            );
	        }
	    }]);

	    return O2;
	})(React.Component);

	module.exports = O2;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _require = __webpack_require__(10);

	var filter = _require.filter;
	var getStarLevel = _require.getStarLevel;
	var getLevelText = _require.getLevelText;
	var Loading = __webpack_require__(11);
	var _ANTD = ANTD;
	var message = _ANTD.message;
	var Alert = _ANTD.Alert;

	var ReportBlock = (function (_React$Component) {
	    _inherits(ReportBlock, _React$Component);

	    function ReportBlock() {
	        _classCallCheck(this, ReportBlock);

	        _get(Object.getPrototypeOf(ReportBlock.prototype), "constructor", this).apply(this, arguments);
	    }

	    _createClass(ReportBlock, [{
	        key: "render",
	        value: function render() {
	            var _props = this.props;
	            var title = _props.title;
	            var level = _props.level;
	            var items = _props.items;
	            var starNum = getStarLevel(level);
	            var notices = _.pluck(items, "name").join("，");
	            var itemDOMs = items.map(function (item, i) {
	                return React.createElement(
	                    "div",
	                    { key: i },
	                    React.createElement(
	                        "h3",
	                        { className: "name" },
	                        item.name
	                    ),
	                    (function () {
	                        if (item.intro) {
	                            return React.createElement(
	                                "div",
	                                { className: "block" },
	                                React.createElement(
	                                    "h3",
	                                    { className: "title" },
	                                    "【简介】"
	                                ),
	                                React.createElement(
	                                    "div",
	                                    { className: "content" },
	                                    item.intro
	                                )
	                            );
	                        }
	                    })(),
	                    (function () {
	                        if (item.advice) {
	                            return React.createElement(
	                                "div",
	                                { className: "block" },
	                                React.createElement(
	                                    "h3",
	                                    { className: "title" },
	                                    "【调理建议】"
	                                ),
	                                React.createElement(
	                                    "ol",
	                                    { className: "content" },
	                                    item.advice.map(function (e, i) {
	                                        return React.createElement(
	                                            "li",
	                                            { key: i },
	                                            " ",
	                                            e,
	                                            " "
	                                        );
	                                    })
	                                )
	                            );
	                        }
	                    })(),
	                    (function () {
	                        if (item.eating) {
	                            return React.createElement(
	                                "div",
	                                { className: "block" },
	                                React.createElement(
	                                    "h3",
	                                    { className: "title" },
	                                    "【饮食建议】"
	                                ),
	                                React.createElement(
	                                    "div",
	                                    { className: "content" },
	                                    item.eating
	                                )
	                            );
	                        }
	                    })()
	                );
	            });

	            var onStars = new Array(starNum),
	                offStars = new Array(5 - starNum),
	                onStar = React.createElement("div", { className: "star on" }),
	                offStar = React.createElement("div", { className: "star off" });

	            _.fill(onStars, onStar);
	            _.fill(offStars, offStar);

	            return React.createElement(
	                "div",
	                { className: "chinese-report-block" },
	                React.createElement(
	                    "div",
	                    { className: "report-header" },
	                    React.createElement(
	                        "h1",
	                        { className: "title" },
	                        "您的" + title
	                    ),
	                    React.createElement(
	                        "div",
	                        { className: "status" },
	                        title + "状况: " + getLevelText(level)
	                    ),
	                    React.createElement(
	                        "div",
	                        { className: "stars" },
	                        React.createElement(
	                            "h4",
	                            null,
	                            "您的" + title + "为: "
	                        ),
	                        onStars.concat(offStars)
	                    ),
	                    React.createElement(
	                        "h4",
	                        null,
	                        "建议您注意:"
	                    ),
	                    notices
	                ),
	                React.createElement(
	                    "div",
	                    { className: "report-body" },
	                    itemDOMs
	                )
	            );
	        }
	    }]);

	    return ReportBlock;
	})(React.Component);

	var Chinese = (function (_React$Component2) {
	    _inherits(Chinese, _React$Component2);

	    function Chinese() {
	        _classCallCheck(this, Chinese);

	        _get(Object.getPrototypeOf(Chinese.prototype), "constructor", this).apply(this, arguments);

	        this.state = {
	            data: null,
	            loaded: false
	        };
	    }

	    _createClass(Chinese, [{
	        key: "fetchFailedHandler",
	        value: function fetchFailedHandler() {
	            //message.error("获取生物电数据失败");
	            this.setState({
	                data: null,
	                loaded: true
	            });
	        }
	    }, {
	        key: "componentDidMount",
	        value: function componentDidMount() {
	            var _this = this;

	            var id = this.props.id;
	            if (!_.isEmpty(window._chineseReportData[id])) {
	                this.setState({
	                    data: window._chineseReportData[id],
	                    loaded: true
	                });
	                return;
	            }
	            var url = "/api/falthReport?id=" + id;
	            $.getJSON(url).then(function (res) {
	                console.log(res);
	                //message.success('获取生物电数据成功', 0.5);
	                window._chineseReportData[id] = res;
	                _this.setState({
	                    data: res,
	                    loaded: true
	                });
	            }).fail(function (e) {
	                console.error(e);
	                _this.fetchFailedHandler();
	            });
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            if (this.state.loaded) {
	                if (this.state.data === null) {
	                    return React.createElement(Alert, {
	                        message: "没有您的生物电数据",
	                        type: "info" });
	                } else {
	                    var data = filter(this.state.data);
	                    return React.createElement(
	                        "div",
	                        null,
	                        React.createElement(ReportBlock, _extends({ title: "脏腑" }, data.zangfu)),
	                        React.createElement(ReportBlock, _extends({ title: "脊椎" }, data.jizhui))
	                    );
	                }
	            } else {
	                return React.createElement(Loading, null);
	            }
	        }
	    }]);

	    return Chinese;
	})(React.Component);

	module.exports = Chinese;

/***/ },
/* 10 */
/***/ function(module, exports) {

	var formatJizhui, formatZangfu;

	module.exports.getStarLevel = function(level) {
	  return Math.ceil(level / 2);
	};

	module.exports.getLevelText = function(level) {
	  if ((8 < level && level <= 10)) {
	    return "优秀";
	  } else if (level > 6) {
	    return "良好";
	  } else if (level > 2) {
	    return "一般";
	  } else {
	    return "差";
	  }
	};

	formatZangfu = function(items, balance) {
	  var children, curItem, i, itemArr, j, limit, ref;
	  itemArr = [];
	  children = items.children;
	  limit = Math.min(children.length, 5);
	  for (i = j = 0, ref = limit; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
	    curItem = children[i];
	    if (curItem.value > balance) {
	      itemArr.push({
	        name: curItem.name,
	        intro: curItem.rptStr_1 ? curItem.rptStr_1.split(/\n/) : "",
	        advice: curItem.rptStr_2 ? curItem.rptStr_2.split(/\n/) : "",
	        eating: curItem.rptStr_3 ? curItem.rptStr_3.split(/\n/) : ""
	      });
	    }
	  }
	  return {
	    items: itemArr,
	    level: items.level
	  };
	};

	formatJizhui = function(items, balance) {
	  var children, curItem, i, itemArr, j, limit, ref;
	  itemArr = [];
	  children = items.children;
	  limit = Math.min(children.length, 5);
	  for (i = j = 0, ref = limit; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
	    curItem = children[i];
	    if (curItem.value > balance) {
	      itemArr.push({
	        name: curItem.name,
	        itemId: curItem.itemid.toUpperCase(),
	        intro: curItem.rptStr_1 ? curItem.rptStr_1.split(/\n/) : "",
	        advice: curItem.rptStr_2 ? curItem.rptStr_2.split(/\n/) : ""
	      });
	    }
	  }
	  return {
	    items: itemArr,
	    level: items.level
	  };
	};

	module.exports.filter = function(r) {
	  var res;
	  if (!r) {
	    return '';
	  }
	  res = {
	    id: r.recordid,
	    score: r.score,
	    balance: r.balance,
	    zangfu: formatZangfu(r.fiveElementItems, r.balance),
	    jizhui: formatJizhui(r.vertebraItems, r.balance)
	  };
	  return res;
	};


/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Loading = (function (_React$Component) {
	    _inherits(Loading, _React$Component);

	    function Loading() {
	        _classCallCheck(this, Loading);

	        _get(Object.getPrototypeOf(Loading.prototype), "constructor", this).apply(this, arguments);
	    }

	    _createClass(Loading, [{
	        key: "render",
	        value: function render() {
	            return React.createElement(
	                "div",
	                { className: "loading" },
	                React.createElement("img", { src: "/img/loading.gif" }),
	                React.createElement(
	                    "p",
	                    null,
	                    " ",
	                    this.props.text,
	                    " "
	                )
	            );
	        }
	    }], [{
	        key: "defaultProps",
	        value: {
	            text: "正在加载数据..."
	        },
	        enumerable: true
	    }]);

	    return Loading;
	})(React.Component);

	module.exports = Loading;

/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Banner = (function (_React$Component) {
	    _inherits(Banner, _React$Component);

	    function Banner() {
	        _classCallCheck(this, Banner);

	        _get(Object.getPrototypeOf(Banner.prototype), "constructor", this).apply(this, arguments);
	    }

	    _createClass(Banner, [{
	        key: "render",
	        value: function render() {
	            var _this = this;

	            return React.createElement(
	                "div",
	                { className: "banner" },
	                (function () {
	                    if (_this.props.backUrl) {
	                        return React.createElement("i", { className: "anticon anticon-left left-icon",
	                            onClick: function () {
	                                location.href = _this.props.backUrl;
	                            } });
	                    }
	                })(),
	                React.createElement(
	                    "h2",
	                    null,
	                    this.props.title
	                )
	            );
	        }
	    }], [{
	        key: "propTypes",
	        value: {
	            title: React.PropTypes.string.isRequired,
	            backUrl: React.PropTypes.string
	        },
	        enumerable: true
	    }]);

	    return Banner;
	})(React.Component);

	module.exports = Banner;

/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Icon = (function (_React$Component) {
	    _inherits(Icon, _React$Component);

	    function Icon() {
	        _classCallCheck(this, Icon);

	        _get(Object.getPrototypeOf(Icon.prototype), "constructor", this).apply(this, arguments);
	    }

	    _createClass(Icon, [{
	        key: "render",
	        value: function render() {
	            return React.createElement("img", _extends({ className: "anticon tab-icon", src: this.props.src }, this.props));
	        }
	    }]);

	    return Icon;
	})(React.Component);

	module.exports = Icon;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _ANTD = ANTD;
	var Tabs = _ANTD.Tabs;
	var Banner = __webpack_require__(12);
	var ReportList = __webpack_require__(15);
	var ReportTrade = __webpack_require__(16);
	var Icon = __webpack_require__(13);
	var TabPane = Tabs.TabPane;
	var Reports = (function (_React$Component) {
	    _inherits(Reports, _React$Component);

	    function Reports() {
	        var _this = this;

	        _classCallCheck(this, Reports);

	        _get(Object.getPrototypeOf(Reports.prototype), 'constructor', this).apply(this, arguments);

	        this.state = {
	            tabTitles: ["体检记录", "变化趋势"],
	            currentTab: 0,
	            data: null
	        };

	        this.changeHandler = function (e) {
	            _this.setState({ currentTab: e });
	        };
	    }

	    _createClass(Reports, [{
	        key: 'fetchFailedHandler',
	        value: function fetchFailedHandler() {
	            this.setState({
	                data: []
	            });
	        }
	    }, {
	        key: 'formatData',
	        value: function formatData(list) {
	            var res = {};
	            _(list).sortBy("timestamp").reverse().forEach(function (item) {
	                res[item.id] = item;
	            }).run();
	            return res;
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            var _this2 = this;

	            if (window._reportListData === null) {
	                this.setState({
	                    data: window._reportListData
	                });
	                return;
	            }
	            var url = "/api/history?openId=" + this.props.openId;
	            $.getJSON(url).then(function (res) {
	                console.log(res);
	                if (res.statusCode === 200) {
	                    var data = _this2.formatData(res.data);
	                    window._reportListData = data;
	                    _this2.setState({
	                        data: data
	                    });
	                } else {
	                    _this2.fetchFailedHandler();
	                }
	            }).fail(function (e) {
	                console.error(e);
	                _this2.fetchFailedHandler();
	            });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return React.createElement(
	                'div',
	                { id: 'report-list' },
	                React.createElement(Banner, { title: this.state.tabTitles[this.state.currentTab] }),
	                React.createElement(
	                    'div',
	                    { className: 'bottom-tab-wrapper' },
	                    React.createElement(
	                        Tabs,
	                        { onChange: this.changeHandler },
	                        React.createElement(
	                            TabPane,
	                            { tab: React.createElement(
	                                    'div',
	                                    null,
	                                    React.createElement('i', { className: 'bg-record' }),
	                                    React.createElement(
	                                        'p',
	                                        null,
	                                        this.state.tabTitles[0]
	                                    )
	                                ), key: '0' },
	                            React.createElement(ReportList, { openId: this.props.params.openId, data: this.state.data })
	                        ),
	                        React.createElement(
	                            TabPane,
	                            { tab: React.createElement(
	                                    'div',
	                                    null,
	                                    React.createElement('i', { className: 'bg-trade' }),
	                                    React.createElement(
	                                        'p',
	                                        null,
	                                        this.state.tabTitles[1]
	                                    )
	                                ), key: '1' },
	                            React.createElement(ReportTrade, { openId: this.props.params.openId, data: this.state.data })
	                        )
	                    )
	                )
	            );
	        }
	    }]);

	    return Reports;
	})(React.Component);

	module.exports = Reports;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _ANTD = ANTD;
	var Timeline = _ANTD.Timeline;
	var Alert = _ANTD.Alert;
	var message = _ANTD.message;
	var Loading = __webpack_require__(11);
	var ReportList = (function (_React$Component) {
	    _inherits(ReportList, _React$Component);

	    function ReportList() {
	        var _this = this;

	        _classCallCheck(this, ReportList);

	        _get(Object.getPrototypeOf(ReportList.prototype), "constructor", this).apply(this, arguments);

	        this.clickItem = function (reportId) {
	            location.href = "/reports#/" + _this.props.openId + "/" + reportId;
	        };
	    }

	    _createClass(ReportList, [{
	        key: "render",
	        value: function render() {
	            var _this2 = this;

	            var timeline = [];
	            var data = this.props.data;

	            if (data == null) {
	                timeline = React.createElement(Loading, { text: "正在加载体检记录..." });
	            } else if (data.length == 0) {
	                timeline = React.createElement(Alert, {
	                    message: "没有找到您的体检记录",
	                    type: "info" });
	            } else {
	                timeline = React.createElement(
	                    Timeline,
	                    null,
	                    _.map(data, function (item) {
	                        return React.createElement(
	                            "div",
	                            { onClick: _this2.clickItem.bind(_this2, item.id) },
	                            React.createElement(
	                                Timeline.Item,
	                                { color: "green", key: item.timestamp },
	                                React.createElement(
	                                    "p",
	                                    null,
	                                    item.location,
	                                    React.createElement("div", { className: "arrow1" })
	                                ),
	                                React.createElement(
	                                    "p",
	                                    { className: "timestamp" },
	                                    ReportList.formatTime(item.timestamp * 1000),
	                                    React.createElement("div", { className: "arrow2" })
	                                )
	                            )
	                        );
	                    })
	                );
	            }
	            return React.createElement(
	                "div",
	                { id: "list-timeline" },
	                timeline
	            );
	        }
	    }], [{
	        key: "formatTime",
	        value: function formatTime(t) {
	            var date = new Date(parseInt(t, 10));
	            return date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日 \n" + (_.padLeft(date.getHours(), 2, 0) + ":" + _.padLeft(date.getMinutes(), 2, 0));
	        }
	    }]);

	    return ReportList;
	})(React.Component);

	module.exports = ReportList;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _ANTD = ANTD;
	var Tabs = _ANTD.Tabs;
	var message = _ANTD.message;
	var Alert = _ANTD.Alert;
	var Loading = __webpack_require__(11);
	var Echarts = __webpack_require__(3);
	var HeightWeight = __webpack_require__(17);
	var Blood = __webpack_require__(18);
	var O2 = __webpack_require__(19);
	var Chinese = __webpack_require__(20);
	var Icon = __webpack_require__(13);
	var TabPane = Tabs.TabPane;

	var ReportTrade = (function (_React$Component) {
	    _inherits(ReportTrade, _React$Component);

	    function ReportTrade() {
	        _classCallCheck(this, ReportTrade);

	        _get(Object.getPrototypeOf(ReportTrade.prototype), 'constructor', this).apply(this, arguments);
	    }

	    _createClass(ReportTrade, [{
	        key: 'getHeightWeight',
	        value: function getHeightWeight() {
	            var data = this.props.data.data;

	            if (data !== null) {
	                if (_(data).pluck("height").compact().run().length > 0) {
	                    return React.createElement(HeightWeight, { data: data });
	                } else {
	                    return React.createElement(Alert, { message: '没有您的身体数据', type: 'info' });
	                }
	            } else {
	                return React.createElement(Loading, null);
	            }
	        }
	    }, {
	        key: 'getBlood',
	        value: function getBlood() {
	            var data = this.props.data.data;

	            if (data !== null) {
	                if (_(data).pluck("systolicPressure").compact().run().length > 0) {
	                    return React.createElement(Blood, { data: data });
	                } else {
	                    return React.createElement(Alert, { message: '没有您的血压数据', type: 'info' });
	                }
	            } else {
	                return React.createElement(Loading, null);
	            }
	        }
	    }, {
	        key: 'getO2',
	        value: function getO2() {
	            var data = this.props.data.data;

	            if (data !== null) {
	                if (_(data).pluck("spo2h").compact().run().length > 0) {
	                    return React.createElement(O2, { data: data });
	                } else {
	                    return React.createElement(Alert, { message: '没有您的血氧数据', type: 'info' });
	                }
	            } else {
	                return React.createElement(Loading, null);
	            }
	        }
	    }, {
	        key: 'getChinese',
	        value: function getChinese() {
	            var data = this.props.data.data;

	            if (data !== null) {
	                if (_(data).pluck("cacheScore").compact().run().length > 0) {
	                    return React.createElement(Chinese, { data: data });
	                } else {
	                    return React.createElement(Alert, { message: '没有您的生物电数据', type: 'info' });
	                }
	            } else {
	                return React.createElement(Loading, null);
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return React.createElement(
	                'div',
	                { id: 'report-trade', className: 'top-tab-wrapper' },
	                React.createElement(
	                    Tabs,
	                    { size: 'mini' },
	                    React.createElement(
	                        TabPane,
	                        { tab: '身体', key: '1' },
	                        this.getHeightWeight()
	                    ),
	                    React.createElement(
	                        TabPane,
	                        { tab: '血压', key: '2' },
	                        this.getBlood()
	                    ),
	                    React.createElement(
	                        TabPane,
	                        { tab: '血氧', key: '3' },
	                        this.getO2()
	                    ),
	                    React.createElement(
	                        TabPane,
	                        { tab: '生物电', key: '4' },
	                        this.getChinese()
	                    )
	                )
	            );
	        }
	    }]);

	    return ReportTrade;
	})(React.Component);

	module.exports = ReportTrade;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Echarts = __webpack_require__(3);
	var Tips = __webpack_require__(4);
	var util = __webpack_require__(7);

	var _require = __webpack_require__(5);

	var baseLineOpt = _require.baseLineOpt;

	var HeightWeight = (function (_React$Component) {
	    _inherits(HeightWeight, _React$Component);

	    function HeightWeight() {
	        _classCallCheck(this, HeightWeight);

	        _get(Object.getPrototypeOf(HeightWeight.prototype), 'constructor', this).apply(this, arguments);
	    }

	    _createClass(HeightWeight, [{
	        key: 'formattedData',
	        value: function formattedData() {
	            var res = {
	                xs: [],
	                height: [],
	                weight: []
	            },
	                v = undefined,
	                data = this.props.data;

	            for (var k in data) {
	                v = data[k];
	                if (v.height) {
	                    res.xs.push(util.formatTime(k));
	                    res.height.push(~ ~v.height);
	                    res.weight.push(~ ~v.weight);
	                }
	            }
	            return res;
	        }
	    }, {
	        key: 'getOption',
	        value: function getOption() {
	            var data = this.formattedData();
	            var option = {
	                legend: {
	                    data: ['身高', '体重']
	                },
	                xAxis: [{
	                    type: 'category',
	                    boundaryGap: false,
	                    data: data.xs
	                }],
	                yAxis: [{
	                    name: '身高(cm)',
	                    type: 'value',
	                    max: util.getMax(data.height),
	                    min: util.getMin(data.height)
	                }, {
	                    name: '体重(kg)',
	                    type: 'value',
	                    max: util.getMax(data.weight),
	                    min: util.getMin(data.weight)
	                }],
	                series: [{
	                    name: '身高',
	                    type: 'line',
	                    yAxisIndex: 0,
	                    data: data.height
	                }, {
	                    name: '体重',
	                    type: 'line',
	                    yAxisIndex: 1,
	                    data: data.weight
	                }]
	            };
	            return _.defaults(option, baseLineOpt);
	        }
	    }, {
	        key: 'render',
	        value: function render() {

	            return React.createElement(
	                'div',
	                null,
	                React.createElement(Echarts, { option: this.getOption(), height: '300', width: '100%' }),
	                React.createElement(Tips, { text: '您的体型正常，请继续保持!' })
	            );
	        }
	    }]);

	    return HeightWeight;
	})(React.Component);

	module.exports = HeightWeight;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Echarts = __webpack_require__(3);
	var Tips = __webpack_require__(4);
	var util = __webpack_require__(7);

	var _require = __webpack_require__(5);

	var baseLineOpt = _require.baseLineOpt;

	var Blood = (function (_React$Component) {
	    _inherits(Blood, _React$Component);

	    function Blood() {
	        _classCallCheck(this, Blood);

	        _get(Object.getPrototypeOf(Blood.prototype), 'constructor', this).apply(this, arguments);
	    }

	    _createClass(Blood, [{
	        key: 'formattedData',
	        value: function formattedData() {
	            var res = {
	                xs: [],
	                high: [],
	                low: [],
	                beat: []
	            },
	                v = undefined,
	                data = this.props.data;

	            for (var k in data) {
	                v = data[k];
	                if (v.systolicPressure) {
	                    res.xs.push(util.formatTime(k));
	                    res.high.push(~ ~v.sbp);
	                    res.low.push(~ ~v.dbp);
	                    res.beat.push(~ ~v.heartRate);
	                }
	            }
	            return res;
	        }
	    }, {
	        key: 'getOption',
	        value: function getOption() {
	            var data = this.formattedData();
	            var option = {
	                legend: {
	                    data: ['伸缩压', '舒张压', '心率']
	                },
	                xAxis: [{
	                    type: 'category',
	                    boundaryGap: false,
	                    data: data.xs
	                }],
	                yAxis: [{
	                    name: '血压(mmHg)',
	                    type: 'value',
	                    max: util.getMax(data.high),
	                    min: util.getMin(data.low)
	                }, {
	                    name: '心率(bpm)',
	                    type: 'value',
	                    max: util.getMax(data.beat),
	                    min: util.getMin(data.beat)
	                }],
	                series: [{
	                    name: '伸缩压',
	                    type: 'line',
	                    yAxisIndex: 0,
	                    data: data.high
	                }, {
	                    name: '舒张压',
	                    type: 'line',
	                    yAxisIndex: 0,
	                    data: data.low
	                }, {
	                    name: '心率',
	                    type: 'line',
	                    yAxisIndex: 1,
	                    data: data.beat
	                }]
	            };
	            return _.defaults(option, baseLineOpt);
	        }
	    }, {
	        key: 'render',
	        value: function render() {

	            return React.createElement(
	                'div',
	                null,
	                React.createElement(Echarts, { option: this.getOption(), height: '300', width: '100%' }),
	                React.createElement(Tips, { text: '您的血压正常，请继续保持!' })
	            );
	        }
	    }]);

	    return Blood;
	})(React.Component);

	module.exports = Blood;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Echarts = __webpack_require__(3);
	var Tips = __webpack_require__(4);
	var util = __webpack_require__(7);

	var _require = __webpack_require__(5);

	var baseLineOpt = _require.baseLineOpt;

	var O2 = (function (_React$Component) {
	    _inherits(O2, _React$Component);

	    function O2() {
	        _classCallCheck(this, O2);

	        _get(Object.getPrototypeOf(O2.prototype), 'constructor', this).apply(this, arguments);
	    }

	    _createClass(O2, [{
	        key: 'formattedData',
	        value: function formattedData() {
	            var res = {
	                xs: [],
	                O2: []
	            },
	                v = undefined,
	                data = this.props.data;

	            for (var k in data) {
	                v = data[k];
	                if (v.spo2h) {
	                    res.xs.push(util.formatTime(k));
	                    res.O2.push(~ ~v.spo2h);
	                }
	            }
	            return res;
	        }
	    }, {
	        key: 'getOption',
	        value: function getOption() {
	            var data = this.formattedData();
	            var option = {
	                legend: {
	                    data: ['血氧']
	                },
	                xAxis: [{
	                    type: 'category',
	                    boundaryGap: false,
	                    data: data.xs
	                }],
	                yAxis: [{
	                    name: '血氧(%)',
	                    type: 'value',
	                    max: util.getMax(data.O2),
	                    min: util.getMin(data.O2)
	                }],
	                series: [{
	                    name: '血氧',
	                    type: 'line',
	                    data: data.O2
	                }]
	            };
	            return _.defaults(option, baseLineOpt);
	        }
	    }, {
	        key: 'render',
	        value: function render() {

	            return React.createElement(
	                'div',
	                null,
	                React.createElement(Echarts, { option: this.getOption(), height: '300', width: '100%' }),
	                React.createElement(Tips, { text: '您的血氧正常，请继续保持!' })
	            );
	        }
	    }]);

	    return O2;
	})(React.Component);

	module.exports = O2;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Echarts = __webpack_require__(3);
	var Tips = __webpack_require__(4);
	var util = __webpack_require__(7);

	var _require = __webpack_require__(5);

	var baseLineOpt = _require.baseLineOpt;

	var Chinese = (function (_React$Component) {
	    _inherits(Chinese, _React$Component);

	    function Chinese() {
	        _classCallCheck(this, Chinese);

	        _get(Object.getPrototypeOf(Chinese.prototype), 'constructor', this).apply(this, arguments);
	    }

	    _createClass(Chinese, [{
	        key: 'formattedData',
	        value: function formattedData() {
	            var res = {
	                xs: [],
	                score: []
	            },
	                v = undefined,
	                data = this.props.data;

	            for (var k in data) {
	                v = data[k];
	                if (v.cacheScore) {
	                    res.xs.push(util.formatTime(k));
	                    res.score.push(~ ~v.cacheScore);
	                }
	            }
	            return res;
	        }
	    }, {
	        key: 'getOption',
	        value: function getOption() {
	            var data = this.formattedData();
	            var option = {
	                legend: {
	                    data: ['生物电']
	                },
	                xAxis: [{
	                    type: 'category',
	                    boundaryGap: false,
	                    data: data.xs
	                }],
	                yAxis: [{
	                    name: '得分',
	                    type: 'value',
	                    max: 10,
	                    min: 0
	                }],
	                series: [{
	                    name: '生物电',
	                    type: 'line',
	                    data: data.score
	                }]
	            };
	            return _.defaults(option, baseLineOpt);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return React.createElement(
	                'div',
	                null,
	                React.createElement(Echarts, { option: this.getOption(), height: '300', width: '100%' }),
	                React.createElement(Tips, { text: '您的生物电正常，请继续保持!' })
	            );
	        }
	    }]);

	    return Chinese;
	})(React.Component);

	module.exports = Chinese;

/***/ }
/******/ ]);