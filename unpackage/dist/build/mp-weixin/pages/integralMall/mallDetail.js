(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/integralMall/mallDetail"],{"0921":function(n,e,t){"use strict";t.r(e);var u=t("6a10"),o=t.n(u);for(var i in u)"default"!==i&&function(n){t.d(e,n,(function(){return u[n]}))}(i);e["default"]=o.a},"231e":function(n,e,t){},4344:function(n,e,t){"use strict";var u=t("231e"),o=t.n(u);o.a},"6a10":function(n,e,t){"use strict";(function(n){var t;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var u={data:function(){return{swiperList:[{image:"https://cdn.uviewui.com/uview/swiper/1.jpg",title:"昨夜星辰昨夜风，画楼西畔桂堂东"},{image:"https://cdn.uviewui.com/uview/swiper/2.jpg",title:"身无彩凤双飞翼，心有灵犀一点通"},{image:"https://cdn.uviewui.com/uview/swiper/3.jpg",title:"谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳"}],showToogle:!0,tabList:[{name:"商品详情"},{name:"参数配置"}],isScroll:!1,current:0,scrollTop:0,top:-1,customStyle:{zIndex:"9",opacity:1}}},onLoad:function(){t=this},onPullDownRefresh:function(){t.showToogle=!0,setTimeout((function(){n.stopPullDownRefresh()}),10)},methods:{toRoute:function(n){console.log(n),t.$u.route("/pages/integralMall/integralMall")},toogle:function(n){console.log(n),t.showToogle=n},tabChange:function(n){console.log(n),t.current=n}},onPageScroll:function(n){t.scrollTop=n.scrollTop}};e.default=u}).call(this,t("543d")["default"])},"82cd":function(n,e,t){"use strict";(function(n){t("3e13");u(t("66fd"));var e=u(t("9cf8"));function u(n){return n&&n.__esModule?n:{default:n}}n(e.default)}).call(this,t("543d")["createPage"])},"9cf8":function(n,e,t){"use strict";t.r(e);var u=t("c2ac"),o=t("0921");for(var i in o)"default"!==i&&function(n){t.d(e,n,(function(){return o[n]}))}(i);t("4344");var c,l=t("f0c5"),r=Object(l["a"])(o["default"],u["b"],u["c"],!1,null,null,null,!1,u["a"],c);e["default"]=r.exports},c2ac:function(n,e,t){"use strict";t.d(e,"b",(function(){return o})),t.d(e,"c",(function(){return i})),t.d(e,"a",(function(){return u}));var u={uNavbar:function(){return t.e("uview-ui/components/u-navbar/u-navbar").then(t.bind(null,"bfec"))},uSwiper:function(){return t.e("uview-ui/components/u-swiper/u-swiper").then(t.bind(null,"b784"))},uIcon:function(){return t.e("uview-ui/components/u-icon/u-icon").then(t.bind(null,"5233"))},uSticky:function(){return t.e("uview-ui/components/u-sticky/u-sticky").then(t.bind(null,"2e023"))},uTabs:function(){return Promise.all([t.e("common/vendor"),t.e("uview-ui/components/u-tabs/u-tabs")]).then(t.bind(null,"2bd0"))},uBackTop:function(){return t.e("uview-ui/components/u-back-top/u-back-top").then(t.bind(null,"8bb3"))}},o=function(){var n=this,e=n.$createElement;n._self._c},i=[]}},[["82cd","common/runtime","common/vendor"]]]);