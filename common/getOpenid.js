const getOpenid = (that) => {
	wx.login({
		success: function (e) {
			console.log(e);
			if (e.code) {
			  //调用登录接口
				that.$u.post('/api/user/getopenid', {
					code: e.code
				}).then(res => {
					console.log('$getOpenid',res);
					that.$u.vuex('openid', res.openid)
					// that.$getUserInfo(res.openid)
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

}
module.exports = getOpenid