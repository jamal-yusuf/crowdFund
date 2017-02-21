webpackJsonp([1,2],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */
/***/ (function(module, exports) {

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  scopeId,
  cssModules
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  // inject cssModules
  if (cssModules) {
    var computed = options.computed || (options.computed = {})
    Object.keys(cssModules).forEach(function (key) {
      var module = cssModules[key]
      computed[key] = function () { return module }
    })
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__routes__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(38);
__webpack_require__(37);

// here load all our components
// e.g. 
Vue.component('vue-rates', __webpack_require__(41));
// or
// Vue.component('love', {template : '<div> Love is in the air</div'});

//Vue.component('dynamic', require('./components/dynamic'));



var VueApp = new Vue({
    el: '#app',
    router: __WEBPACK_IMPORTED_MODULE_0__routes__["a" /* default */],
    data: {
        somevar: 'YES !!!!!'
    },
    created: function created() {}
});

window.VueApp = VueApp;

function gotoPage(page) {
    __WEBPACK_IMPORTED_MODULE_0__routes__["a" /* default */].push(page);
}

window.gotoPage = gotoPage;



window.Utils = __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* default */];

__webpack_require__(35);

/***/ }),
/* 15 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = {
  data: function data() {
    return { ratesData: {} };
  },

  name: 'vue-rates',
  mounted: function mounted() {
    var _this = this;

    axios.get('//api.fixer.io/latest?base=EUR&symbols=GBP,USD,EUR').then(function (ret) {
      _this.ratesData = ret.data;
    });
  }
};

/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//


var Loading = {
    template: '<div></div>'
};

var render = function render(h, context) {
    var html = context.props.html;
    var dynComponent = {
        name: 'dynamic-server-page-component',
        template: html,
        data: function data() {
            return context.props.data;
        }
    };
    var component = html ? dynComponent : Loading;
    return h(component);
};

var DynamicServerPageComponent = {
    functional: true,
    name: 'dynamic-server-page-component',
    props: {
        html: String,
        data: { type: Object, default: function _default() {} }
    },
    render: render
};

/* harmony default export */ __webpack_exports__["default"] = {
    data: function data() {
        return { path: '', html: '', scripts: '', status: '' };
    },

    name: 'server-page',
    computed: {
        contextData: function contextData() {
            return this.$parent._data;
        }
    },

    components: { DynamicServerPageComponent: DynamicServerPageComponent },
    mounted: function mounted() {
        if (!this.$slots['default']) {
            this.showPage();
        }
    },

    methods: {

        showPage: function showPage() {
            var _this = this;

            var my = this;
            my.path = my.$route.path;
            var target = my.$route.target || my.$route.path;
            var OK = function OK(reply) {
                my.status = reply.status;
                var pageDOM = _this.parsePage(reply.data);
                my.html = pageDOM.html;
                my.scripts = pageDOM.scripts;
                $("html, body").animate({
                    scrollTop: 0
                }, 1);
                if (my.scripts) {
                    eval(my.scripts);
                }
            };
            var BAD = function BAD(error) {
                console.log(error);
                my.html = error.response.data;
                my.status = error.response.status;
            };
            axios.get(target).then(OK).catch(BAD);
        },

        parsePage: function parsePage(html) {
            var page = $.parseHTML($.trim(html), null, true);
            var pureHTML = '';
            var scripts = '';
            var elements = 0;
            $.each(page, function (i, el) {
                if (el.nodeName.toLowerCase() == 'script') {
                    scripts = scripts + el.innerHTML + '\n';
                } else {
                    if (el.outerHTML) {
                        pureHTML = pureHTML + el.outerHTML;
                        elements++;
                    }
                }
            });
            if (elements != 1) pureHTML = '<div>' + pureHTML + '</div>';
            return { html: pureHTML, scripts: scripts };
        }

    },

    watch: {
        '$route': function $route(to, from) {
            this.showPage();
        }
    }
};
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(1)))

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {

$(document).ready(function () {

    $('.carousel').carousel({
        interval: 4200
    });

    $('body').on('hidden', '#login-modal', function () {
        $('.alert').remove();
    });

    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scrollup').fadeIn();
        } else {
            $('.scrollup').fadeOut();
        }
    });

    $('body').on('click', '.scrollup', function () {
        $("html, body").animate({
            scrollTop: 0
        }, 600);
        return false;
    });

    $('body').on('click', '.arrowDown', function () {
        var coord = Utils.getCoordinates('#homeCrowdfunding');
        if (coord) {
            $("body").animate({
                scrollTop: coord.top + window.scrollY
            }, 600);
        }
        return false;
    });

    $(document).ready(function () {

        $('.show-my-tooltip').tooltip({
            'placement': 'bottom'
        });
    });

    $('body').on('click', '.viewallcat', function () {
        $(".allCategories").toggleClass("hideall");
    });
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_router__);



var serverPage = __WEBPACK_IMPORTED_MODULE_0_vue___default.a.component('server-page', __webpack_require__(42));

var routes = [{
	path: '/',
	component: serverPage,
	target: '/page/home'
}, {
	path: '/home',
	component: serverPage,
	target: '/page/home'
}, {
	path: '/homepage',
	component: serverPage,
	target: '/page/home'
}, {

	path: '/page/*',
	component: serverPage

}];

/* harmony default export */ __webpack_exports__["a"] = new __WEBPACK_IMPORTED_MODULE_1_vue_router___default.a({
	routes: routes,
	mode: "history"
});

/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__webpack_provided_window_dot_jQuery) {Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_router__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_axios__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_axios__);

window.$ = __webpack_provided_window_dot_jQuery = __webpack_require__(1);

__webpack_require__(7);





__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_1_vue_router___default.a);

window.Vue = __WEBPACK_IMPORTED_MODULE_0_vue___default.a;
window.VueRouter = __WEBPACK_IMPORTED_MODULE_1_vue_router___default.a;
window.axios = __WEBPACK_IMPORTED_MODULE_2_axios___default.a;

window.axios.defaults.headers.common = {
    'X-CSRF-TOKEN': window.Laravel.csrfToken,
    'X-Requested-With': 'XMLHttpRequest'
};
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(1)))

/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function Utils() {

  "use strict";

  var lastAjaxReply = '';

  function ajaxSynch(url) {
    var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'GET';
    var dataType = arguments[2];
    var data = arguments[3];
    var fnSuccess = arguments[4];
    var fnError = arguments[5];

    var result = '';
    var fnOK = fnSuccess ? function (r) {
      lastAjaxReply = r;fnSuccess(r);result = r;
    } : function (r) {
      lastAjaxReply = r;result = r;
    };
    var fnBAD = fnError ? function (r) {
      lastAjaxReply = r;fnBAD();console.log('Failed to ' + method + ' ' + url);
    } : function (r) {
      lastAjaxReply = r;console.log('Failed to ' + method + ' ' + url);
    };
    var options = {
      type: method,
      url: url,
      data: data,
      success: fnOK,
      error: fnBAD,
      async: false
    };
    if (dataType) {
      options.dataType = dataType;
    }
    // console.log (options);
    $.ajax(options);
    return result;
  }

  function lastResponse() {
    return lastAjaxReply;
  }

  function getJSON(url) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var fnOK = arguments[2];
    var fnBad = arguments[3];

    var ret = ajaxSynch(url, 'GET', 'json', data, fnOK, fnBad);
    var J = ret ? (typeof ret === 'undefined' ? 'undefined' : _typeof(ret)) == 'object' ? ret : JSON.parse(ret) : {};
    return J;
  }

  function postJSON(url) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var fnOK = arguments[2];
    var fnBad = arguments[3];

    var ret = ajaxSynch(url, 'POST', 'json', data, fnOK, fnBad);
    var J = ret ? (typeof ret === 'undefined' ? 'undefined' : _typeof(ret)) == 'object' ? ret : JSON.parse(ret) : {};
    return J;
  }

  function getHTML(url, withData) {
    var html = ajaxSynch(url, 'GET', 'html');
    if (withData) {
      for (var key in withData) {
        var value = withData[key];
        var rex = new RegExp("{{\\s*" + key + "\\s*}}", 'g');
        html = html.replace(rex, value);
      }
    }
    var runit = function runit(match, code) {
      return eval(code);
    };
    var rex = new RegExp("{!!\\s*(.+)\\s!!}", 'g');
    html = html.replace(rex, runit);
    return html;
  }

  function left(str, n) {
    if (n <= 0) return "";else if (n > String(str).length) return str;else return String(str).substring(0, n);
  }

  function right(str, n) {
    if (n <= 0) return "";else if (n > String(str).length) return str;else {
      var iLen = String(str).length;
      return String(str).substring(iLen, iLen - n);
    }
  }

  function strPad(str, maxLen) {
    var padWith = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ' ';

    var toAdd;
    if (maxLen <= 0) toAdd = "";else toAdd = Array(maxLen + 1).join(padWith);
    if (maxLen < String(str).length) maxLen = String(str).length;
    return right(toAdd + str, maxLen);
  }

  function zeroPad(i, n) {
    return strPad(i, n, '0');
  }

  function titleCase(str) {
    return str.split(' ').map(function (val) {
      return val.charAt(0).toUpperCase() + val.substr(1).toLowerCase();
    }).join(' ');
  }

  function firstCap(str) {
    return str.charAt(0).toUpperCase() + str.substr(1);
  }

  function date2string(d) {
    var sep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '/';

    if (!(d instanceof Date)) d = newDate(d);
    var dd = zeroPad(d.getDate(), 2);
    var mm = zeroPad(d.getMonth() + 1, 2);
    var yy = d.getFullYear();
    return [dd, mm, yy].join(sep);
  }

  function renderTable() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var columns = options.columns || [];
    var data = options.data || [];
    var key = options.key || 'id';
    var table = '';
    var thead = '';
    var tbody = '';
    var s = '';
    var cellValue = '',
        colType = '';
    var rowActions = options.rowActions || '';
    if (!columns.length && data.length) {
      for (var field in data[0]) {
        columns.push({ name: field, label: firstCap(field) });
      }
    }
    for (var i = 0; i < columns.length; i++) {
      var col = columns[i];
      colType = '';
      if (typeof col == 'string') {
        s = s + "<th>" + firstCap(col) + "</th>\n";
      } else if ((typeof col === 'undefined' ? 'undefined' : _typeof(col)) == 'object') {
        var colLabel = '';
        colType = columns[i].type;
        if ('label' in col) {
          colLabel = col.label;
        } else if ('name' in col) {
          colLabel = firstCap(col.name);
        }
        if (col.sortable) {
          colLabel = '<span> ' + colLabel + ' <i class="pull-right fa fa-sort"></i></span>';
        }
        var attr = ' name="' + col.name + '" ' + (col.attributes ? ' ' + col.attributes + ' ' : '') + (colType ? ' type="' + colType + '" ' : '');
        s = s + '<th ' + attr + ' >' + colLabel + "</th>\n";
      }
    }
    if (rowActions) s = s + "<th>-</th>";
    thead = "<thead>\n<tr>\n" + s + "</tr>\n</thead>\n";
    s = '';
    for (var i = 0; i < data.length; i++) {
      s = s + '<tr key="' + data[i][key] + '">\n';
      for (var j = 0; j < columns.length; j++) {
        if (typeof columns[j] == 'string') {
          cellValue = data[i][columns[j]];
        } else if (_typeof(columns[j]) == 'object') {
          var field = columns[j].name;
          var value = columns[j].value;
          colType = columns[j].type;
          if (typeof value == 'function') {
            cellValue = columns[j].value(data[i]);
          } else if (typeof value == 'undefined') {
            cellValue = data[i][field];
            if (colType == 'number') {
              cellValue = formatCurrency(cellValue);
              cellValue = '<span class="pull-right"> ' + cellValue + ' </span>';
            } else if (colType == 'date') {
              cellValue = new Date(cellValue);
              cellValue = '<span class="text-center"> ' + date2string(cellValue) + ' </span>';
            }
          } else {
            cellValue = value;
          }
        }
        s = s + '<td>' + cellValue + "</td>\n";
      }
      if (rowActions) {
        s = s + "<td>" + rowActions + "</td>\n";
      }
      s = s + "</tr>\n";
    }
    tbody = "<tbody>\n" + s + "</tbody>\n";
    table = thead + tbody;
    return table;
  }

  function isVisible(node) {
    if (node instanceof HTMLElement) node = $(node);
    if (!(node instanceof $)) node = $(node);
    if (!node.is(':visible')) return false;
    var el = node.first().get(0);
    if (el) {
      var r = el.getBoundingClientRect();
      var w = window.document.body.getBoundingClientRect();
      if (r.right < w.left || r.left > w.right || r.top > w.bottom || r.bottom < w.top) return false;
      return true;
    } else return false;
  }

  function getCoordinates(node) {
    if (node instanceof HTMLElement) node = $(node);
    if (!(node instanceof $)) node = $(node);
    var el = node.first().get(0);
    if (el) {
      var r = el.getBoundingClientRect();
      return r;
    } else return false;
  }

  function formatCurrency(v) {
    if (isNaN(String(v).replace(/,/g, ""))) return '';
    var n = parseFloat(String(v).replace(/,/g, "")).toFixed(2);
    n = n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return n;
  }

  this.getJSON = getJSON;
  this.postJSON = postJSON;
  this.getHTML = getHTML;
  this.right = right;
  this.left = left;
  this.strPad = strPad;
  this.zeroPad = zeroPad;
  this.renderTable = renderTable;
  this.titleCase = titleCase;
  this.firstCap = firstCap;
  this.lastResponse = lastResponse;
  this.isVisible = isVisible;
  this.formatCurrency = formatCurrency;
  this.date2string = date2string;
  this.getCoordinates = getCoordinates;

  // console.log(getHTML('/html/newUpdateEntry', {id : 'new'}))
}

/* harmony default export */ __webpack_exports__["a"] = new Utils();
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(1)))

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(40)();
// imports


// module
exports.push([module.i, "\n.ccyRecord[data-v-5f7a292e] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n}\n.ccyRecord[data-v-5f7a292e]:not(last-child) {\n    padding-left: 35px;\n}\n.ccyRecord div[data-v-5f7a292e]:last-child {\n    padding-left: 3px;\n}\n.ratesTable[data-v-5f7a292e] {\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  position: absolute;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  white-space: nowrap;\n  -webkit-box-pack: left;\n      -ms-flex-pack: left;\n          justify-content: left;\n  color: #000025;\n  margin: 0px;\n  left: 100%;\n  -webkit-animation: mymove 60s 1s infinite linear;\n          animation: mymove 60s 1s infinite linear;\n}\n@-webkit-keyframes mymove {\n0% {\n    left: 100%;\n}\n100% {\n    -webkit-transform: translateX(-100%);\n            transform: translateX(-100%);\n    left: 0%;\n}\n}\n@keyframes mymove {\n0% {\n    left: 100%;\n}\n100% {\n    -webkit-transform: translateX(-100%);\n            transform: translateX(-100%);\n    left: 0%;\n}\n}\n", ""]);

// exports


/***/ }),
/* 40 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(45)

var Component = __webpack_require__(13)(
  /* script */
  __webpack_require__(33),
  /* template */
  __webpack_require__(43),
  /* scopeId */
  "data-v-5f7a292e",
  /* cssModules */
  null
)
Component.options.__file = "/home/panagiotis/workspace/crowdFund/resources/assets/js/components/rates.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] rates.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5f7a292e", Component.options)
  } else {
    hotAPI.reload("data-v-5f7a292e", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(13)(
  /* script */
  __webpack_require__(34),
  /* template */
  __webpack_require__(44),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/panagiotis/workspace/crowdFund/resources/assets/js/components/serverPage.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] serverPage.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-9eea1be8", Component.options)
  } else {
    hotAPI.reload("data-v-9eea1be8", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.ratesData),
      expression: "ratesData"
    }],
    staticClass: "tickerWrap"
  }, [(_vm.ratesData.date) ? _c('div', {
    staticClass: "ratesTable"
  }, [_c('div', [_vm._v(_vm._s(_vm.ratesData.base) + " Rates as of : " + _vm._s(_vm.ratesData.date) + "   ")]), _vm._v(" "), _vm._l((_vm.ratesData.rates), function(rate, ccy) {
    return _c('div', {
      staticClass: "ccyRecord"
    }, [_c('div', [_vm._v(" " + _vm._s(ccy) + " : ")]), _vm._v(" "), _c('div', [_vm._v(" " + _vm._s(rate) + "  ")])])
  })], 2) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-5f7a292e", module.exports)
  }
}

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.html == ''),
      expression: "html==''"
    }]
  }, [_vm._t("default")], 2), _vm._v(" "), (_vm.html) ? _c('dynamic-server-page-component', {
    attrs: {
      "html": _vm.html,
      "data": _vm.contextData
    }
  }) : _vm._e()], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-9eea1be8", module.exports)
  }
}

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(39);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(46)("337a1b0a", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-5f7a292e&scoped=true!./../../../../node_modules/sass-loader/index.js!./../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./rates.vue", function() {
     var newContent = require("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-5f7a292e&scoped=true!./../../../../node_modules/sass-loader/index.js!./../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./rates.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(47)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = { css: css, media: media, sourceMap: sourceMap }
    if (!newStyles[id]) {
      part.id = parentId + ':0'
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      part.id = parentId + ':' + newStyles[id].parts.length
      newStyles[id].parts.push(part)
    }
  }
  return styles
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')
  var hasSSR = styleElement != null

  // if in production mode and style is already provided by SSR,
  // simply do nothing.
  if (hasSSR && isProduction) {
    return noop
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = styleElement || createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (!hasSSR) {
    update(obj)
  }

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 47 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 48 */,
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(14);
module.exports = __webpack_require__(15);


/***/ })
],[49]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9+L3Z1ZS1sb2FkZXIvbGliL2NvbXBvbmVudC1ub3JtYWxpemVyLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvYXBwLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvc2Fzcy9hcHAuc2NzcyIsIndlYnBhY2s6Ly8vcmF0ZXMudnVlIiwid2VicGFjazovLy9zZXJ2ZXJQYWdlLnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3BhZ2VzL2hvbWUuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9yb3V0ZXMuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zdGFydHVwLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL3JhdGVzLnZ1ZT83ZWUwIiwid2VicGFjazovLy8uL34vY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL3JhdGVzLnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvc2VydmVyUGFnZS52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL3JhdGVzLnZ1ZT9jOGVhIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9zZXJ2ZXJQYWdlLnZ1ZT9kYjQzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9yYXRlcy52dWU/NjE2OCIsIndlYnBhY2s6Ly8vLi9+L3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlc0NsaWVudC5qcyIsIndlYnBhY2s6Ly8vLi9+L3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2xpc3RUb1N0eWxlcy5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwiVnVlIiwiY29tcG9uZW50IiwiVnVlQXBwIiwiZWwiLCJyb3V0ZXIiLCJkYXRhIiwic29tZXZhciIsImNyZWF0ZWQiLCJ3aW5kb3ciLCJnb3RvUGFnZSIsInBhZ2UiLCJwdXNoIiwiVXRpbHMiLCIkIiwiZG9jdW1lbnQiLCJyZWFkeSIsImNhcm91c2VsIiwiaW50ZXJ2YWwiLCJvbiIsInJlbW92ZSIsInNjcm9sbCIsInNjcm9sbFRvcCIsImZhZGVJbiIsImZhZGVPdXQiLCJhbmltYXRlIiwiY29vcmQiLCJnZXRDb29yZGluYXRlcyIsInRvcCIsInNjcm9sbFkiLCJ0b29sdGlwIiwidG9nZ2xlQ2xhc3MiLCJzZXJ2ZXJQYWdlIiwicm91dGVzIiwicGF0aCIsInRhcmdldCIsIm1vZGUiLCJ1c2UiLCJWdWVSb3V0ZXIiLCJheGlvcyIsImRlZmF1bHRzIiwiaGVhZGVycyIsImNvbW1vbiIsIkxhcmF2ZWwiLCJjc3JmVG9rZW4iLCJsYXN0QWpheFJlcGx5IiwiYWpheFN5bmNoIiwidXJsIiwibWV0aG9kIiwiZGF0YVR5cGUiLCJmblN1Y2Nlc3MiLCJmbkVycm9yIiwicmVzdWx0IiwiZm5PSyIsInIiLCJmbkJBRCIsImNvbnNvbGUiLCJsb2ciLCJvcHRpb25zIiwidHlwZSIsInN1Y2Nlc3MiLCJlcnJvciIsImFzeW5jIiwiYWpheCIsImxhc3RSZXNwb25zZSIsImdldEpTT04iLCJmbkJhZCIsInJldCIsIkoiLCJKU09OIiwicGFyc2UiLCJwb3N0SlNPTiIsImdldEhUTUwiLCJ3aXRoRGF0YSIsImh0bWwiLCJrZXkiLCJ2YWx1ZSIsInJleCIsIlJlZ0V4cCIsInJlcGxhY2UiLCJydW5pdCIsIm1hdGNoIiwiY29kZSIsImV2YWwiLCJsZWZ0Iiwic3RyIiwibiIsIlN0cmluZyIsImxlbmd0aCIsInN1YnN0cmluZyIsInJpZ2h0IiwiaUxlbiIsInN0clBhZCIsIm1heExlbiIsInBhZFdpdGgiLCJ0b0FkZCIsIkFycmF5Iiwiam9pbiIsInplcm9QYWQiLCJpIiwidGl0bGVDYXNlIiwic3BsaXQiLCJtYXAiLCJ2YWwiLCJjaGFyQXQiLCJ0b1VwcGVyQ2FzZSIsInN1YnN0ciIsInRvTG93ZXJDYXNlIiwiZmlyc3RDYXAiLCJkYXRlMnN0cmluZyIsImQiLCJzZXAiLCJEYXRlIiwibmV3RGF0ZSIsImRkIiwiZ2V0RGF0ZSIsIm1tIiwiZ2V0TW9udGgiLCJ5eSIsImdldEZ1bGxZZWFyIiwicmVuZGVyVGFibGUiLCJjb2x1bW5zIiwidGFibGUiLCJ0aGVhZCIsInRib2R5IiwicyIsImNlbGxWYWx1ZSIsImNvbFR5cGUiLCJyb3dBY3Rpb25zIiwiZmllbGQiLCJuYW1lIiwibGFiZWwiLCJjb2wiLCJjb2xMYWJlbCIsInNvcnRhYmxlIiwiYXR0ciIsImF0dHJpYnV0ZXMiLCJqIiwiZm9ybWF0Q3VycmVuY3kiLCJpc1Zpc2libGUiLCJub2RlIiwiSFRNTEVsZW1lbnQiLCJpcyIsImZpcnN0IiwiZ2V0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwidyIsImJvZHkiLCJib3R0b20iLCJ2IiwiaXNOYU4iLCJwYXJzZUZsb2F0IiwidG9GaXhlZCIsInRvU3RyaW5nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDZEQUE2RDtBQUM3RDtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDOUNBLG1CQUFBQSxDQUFRLEVBQVI7O0FBSUE7QUFDQTtBQUNBQyxJQUFJQyxTQUFKLENBQWMsV0FBZCxFQUEyQixtQkFBQUYsQ0FBUSxFQUFSLENBQTNCO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7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LEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlEQUF5RDtBQUN6RDs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3JPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixpQkFBaUI7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLHdCQUF3QjtBQUMzRCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiIvanMvYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBub3JtYWxpemVDb21wb25lbnQgKFxuICByYXdTY3JpcHRFeHBvcnRzLFxuICBjb21waWxlZFRlbXBsYXRlLFxuICBzY29wZUlkLFxuICBjc3NNb2R1bGVzXG4pIHtcbiAgdmFyIGVzTW9kdWxlXG4gIHZhciBzY3JpcHRFeHBvcnRzID0gcmF3U2NyaXB0RXhwb3J0cyA9IHJhd1NjcmlwdEV4cG9ydHMgfHwge31cblxuICAvLyBFUzYgbW9kdWxlcyBpbnRlcm9wXG4gIHZhciB0eXBlID0gdHlwZW9mIHJhd1NjcmlwdEV4cG9ydHMuZGVmYXVsdFxuICBpZiAodHlwZSA9PT0gJ29iamVjdCcgfHwgdHlwZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGVzTW9kdWxlID0gcmF3U2NyaXB0RXhwb3J0c1xuICAgIHNjcmlwdEV4cG9ydHMgPSByYXdTY3JpcHRFeHBvcnRzLmRlZmF1bHRcbiAgfVxuXG4gIC8vIFZ1ZS5leHRlbmQgY29uc3RydWN0b3IgZXhwb3J0IGludGVyb3BcbiAgdmFyIG9wdGlvbnMgPSB0eXBlb2Ygc2NyaXB0RXhwb3J0cyA9PT0gJ2Z1bmN0aW9uJ1xuICAgID8gc2NyaXB0RXhwb3J0cy5vcHRpb25zXG4gICAgOiBzY3JpcHRFeHBvcnRzXG5cbiAgLy8gcmVuZGVyIGZ1bmN0aW9uc1xuICBpZiAoY29tcGlsZWRUZW1wbGF0ZSkge1xuICAgIG9wdGlvbnMucmVuZGVyID0gY29tcGlsZWRUZW1wbGF0ZS5yZW5kZXJcbiAgICBvcHRpb25zLnN0YXRpY1JlbmRlckZucyA9IGNvbXBpbGVkVGVtcGxhdGUuc3RhdGljUmVuZGVyRm5zXG4gIH1cblxuICAvLyBzY29wZWRJZFxuICBpZiAoc2NvcGVJZCkge1xuICAgIG9wdGlvbnMuX3Njb3BlSWQgPSBzY29wZUlkXG4gIH1cblxuICAvLyBpbmplY3QgY3NzTW9kdWxlc1xuICBpZiAoY3NzTW9kdWxlcykge1xuICAgIHZhciBjb21wdXRlZCA9IG9wdGlvbnMuY29tcHV0ZWQgfHwgKG9wdGlvbnMuY29tcHV0ZWQgPSB7fSlcbiAgICBPYmplY3Qua2V5cyhjc3NNb2R1bGVzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIHZhciBtb2R1bGUgPSBjc3NNb2R1bGVzW2tleV1cbiAgICAgIGNvbXB1dGVkW2tleV0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiBtb2R1bGUgfVxuICAgIH0pXG4gIH1cblxuICByZXR1cm4ge1xuICAgIGVzTW9kdWxlOiBlc01vZHVsZSxcbiAgICBleHBvcnRzOiBzY3JpcHRFeHBvcnRzLFxuICAgIG9wdGlvbnM6IG9wdGlvbnNcbiAgfVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3Z1ZS1sb2FkZXIvbGliL2NvbXBvbmVudC1ub3JtYWxpemVyLmpzXG4vLyBtb2R1bGUgaWQgPSAxM1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJyZXF1aXJlKCcuL3N0YXJ0dXAnKTtcblxuXG5cbi8vIGhlcmUgbG9hZCBhbGwgb3VyIGNvbXBvbmVudHNcbi8vIGUuZy4gXG5WdWUuY29tcG9uZW50KCd2dWUtcmF0ZXMnLCByZXF1aXJlKCcuL2NvbXBvbmVudHMvcmF0ZXMnKSk7XG4vLyBvclxuLy8gVnVlLmNvbXBvbmVudCgnbG92ZScsIHt0ZW1wbGF0ZSA6ICc8ZGl2PiBMb3ZlIGlzIGluIHRoZSBhaXI8L2Rpdid9KTtcblxuLy9WdWUuY29tcG9uZW50KCdkeW5hbWljJywgcmVxdWlyZSgnLi9jb21wb25lbnRzL2R5bmFtaWMnKSk7XG5cbmltcG9ydCByb3V0ZXIgZnJvbSAnLi9yb3V0ZXMnO1xuXG5jb25zdCBWdWVBcHAgPSBuZXcgVnVlKHtcbiAgICBlbDogJyNhcHAnLFxuICAgIHJvdXRlcixcbiAgICBkYXRhOiB7XG4gICAgXHRzb21ldmFyOiAnWUVTICEhISEhJ1xuICAgIH0sXG4gICAgY3JlYXRlZCgpIHsgfVxuICAgIFxufSk7XG5cbndpbmRvdy5WdWVBcHA9VnVlQXBwO1xuXG5mdW5jdGlvbiBnb3RvUGFnZShwYWdlKXtcblx0cm91dGVyLnB1c2gocGFnZSk7XG59XG5cbndpbmRvdy5nb3RvUGFnZT1nb3RvUGFnZTtcblxuXG5pbXBvcnQgVXRpbHMgZnJvbSAnLi91dGlscyc7XG5cbndpbmRvdy5VdGlscz1VdGlscztcblxucmVxdWlyZSgnLi9wYWdlcy9ob21lJyk7XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvYXBwLmpzIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvc2Fzcy9hcHAuc2Nzc1xuLy8gbW9kdWxlIGlkID0gMTVcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiLyogXG5cblx0RXhwZWN0cyBhIHByb3BlcnR5IG5hbWVkIHJhdGVzZGF0YSBpbiB0aGUgZm9ybSB7IGJhc2U6IGJhc2VDQ1ksIGRhdGU6IGRhdGUsIHJhdGVzOiB7Y2N5MTpyYXRlMSwgY2MyOnJhdGUyIC4uLn0gfVxuXG5cbiovXG5cbjx0ZW1wbGF0ZT5cbjxkaXYgY2xhc3M9J3RpY2tlcldyYXAnIHYtc2hvdz0ncmF0ZXNEYXRhJz5cblx0PGRpdiB2LWlmPSdyYXRlc0RhdGEuZGF0ZScgY2xhc3M9J3JhdGVzVGFibGUnPiAgXG5cdFx0PGRpdj57e3JhdGVzRGF0YS5iYXNlfX0gUmF0ZXMgYXMgb2YgOiB7e3JhdGVzRGF0YS5kYXRlfX0gICA8L2Rpdj4gXG5cdFx0PGRpdiBjbGFzcz0nY2N5UmVjb3JkJyB2LWZvcj0nKHJhdGUsY2N5KSBpbiByYXRlc0RhdGEucmF0ZXMnPlxuXHRcdFx0PGRpdj4ge3tjY3l9fSA6IDwvZGl2PiBcblx0XHRcdDxkaXY+IHt7cmF0ZX19ICA8L2Rpdj5cblx0XHQ8L2Rpdj5cblx0PC9kaXY+XG48L2Rpdj5cblxuPC90ZW1wbGF0ZT5cblxuXG48c2NyaXB0ID5cbmV4cG9ydCBkZWZhdWx0IHtcbiBkYXRhKCkge3JldHVybiB7cmF0ZXNEYXRhIDoge319fSAsXG4gbmFtZTondnVlLXJhdGVzJyxcbiBtb3VudGVkKCkgeyBheGlvcy5nZXQoJy8vYXBpLmZpeGVyLmlvL2xhdGVzdD9iYXNlPUVVUiZzeW1ib2xzPUdCUCxVU0QsRVVSJykudGhlbiggIChyZXQpID0+IHsgdGhpcy5yYXRlc0RhdGE9cmV0LmRhdGF9ICkgfVxufVxuPC9zY3JpcHQ+XG5cblxuPHN0eWxlIHNjb3BlZCBsYW5nPVwic2Nzc1wiPlxuXG4udGlja2VyV3JhcHtcbn1cblxuLmNjeVJlY29yZHtcblx0ZGlzcGxheTpmbGV4O1xuXHRmbGV4LWRpcmVjdGlvbjogcm93O1xuXHRqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG5cdCY6bm90KGxhc3QtY2hpbGQpIHtcblx0XHRwYWRkaW5nLWxlZnQ6IDM1cHg7XG5cdH1cblx0ZGl2Omxhc3QtY2hpbGQge1xuXHRcdHBhZGRpbmctbGVmdDogM3B4O1xuXHR9XG59XG5cbi5yYXRlc1RhYmxle1xuXHRkaXNwbGF5OmlubGluZS1mbGV4O1xuXHRwb3NpdGlvbjphYnNvbHV0ZTtcblx0ZmxleC1kaXJlY3Rpb246IHJvdztcblx0d2hpdGUtc3BhY2U6IG5vd3JhcDtcblx0anVzdGlmeS1jb250ZW50OmxlZnQ7XG5cdGNvbG9yOmRhcmtlbihkYXJrYmx1ZSwyMCUpO1xuXHRtYXJnaW46MHB4O1xuXHRsZWZ0OjEwMCU7XG5cdGFuaW1hdGlvbjogbXltb3ZlIDYwcyAxcyBpbmZpbml0ZSBsaW5lYXI7XG59XG5cbkBrZXlmcmFtZXMgbXltb3Zle1xuICAgIDAlIHtsZWZ0OiAxMDAlO30gICBcbiAgICAxMDAlIHsgdHJhbnNmb3JtOnRyYW5zbGF0ZVgoLTEwMCUpO2xlZnQ6MCU7fVxufVxuXG5cdFxuPC9zdHlsZT5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyByYXRlcy52dWU/ODlhZDBjM2EiLCI8dGVtcGxhdGU+XG5cbiAgICA8ZGl2PlxuICAgICAgICA8ZGl2IHYtc2hvdz1cImh0bWw9PScnXCI+XG4gICAgICAgICAgICA8c2xvdD48L3Nsb3Q+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZHluYW1pYy1zZXJ2ZXItcGFnZS1jb21wb25lbnQgdi1pZj0naHRtbCcgOmh0bWw9J2h0bWwnIDpkYXRhPVwiY29udGV4dERhdGFcIj48L2R5bmFtaWMtc2VydmVyLXBhZ2UtY29tcG9uZW50PiBcbiAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5cbiAgICB2YXIgTG9hZGluZyA9IHtcbiAgICAgICAgdGVtcGxhdGU6IGA8ZGl2PjwvZGl2PmBcbiAgICB9XG5cbiAgICB2YXIgcmVuZGVyPSBmdW5jdGlvbihoLCBjb250ZXh0KSB7XG4gICAgICAgICAgICB2YXIgaHRtbD1jb250ZXh0LnByb3BzLmh0bWwgO1xuICAgICAgICAgICAgY29uc3QgZHluQ29tcG9uZW50ID0ge1xuICAgICAgICAgICAgICAgIG5hbWU6J2R5bmFtaWMtc2VydmVyLXBhZ2UtY29tcG9uZW50JyxcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTpodG1sLFxuICAgICAgICAgICAgICAgIGRhdGEoKSB7IHJldHVybiBjb250ZXh0LnByb3BzLmRhdGEgfSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGNvbXBvbmVudCA9IGh0bWwgPyBkeW5Db21wb25lbnQgOiBMb2FkaW5nO1xuICAgICAgICAgICAgcmV0dXJuIGgoY29tcG9uZW50KTtcbiAgICAgICAgfVxuXG4gICAgdmFyIER5bmFtaWNTZXJ2ZXJQYWdlQ29tcG9uZW50PSB7XG4gICAgICAgIGZ1bmN0aW9uYWw6IHRydWUsXG4gICAgICAgIG5hbWU6J2R5bmFtaWMtc2VydmVyLXBhZ2UtY29tcG9uZW50JyxcbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgIGh0bWw6IFN0cmluZyxcbiAgICAgICAgICAgIGRhdGE6IHsgdHlwZTogT2JqZWN0LCBkZWZhdWx0OiAoKSA9PiB7fSB9XG4gICAgICAgIH0sXG4gICAgICAgIHJlbmRlclxuICAgIH1cblxuXG4gICAgZXhwb3J0IGRlZmF1bHQge1xuICAgICAgICBkYXRhKCkgeyByZXR1cm4geyBwYXRoOiAnJywgaHRtbDonJywgc2NyaXB0czogJycsIHN0YXR1czonJyB9IH0sXG4gICAgICAgIG5hbWU6J3NlcnZlci1wYWdlJyxcbiAgICAgICAgY29tcHV0ZWQ6IHtcbiAgICAgICAgICAgIGNvbnRleHREYXRhKCkgeyBcbiAgICAgICAgICAgICAgICByZXR1cm4gIHRoaXMuJHBhcmVudC5fZGF0YVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGNvbXBvbmVudHM6IHsgRHluYW1pY1NlcnZlclBhZ2VDb21wb25lbnQgfSxcbiAgICAgICAgbW91bnRlZCgpIHsgXG4gICAgICAgICAgICBpZiggISB0aGlzLiRzbG90c1snZGVmYXVsdCddKXtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dQYWdlKClcbiAgICAgICAgICAgIH0gXG4gICAgICAgIH0sXG4gICAgICAgIG1ldGhvZHM6IHtcblx0XHRcbiAgICAgICAgXHRzaG93UGFnZTogZnVuY3Rpb24oKXsgXG5cdCAgICAgICBcdFx0dmFyIG15PXRoaXM7XG4gICAgICAgICAgICAgICAgbXkucGF0aD1teS4kcm91dGUucGF0aCBcbiAgICAgICAgXHRcdGxldCB0YXJnZXQ9bXkuJHJvdXRlLnRhcmdldCB8fCBteS4kcm91dGUucGF0aDtcbiAgICAgICAgXHRcdHZhciBPSz1yZXBseT0+e1xuXHQgICAgICAgIFx0XHRteS5zdGF0dXM9cmVwbHkuc3RhdHVzOyBcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBhZ2VET009dGhpcy5wYXJzZVBhZ2UocmVwbHkuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIG15Lmh0bWw9cGFnZURPTS5odG1sIDtcbiAgICAgICAgICAgICAgICAgICAgbXkuc2NyaXB0cz1wYWdlRE9NLnNjcmlwdHMgO1xuICAgICAgICAgICAgICAgICAgICAkKFwiaHRtbCwgYm9keVwiKS5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcCA6IDBcbiAgICAgICAgICAgICAgICAgICAgfSwgMSk7XG4gICAgICAgICAgICAgICAgICAgIGlmKG15LnNjcmlwdHMpe1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZhbChteS5zY3JpcHRzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgIFx0fTtcbiAgICAgICAgXHRcdHZhciBCQUQ9ZXJyb3I9PiB7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coZXJyb3IpO1xuXHQgICAgICAgIFx0XHRteS5odG1sPWVycm9yLnJlc3BvbnNlLmRhdGE7XG5cdCAgICAgICAgXHRcdG15LnN0YXR1cz1lcnJvci5yZXNwb25zZS5zdGF0dXM7IFxuXHQgICAgICAgIFx0fTtcbiAgICAgICAgXHRcdGF4aW9zLmdldCh0YXJnZXQpLnRoZW4oT0spLmNhdGNoKEJBRClcblx0ICAgICAgICB9LFxuXG4gICAgICAgICAgICBwYXJzZVBhZ2U6IGZ1bmN0aW9uKGh0bWwpe1xuICAgICAgICAgICAgICAgIGxldCBwYWdlPSQucGFyc2VIVE1MKCQudHJpbShodG1sKSxudWxsLHRydWUpO1xuICAgICAgICAgICAgICAgIGxldCBwdXJlSFRNTD0nJztcbiAgICAgICAgICAgICAgICBsZXQgc2NyaXB0cz0nJztcbiAgICAgICAgICAgICAgICB2YXIgZWxlbWVudHM9MDtcbiAgICAgICAgICAgICAgICAkLmVhY2gocGFnZSwgKGksZWwpID0+IHsgXG4gICAgICAgICAgICAgICAgICAgIGlmIChlbC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpPT0nc2NyaXB0JyApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcmlwdHM9c2NyaXB0cyArIGVsLmlubmVySFRNTCArICdcXG4nO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgeyBcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbC5vdXRlckhUTUwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwdXJlSFRNTD0gcHVyZUhUTUwgKyBlbC5vdXRlckhUTUwgO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRzKys7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudHMhPTEpIHB1cmVIVE1MPSc8ZGl2PicrcHVyZUhUTUwrJzwvZGl2Pic7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgaHRtbDpwdXJlSFRNTCAsIHNjcmlwdHM6c2NyaXB0c307XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuICAgICAgICB3YXRjaDogeyAgJyRyb3V0ZScgKHRvLCBmcm9tKSB7IHRoaXMuc2hvd1BhZ2UoKSB9IH1cbiAgICB9XG48L3NjcmlwdD5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzZXJ2ZXJQYWdlLnZ1ZT82NTliMzA2ZSIsIlxuXG4kKGRvY3VtZW50KS5yZWFkeSgoKSA9PiB7XG5cbiAgICAkKCcuY2Fyb3VzZWwnKS5jYXJvdXNlbCh7XG4gICAgICBpbnRlcnZhbDogNDIwMFxuICAgIH0pXG5cbiAgICAkKCdib2R5Jykub24oJ2hpZGRlbicsICcjbG9naW4tbW9kYWwnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJCgnLmFsZXJ0JykucmVtb3ZlKCk7XG4gICAgfSk7XG5cbiAgICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoJCh0aGlzKS5zY3JvbGxUb3AoKSA+IDEwMCkge1xuICAgICAgICAgICAgJCgnLnNjcm9sbHVwJykuZmFkZUluKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKCcuc2Nyb2xsdXAnKS5mYWRlT3V0KCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgICQoJ2JvZHknKS5vbignY2xpY2snLCAnLnNjcm9sbHVwJyxmdW5jdGlvbigpIHtcbiAgICAgICAgJChcImh0bWwsIGJvZHlcIikuYW5pbWF0ZSh7XG4gICAgICAgICAgICBzY3JvbGxUb3AgOiAwXG4gICAgICAgIH0sIDYwMCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcblxuICAgICQoJ2JvZHknKS5vbignY2xpY2snLCAnLmFycm93RG93bicsZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBjb29yZD1VdGlscy5nZXRDb29yZGluYXRlcygnI2hvbWVDcm93ZGZ1bmRpbmcnKTtcbiAgICAgICAgaWYgKGNvb3JkKXtcbiAgICAgICAgICAgICQoXCJib2R5XCIpLmFuaW1hdGUoe1xuICAgICAgICAgICAgICAgIHNjcm9sbFRvcCA6IGNvb3JkLnRvcCArIHdpbmRvdy5zY3JvbGxZXG4gICAgICAgICAgICB9LCA2MDApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcblxuICAgICQoZG9jdW1lbnQpLnJlYWR5KCAoKSA9PiB7XG5cbiAgICAgICAgJCgnLnNob3ctbXktdG9vbHRpcCcpLnRvb2x0aXAoe1xuICAgICAgICAgICAgJ3BsYWNlbWVudCcgOiAnYm90dG9tJ1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgICQoJ2JvZHknKS5vbignY2xpY2snLCcudmlld2FsbGNhdCcgLGZ1bmN0aW9uKCl7XG4gICAgICAgICQoXCIuYWxsQ2F0ZWdvcmllc1wiKS50b2dnbGVDbGFzcyhcImhpZGVhbGxcIik7XG4gICAgfSk7XG59KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvcGFnZXMvaG9tZS5qcyIsImltcG9ydCBWdWUgZnJvbSAndnVlJztcbmltcG9ydCBWdWVSb3V0ZXIgZnJvbSAndnVlLXJvdXRlcic7XG5cbmNvbnN0IHNlcnZlclBhZ2UgPSBWdWUuY29tcG9uZW50KCdzZXJ2ZXItcGFnZScscmVxdWlyZSgnLi9jb21wb25lbnRzL3NlcnZlclBhZ2UudnVlJykpO1xuXG5sZXQgcm91dGVzID0gW1xuXHR7XG5cdFx0cGF0aDogJy8nLFx0XHRcdFxuXHRcdGNvbXBvbmVudDogc2VydmVyUGFnZSAsXG5cdFx0dGFyZ2V0OicvcGFnZS9ob21lJ1xuXHR9LHtcblx0XHRwYXRoOiAnL2hvbWUnLFx0XHRcdFxuXHRcdGNvbXBvbmVudDogc2VydmVyUGFnZSAsXG5cdFx0dGFyZ2V0OicvcGFnZS9ob21lJ1xuXHR9LHtcblx0XHRwYXRoOiAnL2hvbWVwYWdlJyxcdFx0XHRcblx0XHRjb21wb25lbnQ6IHNlcnZlclBhZ2UgLFxuXHRcdHRhcmdldDonL3BhZ2UvaG9tZSdcblx0fSx7XG5cblx0XHRwYXRoOiAnL3BhZ2UvKicsXHRcdFx0XHRcblx0XHRjb21wb25lbnQ6IHNlcnZlclBhZ2UgXG5cdFxuXHR9LFxuXVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgVnVlUm91dGVyKHtcblx0cm91dGVzLFxuXHRtb2RlOlwiaGlzdG9yeVwiLFxufSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3JvdXRlcy5qcyIsIlxud2luZG93LiQgPSB3aW5kb3cualF1ZXJ5ID0gcmVxdWlyZSgnanF1ZXJ5Jyk7XG5cbnJlcXVpcmUoJ2Jvb3RzdHJhcC1zYXNzJyk7XG5cbmltcG9ydCBWdWUgZnJvbSAndnVlJztcbmltcG9ydCBWdWVSb3V0ZXIgZnJvbSAndnVlLXJvdXRlcic7XG5pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xuXG5cblZ1ZS51c2UoVnVlUm91dGVyKTtcblxud2luZG93LlZ1ZT1WdWU7XG53aW5kb3cuVnVlUm91dGVyPVZ1ZVJvdXRlcjtcbndpbmRvdy5heGlvcz1heGlvcztcblxud2luZG93LmF4aW9zLmRlZmF1bHRzLmhlYWRlcnMuY29tbW9uID0ge1xuICAgICdYLUNTUkYtVE9LRU4nOiB3aW5kb3cuTGFyYXZlbC5jc3JmVG9rZW4sXG4gICAgJ1gtUmVxdWVzdGVkLVdpdGgnOiAnWE1MSHR0cFJlcXVlc3QnXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zdGFydHVwLmpzIiwiZnVuY3Rpb24gVXRpbHMoKXtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgdmFyIGxhc3RBamF4UmVwbHk9Jyc7XG5cbiAgZnVuY3Rpb24gYWpheFN5bmNoKHVybCwgbWV0aG9kID0gJ0dFVCcsZGF0YVR5cGUsIGRhdGEsIGZuU3VjY2VzcywgZm5FcnJvcil7XG4gICAgdmFyIHJlc3VsdD0nJ1xuICAgIHZhciBmbk9LPSAgZm5TdWNjZXNzID8gZnVuY3Rpb24ocil7IGxhc3RBamF4UmVwbHk9cjsgZm5TdWNjZXNzKHIpOyByZXN1bHQ9cjsgfSA6ICBmdW5jdGlvbihyKXsgbGFzdEFqYXhSZXBseT1yOyByZXN1bHQ9cn07XG4gICAgdmFyIGZuQkFEPSBmbkVycm9yICAgPyBmdW5jdGlvbihyKXsgbGFzdEFqYXhSZXBseT1yOyBmbkJBRCgpOyBjb25zb2xlLmxvZygnRmFpbGVkIHRvICcgKyBtZXRob2QgKyAnICcgKyB1cmwgKX0gOiBmdW5jdGlvbihyKXsgbGFzdEFqYXhSZXBseT1yOyBjb25zb2xlLmxvZygnRmFpbGVkIHRvICcgKyBtZXRob2QgKyAnICcgKyB1cmwgKX07XG4gICAgdmFyIG9wdGlvbnM9e1xuICAgICAgICAgICAgICB0eXBlOiBtZXRob2QsXG4gICAgICAgICAgICAgIHVybDogdXJsLFxuICAgICAgICAgICAgICBkYXRhOiBkYXRhLCBcbiAgICAgICAgICAgICAgc3VjY2VzczogZm5PSyxcbiAgICAgICAgICAgICAgZXJyb3I6IGZuQkFELCBcbiAgICAgICAgICAgICAgYXN5bmM6ZmFsc2VcbiAgICAgICAgICAgIH07XG4gICAgaWYgKGRhdGFUeXBlKSB7XG4gICAgICBvcHRpb25zLmRhdGFUeXBlPWRhdGFUeXBlO1xuICAgIH1cbiAgICAvLyBjb25zb2xlLmxvZyAob3B0aW9ucyk7XG4gICAgJC5hamF4KG9wdGlvbnMpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiBsYXN0UmVzcG9uc2UoKXtcbiAgICByZXR1cm4gbGFzdEFqYXhSZXBseTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEpTT04odXJsLCBkYXRhPScnLGZuT0ssIGZuQmFkKXtcbiAgICB2YXIgcmV0PWFqYXhTeW5jaCh1cmwsICdHRVQnLCAnanNvbicsIGRhdGEsZm5PSywgZm5CYWQpO1xuICAgIHZhciBKID0gcmV0ID8gICggdHlwZW9mKHJldCkgPT0gJ29iamVjdCcgPyByZXQgOiBKU09OLnBhcnNlKHJldCkgKSA6IHt9IDtcbiAgICByZXR1cm4gSjtcbiAgfVxuXG5cbiAgZnVuY3Rpb24gcG9zdEpTT04odXJsLCBkYXRhPScnLCBmbk9LLCBmbkJhZCl7XG4gICAgdmFyIHJldD1hamF4U3luY2godXJsLCAnUE9TVCcsICdqc29uJywgZGF0YSxmbk9LLCBmbkJhZCk7XG4gICAgdmFyIEogPSByZXQgPyAgKCB0eXBlb2YocmV0KSA9PSAnb2JqZWN0JyA/IHJldCA6IEpTT04ucGFyc2UocmV0KSApIDoge30gO1xuICAgIHJldHVybiBKO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0SFRNTCh1cmwsd2l0aERhdGEpe1xuICAgIHZhciBodG1sPSBhamF4U3luY2goIHVybCwgJ0dFVCcsJ2h0bWwnICk7XG4gICAgaWYgKHdpdGhEYXRhKXtcbiAgICAgIGZvciAodmFyIGtleSBpbiB3aXRoRGF0YSkge1xuICAgICAgICB2YXIgdmFsdWUgPSB3aXRoRGF0YVtrZXldO1xuICAgICAgICB2YXIgcmV4PW5ldyBSZWdFeHAoXCJ7e1xcXFxzKlwiICsga2V5ICsgXCJcXFxccyp9fVwiLCdnJyk7XG4gICAgICAgIGh0bWw9aHRtbC5yZXBsYWNlKHJleCx2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHZhciBydW5pdD1mdW5jdGlvbihtYXRjaCxjb2RlKXsgXG4gICAgICByZXR1cm4gZXZhbChjb2RlKTtcbiAgICB9O1xuICAgIHZhciByZXg9bmV3IFJlZ0V4cChcInshIVxcXFxzKiguKylcXFxccyEhfVwiLCdnJyk7XG4gICAgaHRtbD1odG1sLnJlcGxhY2UocmV4LHJ1bml0KTtcbiAgICByZXR1cm4gaHRtbDtcbiAgfVxuICBcbiAgZnVuY3Rpb24gbGVmdChzdHIsIG4pe1xuICAgIGlmIChuIDw9IDApXG4gICAgICAgIHJldHVybiBcIlwiO1xuICAgIGVsc2UgaWYgKG4gPiBTdHJpbmcoc3RyKS5sZW5ndGgpXG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgZWxzZVxuICAgICAgICByZXR1cm4gU3RyaW5nKHN0cikuc3Vic3RyaW5nKDAsbik7XG4gIH1cblxuICBmdW5jdGlvbiByaWdodChzdHIsIG4pe1xuICAgICAgaWYgKG4gPD0gMClcbiAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgZWxzZSBpZiAobiA+IFN0cmluZyhzdHIpLmxlbmd0aClcbiAgICAgICAgIHJldHVybiBzdHI7XG4gICAgICBlbHNlIHtcbiAgICAgICAgIHZhciBpTGVuID0gU3RyaW5nKHN0cikubGVuZ3RoO1xuICAgICAgICAgcmV0dXJuIFN0cmluZyhzdHIpLnN1YnN0cmluZyhpTGVuLCBpTGVuIC0gbik7XG4gICAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzdHJQYWQoc3RyLCBtYXhMZW4sIHBhZFdpdGg9JyAnKXtcbiAgICAgICAgdmFyIHRvQWRkO1xuICAgICAgICBpZiAobWF4TGVuIDw9IDApIFxuICAgICAgICAgIHRvQWRkPVwiXCI7XG4gICAgICAgIGVsc2UgXG4gICAgICAgICAgdG9BZGQ9QXJyYXkobWF4TGVuKzEpLmpvaW4ocGFkV2l0aCk7XG4gICAgICAgIGlmIChtYXhMZW4gPFN0cmluZyhzdHIpLmxlbmd0aClcbiAgICAgICAgICBtYXhMZW49U3RyaW5nKHN0cikubGVuZ3RoO1xuICAgICAgICByZXR1cm4gcmlnaHQodG9BZGQrc3RyLG1heExlbik7XG4gICAgfVxuXG5cbiAgZnVuY3Rpb24gemVyb1BhZChpLG4pe1xuICAgIHJldHVybiBzdHJQYWQoaSxuLCcwJyk7XG4gIH1cblxuICBmdW5jdGlvbiB0aXRsZUNhc2Uoc3RyKSB7XG4gICAgcmV0dXJuIHN0ci5zcGxpdCgnICcpLm1hcChmdW5jdGlvbih2YWwpeyBcbiAgICAgIHJldHVybiB2YWwuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyB2YWwuc3Vic3RyKDEpLnRvTG93ZXJDYXNlKCk7XG4gICAgfSkuam9pbignICcpO1xuICB9XG5cbiAgZnVuY3Rpb24gZmlyc3RDYXAoc3RyKSB7XG4gICAgcmV0dXJuIHN0ci5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0ci5zdWJzdHIoMSk7XG4gIH1cblxuXG4gIGZ1bmN0aW9uIGRhdGUyc3RyaW5nKGQsc2VwPScvJyl7XG4gICAgaWYgKCEgKGQgaW5zdGFuY2VvZiBEYXRlKSkgZD1uZXdEYXRlKGQpO1xuICAgIHZhciBkZCA9IHplcm9QYWQoZC5nZXREYXRlKCksMik7XG4gICAgdmFyIG1tID0gemVyb1BhZChkLmdldE1vbnRoKCkrMSwyKTtcbiAgICB2YXIgeXkgPSBkLmdldEZ1bGxZZWFyKCk7XG4gICAgcmV0dXJuIFtkZCxtbSx5eV0uam9pbihzZXApO1xuICB9XG5cblxuICBmdW5jdGlvbiByZW5kZXJUYWJsZShvcHRpb25zPXt9KXtcbiAgICB2YXIgY29sdW1ucz1vcHRpb25zLmNvbHVtbnMgfHwgW107XG4gICAgdmFyIGRhdGE9b3B0aW9ucy5kYXRhIHx8IFtdO1xuICAgIHZhciBrZXk9b3B0aW9ucy5rZXkgfHwgJ2lkJztcbiAgICB2YXIgdGFibGU9Jyc7XG4gICAgdmFyIHRoZWFkPScnO1xuICAgIHZhciB0Ym9keT0nJztcbiAgICB2YXIgcz0nJztcbiAgICB2YXIgY2VsbFZhbHVlPScnLCBjb2xUeXBlPScnO1xuICAgIHZhciByb3dBY3Rpb25zPW9wdGlvbnMucm93QWN0aW9ucyB8fCAnJyA7XG4gICAgaWYgKCEgY29sdW1ucy5sZW5ndGggJiYgZGF0YS5sZW5ndGggKSB7XG4gICAgICBmb3IgKHZhciBmaWVsZCBpbiBkYXRhWzBdKSB7XG4gICAgICAgIGNvbHVtbnMucHVzaCh7bmFtZTogZmllbGQsIGxhYmVsIDogZmlyc3RDYXAoZmllbGQpfSk7XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwIDsgaSA8IGNvbHVtbnMubGVuZ3RoIDsgaSsrKSB7XG4gICAgICB2YXIgY29sPWNvbHVtbnNbaV07XG4gICAgICBjb2xUeXBlPScnO1xuICAgICAgaWYodHlwZW9mIGNvbCA9PSAnc3RyaW5nJykge1xuICAgICAgICBzPSBzICsgXCI8dGg+XCIgKyBmaXJzdENhcChjb2wpICsgXCI8L3RoPlxcblwiO1xuICAgICAgfSBlbHNlIGlmKHR5cGVvZiBjb2wgPT0gJ29iamVjdCcpIHtcbiAgICAgICAgdmFyIGNvbExhYmVsPScnO1xuICAgICAgICBjb2xUeXBlPWNvbHVtbnNbaV0udHlwZTtcbiAgICAgICAgaWYgKCdsYWJlbCcgaW4gY29sKSB7XG4gICAgICAgICAgY29sTGFiZWw9Y29sLmxhYmVsO1xuICAgICAgICB9IGVsc2UgaWYgKCduYW1lJyBpbiBjb2wpe1xuICAgICAgICAgIGNvbExhYmVsPSBmaXJzdENhcChjb2wubmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbC5zb3J0YWJsZSl7XG4gICAgICAgICAgY29sTGFiZWw9JzxzcGFuPiAnICsgY29sTGFiZWwgKyAnIDxpIGNsYXNzPVwicHVsbC1yaWdodCBmYSBmYS1zb3J0XCI+PC9pPjwvc3Bhbj4nO1xuICAgICAgICB9XG4gICAgICAgIHZhciBhdHRyPScgbmFtZT1cIicgKyBjb2wubmFtZSArICdcIiAnKyAoY29sLmF0dHJpYnV0ZXMgPyAnICcrIGNvbC5hdHRyaWJ1dGVzICsgJyAnOiAnJykgKyAoIGNvbFR5cGUgPyAnIHR5cGU9XCInICsgY29sVHlwZSArICdcIiAnIDonJyAgKTtcbiAgICAgICAgcz0gcyArICc8dGggJyArIGF0dHIgKycgPicgKyBjb2xMYWJlbCArIFwiPC90aD5cXG5cIjsgIFxuICAgICAgfVxuICAgIH1cbiAgICBpZiAocm93QWN0aW9ucykgcz1zICsgXCI8dGg+LTwvdGg+XCI7XG4gICAgdGhlYWQ9XCI8dGhlYWQ+XFxuPHRyPlxcblwiICsgcyArIFwiPC90cj5cXG48L3RoZWFkPlxcblwiIFxuICAgIHM9Jyc7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aCA7IGkrKykge1xuICAgICAgcz1zKyc8dHIga2V5PVwiJyArIGRhdGFbaV1ba2V5XSArJ1wiPlxcbic7XG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8Y29sdW1ucy5sZW5ndGggOyBqKyspIHtcbiAgICAgICAgaWYodHlwZW9mIGNvbHVtbnNbal0gPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBjZWxsVmFsdWU9ZGF0YVtpXVtjb2x1bW5zW2pdXTtcbiAgICAgICAgfSBlbHNlIGlmKHR5cGVvZiBjb2x1bW5zW2pdID09ICdvYmplY3QnKSB7XG4gICAgICAgICAgdmFyIGZpZWxkPSBjb2x1bW5zW2pdLm5hbWUgO1xuICAgICAgICAgIHZhciB2YWx1ZT1jb2x1bW5zW2pdLnZhbHVlIDtcbiAgICAgICAgICBjb2xUeXBlPWNvbHVtbnNbal0udHlwZTtcbiAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09ICdmdW5jdGlvbicpe1xuICAgICAgICAgICAgY2VsbFZhbHVlPWNvbHVtbnNbal0udmFsdWUoZGF0YVtpXSk7XG4gICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT0gJ3VuZGVmaW5lZCcpe1xuICAgICAgICAgICAgY2VsbFZhbHVlPWRhdGFbaV1bZmllbGRdO1xuICAgICAgICAgICAgaWYgKGNvbFR5cGU9PSdudW1iZXInKXtcbiAgICAgICAgICAgICAgY2VsbFZhbHVlPWZvcm1hdEN1cnJlbmN5KGNlbGxWYWx1ZSk7XG4gICAgICAgICAgICAgIGNlbGxWYWx1ZT0nPHNwYW4gY2xhc3M9XCJwdWxsLXJpZ2h0XCI+ICcrY2VsbFZhbHVlKycgPC9zcGFuPidcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY29sVHlwZT09J2RhdGUnKXtcbiAgICAgICAgICAgICAgY2VsbFZhbHVlPW5ldyBEYXRlKGNlbGxWYWx1ZSk7XG4gICAgICAgICAgICAgIGNlbGxWYWx1ZT0nPHNwYW4gY2xhc3M9XCJ0ZXh0LWNlbnRlclwiPiAnK2RhdGUyc3RyaW5nKGNlbGxWYWx1ZSkrJyA8L3NwYW4+JyAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNlbGxWYWx1ZT12YWx1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcz0gcyArICc8dGQ+JyArIGNlbGxWYWx1ZSArIFwiPC90ZD5cXG5cIjtcbiAgICAgIH1cbiAgICAgIGlmKHJvd0FjdGlvbnMgKXtcbiAgICAgICAgcz0gcyArIFwiPHRkPlwiICsgcm93QWN0aW9ucyArXCI8L3RkPlxcblwiO1xuICAgICAgfVxuICAgICAgcz1zK1wiPC90cj5cXG5cIjtcbiAgICB9XG4gICAgdGJvZHk9XCI8dGJvZHk+XFxuXCIgKyBzICsgXCI8L3Rib2R5PlxcblwiXG4gICAgdGFibGU9dGhlYWQrdGJvZHk7XG4gICAgcmV0dXJuICB0YWJsZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzVmlzaWJsZShub2RlKXtcbiAgICBpZiAobm9kZSBpbnN0YW5jZW9mICBIVE1MRWxlbWVudCkgbm9kZT0kKG5vZGUpO1xuICAgIGlmICghKG5vZGUgaW5zdGFuY2VvZiAgJCkpIG5vZGU9JChub2RlKTtcbiAgICBpZiAoISBub2RlLmlzKCc6dmlzaWJsZScpKSByZXR1cm4gZmFsc2U7XG4gICAgdmFyIGVsPW5vZGUuZmlyc3QoKS5nZXQoMCk7XG4gICAgaWYgKGVsKXtcbiAgICAgIHZhciByPWVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgdmFyIHc9d2luZG93LmRvY3VtZW50LmJvZHkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICBpZiAoci5yaWdodDx3LmxlZnQgIHx8ICByLmxlZnQ+dy5yaWdodCB8fCByLnRvcCA+IHcuYm90dG9tIHx8IHIuYm90dG9tIDwgdy50b3ApIHJldHVybiBmYWxzZTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSByZXR1cm4gZmFsc2U7XG5cbiAgfVxuXG5cbiAgZnVuY3Rpb24gZ2V0Q29vcmRpbmF0ZXMobm9kZSl7XG4gICAgaWYgKG5vZGUgaW5zdGFuY2VvZiAgSFRNTEVsZW1lbnQpIG5vZGU9JChub2RlKTtcbiAgICBpZiAoIShub2RlIGluc3RhbmNlb2YgICQpKSBub2RlPSQobm9kZSk7XG4gICAgdmFyIGVsPW5vZGUuZmlyc3QoKS5nZXQoMCk7XG4gICAgaWYgKGVsKXtcbiAgICAgIHZhciByPWVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICByZXR1cm4gcjtcbiAgICB9IGVsc2UgcmV0dXJuIGZhbHNlO1xuICB9XG5cblxuICBmdW5jdGlvbiBmb3JtYXRDdXJyZW5jeSh2KXtcbiAgICAgIGlmIChpc05hTihTdHJpbmcodikucmVwbGFjZSgvLC9nLCBcIlwiKSkpIHJldHVybiAnJztcbiAgICAgIHZhciBuPSBwYXJzZUZsb2F0KFN0cmluZyh2KS5yZXBsYWNlKC8sL2csIFwiXCIpKS50b0ZpeGVkKDIpO1xuICAgICAgbj1uLnRvU3RyaW5nKCkucmVwbGFjZSgvXFxCKD89KFxcZHszfSkrKD8hXFxkKSkvZywgXCIsXCIpO1xuICAgICAgcmV0dXJuIG47XG4gIH1cblxuXG4gIHRoaXMuZ2V0SlNPTj1nZXRKU09OO1xuICB0aGlzLnBvc3RKU09OPXBvc3RKU09OO1xuICB0aGlzLmdldEhUTUw9Z2V0SFRNTDtcbiAgdGhpcy5yaWdodD1yaWdodDtcbiAgdGhpcy5sZWZ0PWxlZnQ7XG4gIHRoaXMuc3RyUGFkPXN0clBhZDtcbiAgdGhpcy56ZXJvUGFkPXplcm9QYWQ7XG4gIHRoaXMucmVuZGVyVGFibGU9cmVuZGVyVGFibGU7XG4gIHRoaXMudGl0bGVDYXNlPXRpdGxlQ2FzZTtcbiAgdGhpcy5maXJzdENhcD1maXJzdENhcDtcbiAgdGhpcy5sYXN0UmVzcG9uc2U9bGFzdFJlc3BvbnNlO1xuICB0aGlzLmlzVmlzaWJsZT1pc1Zpc2libGU7XG4gIHRoaXMuZm9ybWF0Q3VycmVuY3k9Zm9ybWF0Q3VycmVuY3lcbiAgdGhpcy5kYXRlMnN0cmluZz1kYXRlMnN0cmluZ1xuICB0aGlzLmdldENvb3JkaW5hdGVzPWdldENvb3JkaW5hdGVzXG5cblxuICAvLyBjb25zb2xlLmxvZyhnZXRIVE1MKCcvaHRtbC9uZXdVcGRhdGVFbnRyeScsIHtpZCA6ICduZXcnfSkpXG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IFV0aWxzO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvdXRpbHMuanMiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIlxcbi5jY3lSZWNvcmRbZGF0YS12LTVmN2EyOTJlXSB7XFxuICBkaXNwbGF5OiAtd2Via2l0LWJveDtcXG4gIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIC13ZWJraXQtYm94LW9yaWVudDogaG9yaXpvbnRhbDtcXG4gIC13ZWJraXQtYm94LWRpcmVjdGlvbjogbm9ybWFsO1xcbiAgICAgIC1tcy1mbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgLXdlYmtpdC1ib3gtcGFjazoganVzdGlmeTtcXG4gICAgICAtbXMtZmxleC1wYWNrOiBqdXN0aWZ5O1xcbiAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxufVxcbi5jY3lSZWNvcmRbZGF0YS12LTVmN2EyOTJlXTpub3QobGFzdC1jaGlsZCkge1xcbiAgICBwYWRkaW5nLWxlZnQ6IDM1cHg7XFxufVxcbi5jY3lSZWNvcmQgZGl2W2RhdGEtdi01ZjdhMjkyZV06bGFzdC1jaGlsZCB7XFxuICAgIHBhZGRpbmctbGVmdDogM3B4O1xcbn1cXG4ucmF0ZXNUYWJsZVtkYXRhLXYtNWY3YTI5MmVdIHtcXG4gIGRpc3BsYXk6IC13ZWJraXQtaW5saW5lLWJveDtcXG4gIGRpc3BsYXk6IC1tcy1pbmxpbmUtZmxleGJveDtcXG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgLXdlYmtpdC1ib3gtb3JpZW50OiBob3Jpem9udGFsO1xcbiAgLXdlYmtpdC1ib3gtZGlyZWN0aW9uOiBub3JtYWw7XFxuICAgICAgLW1zLWZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcbiAgLXdlYmtpdC1ib3gtcGFjazogbGVmdDtcXG4gICAgICAtbXMtZmxleC1wYWNrOiBsZWZ0O1xcbiAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGxlZnQ7XFxuICBjb2xvcjogIzAwMDAyNTtcXG4gIG1hcmdpbjogMHB4O1xcbiAgbGVmdDogMTAwJTtcXG4gIC13ZWJraXQtYW5pbWF0aW9uOiBteW1vdmUgNjBzIDFzIGluZmluaXRlIGxpbmVhcjtcXG4gICAgICAgICAgYW5pbWF0aW9uOiBteW1vdmUgNjBzIDFzIGluZmluaXRlIGxpbmVhcjtcXG59XFxuQC13ZWJraXQta2V5ZnJhbWVzIG15bW92ZSB7XFxuMCUge1xcbiAgICBsZWZ0OiAxMDAlO1xcbn1cXG4xMDAlIHtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTEwMCUpO1xcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMTAwJSk7XFxuICAgIGxlZnQ6IDAlO1xcbn1cXG59XFxuQGtleWZyYW1lcyBteW1vdmUge1xcbjAlIHtcXG4gICAgbGVmdDogMTAwJTtcXG59XFxuMTAwJSB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0xMDAlKTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTEwMCUpO1xcbiAgICBsZWZ0OiAwJTtcXG59XFxufVxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jc3MtbG9hZGVyIS4vfi92dWUtbG9hZGVyL2xpYi9zdHlsZS1yZXdyaXRlci5qcz9pZD1kYXRhLXYtNWY3YTI5MmUmc2NvcGVkPXRydWUhLi9+L3Nhc3MtbG9hZGVyIS4vfi92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL3JhdGVzLnZ1ZVxuLy8gbW9kdWxlIGlkID0gMzlcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiLypcclxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxyXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcclxuKi9cclxuLy8gY3NzIGJhc2UgY29kZSwgaW5qZWN0ZWQgYnkgdGhlIGNzcy1sb2FkZXJcclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuXHR2YXIgbGlzdCA9IFtdO1xyXG5cclxuXHQvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXHJcblx0bGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xyXG5cdFx0dmFyIHJlc3VsdCA9IFtdO1xyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSB0aGlzW2ldO1xyXG5cdFx0XHRpZihpdGVtWzJdKSB7XHJcblx0XHRcdFx0cmVzdWx0LnB1c2goXCJAbWVkaWEgXCIgKyBpdGVtWzJdICsgXCJ7XCIgKyBpdGVtWzFdICsgXCJ9XCIpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKGl0ZW1bMV0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gcmVzdWx0LmpvaW4oXCJcIik7XHJcblx0fTtcclxuXHJcblx0Ly8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcclxuXHRsaXN0LmkgPSBmdW5jdGlvbihtb2R1bGVzLCBtZWRpYVF1ZXJ5KSB7XHJcblx0XHRpZih0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIilcclxuXHRcdFx0bW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgXCJcIl1dO1xyXG5cdFx0dmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpZCA9IHRoaXNbaV1bMF07XHJcblx0XHRcdGlmKHR5cGVvZiBpZCA9PT0gXCJudW1iZXJcIilcclxuXHRcdFx0XHRhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XHJcblx0XHR9XHJcblx0XHRmb3IoaSA9IDA7IGkgPCBtb2R1bGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gbW9kdWxlc1tpXTtcclxuXHRcdFx0Ly8gc2tpcCBhbHJlYWR5IGltcG9ydGVkIG1vZHVsZVxyXG5cdFx0XHQvLyB0aGlzIGltcGxlbWVudGF0aW9uIGlzIG5vdCAxMDAlIHBlcmZlY3QgZm9yIHdlaXJkIG1lZGlhIHF1ZXJ5IGNvbWJpbmF0aW9uc1xyXG5cdFx0XHQvLyAgd2hlbiBhIG1vZHVsZSBpcyBpbXBvcnRlZCBtdWx0aXBsZSB0aW1lcyB3aXRoIGRpZmZlcmVudCBtZWRpYSBxdWVyaWVzLlxyXG5cdFx0XHQvLyAgSSBob3BlIHRoaXMgd2lsbCBuZXZlciBvY2N1ciAoSGV5IHRoaXMgd2F5IHdlIGhhdmUgc21hbGxlciBidW5kbGVzKVxyXG5cdFx0XHRpZih0eXBlb2YgaXRlbVswXSAhPT0gXCJudW1iZXJcIiB8fCAhYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xyXG5cdFx0XHRcdGlmKG1lZGlhUXVlcnkgJiYgIWl0ZW1bMl0pIHtcclxuXHRcdFx0XHRcdGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xyXG5cdFx0XHRcdH0gZWxzZSBpZihtZWRpYVF1ZXJ5KSB7XHJcblx0XHRcdFx0XHRpdGVtWzJdID0gXCIoXCIgKyBpdGVtWzJdICsgXCIpIGFuZCAoXCIgKyBtZWRpYVF1ZXJ5ICsgXCIpXCI7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGxpc3QucHVzaChpdGVtKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcblx0cmV0dXJuIGxpc3Q7XHJcbn07XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1xuLy8gbW9kdWxlIGlkID0gNDBcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiXG4vKiBzdHlsZXMgKi9cbnJlcXVpcmUoXCIhIXZ1ZS1zdHlsZS1sb2FkZXIhY3NzLWxvYWRlciEuLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1yZXdyaXRlcj9pZD1kYXRhLXYtNWY3YTI5MmUmc2NvcGVkPXRydWUhc2Fzcy1sb2FkZXIhLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3JhdGVzLnZ1ZVwiKVxuXG52YXIgQ29tcG9uZW50ID0gcmVxdWlyZShcIiEuLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9jb21wb25lbnQtbm9ybWFsaXplclwiKShcbiAgLyogc2NyaXB0ICovXG4gIHJlcXVpcmUoXCIhIWJhYmVsLWxvYWRlcj97XFxcImNhY2hlRGlyZWN0b3J5XFxcIjp0cnVlLFxcXCJwcmVzZXRzXFxcIjpbW1xcXCJlczIwMTVcXFwiLHtcXFwibW9kdWxlc1xcXCI6ZmFsc2V9XV19IS4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c2NyaXB0JmluZGV4PTAhLi9yYXRlcy52dWVcIiksXG4gIC8qIHRlbXBsYXRlICovXG4gIHJlcXVpcmUoXCIhIS4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyP2lkPWRhdGEtdi01ZjdhMjkyZSEuLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9yYXRlcy52dWVcIiksXG4gIC8qIHNjb3BlSWQgKi9cbiAgXCJkYXRhLXYtNWY3YTI5MmVcIixcbiAgLyogY3NzTW9kdWxlcyAqL1xuICBudWxsXG4pXG5Db21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcIi9ob21lL3BhbmFnaW90aXMvd29ya3NwYWNlL2Nyb3dkRnVuZC9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvcmF0ZXMudnVlXCJcbmlmIChDb21wb25lbnQuZXNNb2R1bGUgJiYgT2JqZWN0LmtleXMoQ29tcG9uZW50LmVzTW9kdWxlKS5zb21lKGZ1bmN0aW9uIChrZXkpIHtyZXR1cm4ga2V5ICE9PSBcImRlZmF1bHRcIiAmJiBrZXkgIT09IFwiX19lc01vZHVsZVwifSkpIHtjb25zb2xlLmVycm9yKFwibmFtZWQgZXhwb3J0cyBhcmUgbm90IHN1cHBvcnRlZCBpbiAqLnZ1ZSBmaWxlcy5cIil9XG5pZiAoQ29tcG9uZW50Lm9wdGlvbnMuZnVuY3Rpb25hbCkge2NvbnNvbGUuZXJyb3IoXCJbdnVlLWxvYWRlcl0gcmF0ZXMudnVlOiBmdW5jdGlvbmFsIGNvbXBvbmVudHMgYXJlIG5vdCBzdXBwb3J0ZWQgd2l0aCB0ZW1wbGF0ZXMsIHRoZXkgc2hvdWxkIHVzZSByZW5kZXIgZnVuY3Rpb25zLlwiKX1cblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHsoZnVuY3Rpb24gKCkge1xuICB2YXIgaG90QVBJID0gcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKVxuICBob3RBUEkuaW5zdGFsbChyZXF1aXJlKFwidnVlXCIpLCBmYWxzZSlcbiAgaWYgKCFob3RBUEkuY29tcGF0aWJsZSkgcmV0dXJuXG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICBob3RBUEkuY3JlYXRlUmVjb3JkKFwiZGF0YS12LTVmN2EyOTJlXCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9IGVsc2Uge1xuICAgIGhvdEFQSS5yZWxvYWQoXCJkYXRhLXYtNWY3YTI5MmVcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH1cbn0pKCl9XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tcG9uZW50LmV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL3JhdGVzLnZ1ZVxuLy8gbW9kdWxlIGlkID0gNDFcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwidmFyIENvbXBvbmVudCA9IHJlcXVpcmUoXCIhLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvY29tcG9uZW50LW5vcm1hbGl6ZXJcIikoXG4gIC8qIHNjcmlwdCAqL1xuICByZXF1aXJlKFwiISFiYWJlbC1sb2FkZXI/e1xcXCJjYWNoZURpcmVjdG9yeVxcXCI6dHJ1ZSxcXFwicHJlc2V0c1xcXCI6W1tcXFwiZXMyMDE1XFxcIix7XFxcIm1vZHVsZXNcXFwiOmZhbHNlfV1dfSEuLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXNjcmlwdCZpbmRleD0wIS4vc2VydmVyUGFnZS52dWVcIiksXG4gIC8qIHRlbXBsYXRlICovXG4gIHJlcXVpcmUoXCIhIS4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyP2lkPWRhdGEtdi05ZWVhMWJlOCEuLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9zZXJ2ZXJQYWdlLnZ1ZVwiKSxcbiAgLyogc2NvcGVJZCAqL1xuICBudWxsLFxuICAvKiBjc3NNb2R1bGVzICovXG4gIG51bGxcbilcbkNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwiL2hvbWUvcGFuYWdpb3Rpcy93b3Jrc3BhY2UvY3Jvd2RGdW5kL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9zZXJ2ZXJQYWdlLnZ1ZVwiXG5pZiAoQ29tcG9uZW50LmVzTW9kdWxlICYmIE9iamVjdC5rZXlzKENvbXBvbmVudC5lc01vZHVsZSkuc29tZShmdW5jdGlvbiAoa2V5KSB7cmV0dXJuIGtleSAhPT0gXCJkZWZhdWx0XCIgJiYga2V5ICE9PSBcIl9fZXNNb2R1bGVcIn0pKSB7Y29uc29sZS5lcnJvcihcIm5hbWVkIGV4cG9ydHMgYXJlIG5vdCBzdXBwb3J0ZWQgaW4gKi52dWUgZmlsZXMuXCIpfVxuaWYgKENvbXBvbmVudC5vcHRpb25zLmZ1bmN0aW9uYWwpIHtjb25zb2xlLmVycm9yKFwiW3Z1ZS1sb2FkZXJdIHNlcnZlclBhZ2UudnVlOiBmdW5jdGlvbmFsIGNvbXBvbmVudHMgYXJlIG5vdCBzdXBwb3J0ZWQgd2l0aCB0ZW1wbGF0ZXMsIHRoZXkgc2hvdWxkIHVzZSByZW5kZXIgZnVuY3Rpb25zLlwiKX1cblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHsoZnVuY3Rpb24gKCkge1xuICB2YXIgaG90QVBJID0gcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKVxuICBob3RBUEkuaW5zdGFsbChyZXF1aXJlKFwidnVlXCIpLCBmYWxzZSlcbiAgaWYgKCFob3RBUEkuY29tcGF0aWJsZSkgcmV0dXJuXG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICBob3RBUEkuY3JlYXRlUmVjb3JkKFwiZGF0YS12LTllZWExYmU4XCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9IGVsc2Uge1xuICAgIGhvdEFQSS5yZWxvYWQoXCJkYXRhLXYtOWVlYTFiZThcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH1cbn0pKCl9XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tcG9uZW50LmV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL3NlcnZlclBhZ2UudnVlXG4vLyBtb2R1bGUgaWQgPSA0MlxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJtb2R1bGUuZXhwb3J0cz17cmVuZGVyOmZ1bmN0aW9uICgpe3ZhciBfdm09dGhpczt2YXIgX2g9X3ZtLiRjcmVhdGVFbGVtZW50O3ZhciBfYz1fdm0uX3NlbGYuX2N8fF9oO1xuICByZXR1cm4gX2MoJ2RpdicsIHtcbiAgICBkaXJlY3RpdmVzOiBbe1xuICAgICAgbmFtZTogXCJzaG93XCIsXG4gICAgICByYXdOYW1lOiBcInYtc2hvd1wiLFxuICAgICAgdmFsdWU6IChfdm0ucmF0ZXNEYXRhKSxcbiAgICAgIGV4cHJlc3Npb246IFwicmF0ZXNEYXRhXCJcbiAgICB9XSxcbiAgICBzdGF0aWNDbGFzczogXCJ0aWNrZXJXcmFwXCJcbiAgfSwgWyhfdm0ucmF0ZXNEYXRhLmRhdGUpID8gX2MoJ2RpdicsIHtcbiAgICBzdGF0aWNDbGFzczogXCJyYXRlc1RhYmxlXCJcbiAgfSwgW19jKCdkaXYnLCBbX3ZtLl92KF92bS5fcyhfdm0ucmF0ZXNEYXRhLmJhc2UpICsgXCIgUmF0ZXMgYXMgb2YgOiBcIiArIF92bS5fcyhfdm0ucmF0ZXNEYXRhLmRhdGUpICsgXCIgICBcIildKSwgX3ZtLl92KFwiIFwiKSwgX3ZtLl9sKChfdm0ucmF0ZXNEYXRhLnJhdGVzKSwgZnVuY3Rpb24ocmF0ZSwgY2N5KSB7XG4gICAgcmV0dXJuIF9jKCdkaXYnLCB7XG4gICAgICBzdGF0aWNDbGFzczogXCJjY3lSZWNvcmRcIlxuICAgIH0sIFtfYygnZGl2JywgW192bS5fdihcIiBcIiArIF92bS5fcyhjY3kpICsgXCIgOiBcIildKSwgX3ZtLl92KFwiIFwiKSwgX2MoJ2RpdicsIFtfdm0uX3YoXCIgXCIgKyBfdm0uX3MocmF0ZSkgKyBcIiAgXCIpXSldKVxuICB9KV0sIDIpIDogX3ZtLl9lKCldKVxufSxzdGF0aWNSZW5kZXJGbnM6IFtdfVxubW9kdWxlLmV4cG9ydHMucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5pZiAobW9kdWxlLmhvdCkge1xuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmIChtb2R1bGUuaG90LmRhdGEpIHtcbiAgICAgcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKS5yZXJlbmRlcihcImRhdGEtdi01ZjdhMjkyZVwiLCBtb2R1bGUuZXhwb3J0cylcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlci5qcz9pZD1kYXRhLXYtNWY3YTI5MmUhLi9+L3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9yYXRlcy52dWVcbi8vIG1vZHVsZSBpZCA9IDQzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIm1vZHVsZS5leHBvcnRzPXtyZW5kZXI6ZnVuY3Rpb24gKCl7dmFyIF92bT10aGlzO3ZhciBfaD1fdm0uJGNyZWF0ZUVsZW1lbnQ7dmFyIF9jPV92bS5fc2VsZi5fY3x8X2g7XG4gIHJldHVybiBfYygnZGl2JywgW19jKCdkaXYnLCB7XG4gICAgZGlyZWN0aXZlczogW3tcbiAgICAgIG5hbWU6IFwic2hvd1wiLFxuICAgICAgcmF3TmFtZTogXCJ2LXNob3dcIixcbiAgICAgIHZhbHVlOiAoX3ZtLmh0bWwgPT0gJycpLFxuICAgICAgZXhwcmVzc2lvbjogXCJodG1sPT0nJ1wiXG4gICAgfV1cbiAgfSwgW192bS5fdChcImRlZmF1bHRcIildLCAyKSwgX3ZtLl92KFwiIFwiKSwgKF92bS5odG1sKSA/IF9jKCdkeW5hbWljLXNlcnZlci1wYWdlLWNvbXBvbmVudCcsIHtcbiAgICBhdHRyczoge1xuICAgICAgXCJodG1sXCI6IF92bS5odG1sLFxuICAgICAgXCJkYXRhXCI6IF92bS5jb250ZXh0RGF0YVxuICAgIH1cbiAgfSkgOiBfdm0uX2UoKV0sIDEpXG59LHN0YXRpY1JlbmRlckZuczogW119XG5tb2R1bGUuZXhwb3J0cy5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcbmlmIChtb2R1bGUuaG90KSB7XG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKG1vZHVsZS5ob3QuZGF0YSkge1xuICAgICByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpLnJlcmVuZGVyKFwiZGF0YS12LTllZWExYmU4XCIsIG1vZHVsZS5leHBvcnRzKVxuICB9XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyLmpzP2lkPWRhdGEtdi05ZWVhMWJlOCEuL34vdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL3NlcnZlclBhZ2UudnVlXG4vLyBtb2R1bGUgaWQgPSA0NFxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1yZXdyaXRlci5qcz9pZD1kYXRhLXYtNWY3YTI5MmUmc2NvcGVkPXRydWUhLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvaW5kZXguanMhLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3JhdGVzLnZ1ZVwiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXNDbGllbnQuanNcIikoXCIzMzdhMWIwYVwiLCBjb250ZW50LCBmYWxzZSk7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG4gLy8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3NcbiBpZighY29udGVudC5sb2NhbHMpIHtcbiAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLXJld3JpdGVyLmpzP2lkPWRhdGEtdi01ZjdhMjkyZSZzY29wZWQ9dHJ1ZSEuLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9pbmRleC5qcyEuLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vcmF0ZXMudnVlXCIsIGZ1bmN0aW9uKCkge1xuICAgICB2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtcmV3cml0ZXIuanM/aWQ9ZGF0YS12LTVmN2EyOTJlJnNjb3BlZD10cnVlIS4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2luZGV4LmpzIS4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9yYXRlcy52dWVcIik7XG4gICAgIGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuICAgICB1cGRhdGUobmV3Q29udGVudCk7XG4gICB9KTtcbiB9XG4gLy8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi92dWUtc3R5bGUtbG9hZGVyIS4vfi9jc3MtbG9hZGVyIS4vfi92dWUtbG9hZGVyL2xpYi9zdHlsZS1yZXdyaXRlci5qcz9pZD1kYXRhLXYtNWY3YTI5MmUmc2NvcGVkPXRydWUhLi9+L3Nhc3MtbG9hZGVyIS4vfi92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL3JhdGVzLnZ1ZVxuLy8gbW9kdWxlIGlkID0gNDVcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuICBNb2RpZmllZCBieSBFdmFuIFlvdSBAeXl4OTkwODAzXG4qL1xuXG52YXIgaGFzRG9jdW1lbnQgPSB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnXG5cbmlmICh0eXBlb2YgREVCVUcgIT09ICd1bmRlZmluZWQnICYmIERFQlVHKSB7XG4gIGlmICghaGFzRG9jdW1lbnQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgJ3Z1ZS1zdHlsZS1sb2FkZXIgY2Fubm90IGJlIHVzZWQgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudC4gJyArXG4gICAgXCJVc2UgeyB0YXJnZXQ6ICdub2RlJyB9IGluIHlvdXIgV2VicGFjayBjb25maWcgdG8gaW5kaWNhdGUgYSBzZXJ2ZXItcmVuZGVyaW5nIGVudmlyb25tZW50LlwiXG4gICkgfVxufVxuXG52YXIgbGlzdFRvU3R5bGVzID0gcmVxdWlyZSgnLi9saXN0VG9TdHlsZXMnKVxuXG4vKlxudHlwZSBTdHlsZU9iamVjdCA9IHtcbiAgaWQ6IG51bWJlcjtcbiAgcGFydHM6IEFycmF5PFN0eWxlT2JqZWN0UGFydD5cbn1cblxudHlwZSBTdHlsZU9iamVjdFBhcnQgPSB7XG4gIGNzczogc3RyaW5nO1xuICBtZWRpYTogc3RyaW5nO1xuICBzb3VyY2VNYXA6ID9zdHJpbmdcbn1cbiovXG5cbnZhciBzdHlsZXNJbkRvbSA9IHsvKlxuICBbaWQ6IG51bWJlcl06IHtcbiAgICBpZDogbnVtYmVyLFxuICAgIHJlZnM6IG51bWJlcixcbiAgICBwYXJ0czogQXJyYXk8KG9iaj86IFN0eWxlT2JqZWN0UGFydCkgPT4gdm9pZD5cbiAgfVxuKi99XG5cbnZhciBoZWFkID0gaGFzRG9jdW1lbnQgJiYgKGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXSlcbnZhciBzaW5nbGV0b25FbGVtZW50ID0gbnVsbFxudmFyIHNpbmdsZXRvbkNvdW50ZXIgPSAwXG52YXIgaXNQcm9kdWN0aW9uID0gZmFsc2VcbnZhciBub29wID0gZnVuY3Rpb24gKCkge31cblxuLy8gRm9yY2Ugc2luZ2xlLXRhZyBzb2x1dGlvbiBvbiBJRTYtOSwgd2hpY2ggaGFzIGEgaGFyZCBsaW1pdCBvbiB0aGUgIyBvZiA8c3R5bGU+XG4vLyB0YWdzIGl0IHdpbGwgYWxsb3cgb24gYSBwYWdlXG52YXIgaXNPbGRJRSA9IHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIC9tc2llIFs2LTldXFxiLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKSlcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAocGFyZW50SWQsIGxpc3QsIF9pc1Byb2R1Y3Rpb24pIHtcbiAgaXNQcm9kdWN0aW9uID0gX2lzUHJvZHVjdGlvblxuXG4gIHZhciBzdHlsZXMgPSBsaXN0VG9TdHlsZXMocGFyZW50SWQsIGxpc3QpXG4gIGFkZFN0eWxlc1RvRG9tKHN0eWxlcylcblxuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlIChuZXdMaXN0KSB7XG4gICAgdmFyIG1heVJlbW92ZSA9IFtdXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpdGVtID0gc3R5bGVzW2ldXG4gICAgICB2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXVxuICAgICAgZG9tU3R5bGUucmVmcy0tXG4gICAgICBtYXlSZW1vdmUucHVzaChkb21TdHlsZSlcbiAgICB9XG4gICAgaWYgKG5ld0xpc3QpIHtcbiAgICAgIHN0eWxlcyA9IGxpc3RUb1N0eWxlcyhwYXJlbnRJZCwgbmV3TGlzdClcbiAgICAgIGFkZFN0eWxlc1RvRG9tKHN0eWxlcylcbiAgICB9IGVsc2Uge1xuICAgICAgc3R5bGVzID0gW11cbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtYXlSZW1vdmUubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBkb21TdHlsZSA9IG1heVJlbW92ZVtpXVxuICAgICAgaWYgKGRvbVN0eWxlLnJlZnMgPT09IDApIHtcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xuICAgICAgICAgIGRvbVN0eWxlLnBhcnRzW2pdKClcbiAgICAgICAgfVxuICAgICAgICBkZWxldGUgc3R5bGVzSW5Eb21bZG9tU3R5bGUuaWRdXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGFkZFN0eWxlc1RvRG9tIChzdHlsZXMgLyogQXJyYXk8U3R5bGVPYmplY3Q+ICovKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBzdHlsZXNbaV1cbiAgICB2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXVxuICAgIGlmIChkb21TdHlsZSkge1xuICAgICAgZG9tU3R5bGUucmVmcysrXG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIGRvbVN0eWxlLnBhcnRzW2pdKGl0ZW0ucGFydHNbal0pXG4gICAgICB9XG4gICAgICBmb3IgKDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgZG9tU3R5bGUucGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdKSlcbiAgICAgIH1cbiAgICAgIGlmIChkb21TdHlsZS5wYXJ0cy5sZW5ndGggPiBpdGVtLnBhcnRzLmxlbmd0aCkge1xuICAgICAgICBkb21TdHlsZS5wYXJ0cy5sZW5ndGggPSBpdGVtLnBhcnRzLmxlbmd0aFxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgcGFydHMgPSBbXVxuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIHBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSkpXG4gICAgICB9XG4gICAgICBzdHlsZXNJbkRvbVtpdGVtLmlkXSA9IHsgaWQ6IGl0ZW0uaWQsIHJlZnM6IDEsIHBhcnRzOiBwYXJ0cyB9XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGxpc3RUb1N0eWxlcyAocGFyZW50SWQsIGxpc3QpIHtcbiAgdmFyIHN0eWxlcyA9IFtdXG4gIHZhciBuZXdTdHlsZXMgPSB7fVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV1cbiAgICB2YXIgaWQgPSBpdGVtWzBdXG4gICAgdmFyIGNzcyA9IGl0ZW1bMV1cbiAgICB2YXIgbWVkaWEgPSBpdGVtWzJdXG4gICAgdmFyIHNvdXJjZU1hcCA9IGl0ZW1bM11cbiAgICB2YXIgcGFydCA9IHsgY3NzOiBjc3MsIG1lZGlhOiBtZWRpYSwgc291cmNlTWFwOiBzb3VyY2VNYXAgfVxuICAgIGlmICghbmV3U3R5bGVzW2lkXSkge1xuICAgICAgcGFydC5pZCA9IHBhcmVudElkICsgJzowJ1xuICAgICAgc3R5bGVzLnB1c2gobmV3U3R5bGVzW2lkXSA9IHsgaWQ6IGlkLCBwYXJ0czogW3BhcnRdIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIHBhcnQuaWQgPSBwYXJlbnRJZCArICc6JyArIG5ld1N0eWxlc1tpZF0ucGFydHMubGVuZ3RoXG4gICAgICBuZXdTdHlsZXNbaWRdLnBhcnRzLnB1c2gocGFydClcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHN0eWxlc1xufVxuXG5mdW5jdGlvbiBjcmVhdGVTdHlsZUVsZW1lbnQgKCkge1xuICB2YXIgc3R5bGVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKVxuICBzdHlsZUVsZW1lbnQudHlwZSA9ICd0ZXh0L2NzcydcbiAgaGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpXG4gIHJldHVybiBzdHlsZUVsZW1lbnRcbn1cblxuZnVuY3Rpb24gYWRkU3R5bGUgKG9iaiAvKiBTdHlsZU9iamVjdFBhcnQgKi8pIHtcbiAgdmFyIHVwZGF0ZSwgcmVtb3ZlXG4gIHZhciBzdHlsZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdzdHlsZVtkYXRhLXZ1ZS1zc3ItaWR+PVwiJyArIG9iai5pZCArICdcIl0nKVxuICB2YXIgaGFzU1NSID0gc3R5bGVFbGVtZW50ICE9IG51bGxcblxuICAvLyBpZiBpbiBwcm9kdWN0aW9uIG1vZGUgYW5kIHN0eWxlIGlzIGFscmVhZHkgcHJvdmlkZWQgYnkgU1NSLFxuICAvLyBzaW1wbHkgZG8gbm90aGluZy5cbiAgaWYgKGhhc1NTUiAmJiBpc1Byb2R1Y3Rpb24pIHtcbiAgICByZXR1cm4gbm9vcFxuICB9XG5cbiAgaWYgKGlzT2xkSUUpIHtcbiAgICAvLyB1c2Ugc2luZ2xldG9uIG1vZGUgZm9yIElFOS5cbiAgICB2YXIgc3R5bGVJbmRleCA9IHNpbmdsZXRvbkNvdW50ZXIrK1xuICAgIHN0eWxlRWxlbWVudCA9IHNpbmdsZXRvbkVsZW1lbnQgfHwgKHNpbmdsZXRvbkVsZW1lbnQgPSBjcmVhdGVTdHlsZUVsZW1lbnQoKSlcbiAgICB1cGRhdGUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50LCBzdHlsZUluZGV4LCBmYWxzZSlcbiAgICByZW1vdmUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50LCBzdHlsZUluZGV4LCB0cnVlKVxuICB9IGVsc2Uge1xuICAgIC8vIHVzZSBtdWx0aS1zdHlsZS10YWcgbW9kZSBpbiBhbGwgb3RoZXIgY2FzZXNcbiAgICBzdHlsZUVsZW1lbnQgPSBzdHlsZUVsZW1lbnQgfHwgY3JlYXRlU3R5bGVFbGVtZW50KClcbiAgICB1cGRhdGUgPSBhcHBseVRvVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50KVxuICAgIHJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudClcbiAgICB9XG4gIH1cblxuICBpZiAoIWhhc1NTUikge1xuICAgIHVwZGF0ZShvYmopXG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlU3R5bGUgKG5ld09iaiAvKiBTdHlsZU9iamVjdFBhcnQgKi8pIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJlxuICAgICAgICAgIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmXG4gICAgICAgICAgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIHVwZGF0ZShvYmogPSBuZXdPYmopXG4gICAgfSBlbHNlIHtcbiAgICAgIHJlbW92ZSgpXG4gICAgfVxuICB9XG59XG5cbnZhciByZXBsYWNlVGV4dCA9IChmdW5jdGlvbiAoKSB7XG4gIHZhciB0ZXh0U3RvcmUgPSBbXVxuXG4gIHJldHVybiBmdW5jdGlvbiAoaW5kZXgsIHJlcGxhY2VtZW50KSB7XG4gICAgdGV4dFN0b3JlW2luZGV4XSA9IHJlcGxhY2VtZW50XG4gICAgcmV0dXJuIHRleHRTdG9yZS5maWx0ZXIoQm9vbGVhbikuam9pbignXFxuJylcbiAgfVxufSkoKVxuXG5mdW5jdGlvbiBhcHBseVRvU2luZ2xldG9uVGFnIChzdHlsZUVsZW1lbnQsIGluZGV4LCByZW1vdmUsIG9iaikge1xuICB2YXIgY3NzID0gcmVtb3ZlID8gJycgOiBvYmouY3NzXG5cbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IHJlcGxhY2VUZXh0KGluZGV4LCBjc3MpXG4gIH0gZWxzZSB7XG4gICAgdmFyIGNzc05vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpXG4gICAgdmFyIGNoaWxkTm9kZXMgPSBzdHlsZUVsZW1lbnQuY2hpbGROb2Rlc1xuICAgIGlmIChjaGlsZE5vZGVzW2luZGV4XSkgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKGNoaWxkTm9kZXNbaW5kZXhdKVxuICAgIGlmIChjaGlsZE5vZGVzLmxlbmd0aCkge1xuICAgICAgc3R5bGVFbGVtZW50Lmluc2VydEJlZm9yZShjc3NOb2RlLCBjaGlsZE5vZGVzW2luZGV4XSlcbiAgICB9IGVsc2Uge1xuICAgICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGNzc05vZGUpXG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGFwcGx5VG9UYWcgKHN0eWxlRWxlbWVudCwgb2JqKSB7XG4gIHZhciBjc3MgPSBvYmouY3NzXG4gIHZhciBtZWRpYSA9IG9iai5tZWRpYVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcFxuXG4gIGlmIChtZWRpYSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ21lZGlhJywgbWVkaWEpXG4gIH1cblxuICBpZiAoc291cmNlTWFwKSB7XG4gICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIuY2hyb21lLmNvbS9kZXZ0b29scy9kb2NzL2phdmFzY3JpcHQtZGVidWdnaW5nXG4gICAgLy8gdGhpcyBtYWtlcyBzb3VyY2UgbWFwcyBpbnNpZGUgc3R5bGUgdGFncyB3b3JrIHByb3Blcmx5IGluIENocm9tZVxuICAgIGNzcyArPSAnXFxuLyojIHNvdXJjZVVSTD0nICsgc291cmNlTWFwLnNvdXJjZXNbMF0gKyAnICovJ1xuICAgIC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI2NjAzODc1XG4gICAgY3NzICs9ICdcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LCcgKyBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpICsgJyAqLydcbiAgfVxuXG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3NcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZClcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpXG4gIH1cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi92dWUtc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXNDbGllbnQuanNcbi8vIG1vZHVsZSBpZCA9IDQ2XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIi8qKlxuICogVHJhbnNsYXRlcyB0aGUgbGlzdCBmb3JtYXQgcHJvZHVjZWQgYnkgY3NzLWxvYWRlciBpbnRvIHNvbWV0aGluZ1xuICogZWFzaWVyIHRvIG1hbmlwdWxhdGUuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbGlzdFRvU3R5bGVzIChwYXJlbnRJZCwgbGlzdCkge1xuICB2YXIgc3R5bGVzID0gW11cbiAgdmFyIG5ld1N0eWxlcyA9IHt9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXVxuICAgIHZhciBpZCA9IGl0ZW1bMF1cbiAgICB2YXIgY3NzID0gaXRlbVsxXVxuICAgIHZhciBtZWRpYSA9IGl0ZW1bMl1cbiAgICB2YXIgc291cmNlTWFwID0gaXRlbVszXVxuICAgIHZhciBwYXJ0ID0ge1xuICAgICAgaWQ6IHBhcmVudElkICsgJzonICsgaSxcbiAgICAgIGNzczogY3NzLFxuICAgICAgbWVkaWE6IG1lZGlhLFxuICAgICAgc291cmNlTWFwOiBzb3VyY2VNYXBcbiAgICB9XG4gICAgaWYgKCFuZXdTdHlsZXNbaWRdKSB7XG4gICAgICBzdHlsZXMucHVzaChuZXdTdHlsZXNbaWRdID0geyBpZDogaWQsIHBhcnRzOiBbcGFydF0gfSlcbiAgICB9IGVsc2Uge1xuICAgICAgbmV3U3R5bGVzW2lkXS5wYXJ0cy5wdXNoKHBhcnQpXG4gICAgfVxuICB9XG4gIHJldHVybiBzdHlsZXNcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi92dWUtc3R5bGUtbG9hZGVyL2xpYi9saXN0VG9TdHlsZXMuanNcbi8vIG1vZHVsZSBpZCA9IDQ3XG4vLyBtb2R1bGUgY2h1bmtzID0gMSJdLCJzb3VyY2VSb290IjoiIn0=