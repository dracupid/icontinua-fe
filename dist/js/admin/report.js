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

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _ANTD = ANTD;
	var Table = _ANTD.Table;
	var Popconfirm = _ANTD.Popconfirm;
	var Modal = _ANTD.Modal;

	var ReportPanel = (function (_React$Component) {
	    _inherits(ReportPanel, _React$Component);

	    function ReportPanel() {
	        _classCallCheck(this, ReportPanel);

	        _get(Object.getPrototypeOf(ReportPanel.prototype), 'constructor', this).apply(this, arguments);

	        this.state = {
	            dataSource: new Table.DataSource({
	                url: '/admin/data/report' + location.search,
	                resolve: function resolve(result) {
	                    return result;
	                },
	                getPagination: function getPagination(result) {},
	                getParams: function getParams(pagination, filters, sorter) {}
	            })
	        };
	        this.rowSelection = {
	            onSelect: function onSelect(record, selected, selectedRows) {
	                console.log(record, selected, selectedRows);
	            },
	            onSelectAll: function onSelectAll(selected, selectedRows) {
	                console.log(selected, selectedRows);
	            }
	        };
	    }

	    _createClass(ReportPanel, [{
	        key: 'getColumns',
	        value: function getColumns() {
	            var self = this;
	            return [{
	                title: '测量时间',
	                dataIndex: 'timestamp',
	                render: function render(text) {
	                    var date = new Date(text * 1000);
	                    return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日 ' + (_.padLeft(date.getHours(), 2, 0) + ':' + _.padLeft(date.getMinutes(), 2, 0));
	                }
	            }, {
	                title: '身高',
	                dataIndex: 'height'
	            }, {
	                title: '体重',
	                dataIndex: 'weight'
	            }, {
	                title: '体脂率',
	                dataIndex: 'bodyFatRate'
	            }, {
	                title: '血氧',
	                dataIndex: 'spo2h'
	            }, {
	                title: '收缩压',
	                dataIndex: 'systolicPressure'
	            }, {
	                title: '舒张压',
	                dataIndex: 'diastolicPressure'
	            }, {
	                title: '心率',
	                dataIndex: 'beatsPerMinute'
	            }, {
	                title: '生物电',
	                dataIndex: 'cacheId',
	                render: function render(text) {
	                    if (text) {
	                        return React.createElement(
	                            'a',
	                            { href: '/api/falthReport?id=' + text, target: '_blank' },
	                            '查看详情'
	                        );
	                    } else {
	                        return '';
	                    }
	                }
	            }, {
	                title: '操作',
	                dataIndex: '',
	                render: function render(text, record) {
	                    return React.createElement(
	                        'span',
	                        null,
	                        React.createElement(
	                            Popconfirm,
	                            { placement: 'left', title: '确定要删除这条测量记录吗？',
	                                onConfirm: self.deleteRaw.bind(self, record.reportId) },
	                            React.createElement(
	                                'a',
	                                { href: 'javascript:;' },
	                                '删除'
	                            )
	                        )
	                    );
	                }
	            }];
	        }
	    }, {
	        key: 'deleteRaw',
	        value: function deleteRaw(id) {
	            var table = this.refs.table;

	            table.setState({
	                data: _.filter(table.state.data, function (k) {
	                    return k.reportId !== id;
	                })
	            });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return React.createElement(Table, { rowSelection: ReportPanel.rowSelection,
	                rowKey: function (record) {
	                    return record.reportId;
	                },
	                dataSource: this.state.dataSource,
	                columns: this.getColumns(),
	                expandedRowRender: ReportPanel.expandedRowRender, ref: 'table' });
	        }
	    }], [{
	        key: 'expandedRowRender',
	        value: function expandedRowRender(record) {
	            return React.createElement(
	                'pre',
	                null,
	                React.createElement(
	                    'code',
	                    null,
	                    JSON.stringify(record, null, '  ')
	                )
	            );
	        }
	    }]);

	    return ReportPanel;
	})(React.Component);

	React.render(React.createElement(ReportPanel, null), document.body);

/***/ }
/******/ ]);