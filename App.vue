<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
</style>
<script>
import Vue from 'vue'
var that
export default {
	onLaunch: function() {
		that = this
		console.log('App Launch');
		// if(!that.openid){
		// 	that.getOpenid()
		// } else {
		// 	that.getUserInfo(that.openid)
		// }
		
		// #ifdef MP-WEIXIN
		// 获取小程序更新机制兼容
		if (wx.canIUse('getUpdateManager')) {
			const updateManager = wx.getUpdateManager()
			updateManager.onCheckForUpdate(function (res) {
				// console.log(res)
				// 请求完新版本信息的回调
				if (res.hasUpdate) {
					updateManager.onUpdateReady(function () {
						wx.showModal({
							title: '更新提示',
							content: '新版本已经准备好，是否重启应用？',
							success: function (res) {
								if (res.confirm) {
									// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
									updateManager.applyUpdate()
								}
							}
						})
					})
					updateManager.onUpdateFailed(function () {
						// 新的版本下载失败
						wx.showModal({
							title: '已经有新版本了哟~',
							content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
						})
					})
				}
			})
		} else {
			// 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
			wx.showModal({
				title: '提示',
				content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
			})
		}
		// #endif
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	},
	methods:{
		newPromise(){
			// return new Promise(function (resolve, reject) {
				// 调用登录接口
				wx.login({
					success: function (e) {
						console.log(e);
						if (e.code) {
						  //调用登录接口
							that.$u.post('/api/user/getopenid', {
								code: e.code
							}).then(res => {
								console.log('app-newPromise',res);
								// resolve(res)
								// that.$isResolve()
								that.$u.vuex('openid', res.openid)
								that.getUserInfo(res.openid)
							});
						  
						} else {
							console.log('获取用户登录态失败！' + res.errMsg);
							var res = {
								status: 300,
								data: '错误'
							}
						  // reject('error');
						}  
					}
				})
			// });
		},
		getOpenid(){
			wx.login({
				success: function (e) {
					console.log(e);
					if (e.code) {
					  //调用登录接口
						that.$u.post('/api/user/getopenid', {
							code: e.code
						}).then(res => {
							console.log('app-newPromise',res);
							that.$u.vuex('openid', res.openid)
							that.getUserInfo(res.openid)
						});
					  
					} else {
						console.log('获取用户登录态失败！' + res.errMsg);
						var res = {
							status: 300,
							data: '错误'
						}
					}  
				}
			})
		},
		// /api/user/getUserInfo
		getUserInfo(id){
			that.$u.post('/api/user/getUserInfo', {
				wx_openid: id
			}).then(res => {
				if(!res){
					return
				}
				console.log('app-getUserInfo',res);
				that.$u.vuex('isSwitch', res.switch)
				that.$u.vuex('userInfo', res)
				// that.$u.vuex('userInfo.phone',"18911262211")
				// resolve(res)
			});
		},
	}
};
</script>

<style>
@import "colorui/main.css";
@import "colorui/icon.css";
@import "static/css/common.css";
/* 解决头条小程序组件内引入字体不生效的问题 */
/* #ifdef MP-TOUTIAO */
@font-face {
	font-family: uniicons;
	src: url('/static/uni.ttf');
}
/* #endif */
</style>
