<template>
	<view class="">
		<u-navbar title="意见反馈"></u-navbar>
		<view class="padding-lg">
			<u-loadmore status="nomore" color="#909399" font-size="28" :load-text="loadText"/>
			<u-input v-model="value" type="textarea" height="600" :custom-style="customStyle" :clearable="false" placeholder="请告诉我们您遇到的问题或者想反馈的意见" />
			<u-button type="warning" :custom-style="buttonCustomStyle" @click="submit">提交</u-button>
		</view>
		
	</view>
</template>

<script>

var that
export default {
	data() {
		return {
			value: '',
			loadText: {
				nomore: '反馈问题'
			},
			customStyle: {
				background: '#f4f4f4',
				padding: '20rpx',
				borderRadius: '6rpx',
				margin: '40rpx 0'
			},
			buttonCustomStyle: {
				color: '#303133',
			},
		}
	},
	onLoad() {
		that = this
	},
	methods: {
		submit(){
			if(!that.value){
				uni.showToast({
					title: '请输入内容',
					icon: 'none'
				})
				return
			}
			let data = {
				uid: that.userInfo.user_id,
				opinion: that.value
			}
			that.$u.post('/api/user/feedback', data).then(res => {
				console.log('loginPwd',res);
				that.$u.vuex('token', res.token)
			}).catch(err => {
				console.log('catch', err);
			});
		},
	}
}
</script>

<style lang="scss">
page{
	background-color: #fff;
}
</style>
