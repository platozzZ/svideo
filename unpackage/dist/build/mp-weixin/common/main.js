(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["common/main"],{"085d":function(e,t,n){"use strict";var o=n("b0e8"),a=n.n(o);a.a},1160:function(e,t,n){},"215c":function(e,t,n){"use strict";n.r(t);var o=n("69df");for(var a in o)"default"!==a&&function(e){n.d(t,e,(function(){return o[e]}))}(a);n("085d"),n("91f2");var r,c,u,d,i=n("f0c5"),l=Object(i["a"])(o["default"],r,c,!1,null,null,null,!1,u,d);t["default"]=l.exports},"5bec":function(e,t,n){"use strict";(function(e){n("3e13");var t=d(n("66fd")),o=d(n("215c")),a=d(n("9e68")),r=d(n("b1f0")),c=d(n("5a76")),u=d(n("2288"));function d(e){return e&&e.__esModule?e:{default:e}}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){f(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function f(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}t.default.config.productionTip=!1,t.default.use(a.default);var s=n("c9f6");t.default.mixin(s),o.default.mpType="app";var p=new t.default(l({store:r.default},o.default));t.default.use(c.default,p),t.default.use(u.default,p),e(p).$mount()}).call(this,n("543d")["createApp"])},"69df":function(e,t,n){"use strict";n.r(t);var o=n("9dbd"),a=n.n(o);for(var r in o)"default"!==r&&function(e){n.d(t,e,(function(){return o[e]}))}(r);t["default"]=a.a},"91f2":function(e,t,n){"use strict";var o=n("1160"),a=n.n(o);a.a},"9dbd":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o;a(n("66fd"));function a(e){return e&&e.__esModule?e:{default:e}}var r={onLaunch:function(){if(console.log("App Launch"),wx.canIUse("getUpdateManager")){var e=wx.getUpdateManager();e.onCheckForUpdate((function(t){t.hasUpdate&&(e.onUpdateReady((function(){wx.showModal({title:"更新提示",content:"新版本已经准备好，是否重启应用？",success:function(t){t.confirm&&e.applyUpdate()}})})),e.onUpdateFailed((function(){wx.showModal({title:"已经有新版本了哟~",content:"新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~"})})))}))}else wx.showModal({title:"提示",content:"当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。"})},onShow:function(){console.log("App Show")},onHide:function(){console.log("App Hide")},methods:{newPromise:function(){return new Promise((function(t,n){wx.login({success:function(a){if(console.log(a),a.code)e.request({url:"https://shoplk.fblife.com/index.php?store_id=50&module=app&action=index&app=getopenid&code="+a.code,method:"GET",header:{"Content-Type":"application/x-www-form-urlencoded"},success:function(n){console.log("request",n.data),200==n.data.code&&(o.$u.vuex("openid",n.data.data.openid),e.setStorageSync("openid",n.data.data.openid),o.getInfo(n.data.data.openid),t(n.data))}});else{console.log("获取用户登录态失败！"+r.errMsg);var r={status:300,data:"错误"};n("error")}}})}))},getInfo:function(t){e.request({url:"https://home-api.fblife.com/api/v1/user/wxlogin",method:"POST",data:{openid:t},header:{"Content-Type":"application/x-www-form-urlencoded"},success:function(t){console.log("getInfo",t),201==t.data.code&&(e.setStorageSync("userInfo",t.data.data),e.setStorageSync("token",t.data.data.token),e.setStorageSync("phone",t.data.data.phone),o.globalData.userInfo=t.data.data,o.globalData.token=t.data.data.token,o.globalData.phone=t.data.data.phone)}})}}};t.default=r}).call(this,n("543d")["default"])},b0e8:function(e,t,n){}},[["5bec","common/runtime","common/vendor"]]]);