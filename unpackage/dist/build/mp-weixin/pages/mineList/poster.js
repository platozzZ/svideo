(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/mineList/poster"],{"021f":function(t,e,n){"use strict";var u;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={data:function(){return{list:[],loadStatus:"loadmore",page:1,totalPage:0}},onLoad:function(){u=this;var t={type:1,user_id:u.userInfo.user_id,page:1};u.getList(t)},onReachBottom:function(){if(u.loadStatus="loading",u.totalPage>=u.page){var t={type:1,user_id:u.userInfo.user_id,page:u.page};u.getList(t)}else u.loadStatus="nomore"},methods:{getList:function(t){u.$u.post("/api/video/user_list",t).then((function(e){console.log("getList",e),u.totalPage=e.last_page,1==t.page&&(u.list=[]),u.list=u.list.concat(e.data),u.page++,0!=e.data.length?u.loadStatus="loadmore":u.loadStatus="nomore"})).catch((function(t){console.log("getList-catch",t)}))},toDetail:function(t){console.log(t),u.$u.route({url:"/pages/videoDetail/videoDetail",params:{id:t}})}}};e.default=a},1173:function(t,e,n){"use strict";n.r(e);var u=n("4d7c"),a=n("c91b");for(var o in a)"default"!==o&&function(t){n.d(e,t,(function(){return a[t]}))}(o);n("bf2b");var i,r=n("f0c5"),c=Object(r["a"])(a["default"],u["b"],u["c"],!1,null,null,null,!1,u["a"],i);e["default"]=c.exports},3639:function(t,e,n){},"4d7c":function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return u}));var u={uNavbar:function(){return n.e("uview-ui/components/u-navbar/u-navbar").then(n.bind(null,"bfec"))},uAvatar:function(){return n.e("uview-ui/components/u-avatar/u-avatar").then(n.bind(null,"d2f9"))},uLoadmore:function(){return n.e("uview-ui/components/u-loadmore/u-loadmore").then(n.bind(null,"f0b1"))},uEmpty:function(){return n.e("uview-ui/components/u-empty/u-empty").then(n.bind(null,"20ca"))}},a=function(){var t=this,e=t.$createElement;t._self._c},o=[]},bf2b:function(t,e,n){"use strict";var u=n("3639"),a=n.n(u);a.a},c91b:function(t,e,n){"use strict";n.r(e);var u=n("021f"),a=n.n(u);for(var o in u)"default"!==o&&function(t){n.d(e,t,(function(){return u[t]}))}(o);e["default"]=a.a},ec1c:function(t,e,n){"use strict";(function(t){n("3e13");u(n("66fd"));var e=u(n("1173"));function u(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])}},[["ec1c","common/runtime","common/vendor"]]]);