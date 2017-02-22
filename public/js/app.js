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
                scrollTop: coord.bottom + window.scrollY
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9+L3Z1ZS1sb2FkZXIvbGliL2NvbXBvbmVudC1ub3JtYWxpemVyLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvYXBwLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvc2Fzcy9hcHAuc2NzcyIsIndlYnBhY2s6Ly8vcmF0ZXMudnVlIiwid2VicGFjazovLy9zZXJ2ZXJQYWdlLnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3BhZ2VzL2hvbWUuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9yb3V0ZXMuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zdGFydHVwLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL3JhdGVzLnZ1ZT83ZWUwIiwid2VicGFjazovLy8uL34vY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL3JhdGVzLnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvc2VydmVyUGFnZS52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL3JhdGVzLnZ1ZT9jOGVhIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9zZXJ2ZXJQYWdlLnZ1ZT9kYjQzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9yYXRlcy52dWU/NjE2OCIsIndlYnBhY2s6Ly8vLi9+L3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlc0NsaWVudC5qcyIsIndlYnBhY2s6Ly8vLi9+L3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2xpc3RUb1N0eWxlcy5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwiVnVlIiwiY29tcG9uZW50IiwiVnVlQXBwIiwiZWwiLCJyb3V0ZXIiLCJkYXRhIiwic29tZXZhciIsImNyZWF0ZWQiLCJ3aW5kb3ciLCJnb3RvUGFnZSIsInBhZ2UiLCJwdXNoIiwiVXRpbHMiLCIkIiwiZG9jdW1lbnQiLCJyZWFkeSIsImNhcm91c2VsIiwiaW50ZXJ2YWwiLCJvbiIsInJlbW92ZSIsInNjcm9sbCIsInNjcm9sbFRvcCIsImZhZGVJbiIsImZhZGVPdXQiLCJhbmltYXRlIiwiY29vcmQiLCJnZXRDb29yZGluYXRlcyIsImJvdHRvbSIsInNjcm9sbFkiLCJ0b29sdGlwIiwidG9nZ2xlQ2xhc3MiLCJzZXJ2ZXJQYWdlIiwicm91dGVzIiwicGF0aCIsInRhcmdldCIsIm1vZGUiLCJ1c2UiLCJWdWVSb3V0ZXIiLCJheGlvcyIsImRlZmF1bHRzIiwiaGVhZGVycyIsImNvbW1vbiIsIkxhcmF2ZWwiLCJjc3JmVG9rZW4iLCJsYXN0QWpheFJlcGx5IiwiYWpheFN5bmNoIiwidXJsIiwibWV0aG9kIiwiZGF0YVR5cGUiLCJmblN1Y2Nlc3MiLCJmbkVycm9yIiwicmVzdWx0IiwiZm5PSyIsInIiLCJmbkJBRCIsImNvbnNvbGUiLCJsb2ciLCJvcHRpb25zIiwidHlwZSIsInN1Y2Nlc3MiLCJlcnJvciIsImFzeW5jIiwiYWpheCIsImxhc3RSZXNwb25zZSIsImdldEpTT04iLCJmbkJhZCIsInJldCIsIkoiLCJKU09OIiwicGFyc2UiLCJwb3N0SlNPTiIsImdldEhUTUwiLCJ3aXRoRGF0YSIsImh0bWwiLCJrZXkiLCJ2YWx1ZSIsInJleCIsIlJlZ0V4cCIsInJlcGxhY2UiLCJydW5pdCIsIm1hdGNoIiwiY29kZSIsImV2YWwiLCJsZWZ0Iiwic3RyIiwibiIsIlN0cmluZyIsImxlbmd0aCIsInN1YnN0cmluZyIsInJpZ2h0IiwiaUxlbiIsInN0clBhZCIsIm1heExlbiIsInBhZFdpdGgiLCJ0b0FkZCIsIkFycmF5Iiwiam9pbiIsInplcm9QYWQiLCJpIiwidGl0bGVDYXNlIiwic3BsaXQiLCJtYXAiLCJ2YWwiLCJjaGFyQXQiLCJ0b1VwcGVyQ2FzZSIsInN1YnN0ciIsInRvTG93ZXJDYXNlIiwiZmlyc3RDYXAiLCJkYXRlMnN0cmluZyIsImQiLCJzZXAiLCJEYXRlIiwibmV3RGF0ZSIsImRkIiwiZ2V0RGF0ZSIsIm1tIiwiZ2V0TW9udGgiLCJ5eSIsImdldEZ1bGxZZWFyIiwicmVuZGVyVGFibGUiLCJjb2x1bW5zIiwidGFibGUiLCJ0aGVhZCIsInRib2R5IiwicyIsImNlbGxWYWx1ZSIsImNvbFR5cGUiLCJyb3dBY3Rpb25zIiwiZmllbGQiLCJuYW1lIiwibGFiZWwiLCJjb2wiLCJjb2xMYWJlbCIsInNvcnRhYmxlIiwiYXR0ciIsImF0dHJpYnV0ZXMiLCJqIiwiZm9ybWF0Q3VycmVuY3kiLCJpc1Zpc2libGUiLCJub2RlIiwiSFRNTEVsZW1lbnQiLCJpcyIsImZpcnN0IiwiZ2V0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwidyIsImJvZHkiLCJ0b3AiLCJ2IiwiaXNOYU4iLCJwYXJzZUZsb2F0IiwidG9GaXhlZCIsInRvU3RyaW5nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDZEQUE2RDtBQUM3RDtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDOUNBLG1CQUFBQSxDQUFRLEVBQVI7O0FBSUE7QUFDQTtBQUNBQyxJQUFJQyxTQUFKLENBQWMsV0FBZCxFQUEyQixtQkFBQUYsQ0FBUSxFQUFSLENBQTNCO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7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QSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5REFBeUQ7QUFDekQ7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNyT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsaUJBQWlCO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyx3QkFBd0I7QUFDM0QsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiL2pzL2FwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbm9ybWFsaXplQ29tcG9uZW50IChcbiAgcmF3U2NyaXB0RXhwb3J0cyxcbiAgY29tcGlsZWRUZW1wbGF0ZSxcbiAgc2NvcGVJZCxcbiAgY3NzTW9kdWxlc1xuKSB7XG4gIHZhciBlc01vZHVsZVxuICB2YXIgc2NyaXB0RXhwb3J0cyA9IHJhd1NjcmlwdEV4cG9ydHMgPSByYXdTY3JpcHRFeHBvcnRzIHx8IHt9XG5cbiAgLy8gRVM2IG1vZHVsZXMgaW50ZXJvcFxuICB2YXIgdHlwZSA9IHR5cGVvZiByYXdTY3JpcHRFeHBvcnRzLmRlZmF1bHRcbiAgaWYgKHR5cGUgPT09ICdvYmplY3QnIHx8IHR5cGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICBlc01vZHVsZSA9IHJhd1NjcmlwdEV4cG9ydHNcbiAgICBzY3JpcHRFeHBvcnRzID0gcmF3U2NyaXB0RXhwb3J0cy5kZWZhdWx0XG4gIH1cblxuICAvLyBWdWUuZXh0ZW5kIGNvbnN0cnVjdG9yIGV4cG9ydCBpbnRlcm9wXG4gIHZhciBvcHRpb25zID0gdHlwZW9mIHNjcmlwdEV4cG9ydHMgPT09ICdmdW5jdGlvbidcbiAgICA/IHNjcmlwdEV4cG9ydHMub3B0aW9uc1xuICAgIDogc2NyaXB0RXhwb3J0c1xuXG4gIC8vIHJlbmRlciBmdW5jdGlvbnNcbiAgaWYgKGNvbXBpbGVkVGVtcGxhdGUpIHtcbiAgICBvcHRpb25zLnJlbmRlciA9IGNvbXBpbGVkVGVtcGxhdGUucmVuZGVyXG4gICAgb3B0aW9ucy5zdGF0aWNSZW5kZXJGbnMgPSBjb21waWxlZFRlbXBsYXRlLnN0YXRpY1JlbmRlckZuc1xuICB9XG5cbiAgLy8gc2NvcGVkSWRcbiAgaWYgKHNjb3BlSWQpIHtcbiAgICBvcHRpb25zLl9zY29wZUlkID0gc2NvcGVJZFxuICB9XG5cbiAgLy8gaW5qZWN0IGNzc01vZHVsZXNcbiAgaWYgKGNzc01vZHVsZXMpIHtcbiAgICB2YXIgY29tcHV0ZWQgPSBvcHRpb25zLmNvbXB1dGVkIHx8IChvcHRpb25zLmNvbXB1dGVkID0ge30pXG4gICAgT2JqZWN0LmtleXMoY3NzTW9kdWxlcykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICB2YXIgbW9kdWxlID0gY3NzTW9kdWxlc1trZXldXG4gICAgICBjb21wdXRlZFtrZXldID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbW9kdWxlIH1cbiAgICB9KVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBlc01vZHVsZTogZXNNb2R1bGUsXG4gICAgZXhwb3J0czogc2NyaXB0RXhwb3J0cyxcbiAgICBvcHRpb25zOiBvcHRpb25zXG4gIH1cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi92dWUtbG9hZGVyL2xpYi9jb21wb25lbnQtbm9ybWFsaXplci5qc1xuLy8gbW9kdWxlIGlkID0gMTNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwicmVxdWlyZSgnLi9zdGFydHVwJyk7XG5cblxuXG4vLyBoZXJlIGxvYWQgYWxsIG91ciBjb21wb25lbnRzXG4vLyBlLmcuIFxuVnVlLmNvbXBvbmVudCgndnVlLXJhdGVzJywgcmVxdWlyZSgnLi9jb21wb25lbnRzL3JhdGVzJykpO1xuLy8gb3Jcbi8vIFZ1ZS5jb21wb25lbnQoJ2xvdmUnLCB7dGVtcGxhdGUgOiAnPGRpdj4gTG92ZSBpcyBpbiB0aGUgYWlyPC9kaXYnfSk7XG5cbi8vVnVlLmNvbXBvbmVudCgnZHluYW1pYycsIHJlcXVpcmUoJy4vY29tcG9uZW50cy9keW5hbWljJykpO1xuXG5pbXBvcnQgcm91dGVyIGZyb20gJy4vcm91dGVzJztcblxuY29uc3QgVnVlQXBwID0gbmV3IFZ1ZSh7XG4gICAgZWw6ICcjYXBwJyxcbiAgICByb3V0ZXIsXG4gICAgZGF0YToge1xuICAgIFx0c29tZXZhcjogJ1lFUyAhISEhISdcbiAgICB9LFxuICAgIGNyZWF0ZWQoKSB7IH1cbiAgICBcbn0pO1xuXG53aW5kb3cuVnVlQXBwPVZ1ZUFwcDtcblxuZnVuY3Rpb24gZ290b1BhZ2UocGFnZSl7XG5cdHJvdXRlci5wdXNoKHBhZ2UpO1xufVxuXG53aW5kb3cuZ290b1BhZ2U9Z290b1BhZ2U7XG5cblxuaW1wb3J0IFV0aWxzIGZyb20gJy4vdXRpbHMnO1xuXG53aW5kb3cuVXRpbHM9VXRpbHM7XG5cbnJlcXVpcmUoJy4vcGFnZXMvaG9tZScpO1xuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2FwcC5qcyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL3Nhc3MvYXBwLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDE1XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIi8qIFxuXG5cdEV4cGVjdHMgYSBwcm9wZXJ0eSBuYW1lZCByYXRlc2RhdGEgaW4gdGhlIGZvcm0geyBiYXNlOiBiYXNlQ0NZLCBkYXRlOiBkYXRlLCByYXRlczoge2NjeTE6cmF0ZTEsIGNjMjpyYXRlMiAuLi59IH1cblxuXG4qL1xuXG48dGVtcGxhdGU+XG48ZGl2IGNsYXNzPSd0aWNrZXJXcmFwJyB2LXNob3c9J3JhdGVzRGF0YSc+XG5cdDxkaXYgdi1pZj0ncmF0ZXNEYXRhLmRhdGUnIGNsYXNzPSdyYXRlc1RhYmxlJz4gIFxuXHRcdDxkaXY+e3tyYXRlc0RhdGEuYmFzZX19IFJhdGVzIGFzIG9mIDoge3tyYXRlc0RhdGEuZGF0ZX19ICAgPC9kaXY+IFxuXHRcdDxkaXYgY2xhc3M9J2NjeVJlY29yZCcgdi1mb3I9JyhyYXRlLGNjeSkgaW4gcmF0ZXNEYXRhLnJhdGVzJz5cblx0XHRcdDxkaXY+IHt7Y2N5fX0gOiA8L2Rpdj4gXG5cdFx0XHQ8ZGl2PiB7e3JhdGV9fSAgPC9kaXY+XG5cdFx0PC9kaXY+XG5cdDwvZGl2PlxuPC9kaXY+XG5cbjwvdGVtcGxhdGU+XG5cblxuPHNjcmlwdCA+XG5leHBvcnQgZGVmYXVsdCB7XG4gZGF0YSgpIHtyZXR1cm4ge3JhdGVzRGF0YSA6IHt9fX0gLFxuIG5hbWU6J3Z1ZS1yYXRlcycsXG4gbW91bnRlZCgpIHsgYXhpb3MuZ2V0KCcvL2FwaS5maXhlci5pby9sYXRlc3Q/YmFzZT1FVVImc3ltYm9scz1HQlAsVVNELEVVUicpLnRoZW4oICAocmV0KSA9PiB7IHRoaXMucmF0ZXNEYXRhPXJldC5kYXRhfSApIH1cbn1cbjwvc2NyaXB0PlxuXG5cbjxzdHlsZSBzY29wZWQgbGFuZz1cInNjc3NcIj5cblxuLnRpY2tlcldyYXB7XG59XG5cbi5jY3lSZWNvcmR7XG5cdGRpc3BsYXk6ZmxleDtcblx0ZmxleC1kaXJlY3Rpb246IHJvdztcblx0anVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuXHQmOm5vdChsYXN0LWNoaWxkKSB7XG5cdFx0cGFkZGluZy1sZWZ0OiAzNXB4O1xuXHR9XG5cdGRpdjpsYXN0LWNoaWxkIHtcblx0XHRwYWRkaW5nLWxlZnQ6IDNweDtcblx0fVxufVxuXG4ucmF0ZXNUYWJsZXtcblx0ZGlzcGxheTppbmxpbmUtZmxleDtcblx0cG9zaXRpb246YWJzb2x1dGU7XG5cdGZsZXgtZGlyZWN0aW9uOiByb3c7XG5cdHdoaXRlLXNwYWNlOiBub3dyYXA7XG5cdGp1c3RpZnktY29udGVudDpsZWZ0O1xuXHRjb2xvcjpkYXJrZW4oZGFya2JsdWUsMjAlKTtcblx0bWFyZ2luOjBweDtcblx0bGVmdDoxMDAlO1xuXHRhbmltYXRpb246IG15bW92ZSA2MHMgMXMgaW5maW5pdGUgbGluZWFyO1xufVxuXG5Aa2V5ZnJhbWVzIG15bW92ZXtcbiAgICAwJSB7bGVmdDogMTAwJTt9ICAgXG4gICAgMTAwJSB7IHRyYW5zZm9ybTp0cmFuc2xhdGVYKC0xMDAlKTtsZWZ0OjAlO31cbn1cblxuXHRcbjwvc3R5bGU+XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gcmF0ZXMudnVlPzg5YWQwYzNhIiwiPHRlbXBsYXRlPlxuXG4gICAgPGRpdj5cbiAgICAgICAgPGRpdiB2LXNob3c9XCJodG1sPT0nJ1wiPlxuICAgICAgICAgICAgPHNsb3Q+PC9zbG90PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGR5bmFtaWMtc2VydmVyLXBhZ2UtY29tcG9uZW50IHYtaWY9J2h0bWwnIDpodG1sPSdodG1sJyA6ZGF0YT1cImNvbnRleHREYXRhXCI+PC9keW5hbWljLXNlcnZlci1wYWdlLWNvbXBvbmVudD4gXG4gICAgPC9kaXY+XG4gICAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuXG4gICAgdmFyIExvYWRpbmcgPSB7XG4gICAgICAgIHRlbXBsYXRlOiBgPGRpdj48L2Rpdj5gXG4gICAgfVxuXG4gICAgdmFyIHJlbmRlcj0gZnVuY3Rpb24oaCwgY29udGV4dCkge1xuICAgICAgICAgICAgdmFyIGh0bWw9Y29udGV4dC5wcm9wcy5odG1sIDtcbiAgICAgICAgICAgIGNvbnN0IGR5bkNvbXBvbmVudCA9IHtcbiAgICAgICAgICAgICAgICBuYW1lOidkeW5hbWljLXNlcnZlci1wYWdlLWNvbXBvbmVudCcsXG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6aHRtbCxcbiAgICAgICAgICAgICAgICBkYXRhKCkgeyByZXR1cm4gY29udGV4dC5wcm9wcy5kYXRhIH0sXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBjb21wb25lbnQgPSBodG1sID8gZHluQ29tcG9uZW50IDogTG9hZGluZztcbiAgICAgICAgICAgIHJldHVybiBoKGNvbXBvbmVudCk7XG4gICAgICAgIH1cblxuICAgIHZhciBEeW5hbWljU2VydmVyUGFnZUNvbXBvbmVudD0ge1xuICAgICAgICBmdW5jdGlvbmFsOiB0cnVlLFxuICAgICAgICBuYW1lOidkeW5hbWljLXNlcnZlci1wYWdlLWNvbXBvbmVudCcsXG4gICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgICBodG1sOiBTdHJpbmcsXG4gICAgICAgICAgICBkYXRhOiB7IHR5cGU6IE9iamVjdCwgZGVmYXVsdDogKCkgPT4ge30gfVxuICAgICAgICB9LFxuICAgICAgICByZW5kZXJcbiAgICB9XG5cblxuICAgIGV4cG9ydCBkZWZhdWx0IHtcbiAgICAgICAgZGF0YSgpIHsgcmV0dXJuIHsgcGF0aDogJycsIGh0bWw6JycsIHNjcmlwdHM6ICcnLCBzdGF0dXM6JycgfSB9LFxuICAgICAgICBuYW1lOidzZXJ2ZXItcGFnZScsXG4gICAgICAgIGNvbXB1dGVkOiB7XG4gICAgICAgICAgICBjb250ZXh0RGF0YSgpIHsgXG4gICAgICAgICAgICAgICAgcmV0dXJuICB0aGlzLiRwYXJlbnQuX2RhdGFcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBjb21wb25lbnRzOiB7IER5bmFtaWNTZXJ2ZXJQYWdlQ29tcG9uZW50IH0sXG4gICAgICAgIG1vdW50ZWQoKSB7IFxuICAgICAgICAgICAgaWYoICEgdGhpcy4kc2xvdHNbJ2RlZmF1bHQnXSl7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93UGFnZSgpXG4gICAgICAgICAgICB9IFxuICAgICAgICB9LFxuICAgICAgICBtZXRob2RzOiB7XG5cdFx0XG4gICAgICAgIFx0c2hvd1BhZ2U6IGZ1bmN0aW9uKCl7IFxuXHQgICAgICAgXHRcdHZhciBteT10aGlzO1xuICAgICAgICAgICAgICAgIG15LnBhdGg9bXkuJHJvdXRlLnBhdGggXG4gICAgICAgIFx0XHRsZXQgdGFyZ2V0PW15LiRyb3V0ZS50YXJnZXQgfHwgbXkuJHJvdXRlLnBhdGg7XG4gICAgICAgIFx0XHR2YXIgT0s9cmVwbHk9Pntcblx0ICAgICAgICBcdFx0bXkuc3RhdHVzPXJlcGx5LnN0YXR1czsgXG4gICAgICAgICAgICAgICAgICAgIGxldCBwYWdlRE9NPXRoaXMucGFyc2VQYWdlKHJlcGx5LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICBteS5odG1sPXBhZ2VET00uaHRtbCA7XG4gICAgICAgICAgICAgICAgICAgIG15LnNjcmlwdHM9cGFnZURPTS5zY3JpcHRzIDtcbiAgICAgICAgICAgICAgICAgICAgJChcImh0bWwsIGJvZHlcIikuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxUb3AgOiAwXG4gICAgICAgICAgICAgICAgICAgIH0sIDEpO1xuICAgICAgICAgICAgICAgICAgICBpZihteS5zY3JpcHRzKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2YWwobXkuc2NyaXB0cyk7XG4gICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICBcdH07XG4gICAgICAgIFx0XHR2YXIgQkFEPWVycm9yPT4ge1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKGVycm9yKTtcblx0ICAgICAgICBcdFx0bXkuaHRtbD1lcnJvci5yZXNwb25zZS5kYXRhO1xuXHQgICAgICAgIFx0XHRteS5zdGF0dXM9ZXJyb3IucmVzcG9uc2Uuc3RhdHVzOyBcblx0ICAgICAgICBcdH07XG4gICAgICAgIFx0XHRheGlvcy5nZXQodGFyZ2V0KS50aGVuKE9LKS5jYXRjaChCQUQpXG5cdCAgICAgICAgfSxcblxuICAgICAgICAgICAgcGFyc2VQYWdlOiBmdW5jdGlvbihodG1sKXtcbiAgICAgICAgICAgICAgICBsZXQgcGFnZT0kLnBhcnNlSFRNTCgkLnRyaW0oaHRtbCksbnVsbCx0cnVlKTtcbiAgICAgICAgICAgICAgICBsZXQgcHVyZUhUTUw9Jyc7XG4gICAgICAgICAgICAgICAgbGV0IHNjcmlwdHM9Jyc7XG4gICAgICAgICAgICAgICAgdmFyIGVsZW1lbnRzPTA7XG4gICAgICAgICAgICAgICAgJC5lYWNoKHBhZ2UsIChpLGVsKSA9PiB7IFxuICAgICAgICAgICAgICAgICAgICBpZiAoZWwubm9kZU5hbWUudG9Mb3dlckNhc2UoKT09J3NjcmlwdCcgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JpcHRzPXNjcmlwdHMgKyBlbC5pbm5lckhUTUwgKyAnXFxuJztcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHsgXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWwub3V0ZXJIVE1MKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHVyZUhUTUw9IHB1cmVIVE1MICsgZWwub3V0ZXJIVE1MIDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50cysrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnRzIT0xKSBwdXJlSFRNTD0nPGRpdj4nK3B1cmVIVE1MKyc8L2Rpdj4nO1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGh0bWw6cHVyZUhUTUwgLCBzY3JpcHRzOnNjcmlwdHN9O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgd2F0Y2g6IHsgICckcm91dGUnICh0bywgZnJvbSkgeyB0aGlzLnNob3dQYWdlKCkgfSB9XG4gICAgfVxuPC9zY3JpcHQ+XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc2VydmVyUGFnZS52dWU/NjU5YjMwNmUiLCJcblxuJChkb2N1bWVudCkucmVhZHkoKCkgPT4ge1xuXG4gICAgJCgnLmNhcm91c2VsJykuY2Fyb3VzZWwoe1xuICAgICAgaW50ZXJ2YWw6IDQyMDBcbiAgICB9KVxuXG4gICAgJCgnYm9keScpLm9uKCdoaWRkZW4nLCAnI2xvZ2luLW1vZGFsJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICQoJy5hbGVydCcpLnJlbW92ZSgpO1xuICAgIH0pO1xuXG4gICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCQodGhpcykuc2Nyb2xsVG9wKCkgPiAxMDApIHtcbiAgICAgICAgICAgICQoJy5zY3JvbGx1cCcpLmZhZGVJbigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCgnLnNjcm9sbHVwJykuZmFkZU91dCgpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAkKCdib2R5Jykub24oJ2NsaWNrJywgJy5zY3JvbGx1cCcsZnVuY3Rpb24oKSB7XG4gICAgICAgICQoXCJodG1sLCBib2R5XCIpLmFuaW1hdGUoe1xuICAgICAgICAgICAgc2Nyb2xsVG9wIDogMFxuICAgICAgICB9LCA2MDApO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG5cbiAgICAkKCdib2R5Jykub24oJ2NsaWNrJywgJy5hcnJvd0Rvd24nLGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgY29vcmQ9VXRpbHMuZ2V0Q29vcmRpbmF0ZXMoJyNob21lQ3Jvd2RmdW5kaW5nJyk7XG4gICAgICAgIGlmIChjb29yZCl7XG4gICAgICAgICAgICAkKFwiYm9keVwiKS5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICBzY3JvbGxUb3AgOiBjb29yZC5ib3R0b20gKyB3aW5kb3cuc2Nyb2xsWVxuICAgICAgICAgICAgfSwgNjAwKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG5cbiAgICAkKGRvY3VtZW50KS5yZWFkeSggKCkgPT4ge1xuXG4gICAgICAgICQoJy5zaG93LW15LXRvb2x0aXAnKS50b29sdGlwKHtcbiAgICAgICAgICAgICdwbGFjZW1lbnQnIDogJ2JvdHRvbSdcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAkKCdib2R5Jykub24oJ2NsaWNrJywnLnZpZXdhbGxjYXQnICxmdW5jdGlvbigpe1xuICAgICAgICAkKFwiLmFsbENhdGVnb3JpZXNcIikudG9nZ2xlQ2xhc3MoXCJoaWRlYWxsXCIpO1xuICAgIH0pO1xufSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3BhZ2VzL2hvbWUuanMiLCJpbXBvcnQgVnVlIGZyb20gJ3Z1ZSc7XG5pbXBvcnQgVnVlUm91dGVyIGZyb20gJ3Z1ZS1yb3V0ZXInO1xuXG5jb25zdCBzZXJ2ZXJQYWdlID0gVnVlLmNvbXBvbmVudCgnc2VydmVyLXBhZ2UnLHJlcXVpcmUoJy4vY29tcG9uZW50cy9zZXJ2ZXJQYWdlLnZ1ZScpKTtcblxubGV0IHJvdXRlcyA9IFtcblx0e1xuXHRcdHBhdGg6ICcvJyxcdFx0XHRcblx0XHRjb21wb25lbnQ6IHNlcnZlclBhZ2UgLFxuXHRcdHRhcmdldDonL3BhZ2UvaG9tZSdcblx0fSx7XG5cdFx0cGF0aDogJy9ob21lJyxcdFx0XHRcblx0XHRjb21wb25lbnQ6IHNlcnZlclBhZ2UgLFxuXHRcdHRhcmdldDonL3BhZ2UvaG9tZSdcblx0fSx7XG5cdFx0cGF0aDogJy9ob21lcGFnZScsXHRcdFx0XG5cdFx0Y29tcG9uZW50OiBzZXJ2ZXJQYWdlICxcblx0XHR0YXJnZXQ6Jy9wYWdlL2hvbWUnXG5cdH0se1xuXG5cdFx0cGF0aDogJy9wYWdlLyonLFx0XHRcdFx0XG5cdFx0Y29tcG9uZW50OiBzZXJ2ZXJQYWdlIFxuXHRcblx0fSxcbl1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IFZ1ZVJvdXRlcih7XG5cdHJvdXRlcyxcblx0bW9kZTpcImhpc3RvcnlcIixcbn0pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9yb3V0ZXMuanMiLCJcbndpbmRvdy4kID0gd2luZG93LmpRdWVyeSA9IHJlcXVpcmUoJ2pxdWVyeScpO1xuXG5yZXF1aXJlKCdib290c3RyYXAtc2FzcycpO1xuXG5pbXBvcnQgVnVlIGZyb20gJ3Z1ZSc7XG5pbXBvcnQgVnVlUm91dGVyIGZyb20gJ3Z1ZS1yb3V0ZXInO1xuaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcblxuXG5WdWUudXNlKFZ1ZVJvdXRlcik7XG5cbndpbmRvdy5WdWU9VnVlO1xud2luZG93LlZ1ZVJvdXRlcj1WdWVSb3V0ZXI7XG53aW5kb3cuYXhpb3M9YXhpb3M7XG5cbndpbmRvdy5heGlvcy5kZWZhdWx0cy5oZWFkZXJzLmNvbW1vbiA9IHtcbiAgICAnWC1DU1JGLVRPS0VOJzogd2luZG93LkxhcmF2ZWwuY3NyZlRva2VuLFxuICAgICdYLVJlcXVlc3RlZC1XaXRoJzogJ1hNTEh0dHBSZXF1ZXN0J1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvc3RhcnR1cC5qcyIsImZ1bmN0aW9uIFV0aWxzKCl7XG5cblwidXNlIHN0cmljdFwiO1xuXG4gIHZhciBsYXN0QWpheFJlcGx5PScnO1xuXG4gIGZ1bmN0aW9uIGFqYXhTeW5jaCh1cmwsIG1ldGhvZCA9ICdHRVQnLGRhdGFUeXBlLCBkYXRhLCBmblN1Y2Nlc3MsIGZuRXJyb3Ipe1xuICAgIHZhciByZXN1bHQ9JydcbiAgICB2YXIgZm5PSz0gIGZuU3VjY2VzcyA/IGZ1bmN0aW9uKHIpeyBsYXN0QWpheFJlcGx5PXI7IGZuU3VjY2VzcyhyKTsgcmVzdWx0PXI7IH0gOiAgZnVuY3Rpb24ocil7IGxhc3RBamF4UmVwbHk9cjsgcmVzdWx0PXJ9O1xuICAgIHZhciBmbkJBRD0gZm5FcnJvciAgID8gZnVuY3Rpb24ocil7IGxhc3RBamF4UmVwbHk9cjsgZm5CQUQoKTsgY29uc29sZS5sb2coJ0ZhaWxlZCB0byAnICsgbWV0aG9kICsgJyAnICsgdXJsICl9IDogZnVuY3Rpb24ocil7IGxhc3RBamF4UmVwbHk9cjsgY29uc29sZS5sb2coJ0ZhaWxlZCB0byAnICsgbWV0aG9kICsgJyAnICsgdXJsICl9O1xuICAgIHZhciBvcHRpb25zPXtcbiAgICAgICAgICAgICAgdHlwZTogbWV0aG9kLFxuICAgICAgICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgICAgICAgZGF0YTogZGF0YSwgXG4gICAgICAgICAgICAgIHN1Y2Nlc3M6IGZuT0ssXG4gICAgICAgICAgICAgIGVycm9yOiBmbkJBRCwgXG4gICAgICAgICAgICAgIGFzeW5jOmZhbHNlXG4gICAgICAgICAgICB9O1xuICAgIGlmIChkYXRhVHlwZSkge1xuICAgICAgb3B0aW9ucy5kYXRhVHlwZT1kYXRhVHlwZTtcbiAgICB9XG4gICAgLy8gY29uc29sZS5sb2cgKG9wdGlvbnMpO1xuICAgICQuYWpheChvcHRpb25zKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgZnVuY3Rpb24gbGFzdFJlc3BvbnNlKCl7XG4gICAgcmV0dXJuIGxhc3RBamF4UmVwbHk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRKU09OKHVybCwgZGF0YT0nJyxmbk9LLCBmbkJhZCl7XG4gICAgdmFyIHJldD1hamF4U3luY2godXJsLCAnR0VUJywgJ2pzb24nLCBkYXRhLGZuT0ssIGZuQmFkKTtcbiAgICB2YXIgSiA9IHJldCA/ICAoIHR5cGVvZihyZXQpID09ICdvYmplY3QnID8gcmV0IDogSlNPTi5wYXJzZShyZXQpICkgOiB7fSA7XG4gICAgcmV0dXJuIEo7XG4gIH1cblxuXG4gIGZ1bmN0aW9uIHBvc3RKU09OKHVybCwgZGF0YT0nJywgZm5PSywgZm5CYWQpe1xuICAgIHZhciByZXQ9YWpheFN5bmNoKHVybCwgJ1BPU1QnLCAnanNvbicsIGRhdGEsZm5PSywgZm5CYWQpO1xuICAgIHZhciBKID0gcmV0ID8gICggdHlwZW9mKHJldCkgPT0gJ29iamVjdCcgPyByZXQgOiBKU09OLnBhcnNlKHJldCkgKSA6IHt9IDtcbiAgICByZXR1cm4gSjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEhUTUwodXJsLHdpdGhEYXRhKXtcbiAgICB2YXIgaHRtbD0gYWpheFN5bmNoKCB1cmwsICdHRVQnLCdodG1sJyApO1xuICAgIGlmICh3aXRoRGF0YSl7XG4gICAgICBmb3IgKHZhciBrZXkgaW4gd2l0aERhdGEpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gd2l0aERhdGFba2V5XTtcbiAgICAgICAgdmFyIHJleD1uZXcgUmVnRXhwKFwie3tcXFxccypcIiArIGtleSArIFwiXFxcXHMqfX1cIiwnZycpO1xuICAgICAgICBodG1sPWh0bWwucmVwbGFjZShyZXgsdmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgICB2YXIgcnVuaXQ9ZnVuY3Rpb24obWF0Y2gsY29kZSl7IFxuICAgICAgcmV0dXJuIGV2YWwoY29kZSk7XG4gICAgfTtcbiAgICB2YXIgcmV4PW5ldyBSZWdFeHAoXCJ7ISFcXFxccyooLispXFxcXHMhIX1cIiwnZycpO1xuICAgIGh0bWw9aHRtbC5yZXBsYWNlKHJleCxydW5pdCk7XG4gICAgcmV0dXJuIGh0bWw7XG4gIH1cbiAgXG4gIGZ1bmN0aW9uIGxlZnQoc3RyLCBuKXtcbiAgICBpZiAobiA8PSAwKVxuICAgICAgICByZXR1cm4gXCJcIjtcbiAgICBlbHNlIGlmIChuID4gU3RyaW5nKHN0cikubGVuZ3RoKVxuICAgICAgICByZXR1cm4gc3RyO1xuICAgIGVsc2VcbiAgICAgICAgcmV0dXJuIFN0cmluZyhzdHIpLnN1YnN0cmluZygwLG4pO1xuICB9XG5cbiAgZnVuY3Rpb24gcmlnaHQoc3RyLCBuKXtcbiAgICAgIGlmIChuIDw9IDApXG4gICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgIGVsc2UgaWYgKG4gPiBTdHJpbmcoc3RyKS5sZW5ndGgpXG4gICAgICAgICByZXR1cm4gc3RyO1xuICAgICAgZWxzZSB7XG4gICAgICAgICB2YXIgaUxlbiA9IFN0cmluZyhzdHIpLmxlbmd0aDtcbiAgICAgICAgIHJldHVybiBTdHJpbmcoc3RyKS5zdWJzdHJpbmcoaUxlbiwgaUxlbiAtIG4pO1xuICAgICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc3RyUGFkKHN0ciwgbWF4TGVuLCBwYWRXaXRoPScgJyl7XG4gICAgICAgIHZhciB0b0FkZDtcbiAgICAgICAgaWYgKG1heExlbiA8PSAwKSBcbiAgICAgICAgICB0b0FkZD1cIlwiO1xuICAgICAgICBlbHNlIFxuICAgICAgICAgIHRvQWRkPUFycmF5KG1heExlbisxKS5qb2luKHBhZFdpdGgpO1xuICAgICAgICBpZiAobWF4TGVuIDxTdHJpbmcoc3RyKS5sZW5ndGgpXG4gICAgICAgICAgbWF4TGVuPVN0cmluZyhzdHIpLmxlbmd0aDtcbiAgICAgICAgcmV0dXJuIHJpZ2h0KHRvQWRkK3N0cixtYXhMZW4pO1xuICAgIH1cblxuXG4gIGZ1bmN0aW9uIHplcm9QYWQoaSxuKXtcbiAgICByZXR1cm4gc3RyUGFkKGksbiwnMCcpO1xuICB9XG5cbiAgZnVuY3Rpb24gdGl0bGVDYXNlKHN0cikge1xuICAgIHJldHVybiBzdHIuc3BsaXQoJyAnKS5tYXAoZnVuY3Rpb24odmFsKXsgXG4gICAgICByZXR1cm4gdmFsLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgdmFsLnN1YnN0cigxKS50b0xvd2VyQ2FzZSgpO1xuICAgIH0pLmpvaW4oJyAnKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZpcnN0Q2FwKHN0cikge1xuICAgIHJldHVybiBzdHIuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHIuc3Vic3RyKDEpO1xuICB9XG5cblxuICBmdW5jdGlvbiBkYXRlMnN0cmluZyhkLHNlcD0nLycpe1xuICAgIGlmICghIChkIGluc3RhbmNlb2YgRGF0ZSkpIGQ9bmV3RGF0ZShkKTtcbiAgICB2YXIgZGQgPSB6ZXJvUGFkKGQuZ2V0RGF0ZSgpLDIpO1xuICAgIHZhciBtbSA9IHplcm9QYWQoZC5nZXRNb250aCgpKzEsMik7XG4gICAgdmFyIHl5ID0gZC5nZXRGdWxsWWVhcigpO1xuICAgIHJldHVybiBbZGQsbW0seXldLmpvaW4oc2VwKTtcbiAgfVxuXG5cbiAgZnVuY3Rpb24gcmVuZGVyVGFibGUob3B0aW9ucz17fSl7XG4gICAgdmFyIGNvbHVtbnM9b3B0aW9ucy5jb2x1bW5zIHx8IFtdO1xuICAgIHZhciBkYXRhPW9wdGlvbnMuZGF0YSB8fCBbXTtcbiAgICB2YXIga2V5PW9wdGlvbnMua2V5IHx8ICdpZCc7XG4gICAgdmFyIHRhYmxlPScnO1xuICAgIHZhciB0aGVhZD0nJztcbiAgICB2YXIgdGJvZHk9Jyc7XG4gICAgdmFyIHM9Jyc7XG4gICAgdmFyIGNlbGxWYWx1ZT0nJywgY29sVHlwZT0nJztcbiAgICB2YXIgcm93QWN0aW9ucz1vcHRpb25zLnJvd0FjdGlvbnMgfHwgJycgO1xuICAgIGlmICghIGNvbHVtbnMubGVuZ3RoICYmIGRhdGEubGVuZ3RoICkge1xuICAgICAgZm9yICh2YXIgZmllbGQgaW4gZGF0YVswXSkge1xuICAgICAgICBjb2x1bW5zLnB1c2goe25hbWU6IGZpZWxkLCBsYWJlbCA6IGZpcnN0Q2FwKGZpZWxkKX0pO1xuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBpID0gMCA7IGkgPCBjb2x1bW5zLmxlbmd0aCA7IGkrKykge1xuICAgICAgdmFyIGNvbD1jb2x1bW5zW2ldO1xuICAgICAgY29sVHlwZT0nJztcbiAgICAgIGlmKHR5cGVvZiBjb2wgPT0gJ3N0cmluZycpIHtcbiAgICAgICAgcz0gcyArIFwiPHRoPlwiICsgZmlyc3RDYXAoY29sKSArIFwiPC90aD5cXG5cIjtcbiAgICAgIH0gZWxzZSBpZih0eXBlb2YgY29sID09ICdvYmplY3QnKSB7XG4gICAgICAgIHZhciBjb2xMYWJlbD0nJztcbiAgICAgICAgY29sVHlwZT1jb2x1bW5zW2ldLnR5cGU7XG4gICAgICAgIGlmICgnbGFiZWwnIGluIGNvbCkge1xuICAgICAgICAgIGNvbExhYmVsPWNvbC5sYWJlbDtcbiAgICAgICAgfSBlbHNlIGlmICgnbmFtZScgaW4gY29sKXtcbiAgICAgICAgICBjb2xMYWJlbD0gZmlyc3RDYXAoY29sLm5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb2wuc29ydGFibGUpe1xuICAgICAgICAgIGNvbExhYmVsPSc8c3Bhbj4gJyArIGNvbExhYmVsICsgJyA8aSBjbGFzcz1cInB1bGwtcmlnaHQgZmEgZmEtc29ydFwiPjwvaT48L3NwYW4+JztcbiAgICAgICAgfVxuICAgICAgICB2YXIgYXR0cj0nIG5hbWU9XCInICsgY29sLm5hbWUgKyAnXCIgJysgKGNvbC5hdHRyaWJ1dGVzID8gJyAnKyBjb2wuYXR0cmlidXRlcyArICcgJzogJycpICsgKCBjb2xUeXBlID8gJyB0eXBlPVwiJyArIGNvbFR5cGUgKyAnXCIgJyA6JycgICk7XG4gICAgICAgIHM9IHMgKyAnPHRoICcgKyBhdHRyICsnID4nICsgY29sTGFiZWwgKyBcIjwvdGg+XFxuXCI7ICBcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHJvd0FjdGlvbnMpIHM9cyArIFwiPHRoPi08L3RoPlwiO1xuICAgIHRoZWFkPVwiPHRoZWFkPlxcbjx0cj5cXG5cIiArIHMgKyBcIjwvdHI+XFxuPC90aGVhZD5cXG5cIiBcbiAgICBzPScnO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YS5sZW5ndGggOyBpKyspIHtcbiAgICAgIHM9cysnPHRyIGtleT1cIicgKyBkYXRhW2ldW2tleV0gKydcIj5cXG4nO1xuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPGNvbHVtbnMubGVuZ3RoIDsgaisrKSB7XG4gICAgICAgIGlmKHR5cGVvZiBjb2x1bW5zW2pdID09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgY2VsbFZhbHVlPWRhdGFbaV1bY29sdW1uc1tqXV07XG4gICAgICAgIH0gZWxzZSBpZih0eXBlb2YgY29sdW1uc1tqXSA9PSAnb2JqZWN0Jykge1xuICAgICAgICAgIHZhciBmaWVsZD0gY29sdW1uc1tqXS5uYW1lIDtcbiAgICAgICAgICB2YXIgdmFsdWU9Y29sdW1uc1tqXS52YWx1ZSA7XG4gICAgICAgICAgY29sVHlwZT1jb2x1bW5zW2pdLnR5cGU7XG4gICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnZnVuY3Rpb24nKXtcbiAgICAgICAgICAgIGNlbGxWYWx1ZT1jb2x1bW5zW2pdLnZhbHVlKGRhdGFbaV0pO1xuICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09ICd1bmRlZmluZWQnKXtcbiAgICAgICAgICAgIGNlbGxWYWx1ZT1kYXRhW2ldW2ZpZWxkXTtcbiAgICAgICAgICAgIGlmIChjb2xUeXBlPT0nbnVtYmVyJyl7XG4gICAgICAgICAgICAgIGNlbGxWYWx1ZT1mb3JtYXRDdXJyZW5jeShjZWxsVmFsdWUpO1xuICAgICAgICAgICAgICBjZWxsVmFsdWU9JzxzcGFuIGNsYXNzPVwicHVsbC1yaWdodFwiPiAnK2NlbGxWYWx1ZSsnIDwvc3Bhbj4nXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNvbFR5cGU9PSdkYXRlJyl7XG4gICAgICAgICAgICAgIGNlbGxWYWx1ZT1uZXcgRGF0ZShjZWxsVmFsdWUpO1xuICAgICAgICAgICAgICBjZWxsVmFsdWU9JzxzcGFuIGNsYXNzPVwidGV4dC1jZW50ZXJcIj4gJytkYXRlMnN0cmluZyhjZWxsVmFsdWUpKycgPC9zcGFuPicgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjZWxsVmFsdWU9dmFsdWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHM9IHMgKyAnPHRkPicgKyBjZWxsVmFsdWUgKyBcIjwvdGQ+XFxuXCI7XG4gICAgICB9XG4gICAgICBpZihyb3dBY3Rpb25zICl7XG4gICAgICAgIHM9IHMgKyBcIjx0ZD5cIiArIHJvd0FjdGlvbnMgK1wiPC90ZD5cXG5cIjtcbiAgICAgIH1cbiAgICAgIHM9cytcIjwvdHI+XFxuXCI7XG4gICAgfVxuICAgIHRib2R5PVwiPHRib2R5PlxcblwiICsgcyArIFwiPC90Ym9keT5cXG5cIlxuICAgIHRhYmxlPXRoZWFkK3Rib2R5O1xuICAgIHJldHVybiAgdGFibGU7XG4gIH1cblxuICBmdW5jdGlvbiBpc1Zpc2libGUobm9kZSl7XG4gICAgaWYgKG5vZGUgaW5zdGFuY2VvZiAgSFRNTEVsZW1lbnQpIG5vZGU9JChub2RlKTtcbiAgICBpZiAoIShub2RlIGluc3RhbmNlb2YgICQpKSBub2RlPSQobm9kZSk7XG4gICAgaWYgKCEgbm9kZS5pcygnOnZpc2libGUnKSkgcmV0dXJuIGZhbHNlO1xuICAgIHZhciBlbD1ub2RlLmZpcnN0KCkuZ2V0KDApO1xuICAgIGlmIChlbCl7XG4gICAgICB2YXIgcj1lbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIHZhciB3PXdpbmRvdy5kb2N1bWVudC5ib2R5LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgaWYgKHIucmlnaHQ8dy5sZWZ0ICB8fCAgci5sZWZ0PncucmlnaHQgfHwgci50b3AgPiB3LmJvdHRvbSB8fCByLmJvdHRvbSA8IHcudG9wKSByZXR1cm4gZmFsc2U7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2UgcmV0dXJuIGZhbHNlO1xuXG4gIH1cblxuXG4gIGZ1bmN0aW9uIGdldENvb3JkaW5hdGVzKG5vZGUpe1xuICAgIGlmIChub2RlIGluc3RhbmNlb2YgIEhUTUxFbGVtZW50KSBub2RlPSQobm9kZSk7XG4gICAgaWYgKCEobm9kZSBpbnN0YW5jZW9mICAkKSkgbm9kZT0kKG5vZGUpO1xuICAgIHZhciBlbD1ub2RlLmZpcnN0KCkuZ2V0KDApO1xuICAgIGlmIChlbCl7XG4gICAgICB2YXIgcj1lbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgcmV0dXJuIHI7XG4gICAgfSBlbHNlIHJldHVybiBmYWxzZTtcbiAgfVxuXG5cbiAgZnVuY3Rpb24gZm9ybWF0Q3VycmVuY3kodil7XG4gICAgICBpZiAoaXNOYU4oU3RyaW5nKHYpLnJlcGxhY2UoLywvZywgXCJcIikpKSByZXR1cm4gJyc7XG4gICAgICB2YXIgbj0gcGFyc2VGbG9hdChTdHJpbmcodikucmVwbGFjZSgvLC9nLCBcIlwiKSkudG9GaXhlZCgyKTtcbiAgICAgIG49bi50b1N0cmluZygpLnJlcGxhY2UoL1xcQig/PShcXGR7M30pKyg/IVxcZCkpL2csIFwiLFwiKTtcbiAgICAgIHJldHVybiBuO1xuICB9XG5cblxuICB0aGlzLmdldEpTT049Z2V0SlNPTjtcbiAgdGhpcy5wb3N0SlNPTj1wb3N0SlNPTjtcbiAgdGhpcy5nZXRIVE1MPWdldEhUTUw7XG4gIHRoaXMucmlnaHQ9cmlnaHQ7XG4gIHRoaXMubGVmdD1sZWZ0O1xuICB0aGlzLnN0clBhZD1zdHJQYWQ7XG4gIHRoaXMuemVyb1BhZD16ZXJvUGFkO1xuICB0aGlzLnJlbmRlclRhYmxlPXJlbmRlclRhYmxlO1xuICB0aGlzLnRpdGxlQ2FzZT10aXRsZUNhc2U7XG4gIHRoaXMuZmlyc3RDYXA9Zmlyc3RDYXA7XG4gIHRoaXMubGFzdFJlc3BvbnNlPWxhc3RSZXNwb25zZTtcbiAgdGhpcy5pc1Zpc2libGU9aXNWaXNpYmxlO1xuICB0aGlzLmZvcm1hdEN1cnJlbmN5PWZvcm1hdEN1cnJlbmN5XG4gIHRoaXMuZGF0ZTJzdHJpbmc9ZGF0ZTJzdHJpbmdcbiAgdGhpcy5nZXRDb29yZGluYXRlcz1nZXRDb29yZGluYXRlc1xuXG5cbiAgLy8gY29uc29sZS5sb2coZ2V0SFRNTCgnL2h0bWwvbmV3VXBkYXRlRW50cnknLCB7aWQgOiAnbmV3J30pKVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBVdGlscztcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3V0aWxzLmpzIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJcXG4uY2N5UmVjb3JkW2RhdGEtdi01ZjdhMjkyZV0ge1xcbiAgZGlzcGxheTogLXdlYmtpdC1ib3g7XFxuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICAtd2Via2l0LWJveC1vcmllbnQ6IGhvcml6b250YWw7XFxuICAtd2Via2l0LWJveC1kaXJlY3Rpb246IG5vcm1hbDtcXG4gICAgICAtbXMtZmxleC1kaXJlY3Rpb246IHJvdztcXG4gICAgICAgICAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gIC13ZWJraXQtYm94LXBhY2s6IGp1c3RpZnk7XFxuICAgICAgLW1zLWZsZXgtcGFjazoganVzdGlmeTtcXG4gICAgICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbn1cXG4uY2N5UmVjb3JkW2RhdGEtdi01ZjdhMjkyZV06bm90KGxhc3QtY2hpbGQpIHtcXG4gICAgcGFkZGluZy1sZWZ0OiAzNXB4O1xcbn1cXG4uY2N5UmVjb3JkIGRpdltkYXRhLXYtNWY3YTI5MmVdOmxhc3QtY2hpbGQge1xcbiAgICBwYWRkaW5nLWxlZnQ6IDNweDtcXG59XFxuLnJhdGVzVGFibGVbZGF0YS12LTVmN2EyOTJlXSB7XFxuICBkaXNwbGF5OiAtd2Via2l0LWlubGluZS1ib3g7XFxuICBkaXNwbGF5OiAtbXMtaW5saW5lLWZsZXhib3g7XFxuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIC13ZWJraXQtYm94LW9yaWVudDogaG9yaXpvbnRhbDtcXG4gIC13ZWJraXQtYm94LWRpcmVjdGlvbjogbm9ybWFsO1xcbiAgICAgIC1tcy1mbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXG4gIC13ZWJraXQtYm94LXBhY2s6IGxlZnQ7XFxuICAgICAgLW1zLWZsZXgtcGFjazogbGVmdDtcXG4gICAgICAgICAganVzdGlmeS1jb250ZW50OiBsZWZ0O1xcbiAgY29sb3I6ICMwMDAwMjU7XFxuICBtYXJnaW46IDBweDtcXG4gIGxlZnQ6IDEwMCU7XFxuICAtd2Via2l0LWFuaW1hdGlvbjogbXltb3ZlIDYwcyAxcyBpbmZpbml0ZSBsaW5lYXI7XFxuICAgICAgICAgIGFuaW1hdGlvbjogbXltb3ZlIDYwcyAxcyBpbmZpbml0ZSBsaW5lYXI7XFxufVxcbkAtd2Via2l0LWtleWZyYW1lcyBteW1vdmUge1xcbjAlIHtcXG4gICAgbGVmdDogMTAwJTtcXG59XFxuMTAwJSB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0xMDAlKTtcXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTEwMCUpO1xcbiAgICBsZWZ0OiAwJTtcXG59XFxufVxcbkBrZXlmcmFtZXMgbXltb3ZlIHtcXG4wJSB7XFxuICAgIGxlZnQ6IDEwMCU7XFxufVxcbjEwMCUge1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMTAwJSk7XFxuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0xMDAlKTtcXG4gICAgbGVmdDogMCU7XFxufVxcbn1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY3NzLWxvYWRlciEuL34vdnVlLWxvYWRlci9saWIvc3R5bGUtcmV3cml0ZXIuanM/aWQ9ZGF0YS12LTVmN2EyOTJlJnNjb3BlZD10cnVlIS4vfi9zYXNzLWxvYWRlciEuL34vdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9yYXRlcy52dWVcbi8vIG1vZHVsZSBpZCA9IDM5XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIi8qXHJcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcclxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXHJcbiovXHJcbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XHJcblx0dmFyIGxpc3QgPSBbXTtcclxuXHJcblx0Ly8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xyXG5cdGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcclxuXHRcdHZhciByZXN1bHQgPSBbXTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gdGhpc1tpXTtcclxuXHRcdFx0aWYoaXRlbVsyXSkge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKFwiQG1lZGlhIFwiICsgaXRlbVsyXSArIFwie1wiICsgaXRlbVsxXSArIFwifVwiKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXN1bHQucHVzaChpdGVtWzFdKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHJlc3VsdC5qb2luKFwiXCIpO1xyXG5cdH07XHJcblxyXG5cdC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XHJcblx0bGlzdC5pID0gZnVuY3Rpb24obW9kdWxlcywgbWVkaWFRdWVyeSkge1xyXG5cdFx0aWYodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpXHJcblx0XHRcdG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIFwiXCJdXTtcclxuXHRcdHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaWQgPSB0aGlzW2ldWzBdO1xyXG5cdFx0XHRpZih0eXBlb2YgaWQgPT09IFwibnVtYmVyXCIpXHJcblx0XHRcdFx0YWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xyXG5cdFx0fVxyXG5cdFx0Zm9yKGkgPSAwOyBpIDwgbW9kdWxlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaXRlbSA9IG1vZHVsZXNbaV07XHJcblx0XHRcdC8vIHNraXAgYWxyZWFkeSBpbXBvcnRlZCBtb2R1bGVcclxuXHRcdFx0Ly8gdGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBub3QgMTAwJSBwZXJmZWN0IGZvciB3ZWlyZCBtZWRpYSBxdWVyeSBjb21iaW5hdGlvbnNcclxuXHRcdFx0Ly8gIHdoZW4gYSBtb2R1bGUgaXMgaW1wb3J0ZWQgbXVsdGlwbGUgdGltZXMgd2l0aCBkaWZmZXJlbnQgbWVkaWEgcXVlcmllcy5cclxuXHRcdFx0Ly8gIEkgaG9wZSB0aGlzIHdpbGwgbmV2ZXIgb2NjdXIgKEhleSB0aGlzIHdheSB3ZSBoYXZlIHNtYWxsZXIgYnVuZGxlcylcclxuXHRcdFx0aWYodHlwZW9mIGl0ZW1bMF0gIT09IFwibnVtYmVyXCIgfHwgIWFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcclxuXHRcdFx0XHRpZihtZWRpYVF1ZXJ5ICYmICFpdGVtWzJdKSB7XHJcblx0XHRcdFx0XHRpdGVtWzJdID0gbWVkaWFRdWVyeTtcclxuXHRcdFx0XHR9IGVsc2UgaWYobWVkaWFRdWVyeSkge1xyXG5cdFx0XHRcdFx0aXRlbVsyXSA9IFwiKFwiICsgaXRlbVsyXSArIFwiKSBhbmQgKFwiICsgbWVkaWFRdWVyeSArIFwiKVwiO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRsaXN0LnB1c2goaXRlbSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG5cdHJldHVybiBsaXN0O1xyXG59O1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcbi8vIG1vZHVsZSBpZCA9IDQwXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIlxuLyogc3R5bGVzICovXG5yZXF1aXJlKFwiISF2dWUtc3R5bGUtbG9hZGVyIWNzcy1sb2FkZXIhLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtcmV3cml0ZXI/aWQ9ZGF0YS12LTVmN2EyOTJlJnNjb3BlZD10cnVlIXNhc3MtbG9hZGVyIS4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9yYXRlcy52dWVcIilcblxudmFyIENvbXBvbmVudCA9IHJlcXVpcmUoXCIhLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvY29tcG9uZW50LW5vcm1hbGl6ZXJcIikoXG4gIC8qIHNjcmlwdCAqL1xuICByZXF1aXJlKFwiISFiYWJlbC1sb2FkZXI/e1xcXCJjYWNoZURpcmVjdG9yeVxcXCI6dHJ1ZSxcXFwicHJlc2V0c1xcXCI6W1tcXFwiZXMyMDE1XFxcIix7XFxcIm1vZHVsZXNcXFwiOmZhbHNlfV1dfSEuLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXNjcmlwdCZpbmRleD0wIS4vcmF0ZXMudnVlXCIpLFxuICAvKiB0ZW1wbGF0ZSAqL1xuICByZXF1aXJlKFwiISEuLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlcj9pZD1kYXRhLXYtNWY3YTI5MmUhLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vcmF0ZXMudnVlXCIpLFxuICAvKiBzY29wZUlkICovXG4gIFwiZGF0YS12LTVmN2EyOTJlXCIsXG4gIC8qIGNzc01vZHVsZXMgKi9cbiAgbnVsbFxuKVxuQ29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCIvaG9tZS9wYW5hZ2lvdGlzL3dvcmtzcGFjZS9jcm93ZEZ1bmQvcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL3JhdGVzLnZ1ZVwiXG5pZiAoQ29tcG9uZW50LmVzTW9kdWxlICYmIE9iamVjdC5rZXlzKENvbXBvbmVudC5lc01vZHVsZSkuc29tZShmdW5jdGlvbiAoa2V5KSB7cmV0dXJuIGtleSAhPT0gXCJkZWZhdWx0XCIgJiYga2V5ICE9PSBcIl9fZXNNb2R1bGVcIn0pKSB7Y29uc29sZS5lcnJvcihcIm5hbWVkIGV4cG9ydHMgYXJlIG5vdCBzdXBwb3J0ZWQgaW4gKi52dWUgZmlsZXMuXCIpfVxuaWYgKENvbXBvbmVudC5vcHRpb25zLmZ1bmN0aW9uYWwpIHtjb25zb2xlLmVycm9yKFwiW3Z1ZS1sb2FkZXJdIHJhdGVzLnZ1ZTogZnVuY3Rpb25hbCBjb21wb25lbnRzIGFyZSBub3Qgc3VwcG9ydGVkIHdpdGggdGVtcGxhdGVzLCB0aGV5IHNob3VsZCB1c2UgcmVuZGVyIGZ1bmN0aW9ucy5cIil9XG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7KGZ1bmN0aW9uICgpIHtcbiAgdmFyIGhvdEFQSSA9IHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIilcbiAgaG90QVBJLmluc3RhbGwocmVxdWlyZShcInZ1ZVwiKSwgZmFsc2UpXG4gIGlmICghaG90QVBJLmNvbXBhdGlibGUpIHJldHVyblxuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmICghbW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgaG90QVBJLmNyZWF0ZVJlY29yZChcImRhdGEtdi01ZjdhMjkyZVwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfSBlbHNlIHtcbiAgICBob3RBUEkucmVsb2FkKFwiZGF0YS12LTVmN2EyOTJlXCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9XG59KSgpfVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbXBvbmVudC5leHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9yYXRlcy52dWVcbi8vIG1vZHVsZSBpZCA9IDQxXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsInZhciBDb21wb25lbnQgPSByZXF1aXJlKFwiIS4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2NvbXBvbmVudC1ub3JtYWxpemVyXCIpKFxuICAvKiBzY3JpcHQgKi9cbiAgcmVxdWlyZShcIiEhYmFiZWwtbG9hZGVyP3tcXFwiY2FjaGVEaXJlY3RvcnlcXFwiOnRydWUsXFxcInByZXNldHNcXFwiOltbXFxcImVzMjAxNVxcXCIse1xcXCJtb2R1bGVzXFxcIjpmYWxzZX1dXX0hLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zY3JpcHQmaW5kZXg9MCEuL3NlcnZlclBhZ2UudnVlXCIpLFxuICAvKiB0ZW1wbGF0ZSAqL1xuICByZXF1aXJlKFwiISEuLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlcj9pZD1kYXRhLXYtOWVlYTFiZTghLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vc2VydmVyUGFnZS52dWVcIiksXG4gIC8qIHNjb3BlSWQgKi9cbiAgbnVsbCxcbiAgLyogY3NzTW9kdWxlcyAqL1xuICBudWxsXG4pXG5Db21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcIi9ob21lL3BhbmFnaW90aXMvd29ya3NwYWNlL2Nyb3dkRnVuZC9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvc2VydmVyUGFnZS52dWVcIlxuaWYgKENvbXBvbmVudC5lc01vZHVsZSAmJiBPYmplY3Qua2V5cyhDb21wb25lbnQuZXNNb2R1bGUpLnNvbWUoZnVuY3Rpb24gKGtleSkge3JldHVybiBrZXkgIT09IFwiZGVmYXVsdFwiICYmIGtleSAhPT0gXCJfX2VzTW9kdWxlXCJ9KSkge2NvbnNvbGUuZXJyb3IoXCJuYW1lZCBleHBvcnRzIGFyZSBub3Qgc3VwcG9ydGVkIGluICoudnVlIGZpbGVzLlwiKX1cbmlmIChDb21wb25lbnQub3B0aW9ucy5mdW5jdGlvbmFsKSB7Y29uc29sZS5lcnJvcihcIlt2dWUtbG9hZGVyXSBzZXJ2ZXJQYWdlLnZ1ZTogZnVuY3Rpb25hbCBjb21wb25lbnRzIGFyZSBub3Qgc3VwcG9ydGVkIHdpdGggdGVtcGxhdGVzLCB0aGV5IHNob3VsZCB1c2UgcmVuZGVyIGZ1bmN0aW9ucy5cIil9XG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7KGZ1bmN0aW9uICgpIHtcbiAgdmFyIGhvdEFQSSA9IHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIilcbiAgaG90QVBJLmluc3RhbGwocmVxdWlyZShcInZ1ZVwiKSwgZmFsc2UpXG4gIGlmICghaG90QVBJLmNvbXBhdGlibGUpIHJldHVyblxuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmICghbW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgaG90QVBJLmNyZWF0ZVJlY29yZChcImRhdGEtdi05ZWVhMWJlOFwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfSBlbHNlIHtcbiAgICBob3RBUEkucmVsb2FkKFwiZGF0YS12LTllZWExYmU4XCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9XG59KSgpfVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbXBvbmVudC5leHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9zZXJ2ZXJQYWdlLnZ1ZVxuLy8gbW9kdWxlIGlkID0gNDJcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwibW9kdWxlLmV4cG9ydHM9e3JlbmRlcjpmdW5jdGlvbiAoKXt2YXIgX3ZtPXRoaXM7dmFyIF9oPV92bS4kY3JlYXRlRWxlbWVudDt2YXIgX2M9X3ZtLl9zZWxmLl9jfHxfaDtcbiAgcmV0dXJuIF9jKCdkaXYnLCB7XG4gICAgZGlyZWN0aXZlczogW3tcbiAgICAgIG5hbWU6IFwic2hvd1wiLFxuICAgICAgcmF3TmFtZTogXCJ2LXNob3dcIixcbiAgICAgIHZhbHVlOiAoX3ZtLnJhdGVzRGF0YSksXG4gICAgICBleHByZXNzaW9uOiBcInJhdGVzRGF0YVwiXG4gICAgfV0sXG4gICAgc3RhdGljQ2xhc3M6IFwidGlja2VyV3JhcFwiXG4gIH0sIFsoX3ZtLnJhdGVzRGF0YS5kYXRlKSA/IF9jKCdkaXYnLCB7XG4gICAgc3RhdGljQ2xhc3M6IFwicmF0ZXNUYWJsZVwiXG4gIH0sIFtfYygnZGl2JywgW192bS5fdihfdm0uX3MoX3ZtLnJhdGVzRGF0YS5iYXNlKSArIFwiIFJhdGVzIGFzIG9mIDogXCIgKyBfdm0uX3MoX3ZtLnJhdGVzRGF0YS5kYXRlKSArIFwiICAgXCIpXSksIF92bS5fdihcIiBcIiksIF92bS5fbCgoX3ZtLnJhdGVzRGF0YS5yYXRlcyksIGZ1bmN0aW9uKHJhdGUsIGNjeSkge1xuICAgIHJldHVybiBfYygnZGl2Jywge1xuICAgICAgc3RhdGljQ2xhc3M6IFwiY2N5UmVjb3JkXCJcbiAgICB9LCBbX2MoJ2RpdicsIFtfdm0uX3YoXCIgXCIgKyBfdm0uX3MoY2N5KSArIFwiIDogXCIpXSksIF92bS5fdihcIiBcIiksIF9jKCdkaXYnLCBbX3ZtLl92KFwiIFwiICsgX3ZtLl9zKHJhdGUpICsgXCIgIFwiKV0pXSlcbiAgfSldLCAyKSA6IF92bS5fZSgpXSlcbn0sc3RhdGljUmVuZGVyRm5zOiBbXX1cbm1vZHVsZS5leHBvcnRzLnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuaWYgKG1vZHVsZS5ob3QpIHtcbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAobW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgIHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIikucmVyZW5kZXIoXCJkYXRhLXYtNWY3YTI5MmVcIiwgbW9kdWxlLmV4cG9ydHMpXG4gIH1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXIuanM/aWQ9ZGF0YS12LTVmN2EyOTJlIS4vfi92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvcmF0ZXMudnVlXG4vLyBtb2R1bGUgaWQgPSA0M1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJtb2R1bGUuZXhwb3J0cz17cmVuZGVyOmZ1bmN0aW9uICgpe3ZhciBfdm09dGhpczt2YXIgX2g9X3ZtLiRjcmVhdGVFbGVtZW50O3ZhciBfYz1fdm0uX3NlbGYuX2N8fF9oO1xuICByZXR1cm4gX2MoJ2RpdicsIFtfYygnZGl2Jywge1xuICAgIGRpcmVjdGl2ZXM6IFt7XG4gICAgICBuYW1lOiBcInNob3dcIixcbiAgICAgIHJhd05hbWU6IFwidi1zaG93XCIsXG4gICAgICB2YWx1ZTogKF92bS5odG1sID09ICcnKSxcbiAgICAgIGV4cHJlc3Npb246IFwiaHRtbD09JydcIlxuICAgIH1dXG4gIH0sIFtfdm0uX3QoXCJkZWZhdWx0XCIpXSwgMiksIF92bS5fdihcIiBcIiksIChfdm0uaHRtbCkgPyBfYygnZHluYW1pYy1zZXJ2ZXItcGFnZS1jb21wb25lbnQnLCB7XG4gICAgYXR0cnM6IHtcbiAgICAgIFwiaHRtbFwiOiBfdm0uaHRtbCxcbiAgICAgIFwiZGF0YVwiOiBfdm0uY29udGV4dERhdGFcbiAgICB9XG4gIH0pIDogX3ZtLl9lKCldLCAxKVxufSxzdGF0aWNSZW5kZXJGbnM6IFtdfVxubW9kdWxlLmV4cG9ydHMucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5pZiAobW9kdWxlLmhvdCkge1xuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmIChtb2R1bGUuaG90LmRhdGEpIHtcbiAgICAgcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKS5yZXJlbmRlcihcImRhdGEtdi05ZWVhMWJlOFwiLCBtb2R1bGUuZXhwb3J0cylcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlci5qcz9pZD1kYXRhLXYtOWVlYTFiZTghLi9+L3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9zZXJ2ZXJQYWdlLnZ1ZVxuLy8gbW9kdWxlIGlkID0gNDRcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtcmV3cml0ZXIuanM/aWQ9ZGF0YS12LTVmN2EyOTJlJnNjb3BlZD10cnVlIS4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2luZGV4LmpzIS4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9yYXRlcy52dWVcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzQ2xpZW50LmpzXCIpKFwiMzM3YTFiMGFcIiwgY29udGVudCwgZmFsc2UpO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuIC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG4gaWYoIWNvbnRlbnQubG9jYWxzKSB7XG4gICBtb2R1bGUuaG90LmFjY2VwdChcIiEhLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1yZXdyaXRlci5qcz9pZD1kYXRhLXYtNWY3YTI5MmUmc2NvcGVkPXRydWUhLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvaW5kZXguanMhLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3JhdGVzLnZ1ZVwiLCBmdW5jdGlvbigpIHtcbiAgICAgdmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLXJld3JpdGVyLmpzP2lkPWRhdGEtdi01ZjdhMjkyZSZzY29wZWQ9dHJ1ZSEuLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9pbmRleC5qcyEuLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vcmF0ZXMudnVlXCIpO1xuICAgICBpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcbiAgICAgdXBkYXRlKG5ld0NvbnRlbnQpO1xuICAgfSk7XG4gfVxuIC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3NcbiBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vdnVlLXN0eWxlLWxvYWRlciEuL34vY3NzLWxvYWRlciEuL34vdnVlLWxvYWRlci9saWIvc3R5bGUtcmV3cml0ZXIuanM/aWQ9ZGF0YS12LTVmN2EyOTJlJnNjb3BlZD10cnVlIS4vfi9zYXNzLWxvYWRlciEuL34vdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9yYXRlcy52dWVcbi8vIG1vZHVsZSBpZCA9IDQ1XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiAgTW9kaWZpZWQgYnkgRXZhbiBZb3UgQHl5eDk5MDgwM1xuKi9cblxudmFyIGhhc0RvY3VtZW50ID0gdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJ1xuXG5pZiAodHlwZW9mIERFQlVHICE9PSAndW5kZWZpbmVkJyAmJiBERUJVRykge1xuICBpZiAoIWhhc0RvY3VtZW50KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICd2dWUtc3R5bGUtbG9hZGVyIGNhbm5vdCBiZSB1c2VkIGluIGEgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnQuICcgK1xuICAgIFwiVXNlIHsgdGFyZ2V0OiAnbm9kZScgfSBpbiB5b3VyIFdlYnBhY2sgY29uZmlnIHRvIGluZGljYXRlIGEgc2VydmVyLXJlbmRlcmluZyBlbnZpcm9ubWVudC5cIlxuICApIH1cbn1cblxudmFyIGxpc3RUb1N0eWxlcyA9IHJlcXVpcmUoJy4vbGlzdFRvU3R5bGVzJylcblxuLypcbnR5cGUgU3R5bGVPYmplY3QgPSB7XG4gIGlkOiBudW1iZXI7XG4gIHBhcnRzOiBBcnJheTxTdHlsZU9iamVjdFBhcnQ+XG59XG5cbnR5cGUgU3R5bGVPYmplY3RQYXJ0ID0ge1xuICBjc3M6IHN0cmluZztcbiAgbWVkaWE6IHN0cmluZztcbiAgc291cmNlTWFwOiA/c3RyaW5nXG59XG4qL1xuXG52YXIgc3R5bGVzSW5Eb20gPSB7LypcbiAgW2lkOiBudW1iZXJdOiB7XG4gICAgaWQ6IG51bWJlcixcbiAgICByZWZzOiBudW1iZXIsXG4gICAgcGFydHM6IEFycmF5PChvYmo/OiBTdHlsZU9iamVjdFBhcnQpID0+IHZvaWQ+XG4gIH1cbiovfVxuXG52YXIgaGVhZCA9IGhhc0RvY3VtZW50ICYmIChkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0pXG52YXIgc2luZ2xldG9uRWxlbWVudCA9IG51bGxcbnZhciBzaW5nbGV0b25Db3VudGVyID0gMFxudmFyIGlzUHJvZHVjdGlvbiA9IGZhbHNlXG52YXIgbm9vcCA9IGZ1bmN0aW9uICgpIHt9XG5cbi8vIEZvcmNlIHNpbmdsZS10YWcgc29sdXRpb24gb24gSUU2LTksIHdoaWNoIGhhcyBhIGhhcmQgbGltaXQgb24gdGhlICMgb2YgPHN0eWxlPlxuLy8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxudmFyIGlzT2xkSUUgPSB0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiAvbXNpZSBbNi05XVxcYi8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkpXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHBhcmVudElkLCBsaXN0LCBfaXNQcm9kdWN0aW9uKSB7XG4gIGlzUHJvZHVjdGlvbiA9IF9pc1Byb2R1Y3Rpb25cblxuICB2YXIgc3R5bGVzID0gbGlzdFRvU3R5bGVzKHBhcmVudElkLCBsaXN0KVxuICBhZGRTdHlsZXNUb0RvbShzdHlsZXMpXG5cbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZSAobmV3TGlzdCkge1xuICAgIHZhciBtYXlSZW1vdmUgPSBbXVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaXRlbSA9IHN0eWxlc1tpXVxuICAgICAgdmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF1cbiAgICAgIGRvbVN0eWxlLnJlZnMtLVxuICAgICAgbWF5UmVtb3ZlLnB1c2goZG9tU3R5bGUpXG4gICAgfVxuICAgIGlmIChuZXdMaXN0KSB7XG4gICAgICBzdHlsZXMgPSBsaXN0VG9TdHlsZXMocGFyZW50SWQsIG5ld0xpc3QpXG4gICAgICBhZGRTdHlsZXNUb0RvbShzdHlsZXMpXG4gICAgfSBlbHNlIHtcbiAgICAgIHN0eWxlcyA9IFtdXG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbWF5UmVtb3ZlLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgZG9tU3R5bGUgPSBtYXlSZW1vdmVbaV1cbiAgICAgIGlmIChkb21TdHlsZS5yZWZzID09PSAwKSB7XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICBkb21TdHlsZS5wYXJ0c1tqXSgpXG4gICAgICAgIH1cbiAgICAgICAgZGVsZXRlIHN0eWxlc0luRG9tW2RvbVN0eWxlLmlkXVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBhZGRTdHlsZXNUb0RvbSAoc3R5bGVzIC8qIEFycmF5PFN0eWxlT2JqZWN0PiAqLykge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gc3R5bGVzW2ldXG4gICAgdmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF1cbiAgICBpZiAoZG9tU3R5bGUpIHtcbiAgICAgIGRvbVN0eWxlLnJlZnMrK1xuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xuICAgICAgICBkb21TdHlsZS5wYXJ0c1tqXShpdGVtLnBhcnRzW2pdKVxuICAgICAgfVxuICAgICAgZm9yICg7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIGRvbVN0eWxlLnBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSkpXG4gICAgICB9XG4gICAgICBpZiAoZG9tU3R5bGUucGFydHMubGVuZ3RoID4gaXRlbS5wYXJ0cy5sZW5ndGgpIHtcbiAgICAgICAgZG9tU3R5bGUucGFydHMubGVuZ3RoID0gaXRlbS5wYXJ0cy5sZW5ndGhcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHBhcnRzID0gW11cbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuICAgICAgICBwYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0pKVxuICAgICAgfVxuICAgICAgc3R5bGVzSW5Eb21baXRlbS5pZF0gPSB7IGlkOiBpdGVtLmlkLCByZWZzOiAxLCBwYXJ0czogcGFydHMgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBsaXN0VG9TdHlsZXMgKHBhcmVudElkLCBsaXN0KSB7XG4gIHZhciBzdHlsZXMgPSBbXVxuICB2YXIgbmV3U3R5bGVzID0ge31cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldXG4gICAgdmFyIGlkID0gaXRlbVswXVxuICAgIHZhciBjc3MgPSBpdGVtWzFdXG4gICAgdmFyIG1lZGlhID0gaXRlbVsyXVxuICAgIHZhciBzb3VyY2VNYXAgPSBpdGVtWzNdXG4gICAgdmFyIHBhcnQgPSB7IGNzczogY3NzLCBtZWRpYTogbWVkaWEsIHNvdXJjZU1hcDogc291cmNlTWFwIH1cbiAgICBpZiAoIW5ld1N0eWxlc1tpZF0pIHtcbiAgICAgIHBhcnQuaWQgPSBwYXJlbnRJZCArICc6MCdcbiAgICAgIHN0eWxlcy5wdXNoKG5ld1N0eWxlc1tpZF0gPSB7IGlkOiBpZCwgcGFydHM6IFtwYXJ0XSB9KVxuICAgIH0gZWxzZSB7XG4gICAgICBwYXJ0LmlkID0gcGFyZW50SWQgKyAnOicgKyBuZXdTdHlsZXNbaWRdLnBhcnRzLmxlbmd0aFxuICAgICAgbmV3U3R5bGVzW2lkXS5wYXJ0cy5wdXNoKHBhcnQpXG4gICAgfVxuICB9XG4gIHJldHVybiBzdHlsZXNcbn1cblxuZnVuY3Rpb24gY3JlYXRlU3R5bGVFbGVtZW50ICgpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJylcbiAgc3R5bGVFbGVtZW50LnR5cGUgPSAndGV4dC9jc3MnXG4gIGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KVxuICByZXR1cm4gc3R5bGVFbGVtZW50XG59XG5cbmZ1bmN0aW9uIGFkZFN0eWxlIChvYmogLyogU3R5bGVPYmplY3RQYXJ0ICovKSB7XG4gIHZhciB1cGRhdGUsIHJlbW92ZVxuICB2YXIgc3R5bGVFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcignc3R5bGVbZGF0YS12dWUtc3NyLWlkfj1cIicgKyBvYmouaWQgKyAnXCJdJylcbiAgdmFyIGhhc1NTUiA9IHN0eWxlRWxlbWVudCAhPSBudWxsXG5cbiAgLy8gaWYgaW4gcHJvZHVjdGlvbiBtb2RlIGFuZCBzdHlsZSBpcyBhbHJlYWR5IHByb3ZpZGVkIGJ5IFNTUixcbiAgLy8gc2ltcGx5IGRvIG5vdGhpbmcuXG4gIGlmIChoYXNTU1IgJiYgaXNQcm9kdWN0aW9uKSB7XG4gICAgcmV0dXJuIG5vb3BcbiAgfVxuXG4gIGlmIChpc09sZElFKSB7XG4gICAgLy8gdXNlIHNpbmdsZXRvbiBtb2RlIGZvciBJRTkuXG4gICAgdmFyIHN0eWxlSW5kZXggPSBzaW5nbGV0b25Db3VudGVyKytcbiAgICBzdHlsZUVsZW1lbnQgPSBzaW5nbGV0b25FbGVtZW50IHx8IChzaW5nbGV0b25FbGVtZW50ID0gY3JlYXRlU3R5bGVFbGVtZW50KCkpXG4gICAgdXBkYXRlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCwgc3R5bGVJbmRleCwgZmFsc2UpXG4gICAgcmVtb3ZlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCwgc3R5bGVJbmRleCwgdHJ1ZSlcbiAgfSBlbHNlIHtcbiAgICAvLyB1c2UgbXVsdGktc3R5bGUtdGFnIG1vZGUgaW4gYWxsIG90aGVyIGNhc2VzXG4gICAgc3R5bGVFbGVtZW50ID0gc3R5bGVFbGVtZW50IHx8IGNyZWF0ZVN0eWxlRWxlbWVudCgpXG4gICAgdXBkYXRlID0gYXBwbHlUb1RhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudClcbiAgICByZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpXG4gICAgfVxuICB9XG5cbiAgaWYgKCFoYXNTU1IpIHtcbiAgICB1cGRhdGUob2JqKVxuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZVN0eWxlIChuZXdPYmogLyogU3R5bGVPYmplY3RQYXJ0ICovKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiZcbiAgICAgICAgICBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJlxuICAgICAgICAgIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXApIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICB1cGRhdGUob2JqID0gbmV3T2JqKVxuICAgIH0gZWxzZSB7XG4gICAgICByZW1vdmUoKVxuICAgIH1cbiAgfVxufVxuXG52YXIgcmVwbGFjZVRleHQgPSAoZnVuY3Rpb24gKCkge1xuICB2YXIgdGV4dFN0b3JlID0gW11cblxuICByZXR1cm4gZnVuY3Rpb24gKGluZGV4LCByZXBsYWNlbWVudCkge1xuICAgIHRleHRTdG9yZVtpbmRleF0gPSByZXBsYWNlbWVudFxuICAgIHJldHVybiB0ZXh0U3RvcmUuZmlsdGVyKEJvb2xlYW4pLmpvaW4oJ1xcbicpXG4gIH1cbn0pKClcblxuZnVuY3Rpb24gYXBwbHlUb1NpbmdsZXRvblRhZyAoc3R5bGVFbGVtZW50LCBpbmRleCwgcmVtb3ZlLCBvYmopIHtcbiAgdmFyIGNzcyA9IHJlbW92ZSA/ICcnIDogb2JqLmNzc1xuXG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSByZXBsYWNlVGV4dChpbmRleCwgY3NzKVxuICB9IGVsc2Uge1xuICAgIHZhciBjc3NOb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKVxuICAgIHZhciBjaGlsZE5vZGVzID0gc3R5bGVFbGVtZW50LmNoaWxkTm9kZXNcbiAgICBpZiAoY2hpbGROb2Rlc1tpbmRleF0pIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChjaGlsZE5vZGVzW2luZGV4XSlcbiAgICBpZiAoY2hpbGROb2Rlcy5sZW5ndGgpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5pbnNlcnRCZWZvcmUoY3NzTm9kZSwgY2hpbGROb2Rlc1tpbmRleF0pXG4gICAgfSBlbHNlIHtcbiAgICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChjc3NOb2RlKVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBhcHBseVRvVGFnIChzdHlsZUVsZW1lbnQsIG9iaikge1xuICB2YXIgY3NzID0gb2JqLmNzc1xuICB2YXIgbWVkaWEgPSBvYmoubWVkaWFcbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXBcblxuICBpZiAobWVkaWEpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdtZWRpYScsIG1lZGlhKVxuICB9XG5cbiAgaWYgKHNvdXJjZU1hcCkge1xuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLmNocm9tZS5jb20vZGV2dG9vbHMvZG9jcy9qYXZhc2NyaXB0LWRlYnVnZ2luZ1xuICAgIC8vIHRoaXMgbWFrZXMgc291cmNlIG1hcHMgaW5zaWRlIHN0eWxlIHRhZ3Mgd29yayBwcm9wZXJseSBpbiBDaHJvbWVcbiAgICBjc3MgKz0gJ1xcbi8qIyBzb3VyY2VVUkw9JyArIHNvdXJjZU1hcC5zb3VyY2VzWzBdICsgJyAqLydcbiAgICAvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yNjYwMzg3NVxuICAgIGNzcyArPSAnXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCwnICsgYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSArICcgKi8nXG4gIH1cblxuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzXG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpXG4gICAgfVxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKVxuICB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vdnVlLXN0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzQ2xpZW50LmpzXG4vLyBtb2R1bGUgaWQgPSA0NlxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIvKipcbiAqIFRyYW5zbGF0ZXMgdGhlIGxpc3QgZm9ybWF0IHByb2R1Y2VkIGJ5IGNzcy1sb2FkZXIgaW50byBzb21ldGhpbmdcbiAqIGVhc2llciB0byBtYW5pcHVsYXRlLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGxpc3RUb1N0eWxlcyAocGFyZW50SWQsIGxpc3QpIHtcbiAgdmFyIHN0eWxlcyA9IFtdXG4gIHZhciBuZXdTdHlsZXMgPSB7fVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV1cbiAgICB2YXIgaWQgPSBpdGVtWzBdXG4gICAgdmFyIGNzcyA9IGl0ZW1bMV1cbiAgICB2YXIgbWVkaWEgPSBpdGVtWzJdXG4gICAgdmFyIHNvdXJjZU1hcCA9IGl0ZW1bM11cbiAgICB2YXIgcGFydCA9IHtcbiAgICAgIGlkOiBwYXJlbnRJZCArICc6JyArIGksXG4gICAgICBjc3M6IGNzcyxcbiAgICAgIG1lZGlhOiBtZWRpYSxcbiAgICAgIHNvdXJjZU1hcDogc291cmNlTWFwXG4gICAgfVxuICAgIGlmICghbmV3U3R5bGVzW2lkXSkge1xuICAgICAgc3R5bGVzLnB1c2gobmV3U3R5bGVzW2lkXSA9IHsgaWQ6IGlkLCBwYXJ0czogW3BhcnRdIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIG5ld1N0eWxlc1tpZF0ucGFydHMucHVzaChwYXJ0KVxuICAgIH1cbiAgfVxuICByZXR1cm4gc3R5bGVzXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vdnVlLXN0eWxlLWxvYWRlci9saWIvbGlzdFRvU3R5bGVzLmpzXG4vLyBtb2R1bGUgaWQgPSA0N1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiXSwic291cmNlUm9vdCI6IiJ9