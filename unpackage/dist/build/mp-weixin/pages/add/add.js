(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/add/add"],{"82cb":function(e,o,n){"use strict";(function(e){var n;Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var t={data:function(){return{model:{goodsType:"",user_id:"",title:"",ftitle:"",video:"",cover_image:"",distributor_id:"",longitude:"105.156525",latitude:"38.668237",nclassify_id:"",nclassify_two_id:"",nclassify_three_id:"",nsendtime:""},labelStyle:{color:"#4C4C4C"},selectList:[],rules:{video:[{required:!0,message:"视频不能为空",trigger:["blur","change"]}],title:[{required:!0,message:"请输入视频标题",trigger:"blur"}],nclassify_id:[{required:!0,message:"请选择车辆类型",trigger:"change"}],nclassify_two_id:[{required:!0,message:"请选择车辆类型",trigger:"change"}],nclassify_three_id:[{required:!0,message:"请选择车辆类型",trigger:"change"}],ftitle:[{required:!0,message:"请输入4S店的标题",trigger:"blur"}],nsendtime:[{required:!0,message:"请选择发布时间",trigger:"change"}]},border:!0,borderColor:"#F6F6F6",pickerShow:!1,selectShow:!1,params:{year:!0,month:!0,day:!0,hour:!0,minute:!0,second:!0},selectResult:"请选择车辆类型",codeTips:"",errorType:["toast"],modalShow:!1,modalContent:"确认删除视频吗？"}},onLoad:function(){n=this,n.getType(),n.getLocations(),n.model.user_id=n.userInfo.user_id,n.model.distributor_id=n.userInfo.distributor_id,console.log(n.model)},onReady:function(){this.$refs.uForm.setRules(this.rules)},methods:{addVideo:function(o){e.chooseVideo({count:1,sourceType:["album","camera"],maxDuration:15,success:function(e){console.log(e),console.log(n.model),console.log(n.model.video),n.model.video=e.tempFilePath}})},submit:function(){n.$refs.uForm.validate((function(e){e?(n.add(n.model),console.log("验证通过")):console.log("验证失败")}))},add:function(o){console.log(o);var t=e.uploadFile({url:"https://jjsp.autovlog.com.cn/api/videofill/store",formData:o,filePath:o.video,name:"video",success:function(e){if(console.log("uploadTask",e),200==e.statusCode){var o=JSON.parse(e.data);console.log(o),200==o.statusCode?n.showToast("发布成功，等待审核","success",!0):n.showToast(o.message,"warning",!0)}else n.showToast("文件过大","error")}});t.onProgressUpdate((function(o){console.log(o),o.progress<100?e.showLoading({title:"上传中..."}):e.hideLoading()}))},deleteVideo:function(){console.log("deleteVideo"),n.showModal()},getLocations:function(){console.log("getLocations"),e.getLocation({success:function(e){console.log(e),n.model.longitude=e.longitude,n.model.latitude=e.latitude},fail:function(e){console.log(e)}})},getType:function(){var e={distributor_id:n.userInfo.distributor_id};console.log(e),n.$u.post("/api/video/type",e).then((function(e){console.log("getType",e),n.selectList=e})).catch((function(e){console.log("getType-catch",e)}))},showSelect:function(){n.selectShow=!0},timeConfirm:function(e){console.log(e),n.model.nsendtime=e.year+"-"+e.month+"-"+e.day+" "+e.hour+":"+e.minute+":"+e.second},showModal:function(){n.modalShow=!0},modalConfirm:function(e){setTimeout((function(){n.modalShow=!1,n.model.video=""}),1500)},selectConfirm:function(e){n.model.goodsType="",console.log(e),console.log(e[0]),console.log(e[0].value),e.map((function(e,o){n.model.goodsType+=""==n.model.goodsType?e.label:"-"+e.label,0==o?n.model.nclassify_id=e.value:1==o?n.model.nclassify_two_id=e.value:n.model.nclassify_three_id=e.value}))},onSuccess:function(e,o,n){console.log("onSuccess-data",e),console.log("onSuccess-index",o),console.log("onSuccess-lists",n)},onChange:function(e,o,t,i){var s=JSON.parse(e.data);200==s.statusCode?n.model.cover_image=s.data.img_url:n.showToast(e.response.message,"error")},onRemove:function(e,o,t){n.model.cover_image=""},onListChange:function(e,o){if(console.log("onListChange",e),console.log("onListChange",e.length),console.log("onListChange-name",o),0==e.length)return n.model.cover_image="",void console.log(n.model);console.log(n.model);var t=e[0];200==t.response.statusCode?n.model.cover_image=t.response.data.img_url:n.showToast(t.response.message,"error")},btop:function(e){return console.log(e),new Promise((function(o,n){var t=e.split(","),i=t[0].match(/:(.*?);/)[1],s=atob(t[1]),u=s.length,l=new Uint8Array(u);while(u--)l[u]=s.charCodeAt(u);return o((window.URL||window.webkitURL).createObjectURL(new Blob([l],{type:i})))}))},base64:function(o){return new Promise((function(n,t){e.getFileSystemManager().readFile({filePath:o,encoding:"base64",success:function(e){n("data:image/;base64,"+e.data)},fail:function(e){return t(e.errMsg)}})}))},videoTips:function(){n.$u.toast("请上传视频")},showToast:function(e,o,t){n.$refs.uToast.show({title:e,type:o,icon:!1})}}};o.default=t}).call(this,n("543d")["default"])},"83e0":function(e,o,n){"use strict";n.d(o,"b",(function(){return i})),n.d(o,"c",(function(){return s})),n.d(o,"a",(function(){return t}));var t={uNavbar:function(){return n.e("uview-ui/components/u-navbar/u-navbar").then(n.bind(null,"bfec"))},uIcon:function(){return n.e("uview-ui/components/u-icon/u-icon").then(n.bind(null,"5233"))},uForm:function(){return n.e("uview-ui/components/u-form/u-form").then(n.bind(null,"6c89"))},uFormItem:function(){return Promise.all([n.e("common/vendor"),n.e("uview-ui/components/u-form-item/u-form-item")]).then(n.bind(null,"23ff"))},uUpload:function(){return Promise.all([n.e("common/vendor"),n.e("uview-ui/components/u-upload/u-upload")]).then(n.bind(null,"5cea"))},uInput:function(){return Promise.all([n.e("common/vendor"),n.e("uview-ui/components/u-input/u-input")]).then(n.bind(null,"6ef9"))},uPicker:function(){return Promise.all([n.e("common/vendor"),n.e("uview-ui/components/u-picker/u-picker")]).then(n.bind(null,"4a15"))},uSelect:function(){return n.e("uview-ui/components/u-select/u-select").then(n.bind(null,"db6b"))},uToast:function(){return n.e("uview-ui/components/u-toast/u-toast").then(n.bind(null,"0563"))},uModal:function(){return n.e("uview-ui/components/u-modal/u-modal").then(n.bind(null,"f891"))}},i=function(){var e=this,o=e.$createElement;e._self._c;e._isMounted||(e.e0=function(o){e.selectShow=!0},e.e1=function(o){e.pickerShow=!0})},s=[]},8711:function(e,o,n){"use strict";n.r(o);var t=n("82cb"),i=n.n(t);for(var s in t)"default"!==s&&function(e){n.d(o,e,(function(){return t[e]}))}(s);o["default"]=i.a},af8c:function(e,o,n){"use strict";(function(e){n("3e13");t(n("66fd"));var o=t(n("c0e9"));function t(e){return e&&e.__esModule?e:{default:e}}e(o.default)}).call(this,n("543d")["createPage"])},b8a3:function(e,o,n){},c0e9:function(e,o,n){"use strict";n.r(o);var t=n("83e0"),i=n("8711");for(var s in i)"default"!==s&&function(e){n.d(o,e,(function(){return i[e]}))}(s);n("ffe3");var u,l=n("f0c5"),c=Object(l["a"])(i["default"],t["b"],t["c"],!1,null,null,null,!1,t["a"],u);o["default"]=c.exports},ffe3:function(e,o,n){"use strict";var t=n("b8a3"),i=n.n(t);i.a}},[["af8c","common/runtime","common/vendor"]]]);