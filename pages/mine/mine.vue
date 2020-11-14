<template>
	<view class="">
		<image src="../../static/image/mine-bg.png" class="bg" mode="widthFix"></image>
		<view class="container">
			<view class="header flex align-center justify-center">
				<view class=" flex flex-direction align-center" v-if="!!userInfo">
					<image :src="userInfo.photo" class="avatar"></image>
					{{userInfo.username}}
				</view>
				<view class=" flex flex-direction align-center" @click="toLogin" v-else>
					<image src="../../static/image/mine-avatar.png" class="avatar"></image>
					请登录
				</view>
			</view>
			<view class="info flex align-center justify-between">
				<view class="flex align-center flex-sub justify-center">
					<text class="">66</text>视频
				</view>
				<view class="flex align-center flex-sub justify-center">
					<text class="">66</text>直播
				</view>
				<view class="flex align-center flex-sub justify-center" @click="toIntegral">
					<text class="">66</text>积分
				</view>
				<view class="flex align-center flex-sub justify-center">
					<text class="">66</text>转发
				</view>
			</view>
			<view class="padding">
				<u-line color="#D6D6D6" />
			</view>
			<view class="">
				<u-grid :col="'4'" :border="false">
					<u-grid-item v-for="(item,index) in gridList" :key="item.id" :custom-style="gridItemStyle" @click="toRoute(item.id)">
						<view class="grid-image-container">
							<image :src="'../../static/image/mine/' + item.id + '.png'" class="grid-image" mode="widthFix"></image>
						</view>
						<view class="grid-text text-sm u-m-t-20 u-tips-color">{{item.name}}</view>
					</u-grid-item>
				</u-grid>
			</view>
		</view>
		<u-tabbar
			:list="vuex_tabbar"
			:mid-button="vuex_midButton"
			:mid-button-size="vuex_midButton_size"
			:icon-size="vuex_iconsize"
			@change="tabBarChange"
		></u-tabbar>
		
	</view>
</template>

<script>
var that
export default {
	data() {
		return {
			gridList: [
				{name:'我的订单',id: 'order'},{name:'我的收藏',id: 'collect'},{name:'我的视频',id: 'review'},{name:'播放历史',id: 'history'},
				{name:'我的转发',id: 'poster'},{name:'意见反馈',id: 'feedback'},{name:'举报',id: 'report'},{name:'商家入驻',id: 'business'}
			],
			gridItemStyle: {
				padding: '15rpx 0',
				// justifyContent: 'space-between',
				minHeight: '130rpx'
			},
			
		}
	},
	onLoad() {
		that = this
	},
	methods: {
		tabBarChange(e){
			console.log(e);
			if(e == 2){
				that.$u.route('/pages/add/add');
				// uni.chooseVideo({
				// 	count: 1,
				// 	sourceType: ['camera'],
				// 	success: function (res) {
				// 		console.log(res);
				// 		// self.src = res.tempFilePath;
				// 	}
				// });
			}
		},
		toIntegral(){
			that.$u.route('/pages/integral/integral');
		},
		toLogin(){
			that.$u.route('/pages/login/login');
		},
		toRoute(e){
			console.log(e);
			switch(e){
				case 'order':
					that.$u.route('/pages/order/order');
					break;
				case 'business':
					that.$u.route('/pages/business/business');
					break;
				case 'collect':
					that.$u.route('/pages/mineList/collect');
					break;
				case 'history':
					that.$u.route('/pages/mineList/history');
					break;
				case 'feedback':
					that.$u.route('/pages/mineList/feedback');
					break;
				case 'report':
					that.$u.route('/pages/mineList/report');
					break;
				case 'poster':
					that.$u.route('/pages/mineList/poster');
					break;
				case 'review':
					that.$u.route('/pages/mineList/review');
					break;
			}
			// if(e == 'order'){
			// 	that.$u.route('/pages/order/order');
			// } else if(e == 'business'){
			// 	that.$u.route('/pages/business/business');
				
			// } else if(e == 'collect'){
			// 	that.$u.route('/pages/mineList/collect');
				
			// }
		},
	}
}
</script>

<style lang="scss">
// $u-light-color\
page{
	background-color: #fff;
}
.bg{
	position: relative;
	top: 0;
	left: 0;
	width: 100%;
	z-index: 0;
	display: block;
}
.container{
	position: relative;
	z-index: 1;
	background-color: #fff;
	border-radius: 36rpx;
	margin-top: -160rpx;
	padding-top: 120rpx;
	.header{
		margin-bottom: 30rpx;
		font-size: 36rpx;
		position: absolute;
		top: -160rpx;
		left: 0;
		width: 100%;
		.avatar{
			width: 186rpx;
			height: 186rpx;
			border-radius: 50%;
			display: block;
			border: 6rpx solid #fff;
			margin-bottom: 20rpx;
		}
	}
	.info{
		color: #979797;
		font-size: 24rpx;
		text{
			color: #000;
			font-size: 36rpx;
			margin-right: 10rpx;
		}
	}
	.grid-image-container{
		// flex: 1;
		width: 68rpx;
		height: 68rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		.grid-image{
			width: 68rpx;
			height: auto;
		}
	}
}
</style>
