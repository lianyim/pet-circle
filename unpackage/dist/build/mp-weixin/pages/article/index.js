(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/article/index"],{"64f0":function(t,n,e){"use strict";(function(t){e("96ad");u(e("66fd"));var n=u(e("8c30"));function u(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=e,t(n.default)}).call(this,e("543d")["createPage"])},"8c30":function(t,n,e){"use strict";e.r(n);var u=e("c4f4"),a=e("a4cc");for(var c in a)"default"!==c&&function(t){e.d(n,t,(function(){return a[t]}))}(c);e("dd49");var r,i=e("f0c5"),o=Object(i["a"])(a["default"],u["b"],u["c"],!1,null,null,null,!1,u["a"],r);n["default"]=o.exports},a4cc:function(t,n,e){"use strict";e.r(n);var u=e("bc27"),a=e.n(u);for(var c in u)"default"!==c&&function(t){e.d(n,t,(function(){return u[t]}))}(c);n["default"]=a.a},bc27:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var u=a(e("89c9"));function a(t){return t&&t.__esModule?t:{default:t}}var c={data:function(){return{dataList:[]}},onLoad:function(t){this.queryList(1,20,t.label)},onPullDownRefresh:function(){this.queryList(1,20),t.stopPullDownRefresh()},methods:{queryList:function(t,n,e){var a=this,c={pageNum:t,pageSize:n,label:e};u.default.queryArticles(c).then((function(t){a.dataList=t.data}))},toDetail:function(n){t.navigateTo({url:"/pages/article/detail?url=".concat(n.url)})}}};n.default=c}).call(this,e("543d")["default"])},c4f4:function(t,n,e){"use strict";var u;e.d(n,"b",(function(){return a})),e.d(n,"c",(function(){return c})),e.d(n,"a",(function(){return u}));var a=function(){var t=this,n=t.$createElement;t._self._c},c=[]},dd49:function(t,n,e){"use strict";var u=e("e333"),a=e.n(u);a.a},e333:function(t,n,e){}},[["64f0","common/runtime","common/vendor"]]]);