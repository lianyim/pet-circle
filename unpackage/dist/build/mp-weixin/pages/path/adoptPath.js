(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/path/adoptPath"],{"07e4":function(t,e,n){"use strict";n.r(e);var c=n("f750"),i=n.n(c);for(var u in c)"default"!==u&&function(t){n.d(e,t,(function(){return c[t]}))}(u);e["default"]=i.a},"367e":function(t,e,n){"use strict";var c;n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return u})),n.d(e,"a",(function(){return c}));var i=function(){var t=this,e=t.$createElement;t._self._c},u=[]},"5d50":function(t,e,n){"use strict";n.r(e);var c=n("367e"),i=n("07e4");for(var u in i)"default"!==u&&function(t){n.d(e,t,(function(){return i[t]}))}(u);n("9486");var a,o=n("f0c5"),s=Object(o["a"])(i["default"],c["b"],c["c"],!1,null,null,null,!1,c["a"],a);e["default"]=s.exports},9486:function(t,e,n){"use strict";var c=n("abeb"),i=n.n(c);i.a},abeb:function(t,e,n){},d208:function(t,e,n){"use strict";(function(t){n("96ad");c(n("66fd"));var e=c(n("5d50"));function c(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=n,t(e.default)}).call(this,n("543d")["createPage"])},f750:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;c(n("89c9"));function c(t){return t&&t.__esModule?t:{default:t}}var i=function(){n.e("components/axb-checkbox/axb-checkbox").then(function(){return resolve(n("af89"))}.bind(null,n)).catch(n.oe)},u={components:{axbCheckBox:i},data:function(){return{typeList:[{name:"领养人",value:"1",checked:1},{name:"送养人",value:"2",checked:0}],dataList:[],lyrList:[{title:"首页筛选",desc:"筛选心仪的宠物"},{title:"点击申请领养",desc:"提交简单信息，了解大概条件"},{title:"等待送养人审核",desc:"等待送养人了解大概信息"},{title:"双方沟通，达成一致",desc:"为了宠物相关信息，以及养宠经验等"},{title:"线下交接",desc:"双方线下约定交接领养宠物"},{title:"领养成功",desc:"成功领养宠物后，也请领养人在生活中多陪伴它"}],syrList:[{title:"发布送养",desc:"首页发布宠物信息"},{title:"平台审核",desc:"审核发布送养信息是否真实"},{title:"领养人申请",desc:"等待有缘的送养人提交申请"},{title:"等待送养人审核",desc:"等待送养人了解大致信息"},{title:"双方沟通，达成一致",desc:"为了宠物相关信息，以及养宠经验等"},{title:"线下交接",desc:"双方线下约定交接领养宠物"},{title:"领养成功",desc:"成功领养宠物后，也请领养人在生活中多陪伴它"}],careList:["不要发布二维码","不要进行任何形式的宠物买卖","不要支付任何费用","不要草率领养，对生命负责"]}},onLoad:function(){this.chooseType("1")},methods:{chooseType:function(t){this.dataList="1"==t?this.lyrList:this.syrList}}};e.default=u}},[["d208","common/runtime","common/vendor"]]]);