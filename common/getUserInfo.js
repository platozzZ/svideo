const getUserInfo = (that,id) => {
	that.$u.post('/api/user/getUserInfo', {
		wx_openid: id
	}).then(res => {
		console.log('$getUserInfo',res);
		// if(!res){
		// 	that.$u.vuex('userInfo', {})
		// 	return
		// }
		that.$u.vuex('userInfo', res)
	});

}
module.exports = getUserInfo