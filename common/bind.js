const bindUser = (that,data) => {
	// let data = {
	// 	user_id: that.userInfo.user_id,
	// }
	that.$u.post('/api/user/father',data).then(res => {
		console.log('bindUser',res);
		// that.$u.vuex('integral', res.integral)
		// that.$u.vuex('examine', res.examine)
	}).catch(err => {
		console.log('bindUser', err);
	});

}
module.exports = bindUser