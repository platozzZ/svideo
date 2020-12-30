const getSign = (that) => {
	let data = {
		user_id: that.userInfo.user_id,
	}
	that.$u.post('/api/user/getsign',data).then(res => {
		console.log('getsign',res);
		that.$u.vuex('integral', res.integral)
		that.$u.vuex('examine', res.examine)
	}).catch(err => {
		console.log('getsign', err);
	});

}
module.exports = getSign