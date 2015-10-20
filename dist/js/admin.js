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

	"use strict";

	var _ReactRouter = ReactRouter;
	var Router = _ReactRouter.Router;
	var Route = _ReactRouter.Route;
	var Link = _ReactRouter.Link;
	var Report = __webpack_require__(1);
	var UserList = __webpack_require__(2);

	React.render(React.createElement(
	    Router,
	    null,
	    React.createElement(Route, { path: "/", component: UserList }),
	    React.createElement(Route, { path: "/:openId", component: Report })
	), document.body);

/***/ },
/* 1 */
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

	var ReportList = (function (_React$Component) {
	    _inherits(ReportList, _React$Component);

	    function ReportList() {
	        _classCallCheck(this, ReportList);

	        _get(Object.getPrototypeOf(ReportList.prototype), 'constructor', this).apply(this, arguments);

	        this.state = {
	            dataSource: new Table.DataSource({
	                url: '/admin/report?openId=' + this.props.params.openId,
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

	    _createClass(ReportList, [{
	        key: 'getColumns',
	        value: function getColumns() {
	            var self = this;
	            return [{
	                title: '测量时间',
	                dataIndex: 'timestamp',
	                render: function render(text) {
	                    var date = new Date(text);
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
	                dataIndex: 'bodyFat'
	            }, {
	                title: '血氧',
	                dataIndex: 'spo2h'
	            }, {
	                title: '收缩压',
	                dataIndex: 'sbp'
	            }, {
	                title: '舒张压',
	                dataIndex: 'dbp'
	            }, {
	                title: '心率',
	                dataIndex: 'heartBeat'
	            }, {
	                title: '生物电',
	                dataIndex: 'cacheId',
	                render: function render(text, r) {
	                    if (text) {
	                        return React.createElement(
	                            'span',
	                            null,
	                            r.cacheScore + "分",
	                            React.createElement(
	                                'a',
	                                { style: { paddingLeft: '10px' }, href: '/api/falthReport?id=' + text, target: '_blank' },
	                                '查看详情'
	                            )
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
	                                onConfirm: self.deleteRaw.bind(self, record.id) },
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
	                    return k.id !== id;
	                })
	            });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return React.createElement(Table, { rowSelection: ReportList.rowSelection,
	                rowKey: function (record) {
	                    return record.reportId;
	                },
	                dataSource: this.state.dataSource,
	                columns: this.getColumns(),
	                expandedRowRender: ReportList.expandedRowRender, ref: 'table' });
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

	    return ReportList;
	})(React.Component);

	module.exports = ReportList;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _ANTD = ANTD;
	var Table = _ANTD.Table;
	var Popconfirm = _ANTD.Popconfirm;
	var _ReactRouter = ReactRouter;
	var Link = _ReactRouter.Link;

	var UserList = (function (_React$Component) {
	    _inherits(UserList, _React$Component);

	    function UserList() {
	        _classCallCheck(this, UserList);

	        _get(Object.getPrototypeOf(UserList.prototype), 'constructor', this).apply(this, arguments);

	        this.state = {
	            dataSource: new Table.DataSource({
	                url: '/admin/user',
	                resolve: function resolve(_ref) {
	                    var data = _ref.data;

	                    _.forEach(data, function (obj) {
	                        obj.location = obj.country + ' ' + obj.province + ' ' + obj.city;
	                    });
	                    return data;
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

	    _createClass(UserList, [{
	        key: 'getColumns',
	        value: function getColumns() {
	            var self = this;
	            return [{
	                title: '头像',
	                dataIndex: 'avatarUrl',
	                render: function render(text) {
	                    return React.createElement('img', { src: text, style: { width: '45px' } });
	                }
	            }, {
	                title: '昵称',
	                dataIndex: 'nickname'
	            }, {
	                title: '性别',
	                dataIndex: 'sex',
	                render: function render(text) {
	                    switch (text) {
	                        case '1':
	                            return '男';
	                        case '2':
	                            return '女';
	                        default:
	                            return '-';
	                    }
	                }
	            }, {
	                title: '年龄',
	                dataIndex: 'age',
	                render: function render(text) {
	                    return text || '-';
	                }
	            }, {
	                title: '地点',
	                dataIndex: 'location'
	            }, {
	                title: '关注时间',
	                dataIndex: 'subscribeTime',
	                render: function render(text) {
	                    var date = new Date(text);
	                    return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日 ' + (_.padLeft(date.getHours(), 2, 0) + ':' + _.padLeft(date.getMinutes(), 2, 0));
	                }
	            }, {
	                title: '操作',
	                dataIndex: '',
	                render: function render(text, record) {
	                    return React.createElement(
	                        'span',
	                        null,
	                        React.createElement(
	                            Link,
	                            { to: '/' + record.openId },
	                            '体检记录'
	                        ),
	                        React.createElement('span', { className: 'ant-divider' }),
	                        React.createElement(
	                            Popconfirm,
	                            { placement: 'left', title: '确定要删除这个用户吗？',
	                                onConfirm: self.deleteRaw.bind(self, record.openId) },
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
	        value: function deleteRaw(openId) {
	            var table = this.refs.table;

	            table.setState({
	                data: _.filter(table.state.data, function (k) {
	                    return k.openId !== openId;
	                })
	            });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return React.createElement(Table, { rowSelection: UserList.rowSelection,
	                rowKey: function (record) {
	                    return record.openId;
	                },
	                dataSource: this.state.dataSource,
	                columns: this.getColumns(),
	                expandedRowRender: UserList.expandedRowRender, ref: 'table' });
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

	    return UserList;
	})(React.Component);

	module.exports = UserList;

/***/ }
/******/ ]);