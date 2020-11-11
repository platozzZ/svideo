<template>
	<view class="">
		<u-navbar title="登录成功"></u-navbar>
		<view class="container flex flex-direction align-center u-p-t-80">
			<image src="../../static/image/loginSuccess.png" class="head"></image>
			<view class="u-main-color u-font-32 u-m-t-40 u-m-b-20">
				登录成功
			</view>
			<view class="u-tips-color u-font-26 u-m-b-70">
				已绑定手机号，欢迎您加入我们
			</view>
			<u-button class="btn" type="warning" shape="circle" @click="toIndex">返回首页</u-button>
		</view>
	</view>
</template>

<script>
var that
export default {
	data() {
		return {
			
		}
	},
	onLoad() {
		that = this
	},
	methods: {
		toIndex(){
			that.$u.route({
				type: 'tab',
				url: '/pages/index/index'
			});
		},
	}
}
</script>

<style lang="scss">
page{
	background-color: #fff;
}
.container{
	.head{
		width: 154rpx;
		height: 154rpx;
	}
	.btn{
		color: $u-main-color;
		width: 70%;
	}
}
</style>
