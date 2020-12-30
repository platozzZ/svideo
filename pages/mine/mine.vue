<template>
	<view class="">
		<u-image src="https://jjsp.activitysign.com/image/mine-bg.png" mode="widthFix"></u-image>
		<!-- <image src="https://jjsp.activitysign.com/image/mine-bg.png" class="bg" mode="widthFix"></image> -->
		<view class="container">
			<view class="header flex align-center justify-center">
				<view class="avatar-container flex flex-direction align-center u-rela" v-if="!!userInfo && userInfo.username != ''">
					<image :src="userInfo.photo" class="avatar"></image>
					<view class="u-abso tips" v-if="userInfo.user_type != 0">
						<u-image width="64" height="64" src="https://jjsp.activitysign.com/image/mine/owner.png" v-if="userInfo.user_type == 4"></u-image>
						<u-image width="64" height="64" src="https://jjsp.activitysign.com/image/mine/business1.png" v-else-if="userInfo.user_type == 3"></u-image>
						<u-image width="64" height="64" src="https://jjsp.activitysign.com/image/mine/sale.png" v-else></u-image>
						<!-- <u-image width="100%" height="100%" :src="'https://jjsp.activitysign.com/image/mine/' + userInfo.user_type == 0?'owner':'sale' + '.png'"></u-image> -->
					</view>
					<!-- <u-avatar :src="src" mode="circle" size="186" :show-level="true" level-icon="/static/image/mine/owner.png" level-bg-color="rgba(0,0,0,0)"></u-avatar> -->
					<text>{{userInfo.username}}</text> 
					
				</view>
				<view class=" flex flex-direction align-center u-rela" @click="toLogin" v-else>
					<!-- <image src="https://jjsp.activitysign.com/image/mine-avatar.png" class="avatar"></image> -->
					<!-- <u-image width="186" height="186" src="https://jjsp.activitysign.com/image/mine/owner.png" v-if="userInfo.user_type == 0"></u-image> -->
					<u-icon label="获取微信头像" label-size="36" label-color="#000000" 
						label-pos="bottom" margin-top="20" size="186" 
						:custom-style="headCustomStyle"
						name="https://jjsp.activitysign.com/image/mine-avatar.png"
					></u-icon>
					<!-- 获取微信头像 -->
					<view class="getUserInfo">
						<u-button :custom-style="customStyle" open-type="getUserInfo" @getuserinfo="getUserInfo"></u-button>
					</view>
				</view>
			</view>
			<view class="flex align-center justify-center padding-bottom-sm" v-if="!!userInfo && userInfo.username != ''">
				<view class="flex align-center " @click="toIntegral">
					<u-icon name="arrow-right" color="#7E7E7E" size="28" :label="integral + '积分'" label-pos="left" label-size="28" label-color="#7E7E7E"></u-icon>
				</view>
			</view>
			<u-grid col="3" :border="false">
				<u-grid-item v-for="(item,index) in navList" :key="item.id" :custom-style="gridItemStyle" @click="toRoute(item.id)">
					<u-icon :label="item.name" label-size="24" label-color="#7D7D7D" size="80" label-pos="bottom" :name="'https://jjsp.activitysign.com/image/mine/' + item.id + '.png'"></u-icon>
					<!-- <view class="grid-image-container">
						<image :src="'https://jjsp.activitysign.com/image/mine/' + item.id + '.png'" class="grid-image" mode="widthFix"></image>
					</view>
					<view class="grid-text text-xs u-m-t-10 u-tips-color">{{item.name}}</view> -->
				</u-grid-item>
			</u-grid>
			<view class="padding-lr padding-tb-sm">
				<u-line color="#D6D6D6" />
			</view>
			<view class="">
				<u-grid :col="'4'" :border="false">
					<u-grid-item v-for="(item,index) in gridList" :key="item.id" :custom-style="gridItemStyle"
						@click="toRoute(item.id)" 
						>
						<view class="u-rela">
							<u-badge :is-dot="true" type="error" :offset="offset" v-if="item.id == 'review'" :count="examine"></u-badge>
							<u-icon :label="item.name" label-size="24" label-color="#7D7D7D" size="80" margin-top="20" label-pos="bottom" :name="'https://jjsp.activitysign.com/image/mine/' + item.id + '.png'"></u-icon>
							
						</view>						
						<!-- <view class="grid-image-container">
							<image :src="'https://jjsp.activitysign.com/image/mine/' + item.id + '.png'" class="grid-image" mode="widthFix"></image>
						</view>
						<view class="grid-text text-sm u-m-t-20 u-tips-color">{{item.name}}</view> -->
					</u-grid-item>
				</u-grid>
			</view>
		</view>
		<!-- <view class="padding">
			<u-button @click="clearStorage" size="mini" shape="circle" type="warning">退出登录</u-button>
		</view>
		 -->
		<u-modal v-model="modalShow" ref="uModal" :show-cancel-button="true" :show-title="false" content="部分功能需要获取您的手机号,请确认">
			<view class="confirm-button u-rela flex align-center justify-center" slot="confirm-button">
				确认
				<u-button :custom-style="modalCustomStyle" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber"></u-button>
			</view>
		</u-modal>
		<u-popup v-model="showBinds" mode="center" width="80%" border-radius="8" @close="bindClose">
			<view class="model-bind bg-pwhite padding-lg">
				<view class="text-center">
					请手动绑定手机号
				</view>
				<view class="margin-tb">
					<!-- <u-form-item> -->
						<u-input placeholder="请输入手机号" v-model="modelPhone" maxlength="11" border type="number" custom-style="customBindStyle"></u-input>
					<!-- </u-form-item> -->
				</view>
				<view>
					<u-button type="primary" @click="bindPhone">绑定</u-button>
				</view>
				
			</view>
		</u-popup>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
var that
export default {
	data() {
		return {
			gridList: [],
			gridItemStyle: {
				padding: '15rpx 0',
				// justifyContent: 'space-between',
				minHeight: '130rpx'
			},
			headCustomStyle: {
				// borderRadius: '50%',
			},
			customStyle: {
				width: '100%',
				height: '100%',
				position: 'absolute',
				top: '0',
				left: '0',
				opacity: 0
			},
			navList: [{name:'我的视频',id: 'video'},{name:'我的积分',id: 'integral'},{name:'我的转发',id: 'share'},],
			modalShow: false,
			modalCustomStyle: {
				width: '100%',
				height: '100%',
				position: 'absolute',
				top: '0',
				left: '0',
				opacity: 0
			},
			offset: [0, 0],
			modelPhone: '',
			customBindStyle: {
				backgroundColor: '#f1f1f1'
			}
		}
	},
	onLoad() {
		that = this
	},
	onShow() {
		console.log(this.openid);
		this.$getUserInfo(this,this.openid)
		that.getGridList()
		if(!that.userInfo){
			return
		}
		that.$getSign(that)
	},
	computed:{
		showBinds:{
			get(){
				return this.showBind
			},
			set(value){
				console.log(value);
				// if(!value){
				// 	return
				// }
				that.$u.vuex('showBind', value)
			}
		}
	},
	methods: {
		bindClose(){
			console.log('bindClose');
		},
		getUserInfo(e){
			console.log(e);
			// that.modalShow = true
			if(!e.detail.userInfo){
				return
			}
			let data = {
				type: 3,
				wx_openid: that.openid,
				userInfo: JSON.stringify(e.detail.userInfo)
			}
			that.login(data)
			// that.$u.vuex('userInfo', e.detail.userInfo)
		},
		login(data){
			that.$u.post('/api/user/login', data).then(res => {
				console.log('login',res);
				that.$u.vuex('token', res.token)
				that.$u.vuex('userInfo', res)
				if(!res.phone){
					that.modalShow = true
				}
			}).catch(err => {
				console.log('catch', err);
			});
		},
		bindPhone(){
			if(!that.$u.test.mobile(that.modelPhone)){
				that.$u.toast('请输入正确的手机号')
				return
			}
			let data = {
				wx_openid: that.openid,
				phone: that.modelPhone
			}
			that.$u.post('api/user/bdphone', data).then(res => {
				console.log('bindPhone',res);
				that.$u.vuex('userInfo.phone', that.modelPhone)
			}).catch(err => {
				console.log('catch', err);
			});
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
			that.$u.post('/api/user/bdphone', data).then(res => {
				console.log('getphone',res);
				// that.$u.vuex('token', res.token)
				that.$u.vuex('userInfo.phone', res.phone)
				// that.showToast()
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
		getGridList(){
			let list1 = [
				{name:'我的订单',id: 'order'},{name:'我的收藏',id: 'collect'},{name:'播放历史',id: 'history'},
				{name:'意见反馈',id: 'feedback'},{name:'举报',id: 'report'},
				{name:'积分商城',id: 'mall'},
				{name:'消息',id: 'message'}
			]
			let list2 = [
				{name:'我的订单',id: 'order'},{name:'我的收藏',id: 'collect'},{name:'审核列表',id: 'review'},{name:'播放历史',id: 'history'},
				{name:'我的海报',id: 'poster'},{name:'意见反馈',id: 'feedback'},{name:'举报',id: 'report'},
				{name:'积分商城',id: 'mall'},
				{name:'消息',id: 'message'}
			]
			let list3 = [
				{name:'我的订单',id: 'order'},{name:'我的收藏',id: 'collect'},{name:'审核列表',id: 'review'},{name:'播放历史',id: 'history'},
				{name:'我的海报',id: 'poster'},{name:'意见反馈',id: 'feedback'},{name:'举报',id: 'report'},{name:'邀请员工',id: 'business'},
				{name:'积分商城',id: 'mall'},
				{name:'消息',id: 'message'}
			]
			// that.gridList = list
			// if(that.userInfo.user_type == 0) {
			// 	that.gridList = list1
			// } else 
			if(that.userInfo.user_type == 1 || that.userInfo.user_type == 2){
				that.gridList = list2
			} else if(that.userInfo.user_type == 3) {
				that.gridList = list3
			} else {
				that.gridList = list1
			}
		},
		delArr(val, arr){
		    let newarr = []; 
			arr.map((item,index) => {
				if(!val.includes(item.id)){
					newarr.push(item)
				}
			})
			console.log(newarr);
		    return newarr;
		},
		toRoute(e){
			console.log(e);
			if(!that.userInfo || that.userInfo.username == ''){
				that.toLogin()
				return
				// that.showToast('')
			}
			switch(e){
				case 'order':
					that.$u.route('/pages/order/order');
					break;
				case 'business':
					that.$u.route('/pages/inviteClerk/inviteClerk');
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
				case 'video':
					that.$u.route('/pages/mineList/video');
					break;
				case 'mall':
					// that.$u.toast('敬请期待')
					that.$u.route('/pages/integralMall/integralMall');
					break;
				case 'message':
					that.$u.route('/pages/message/message');
					break;
				case 'integral':
					that.$u.route('/pages/integral/integral');
					break;
				case 'share':
					that.$u.route('/pages/mineList/share');
					break;
			}
		},
		showToast() {
			that.$refs.uToast.show({
				title: '授权成功',
				type: 'success'
			})
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
		.avatar-container{
			.avatar{
				width: 186rpx;
				height: 186rpx;
				border-radius: 50%;
				display: block;
				border: 6rpx solid #fff;
				margin-bottom: 20rpx;
			}
			.tips{
				width: 64rpx;
				height: 64rpx;
				top: 120rpx;
				right: -10%;
				z-index: 1;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
		// /deep/ .u-avatar__level{
		// 	width: 64rpx;
		// 	height: 64rpx;
		// 	.u-icon{
		// 		.u-icon__img{
		// 			width: 64rpx;
		// 			height: 64rpx;
					
		// 		}
		// 	}
		// }
		
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
