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
/***/ function(module, exports) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _temp;

	function _instanceof(left, right) { if (right != null && right[Symbol.hasInstance]) { return right[Symbol.hasInstance](left); } else { return left instanceof right; } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _super = React.Component;

	var _Echarts = (_temp = (function (_super2) {
	    _inherits(Echarts, _super2);

	    function Echarts() {
	        _classCallCheck(this, Echarts);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Echarts).apply(this, arguments));
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
	            return React.createElement('div', { ref: 'echarts', className: "echarts " + (this.props.className || ''),
	                style: { height: this.props.height + 'px', width: this.props.width } });
	        }
	    }]);

	    return Echarts;
	})(_super), _undefined.propTypes = {
	    option: React.PropTypes.object.isRequired,
	    width: React.PropTypes.any.isRequired,
	    height: React.PropTypes.string,
	    mini: React.PropTypes.bool
	}, _undefined.defaultProps = {
	    width: '100%',
	    height: '500px'
	}, _undefined, _temp);

	var Echarts = function Echarts() {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	    }

	    if (_instanceof(this, Echarts)) {
	        return Reflect.construct(_Echarts, args);
	    } else {
	        return _super.apply(this, args);
	    }
	};

	Echarts.__proto__ = _Echarts;

	module.exports = Echarts;

/***/ }
/******/ ]);