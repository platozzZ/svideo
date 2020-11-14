const getSetting = (that) => {
    uni.getSetting({
		success: function(res) {
			console.log(res);
			var statu = res.authSetting;
			console.log(statu);
			if (!statu['scope.userLocation']) {
				uni.showModal({
					title: '是否授权获取位置信息',
					content: '需要获取您的位置信息，请确认授权，否则相关功能将无法使用',
					success(tip) {
							console.log(tip);
						if (tip.confirm) {
							console.log('tip.confirm');
							uni.openSetting({
								success: function(data) {
									console.log('openSetting',data);
									if (data.authSetting["scope.userLocation"] === true) {
										uni.showToast({
											title: '授权成功',
											icon: 'success',
											duration: 2000,
											success() {
												uni.getLocation({
												    success: function (res) {
														console.log(res);
														that.$u.vuex('longitude', res.longitude)
														that.$u.vuex('latitude', res.latitude)
												    },
													fail(err){
														console.log(err);
													}
												});
											}
										})
									}
								}
							})
						} else {
							wx.showToast({
								title: '授权失败',
								icon: 'none',
								duration: 2000
							})
						}
					}
				})

			}
		}
	})

}
module.exports = getSetting