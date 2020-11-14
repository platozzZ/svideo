<template>
	<view class="">
		<u-navbar title="积分明细" :back-icon-color="titleColor" :title-color="titleColor" :immersive="true" :background="background" :border-bottom="false"></u-navbar>
		<view class="container">
			<image src="../../static/image/mine/bg.png" class="bg"></image>
			<view class="int-container u-abso flex flex-direction align-center">
				<view class="title u-rela">
					285
					<text class="u-abso">积分</text>
				</view>
				<view class="btn" :style="{margin:(isIphoneX?'20rpx 0 30rpx':'50rpx 0')}">
					去商城兑换
				</view>
			</view>
		</view>
		<view class="u-p-t-20 u-border-bottom">
			<u-sticky>
				<u-tabs bg-color="#fff" inactive-color="#909399" font-size="36" active-color="#303030" bar-width="100"
				 :list="tabList" @change="tabChange" :current="current" :is-scroll="isScroll"></u-tabs>
			</u-sticky>
			
		</view>
		<view class="" style="height: 1000px;">
			<u-cell-group>
				<u-cell-item center :is-link="true" :label="label" value="+999" index="index" @click="click" :arrow="false"
				 :title="title">
				</u-cell-item>
			</u-cell-group>
		</view>
	</view>
</template>

<script>
var that
export default {
	data() {
		return {
			background: {
				// 导航栏背景图
				background: 'url(/static/image/mine/bg.png) no-repeat',
				// background: 'url(https://cdn.uviewui.com/uview/swiper/1.jpg) no-repeat',
				// 还可以设置背景图size属性
				backgroundSize: '100%',
				
				// 渐变色
				// backgroundImage: 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
			},
			titleColor: '#fff',
			tabList: [
				{
					name: '积分明细'
				}, {
					name:  '积分说明'
				}
			],
			isScroll: false,
			current: 0,
			label: '2020-01-23',
			title: '当月交易奖励积分',
			isIphoneX: false
		}
	},
	onLoad() {
		that = this
		console.log(this.$u.sys())
		console.log(this.$u.sys().model)
		let sysModel = that.$u.sys().model
		
		let reg = RegExp(/iPhone X/);
		that.isIphoneX = reg.test(sysModel)
		// if(reg.test(sysModel)){
		// 	that.isIphoneX = true
		// }
		console.log(reg.test(sysModel)); // true
		console.log(that.isIphoneX);
	},
	methods: {
		toRoute(e){
			console.log(e);
			that.$u.route('/pages/integralMall/mallDetail');
			// uni.switchTab({
			// 	url: '../mine/mine'
			// })
		},
		tabChange(e){
			console.log(e);
			that.current = e;
		},
	}
}
</script>

<style lang="scss">
page{
	background-color: #fff;
}
.container{
	position: relative;
	.bg{
		width: 100%;
		height: 446rpx;
		display: block;
	}
	.int-container{
		bottom: 0;
		width: 100%;
		.title{
			font-size: 120rpx;
			color: #FFD524;
			text{
				right: -100rpx;
				bottom: 20rpx;
				color: #D0D0D0;
				font-size: 40rpx;
			}
		}
		.btn{
			padding: 20rpx 30rpx;
			color: #FFD524;
			border: 1rpx solid #FFD524;
			border-radius: 4rpx;
			margin: 20rpx 0;
		}
	}
}
</style>
