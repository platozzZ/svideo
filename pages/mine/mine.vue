<template>
	<view class="">
		<image src="../../static/image/mine-bg.png" class="bg" mode="widthFix"></image>
		<view class="container">
			<view class="header flex align-center justify-center">
				<view class=" flex flex-direction align-center" v-if="!!userInfo">
					<image :src="userInfo.photo" class="avatar"></image>
					{{userInfo.username}}
				</view>
				<view class=" flex flex-direction align-center u-rela" @click="toLogin" v-else>
					<image src="../../static/image/mine-avatar.png" class="avatar"></image>
					获取微信头像
					<view class="getUserInfo">
						<u-button :custom-style="customStyle" open-type="getUserInfo" @getuserinfo="getUserInfo"></u-button>
					</view>
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
		<view class="padding">
			<!-- <open-data type="userNickName"></open-data>
			<open-data type="userAvatarUrl"></open-data> -->
			<u-button @click="clearStorage" size="mini" shape="circle" type="warning">退出登录</u-button>
		</view>
		
		<u-modal v-model="modalShow" ref="uModal" :show-cancel-button="true" :show-title="false" content="部分功能需要获取您的手机号,请确认">
			<view class="confirm-button u-rela flex align-center justify-center" slot="confirm-button">
				确认
				<u-button :custom-style="modalCustomStyle" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber"></u-button>
			</view>
		</u-modal>
		<!-- <u-tabbar
			:list="vuex_tabbar"
			:mid-button="vuex_midButton"
			:mid-button-size="vuex_midButton_size"
			:icon-size="vuex_iconsize"
			@change="tabBarChange"
		></u-tabbar> -->
		
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
			customStyle: {
				width: '100%',
				height: '100%',
				position: 'absolute',
				top: '0',
				left: '0',
				opacity: 0
			},
			modalShow: false,
			modalCustomStyle: {
				width: '100%',
				height: '100%',
				position: 'absolute',
				top: '0',
				left: '0',
				opacity: 0
			},
		}
	},
	onLoad() {
		that = this
	},
	methods: {
		getUserInfo(e){
			console.log(e);
			that.modalShow = true
			if(!e.detail.userInfo){
				return
			}
			
			that.$u.vuex('userInfo', e.detail.userInfo)
		},
		getPhoneNumber(e){
			console.log('getPhoneNumber',e);
			that.modalShow = false
			let data = {
				type: 3,
				wx_openid: that.openid,
				encryptedData:e.detail.encryptedData,
				iv: e.detail.iv
			}
			that.getphone(data)
		},
		getphone(data){
			that.$u.post('/api/user/getphone', data).then(res => {
				console.log('login',res);
				// that.$u.vuex('token', res.token)
				// that.$u.vuex('userInfo', res)
				// that.showToast()
				// that.$u.route({
				// 	type: 'back'
				// })
				// resolve(res)
			}).catch(err => {
				console.log('catch', err);
			});
		},
		clearStorage(){
			uni.clearStorage()
			
			that.$u.vuex('userInfo', '')
		},
		toIntegral(){
			that.$u.route('/pages/integral/integral');
		},
		toLogin(){
			that.$u.route('/pages/login/login');
		},
		toRoute(e){
			console.log(e);
			if(!that.userInfo){
				that.toLogin()
				return
				// that.showToast('')
			}
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
		.getUserInfo{
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			/deep/ .u-btn{
				width: 100%;
				height: 100%;
				opacity: 0;
			}
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
