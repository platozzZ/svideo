(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/enroll/enroll"],{"0c11":function(t,e,n){"use strict";n.r(e);var o=n("c37a"),a=n("1bb2");for(var i in a)"default"!==i&&function(t){n.d(e,t,(function(){return a[t]}))}(i);n("7d79");var u,r=n("f0c5"),c=Object(r["a"])(a["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],u);e["default"]=c.exports},"1bb2":function(t,e,n){"use strict";n.r(e);var o=n("e0c7"),a=n.n(o);for(var i in o)"default"!==i&&function(t){n.d(e,t,(function(){return o[t]}))}(i);e["default"]=a.a},"59c5":function(t,e,n){"use strict";(function(t){n("3e13");o(n("66fd"));var e=o(n("0c11"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},"78a8":function(t,e,n){},"7d79":function(t,e,n){"use strict";var o=n("78a8"),a=n.n(o);a.a},c37a:function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return o}));var o={uNavbar:function(){return n.e("uview-ui/components/u-navbar/u-navbar").then(n.bind(null,"bfec"))},uSwiper:function(){return n.e("uview-ui/components/u-swiper/u-swiper").then(n.bind(null,"b784"))},uImage:function(){return n.e("uview-ui/components/u-image/u-image").then(n.bind(null,"7623"))}},a=function(){var t=this,e=t.$createElement;t._self._c},i=[]},e0c7:function(t,e,n){"use strict";var o;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={data:function(){return{swiperList:[],swiperStyle:{textAlign:"center",paddingBottom:"32rpx"},title:!0,loadStatus:"loadmore",current:0,page:1,totalPage:0}},onLoad:function(){o=this;var t={distributor_id:o.userInfo.distributor_id,page:1};o.getList(t),o.getBanner()},onReachBottom:function(){if(o.loadStatus="loading",o.totalPage>=o.page){var t={distributor_id:o.userInfo.distributor_id,page:o.page};o.getList(t)}else o.loadStatus="nomore"},methods:{getBanner:function(){o.$u.get("/api/carouselfigure/list").then((function(t){console.log("getBanner",t);var e=t;e.map((function(t,e){t.title=t.cf_title})),o.swiperList=e})).catch((function(t){console.log("getBanner-catch",t)}))},getList:function(t){o.$u.post("/api/video/list_new",t).then((function(e){console.log("getList",e),o.totalPage=e.last_page,1==t.page&&(o.flowList=[]),o.addRandomData(e.data),o.page++,0!=e.data.length?o.loadStatus="loadmore":o.loadStatus="nomore"})).catch((function(t){console.log("getList-catch",t)}))},toAdd:function(t){o.$u.route("/pages/add/add")},tapBanner:function(t){console.log(t);var e=o.swiperList[t].cf_id;o.toDetail(e)},toDetail:function(t){console.log(t),o.$u.route({url:"/pages/videoDetail/videoDetail",params:{id:t}})}}};e.default=a}},[["59c5","common/runtime","common/vendor"]]]);