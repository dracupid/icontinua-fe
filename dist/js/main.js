!function(e){function t(a){if(n[a])return n[a].exports;var r=n[a]={exports:{},id:a,loaded:!1};return e[a].call(r.exports,r,r.exports,t),r.loaded=!0,r.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}var r=n(3),o=a(r),i=n(16),c=a(i);n(15);var l=ReactRouter,u=l.Router,s=l.Route;window._reportData={},window._reportListData=null,window._chineseReportData={},window._advice=null,function(){var e=function(e){var t=new window.Image;t.src=e};e("/img/record.png"),e("/img/trade.png"),e("/img/trade-a.png"),e("/img/body.png"),e("/img/wave.png")}(),ReactDOM.render(React.createElement(u,null,React.createElement(s,{path:"/",component:c["default"]}),React.createElement(s,{path:"/:openId",component:c["default"]}),React.createElement(s,{path:"/share/:reportId",component:o["default"]}),React.createElement(s,{path:"/:openId/:reportId",component:o["default"]})),document.getElementById("main"))},,,function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var c=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}();Object.defineProperty(t,"__esModule",{value:!0});var l=n(4),u=a(l),s=n(9),p=a(s),f=n(11),d=a(f),m=n(12),h=a(m),y=n(6),b=a(y),v=n(14),g=a(v),R=n(15),w=a(R),E=ANTD,O=E.Tabs,T=E.Alert,j=O.TabPane,x=function(e){function t(e){r(this,t);var n=o(this,Object.getPrototypeOf(t).call(this,e));return n.state={title:"体检报告",report:{},loaded:!1},n}return i(t,e),c(t,[{key:"fetchFailedHandler",value:function(){this.setState({title:"体检报告",loaded:!0})}},{key:"componentDidMount",value:function(){var e=this,n=$.Deferred().resolve();null==window._advice&&(n=$.getJSON("/data/advice.json").then(function(e){window._advice=e}).fail(function(t){console.error(t),e.fetchFailedHandler()})),n.then(function(){var n=e.props.params.reportId;return _.isEmpty(window._reportData[n])?void $.getJSON("/api/report?diagnose=true&reportId="+n).then(function(a){console.log(a),200===a.status?(window._reportData[n]={title:t.formatTime(a.data.timestamp),report:a.data},e.setState({title:t.formatTime(a.data.timestamp),report:a.data,loaded:!0})):e.fetchFailedHandler()}).fail(function(t){console.error(t),e.fetchFailedHandler()}):void e.setState({title:t.formatTime(window._reportData[n].timestamp),report:window._reportData[n],loaded:!0})})}},{key:"getHeightWeight",value:function(){var e=this.state.report,t=e.height,n=e.weight;return this.state.loaded?t&&n?React.createElement(u["default"],this.state.report):React.createElement(T,{message:"没有您的身体数据",type:"info",showIcon:!0}):React.createElement(b["default"],null)}},{key:"getBlood",value:function(){var e=this.state.report,t=e.sbp,n=e.dbp,a=e.heartRate,r=e.result;return this.state.loaded?t&&n?React.createElement(p["default"],{high:~~t,low:~~n,beat:~~a,resultHigh:r.sbp,resultLow:r.dbp,resultMain:r.bp}):React.createElement(T,{message:"没有您的血压数据",type:"info",showIcon:!0}):React.createElement(b["default"],null)}},{key:"getO2",value:function(){var e=this.state.report,t=e.spo2h,n=e.result;return this.state.loaded?t?React.createElement(d["default"],{value:~~t,result:n.spo2h}):React.createElement(T,{message:"没有您的血氧数据",type:"info",showIcon:!0}):React.createElement(b["default"],null)}},{key:"getChinese",value:function(){var e=this.state.report.cacheId;return this.state.loaded?e?React.createElement(h["default"],{id:e}):React.createElement(T,{message:"没有您的中医数据",type:"info",showIcon:!0}):React.createElement(b["default"],null)}},{key:"render",value:function(){w["default"].setReport(this.props.params.reportId);var e=this.props.params.openId;return React.createElement("div",{id:"report",className:"top-tab-wrapper"},React.createElement(g["default"],{title:this.state.title,backUrl:e?"/reports#/"+e:null}),React.createElement(O,{size:"mini"},React.createElement(j,{tab:"身体",key:"1"},this.getHeightWeight()),React.createElement(j,{tab:"血压",key:"2"},this.getBlood()),React.createElement(j,{tab:"血氧",key:"3"},this.getO2()),React.createElement(j,{tab:"生物电",key:"4"},this.getChinese())))}}],[{key:"formatTime",value:function(e){if(!e)return"体检报告";var t=new Date(e);return t.getFullYear()+"年"+(t.getMonth()+1)+"月"+t.getDate()+"日"}}]),t}(React.Component);x.propTypes={params:React.PropTypes.object.isRequired},t["default"]=x},function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var c=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}();Object.defineProperty(t,"__esModule",{value:!0});var l=n(5),u=a(l),s=n(7),p=a(s),f=n(8),d=ANTD.Modal.info,m=function(e){function t(){return r(this,t),o(this,Object.getPrototypeOf(t).apply(this,arguments))}return i(t,e),c(t,[{key:"render",value:function(){var e=[],n=this.props.obj;for(var a in n)n[a]&&(window._advice[a]?e.push(React.createElement("div",{className:"key",key:a,onClick:t.info.bind(this,a,window._advice[a]),style:{textDecoration:"underline"}},a)):e.push(React.createElement("div",{className:"key",key:a},a)),e.push(React.createElement("div",{className:"value",key:n[a]},n[a])));for(var r=Math.ceil(e.length/6),o=[],i=0;r>i;i++)o.push(React.createElement("div",{key:i,className:"kv-map flex-"+(i+1)},e.slice(6*i,6*(i+1))));return React.createElement("div",{className:"kv-map-wrapper"},o)}}],[{key:"info",value:function(e,t){d({title:e,content:t,width:"90%"})}}]),t}(React.Component);m.defaultProps={obj:{}},m.propTypes={obj:React.PropTypes.object};var h=function(e){function t(){return r(this,t),o(this,Object.getPrototypeOf(t).apply(this,arguments))}return i(t,e),c(t,[{key:"getWeightOpt",value:function(){var e=this.props,t=e.weight,n=e.height,a=e.result,r=a.BMI.bounds.map(function(e){return e*n*n/1e4}),o=_.round(Math.min(r[0]-10,t-10),-1),i=_.round(Math.max(r[2]+10,t+10),-1);0>o&&(o=0);var c=r.map(function(e){return((e-o)/(i-o)).toFixed(1)});return _.defaultsDeep({series:[{detail:{formatter:"\n\n体重\n{value}KG"},axisLine:{lineStyle:{color:[[c[0],"#DDDF0D"],[c[1],"#55BF3B"],[c[2],"#DDDF0D"],[1,"#DF5353"]]}},data:[{value:t}],min:o,max:i}]},f.baseGaugeOpt)}},{key:"render",value:function(){var e=this.props,t=e.bodyFat,n=e.bodyMuscle,a=e.bodyKcal,r=e.bodyWater,o=e.bodyViscera,i=e.result;return t=t&&t+" %",n=n&&n+" %",a=a&&a+" Kcal",r=r&&r+" %",o=o&&o+" %",this.props.bodyFat&&(t=this.props.bodyFat+"%"),React.createElement("div",null,React.createElement("div",{className:"height-wrapper"},React.createElement("img",{src:"/img/body.png"}),React.createElement("div",{className:"line"}),React.createElement("div",{className:"text"},"身高",React.createElement("br",null),this.props.height,"CM"),React.createElement(m,{obj:{BMI:i.BMI.value.toFixed(1),"体脂":t,"肌肉量":n,"基础代谢率":a,"含水量":r,"内脏脂肪量":o}})),React.createElement(u["default"],{option:this.getWeightOpt(),height:"300",width:"100%"}),React.createElement(p["default"],{text:i.BMI.advice,fix:!0}))}}]),t}(React.Component);h.propTypes={height:React.PropTypes.any.isRequired,weight:React.PropTypes.any.isRequired,bodyFat:React.PropTypes.any,bodyMuscle:React.PropTypes.any,bodyKcal:React.PropTypes.any,bodyWater:React.PropTypes.any,bodyViscera:React.PropTypes.any,result:React.PropTypes.object},t["default"]=h},function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var c=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}();Object.defineProperty(t,"__esModule",{value:!0});var l=n(6),u=a(l);document.body.appendChild(document.createElement("script")).src="/js/lib/echarts.min.js";var s=function(e){function t(){return r(this,t),o(this,Object.getPrototypeOf(t).apply(this,arguments))}return i(t,e),c(t,[{key:"renderChart",value:function(){if(window.echarts){var e=this.props.option,t=window.echarts.init(ReactDOM.findDOMNode(this.refs.echarts),"macarons");t.setOption(e,!0)}}},{key:"componentDidMount",value:function(){this.renderChart()}},{key:"shouldComponentUpdate",value:function(){return!1}},{key:"render",value:function(){return window.echarts?React.createElement("div",{ref:"echarts",className:"echarts "+(this.props.className||""),style:{height:this.props.height+"px",width:this.props.width}}):React.createElement(u["default"],{text:"正在生成图表..."})}}]),t}(React.Component);s.propTypes={option:React.PropTypes.object.isRequired,width:React.PropTypes.any.isRequired,height:React.PropTypes.string.isRequired,className:React.PropTypes.string},s.defaultProps={width:"100%",height:"500px"},t["default"]=s},function(e,t){"use strict";function n(e){return React.createElement("div",{className:"loading"},React.createElement(r,{size:"large"}),React.createElement("p",{style:{fontSize:14,marginTop:10}}," ",e.text||"数据加载中..."," "))}Object.defineProperty(t,"__esModule",{value:!0});var a=ANTD,r=a.Spin;n.propTypes={text:React.PropTypes.string},t["default"]=n},function(e,t){"use strict";function n(e){return React.createElement("div",{className:"report-tip-block"+(e.fix?" fix":"")},React.createElement("h2",null,"建议"),React.createElement("div",{className:"tip-text"},e.text||""))}Object.defineProperty(t,"__esModule",{value:!0}),n.propTypes={fix:React.PropTypes.bool,text:React.PropTypes.string},t["default"]=n},function(e,t){e.exports.baseGaugeOpt={series:[{type:"gauge",clickable:!1,pointer:{width:4},detail:{textStyle:{fontSize:20,fontWeight:700,color:"#666"},offsetCenter:["0%","10%"]},splitLine:{length:20},axisLine:{lineStyle:{width:10}},startAngle:200,endAngle:-20}]},e.exports.baseLineOpt={tooltip:{trigger:"axis"},dataZoom:{type:"inside",start:50,end:100},toolbox:{show:!1},calculable:!0,grid:{x:40,x2:30}}},function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var c=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}();Object.defineProperty(t,"__esModule",{value:!0});var l=n(5),u=a(l),s=n(7),p=a(s),f=n(10),d=a(f),m=n(8),h=function(e){function t(){return r(this,t),o(this,Object.getPrototypeOf(t).apply(this,arguments))}return i(t,e),c(t,[{key:"_getOpt",value:function(e,t,n,a,r,o){var i=d["default"].getMin([e],10,r),c=d["default"].getMax([e],10,o),l=a.map(function(e){return(e-i)/(c-i)});return _.defaultsDeep({series:[{detail:{formatter:"{value} "+n},axisLine:{lineStyle:{color:[[l[0],"#DDDF0D"],[l[1],"#55BF3B"],[l[2],"#DDDF0D"],[1,"#DF5353"]]}},data:[{value:e,name:t}],min:i,max:c}]},m.baseGaugeOpt)}},{key:"render",value:function(){var e=this.props,t=e.resultLow,n=e.resultHigh,a=e.resultMain,r="200%",o="300";return React.createElement("div",{className:"blood-tab"},React.createElement("div",{className:"flex-box"},React.createElement("div",{className:"echart-mini-wrapper"},React.createElement("div",{style:{position:"relative"}},React.createElement(u["default"],{option:this._getOpt(this.props.high,"收缩压","mmHg",n.bounds,60,160,!0),height:o,width:r,className:"mini top-left"}))),React.createElement("div",{className:"echart-mini-wrapper"},React.createElement("div",{style:{position:"relative"}},React.createElement(u["default"],{option:this._getOpt(this.props.low,"舒张压","mmHg",t.bounds,40,120,!0),height:o,width:r,className:"mini top-right"})))),React.createElement(u["default"],{option:this._getOpt(this.props.beat,"心率","bpm",[60,100,120],40,140),height:"300",className:"bottom-echart"}),React.createElement(p["default"],{text:a.advice,fix:!0}))}}]),t}(React.Component);h.propTypes={resultLow:React.PropTypes.object.isRequired,resultHigh:React.PropTypes.object.isRequired,resultMain:React.PropTypes.object.isRequired,high:React.PropTypes.number.isRequired,low:React.PropTypes.number.isRequired,beat:React.PropTypes.number.isRequired},t["default"]=h},function(e,t){e.exports={getMin:function(e,t,n){var a,r;return null==t&&(t=5),null==n&&(n=1/0),a=_.map(e,function(e){return e-t}),a.push(n),r=_.round(_.min(a),-1),0>r&&(r=0),r},getMax:function(e,t,n){var a;return null==t&&(t=5),null==n&&(n=-1),a=_.map(e,function(e){return e+t}),a.push(n),_.round(_.max(a),-1)},formatTime:function(e){return e=new Date(e),e.getFullYear()+"/"+(e.getMonth()+1)+"/"+e.getDate()}}},function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}function r(e){var t=e.result,n=t.advice,a=t.result,r="spo2h-report"+("NORMAL"===a?"":" alert");return React.createElement("div",null,React.createElement("div",{className:r},React.createElement("div",{className:"flex-box"},React.createElement("p",null,"SpO",React.createElement("span",{className:"sub"},"2"),"%"),React.createElement("p",null,e.value,"%")),React.createElement("img",{src:"/img/wave.png"})),React.createElement(i["default"],{text:n}))}Object.defineProperty(t,"__esModule",{value:!0});var o=n(7),i=a(o);r.propTypes={result:React.PropTypes.object.isRequired,value:React.PropTypes.number},t["default"]=r},function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},l=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}();Object.defineProperty(t,"__esModule",{value:!0});var u=n(13),s=n(6),p=a(s),f=ANTD,d=f.Affix,m=f.Alert,h=function(e){function t(){return r(this,t),o(this,Object.getPrototypeOf(t).apply(this,arguments))}return i(t,e),l(t,[{key:"render",value:function(){var e=this.props,t=e.title,n=e.level,a=e.items,r=(0,u.getStarLevel)(n),o=_.pluck(a,"name").join("，"),i=a.map(function(e,t){var n=function(){return e.intro?React.createElement("div",{className:"block"},React.createElement("h3",{className:"title"},"【简介】"),React.createElement("div",{className:"content"},e.intro)):void 0}(),a=function(){return e.advice?React.createElement("div",{className:"block"},React.createElement("h3",{className:"title"},"【调理建议】"),React.createElement("ol",{className:"content"},e.advice.map(function(e,t){return React.createElement("li",{key:t}," ",e," ")}))):void 0}(),r=function(){return e.eating?React.createElement("div",{className:"block"},React.createElement("h3",{className:"title"},"【饮食建议】"),React.createElement("div",{className:"content"},e.eating)):void 0}();return React.createElement("div",{key:t},React.createElement("h3",{className:"name"},e.name),n,a,r)}),c=new Array(r),l=new Array(5-r),s=React.createElement("div",{className:"star on"}),p=React.createElement("div",{className:"star off"});return _.fill(c,s),_.fill(l,p),React.createElement("div",{className:"chinese-report-block"},React.createElement("div",{className:"report-header"},React.createElement("h1",{className:"title"},"您的"+t),React.createElement("div",{className:"status"},t+"状况: "+(0,u.getLevelText)(n)),React.createElement("div",{className:"stars"},React.createElement("h4",null,"您的"+t+"为: "),c.concat(l)),React.createElement("h4",null,"建议您注意:"),o),React.createElement("div",{className:"report-body"},i))}}]),t}(React.Component);h.propTypes={title:React.PropTypes.string.isRequired,level:React.PropTypes.number.isRequired,items:React.PropTypes.object.isRequired};var y=function(e){function t(){return r(this,t),o(this,Object.getPrototypeOf(t).apply(this,arguments))}return i(t,e),l(t,[{key:"render",value:function(){var e=this.props,t=e.zangfu,n=e.jizhui,a=e.xiaohua,r=e.miniao,o={"脏腑":t,"脊椎":n,"消化":a,"泌尿":r},i=_.map(o,function(e,t){return React.createElement("div",{className:"kv",key:t},React.createElement("span",{className:"key"},t),React.createElement("span",{className:"value"},parseFloat(e).toFixed(1)))});return React.createElement("div",{className:"c-kv-map"},i)}}]),t}(React.Component);y.propTypes={zangfu:React.PropTypes.number.isRequired,jizhui:React.PropTypes.number.isRequired,xiaohua:React.PropTypes.number.isRequired,miniao:React.PropTypes.number.isRequired};var b=function(e){function t(e){r(this,t);var n=o(this,Object.getPrototypeOf(t).call(this,e));return n.state={data:null,loaded:!1},n}return i(t,e),l(t,[{key:"fetchFailedHandler",value:function(){this.setState({data:null,loaded:!0})}},{key:"componentDidMount",value:function(){var e=this,t=this.props.id;if(!_.isEmpty(window._chineseReportData[t]))return void this.setState({data:window._chineseReportData[t],loaded:!0});var n="/api/falthReport?id="+t;$.getJSON(n).then(function(n){console.log(n),window._chineseReportData[t]=n,e.setState({data:n,loaded:!0})}).fail(function(t){console.error(t),e.fetchFailedHandler()})}},{key:"render",value:function(){if(this.state.loaded){if(null===this.state.data)return React.createElement(m,{message:"没有您的生物电数据",type:"info",showIcon:!0});var e=(0,u.filter)(this.state.data);return React.createElement("div",{style:{marginBottom:"20px"}},React.createElement(d,null,React.createElement(y,e.scores)),React.createElement(h,c({title:"脏腑"},e.zangfu)),React.createElement(h,c({title:"脊椎"},e.jizhui)))}return React.createElement(p["default"],null)}}]),t}(React.Component);b.propTypes={id:React.PropTypes.string.isRequired},t["default"]=b},function(e,t){var n,a,r;n=5,e.exports.getStarLevel=function(e){return Math.ceil(e/2)},e.exports.getLevelText=function(e){return e>8&&10>=e?"优秀":e>6?"良好":e>2?"一般":"差"},r=function(e,t){var a,r,o,i,c,l;for(i=[],a=e.children,l=Math.min(a.length,n),o=0,c=a.length;c>o;o++)r=a[o],r.value>t&&i.push({name:r.name,intro:r.rptStr_1?r.rptStr_1.split(/\n/):"",advice:r.rptStr_2?r.rptStr_2.split(/\n/):"",eating:r.rptStr_3?r.rptStr_3.split(/\n/):""});return{items:i.slice(0,l),level:e.level}},a=function(e,t){var a,r,o,i,c,l;for(i=[],a=e.children,l=Math.min(a.length,n),o=0,c=a.length;c>o;o++)r=a[o],r.value>t&&i.push({name:r.name,itemId:r.itemid.toUpperCase(),intro:r.rptStr_1?r.rptStr_1.split(/\n/):"",advice:r.rptStr_2?r.rptStr_2.split(/\n/):""});return{items:i.slice(0,l),level:e.level}},e.exports.filter=function(e){var t;return e?t={id:e.recordid,score:e.score,balance:e.balance,zangfu:r(e.fiveElementItems,e.balance),jizhui:a(e.vertebraItems,e.balance),scores:e.scores}:""}},function(e,t){"use strict";function n(e){return React.createElement("div",{className:"banner"},function(){return e.backUrl?React.createElement("a",{href:e.backUrl,style:{color:"inherit"}},React.createElement("i",{className:"anticon anticon-left left-icon"})):void 0}(),React.createElement("h2",null,e.title))}Object.defineProperty(t,"__esModule",{value:!0}),n.propTypes={title:React.PropTypes.string.isRequired,backUrl:React.PropTypes.string},t["default"]=n},function(e,t){e.exports={setReport:function(){}}},function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var c=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}();Object.defineProperty(t,"__esModule",{value:!0});var l=n(14),u=a(l),s=n(17),p=a(s),f=n(18),d=a(f),m=ANTD,h=m.Tabs,y=h.TabPane,b=function(e){function t(e){r(this,t);var n=o(this,Object.getPrototypeOf(t).call(this,e));return n.state={tabTitles:["体检记录","变化趋势"],currentTab:0,data:null},n}return i(t,e),c(t,[{key:"fetchFailedHandler",value:function(){this.setState({data:[]})}},{key:"formatData",value:function(e){var t={};return _(e).sortBy("timestamp").reverse().forEach(function(e){t[e.id]=e}).run(),t}},{key:"componentDidMount",value:function(){var e=this;if(null!==window._reportListData)return void this.setState({data:window._reportListData});var t="/api/history?diagnose=true&openId="+this.props.params.openId;$.getJSON(t).then(function(t){if(console.log(t),200===t.status){var n=e.formatData(t.data);window._reportListData=n,_.forEach(n,function(e){window._reportData[e.id]=e}),e.setState({data:n})}else e.fetchFailedHandler()}).fail(function(t){console.error(t),e.fetchFailedHandler()})}},{key:"changeHandler",value:function(e){return this.setState({currentTab:e}),!0}},{key:"render",value:function(){return React.createElement("div",{id:"report-list"},React.createElement(u["default"],{title:this.state.tabTitles[this.state.currentTab]}),React.createElement("div",{className:"bottom-tab-wrapper"},React.createElement(h,{onChange:this.changeHandler.bind(this),activeKey:this.state.currentTab+""},React.createElement(y,{tab:React.createElement("div",null,React.createElement("i",{className:"bg-record"}),React.createElement("p",null,this.state.tabTitles[0])),key:"0"},React.createElement(p["default"],{openId:this.props.params.openId,data:this.state.data})),React.createElement(y,{tab:React.createElement("div",null,React.createElement("i",{className:"bg-trade"}),React.createElement("p",null,this.state.tabTitles[1])),key:"1"},React.createElement(d["default"],{openId:this.props.params.openId,data:this.state.data})))))}}]),t}(React.Component);b.propTypes={params:React.PropTypes.object.isRequired},t["default"]=b},function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var c=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}();Object.defineProperty(t,"__esModule",{value:!0});var l=n(6),u=a(l),s=ANTD,p=s.Alert,f=function(e){function t(){return r(this,t),o(this,Object.getPrototypeOf(t).apply(this,arguments))}return i(t,e),c(t,[{key:"clickItem",value:function(e){window.location.href="/reports#/"+this.props.openId+"/"+e}},{key:"render",value:function(){var e=this,n=[],a=this.props.data;return null===a?n=React.createElement(u["default"],{text:"正在加载体检记录..."}):0===Object.keys(a).length?n=React.createElement(p,{message:"没有找到您的体检记录",type:"info",showIcon:!0}):!function(){var r=0;n=React.createElement("ul",{className:"timeline-wrapper"},_.map(a,function(n){return r+=1,React.createElement("li",{className:"timeline-item",onClick:e.clickItem.bind(e,n.id),key:n.timestamp},React.createElement("p",{className:"timestamp"},t.formatTime(n.timestamp),React.createElement("span",{className:"arrow2"})),React.createElement("div",{className:"timeline-item-middle"},React.createElement("div",{className:"timeline-item-tail"}),React.createElement("div",{className:"timeline-item-id"},r)),React.createElement("div",{className:"timeline-item-content"},React.createElement("span",{className:"arrow1"}),n.location||"未知"))}))}(),React.createElement("div",{id:"list-timeline"},n)}}],[{key:"formatTime",value:function(e){var t=new Date(parseInt(e,10));return t.getFullYear()+"年"+(t.getMonth()+1)+"月"+t.getDate()+"日 \n"+(_.padLeft(t.getHours(),2,0)+":"+_.padLeft(t.getMinutes(),2,0))}}]),t}(React.Component);f.propTypes={openId:React.PropTypes.string.isRequired,data:React.PropTypes.object},t["default"]=f},function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var c=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}();Object.defineProperty(t,"__esModule",{value:!0});var l=n(19),u=a(l),s=n(20),p=a(s),f=n(21),d=a(f),m=n(22),h=a(m),y=n(6),b=a(y),v=ANTD,g=v.Tabs,R=v.Alert,w=g.TabPane,E=function(e){function t(){return r(this,t),o(this,Object.getPrototypeOf(t).apply(this,arguments))}return i(t,e),c(t,[{key:"getHeightWeight",value:function(){var e=this.props.data;return null!==e?_(e).pluck("height").compact().run().length>0?React.createElement(u["default"],{data:e}):React.createElement(R,{message:"没有您的身体数据",type:"info",showIcon:!0}):React.createElement(b["default"],null)}},{key:"getBlood",value:function(){var e=this.props.data;return null!==e?_(e).pluck("sbp").compact().run().length>0?React.createElement(p["default"],{data:e}):React.createElement(R,{message:"没有您的血压数据",type:"info",showIcon:!0}):React.createElement(b["default"],null)}},{key:"getO2",value:function(){var e=this.props.data;return null!==e?_(e).pluck("spo2h").compact().run().length>0?React.createElement(d["default"],{data:e}):React.createElement(R,{message:"没有您的血氧数据",type:"info",showIcon:!0}):React.createElement(b["default"],null)}},{key:"getChinese",value:function(){var e=this.props.data;return null!==e?_(e).pluck("cacheScore").compact().run().length>0?React.createElement(h["default"],{data:e}):React.createElement(R,{message:"没有您的生物电数据",type:"info",showIcon:!0}):React.createElement(b["default"],null)}},{key:"render",value:function(){return React.createElement("div",{id:"report-trade",className:"top-tab-wrapper"},React.createElement(g,{size:"mini"},React.createElement(w,{tab:"身体",key:"1"},this.getHeightWeight()),React.createElement(w,{tab:"血压",key:"2"},this.getBlood()),React.createElement(w,{tab:"血氧",key:"3"},this.getO2()),React.createElement(w,{tab:"生物电",key:"4"},this.getChinese())))}}]),t}(React.Component);E.propTypes={data:React.PropTypes.array.isRequired},t["default"]=E},function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var c=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}();Object.defineProperty(t,"__esModule",{value:!0});var l=n(5),u=a(l),s=n(7),p=(a(s),n(10)),f=a(p),d=n(8),m=function(e){function t(){return r(this,t),o(this,Object.getPrototypeOf(t).apply(this,arguments))}return i(t,e),c(t,[{key:"formattedData",value:function(){var e={xs:[],height:[],weight:[]},t=void 0,n=this.props.data;for(var a in n)t=n[a],t.height&&(e.xs.unshift(f["default"].formatTime(t.timestamp)),e.height.unshift(parseFloat(t.height)),e.weight.unshift(parseFloat(t.weight)));return e}},{key:"getOption",value:function(){var e=this.formattedData(),t={legend:{data:["身高","体重"]},xAxis:[{type:"category",boundaryGap:!1,data:e.xs}],yAxis:[{name:"身高(cm)",type:"value",max:f["default"].getMax(e.height),min:f["default"].getMin(e.height)},{name:"体重(kg)",type:"value",max:f["default"].getMax(e.weight),min:f["default"].getMin(e.weight)}],series:[{name:"身高",type:"line",yAxisIndex:0,data:e.height},{name:"体重",type:"line",yAxisIndex:1,data:e.weight}]};return _.defaults(t,d.baseLineOpt)}},{key:"render",value:function(){return React.createElement("div",null,React.createElement(u["default"],{
option:this.getOption(),height:"300",width:"100%"}))}}]),t}(React.Component);m.propTypes={data:React.PropTypes.array.isRequired},t["default"]=m},function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var c=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}();Object.defineProperty(t,"__esModule",{value:!0});var l=n(5),u=a(l),s=n(7),p=(a(s),n(10)),f=a(p),d=n(8),m=function(e){function t(){return r(this,t),o(this,Object.getPrototypeOf(t).apply(this,arguments))}return i(t,e),c(t,[{key:"formattedData",value:function(){var e={xs:[],high:[],low:[],beat:[]},t=void 0,n=this.props.data;for(var a in n)t=n[a],t.sbp&&(e.xs.unshift(f["default"].formatTime(t.timestamp)),e.high.unshift(~~t.sbp),e.low.unshift(~~t.dbp),e.beat.unshift(~~t.heartRate));return e}},{key:"getOption",value:function(){var e=this.formattedData(),t={legend:{data:["伸缩压","舒张压","心率"]},xAxis:[{type:"category",boundaryGap:!1,data:e.xs}],yAxis:[{name:"血压(mmHg)",type:"value",max:f["default"].getMax(e.high),min:f["default"].getMin(e.low)},{name:"心率(bpm)",type:"value",max:f["default"].getMax(e.beat),min:f["default"].getMin(e.beat)}],series:[{name:"伸缩压",type:"line",yAxisIndex:0,data:e.high},{name:"舒张压",type:"line",yAxisIndex:0,data:e.low},{name:"心率",type:"line",yAxisIndex:1,data:e.beat}]};return _.defaults(t,d.baseLineOpt)}},{key:"render",value:function(){return React.createElement("div",null,React.createElement(u["default"],{option:this.getOption(),height:"300",width:"100%"}))}}]),t}(React.Component);m.propTypes={data:React.PropTypes.array.isRequired},t["default"]=m},function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var c=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}();Object.defineProperty(t,"__esModule",{value:!0});var l=n(5),u=a(l),s=n(7),p=(a(s),n(10)),f=a(p),d=n(8),m=function(e){function t(){return r(this,t),o(this,Object.getPrototypeOf(t).apply(this,arguments))}return i(t,e),c(t,[{key:"formattedData",value:function(){var e={xs:[],O2:[]},t=void 0,n=this.props.data;for(var a in n)t=n[a],t.spo2h&&(e.xs.unshift(f["default"].formatTime(t.timestamp)),e.O2.unshift(parseFloat(t.spo2h)));return e}},{key:"getOption",value:function(){var e=this.formattedData(),t={legend:{data:["血氧"]},xAxis:[{type:"category",boundaryGap:!1,data:e.xs}],yAxis:[{name:"血氧(%)",type:"value",max:f["default"].getMax(e.O2),min:f["default"].getMin(e.O2)}],series:[{name:"血氧",type:"line",data:e.O2}]};return _.defaults(t,d.baseLineOpt)}},{key:"render",value:function(){return React.createElement("div",null,React.createElement(u["default"],{option:this.getOption(),height:"300",width:"100%"}))}}]),t}(React.Component);m.propTypes={data:React.PropTypes.array.isRequired},t["default"]=m},function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var c=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}();Object.defineProperty(t,"__esModule",{value:!0});var l=n(5),u=a(l),s=n(7),p=(a(s),n(10)),f=a(p),d=n(8),m=function(e){function t(){return r(this,t),o(this,Object.getPrototypeOf(t).apply(this,arguments))}return i(t,e),c(t,[{key:"formattedData",value:function(){var e={xs:[],score:[]},t=void 0,n=this.props.data;for(var a in n)t=n[a],t.cacheScore&&(e.xs.unshift(f["default"].formatTime(t.timestamp)),e.score.unshift(parseFloat(t.cacheScore)));return e}},{key:"getOption",value:function(){var e=this.formattedData(),t={legend:{data:["生物电"]},xAxis:[{type:"category",boundaryGap:!1,data:e.xs}],yAxis:[{name:"得分",type:"value",max:10,min:0}],series:[{name:"生物电",type:"line",data:e.score}]};return _.defaults(t,d.baseLineOpt)}},{key:"render",value:function(){return React.createElement("div",null,React.createElement(u["default"],{option:this.getOption(),height:"300",width:"100%"}))}}]),t}(React.Component);m.propTypes={data:React.PropTypes.array.isRequired},t["default"]=m}]);