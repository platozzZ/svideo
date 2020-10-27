<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
</style>
<script>
import Vue from 'vue'
var that
export default {
	onLaunch: function() {
		console.log('App Launch');
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
			return new Promise(function (resolve, reject) {
				// 调用登录接口
				wx.login({
				  success: function (e) {
					  console.log(e);
					if (e.code) {
					  //调用登录接口
					  uni.request({
					  	url: 'https://shoplk.fblife.com/index.php?store_id=50&module=app&action=index&app=getopenid&code=' + e.code,
					  	method: "GET",
					  	header: {
					  		'Content-Type': 'application/x-www-form-urlencoded'
					  	},
					  	success: (res) => {
					  		console.log('request',res.data);
					  		if(res.data.code == 200){
								that.$u.vuex('openid', res.data.data.openid)
					  			uni.setStorageSync('openid',res.data.data.openid)
					  			that.getInfo(res.data.data.openid)
								resolve(res.data);
					  		} else {
					  			// that.loginOpenid()
					  		}
					  		// this.text = 'request success';
					  	}
					  });
					  
					} else {
					  console.log('获取用户登录态失败！' + res.errMsg);
					  var res = {
						status: 300,
						data: '错误'
					  }
					  reject('error');
					}  
				  }
				})
			});
		},
		
		getInfo(e){
			// http://home-api.fblife.com/api/v1//user/wxlogin
			uni.request({
				url: 'https://home-api.fblife.com/api/v1/user/wxlogin',
				method: "POST",
				data: {
					openid: e
				},
				header: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				success: (res) => {
					console.log('getInfo',res);
					if(res.data.code == 201){
						uni.setStorageSync('userInfo',res.data.data)
						uni.setStorageSync('token', res.data.data.token);
						uni.setStorageSync('phone', res.data.data.phone);
						that.globalData.userInfo = res.data.data
						that.globalData.token = res.data.data.token
						that.globalData.phone = res.data.data.phone
						
					} else {
						// that.loginOpenid()
					}
					// this.text = 'request success';
				}
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
