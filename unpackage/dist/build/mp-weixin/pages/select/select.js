(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/select/select"],{"292d":function(i,e,t){"use strict";t.r(e);var n=t("72f3"),c=t.n(n);for(var o in n)"default"!==o&&function(i){t.d(e,i,(function(){return n[i]}))}(o);e["default"]=c.a},"31fa":function(i,e,t){},"67f7":function(i,e,t){"use strict";(function(i){t("3e13");n(t("66fd"));var e=n(t("f80c"));function n(i){return i&&i.__esModule?i:{default:i}}i(e.default)}).call(this,t("543d")["createPage"])},"6e92":function(i,e,t){"use strict";var n=t("31fa"),c=t.n(n);c.a},"72f3":function(i,e,t){"use strict";(function(i){function t(i,e,t){return e in i?Object.defineProperty(i,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):i[e]=t,i}var n;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var c={data:function(){return t({keyword:"",showAction:!1,current:0,tabList:[{name:"最新"},{name:"最热"},{name:"附件"},{name:"关注"}],activeStyle:{fontSize:"30rpx"},isScroll:!1,loadStatus:"loadmore",flowList:[],list:[{price:35,title:"北国风光，千里冰封，万里雪飘",shop:"李白杜甫白居易旗舰店",image:"http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg"},{price:75,title:"望长城内外，惟余莽莽",shop:"李白杜甫白居易旗舰店",image:"http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23325_s.jpg"},{price:385,title:"大河上下，顿失滔滔",shop:"李白杜甫白居易旗舰店",image:"http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg"},{price:784,title:"欲与天公试比高",shop:"李白杜甫白居易旗舰店",image:"http://pic2.sc.chinaz.com/Files/pic/pic9/202002/zzpic23369_s.jpg"},{price:7891,title:"须晴日，看红装素裹，分外妖娆",shop:"李白杜甫白居易旗舰店",image:"http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2130_s.jpg"},{price:2341,shop:"李白杜甫白居易旗舰店",title:"江山如此多娇，引无数英雄竞折腰",image:"http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23346_s.jpg"},{price:661,shop:"李白杜甫白居易旗舰店",title:"惜秦皇汉武，略输文采",image:"http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23344_s.jpg"},{price:1654,title:"唐宗宋祖，稍逊风骚",shop:"李白杜甫白居易旗舰店",image:"http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23343_s.jpg"},{price:1678,title:"一代天骄，成吉思汗",shop:"李白杜甫白居易旗舰店",image:"http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23343_s.jpg"},{price:924,title:"只识弯弓射大雕",shop:"李白杜甫白居易旗舰店",image:"http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23343_s.jpg"},{price:8243,title:"俱往矣，数风流人物，还看今朝",shop:"李白杜甫白居易旗舰店",image:"http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23343_s.jpg"}]},"current",0)},onLoad:function(){n=this,this.addRandomData()},methods:{addRandomData:function(){for(var i=0;i<10;i++){var e=this.$u.random(0,this.list.length-1),t=JSON.parse(JSON.stringify(this.list[e]));t.id=this.$u.guid(),this.flowList.push(t)}},tabChange:function(i){console.log(i),this.current=i},tabBarChange:function(i){console.log(i),2==i&&n.$u.route("/pages/add/add")},toRoute:function(e){console.log(e),i.switchTab({url:"../mine/mine"})}}};e.default=c}).call(this,t("543d")["default"])},c9bf:function(i,e,t){"use strict";t.d(e,"b",(function(){return c})),t.d(e,"c",(function(){return o})),t.d(e,"a",(function(){return n}));var n={uNavbar:function(){return t.e("uview-ui/components/u-navbar/u-navbar").then(t.bind(null,"bfec"))},uSearch:function(){return t.e("uview-ui/components/u-search/u-search").then(t.bind(null,"0dcd"))},uSticky:function(){return t.e("uview-ui/components/u-sticky/u-sticky").then(t.bind(null,"2e023"))},uTabs:function(){return Promise.all([t.e("common/vendor"),t.e("uview-ui/components/u-tabs/u-tabs")]).then(t.bind(null,"2bd0"))},uWaterfall:function(){return Promise.all([t.e("common/vendor"),t.e("uview-ui/components/u-waterfall/u-waterfall")]).then(t.bind(null,"4260"))},uLazyLoad:function(){return t.e("uview-ui/components/u-lazy-load/u-lazy-load").then(t.bind(null,"dae6"))},uLoadmore:function(){return t.e("uview-ui/components/u-loadmore/u-loadmore").then(t.bind(null,"f0b1"))},uTabbar:function(){return Promise.all([t.e("common/vendor"),t.e("uview-ui/components/u-tabbar/u-tabbar")]).then(t.bind(null,"0bdc"))}},c=function(){var i=this,e=i.$createElement;i._self._c},o=[]},f80c:function(i,e,t){"use strict";t.r(e);var n=t("c9bf"),c=t("292d");for(var o in c)"default"!==o&&function(i){t.d(e,i,(function(){return c[i]}))}(o);t("6e92");var u,a=t("f0c5"),r=Object(a["a"])(c["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],u);e["default"]=r.exports}},[["67f7","common/runtime","common/vendor"]]]);