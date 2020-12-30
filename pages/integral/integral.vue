<template>
	<view class="">
		<u-navbar title="积分明细" :back-icon-color="titleColor" :title-color="titleColor" :immersive="true" :background="background" :border-bottom="false"></u-navbar>
		<view class="container">
			<image src="https://jjsp.activitysign.com/image/mine/bg.png" class="bg"></image>
			<view class="int-container u-abso flex flex-direction align-center justify-center" :style="{height: topHeight + 'px'}">
				<view class="title u-rela">
					{{integral}}
					<text class="u-abso">积分</text>
				</view>
				 <!-- :style="{margin:(isIphoneX?'20rpx 0 30rpx':'50rpx 0')}" -->
				<view class="btn u-m-t-20" @click="toMall">
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
		<view class="" style="height: 1000px;" v-if="current == 0">
			<block v-if="list.length > 0">
			<view class="cu-list menu">
				<view class="cu-item" v-for="(item,index) in list" :key="index">
					<view class="content padding-tb-sm">
						<view class="title">
							<text class="u-line-1">{{item.record}}</text>
							
						</view>
						<view class="des">
							{{item.sign_time}}
						</view>
					</view>
					<view class="action">
						{{item.symbol + item.score}}
					</view>
				</view>
			</view>
			<!-- <u-cell-group :border="false">
				<u-cell-item center
					v-for="(item,index) in list" :key="index"
					:label="item.sign_time" :value="item.symbol + item.score" :arrow="false"
					:title="item.record"
					:title-style="titleStyle"
					 >
				</u-cell-item>
			</u-cell-group> -->
			<u-loadmore :is-dot="true" :status="loadStatus" margin-top="20" margin-bottom="20"></u-loadmore>
			</block>
			<view class="emptyContainer u-m-t-80 u-p-t-80" v-else>
				<u-empty text="暂无更多数据" mode="list"></u-empty>
			</view>
		</view>
		<view class="padding" v-else>
			<u-parse :html="tips" :lazy-load="true"></u-parse>
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
				background: 'url(https://jjsp.activitysign.com/image/mine/bg.png) no-repeat',
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
			// label: '2020-01-23',
			// title: '当月交易奖励积分',
			isIphoneX: false,
			topHeight: '160',
			page: 1,
			totalPage: 0,
			list: [],
			loadStatus: 'loadmore',
			tips: '',
			titleStyle: {
				flex: '1',
				// width: 'calc(100% - 160rpx)'
			}
		}
	},
	onLoad() {
		that = this
		console.log(this.$u.sys())
		console.log(this.$u.sys().model)
		let sys = that.$u.sys()
		let sysModel = that.$u.sys().model
		let platform = that.$u.os()
		let reg = RegExp(/iPhone X/);
		that.isIphoneX = reg.test(sysModel)
		console.log(reg.test(sysModel)); // true
		console.log(that.isIphoneX);
		console.log(platform);
		let data = {
			page: 1,
			user_id: that.userInfo.user_id
		}
		that.getInfo(data)
		that.$getSign(that)
		that.getTips()
		that.$nextTick(function(){
			const query = uni.createSelectorQuery().in(this).select('.bg');
			uni.createSelectorQuery().select('.bg').boundingClientRect(res => {
				console.log(res);
				if(platform == 'ios'){
					that.topHeight = res.height - sys.statusBarHeight - 44
				} else {
					that.topHeight = res.height - sys.statusBarHeight - 48
				}
				// that.bodyHeight = res.height
			}).exec()
		})
	},
	onReachBottom() {
		that.loadStatus = 'loading';
		if (that.totalPage >= that.page) {
			let data = {
				user_id: that.userInfo.user_id,
				page: that.page
			}
			that.getInfo(data);
			return
		}
		that.loadStatus = 'nomore'
	},
	methods: {
		getInfo(data){
			that.$u.post('/api/user/signRecord', data).then(res => {
				console.log('getInfo',res);
				that.totalPage = res.last_page;
				if (data.page == 1) {
					that.list = []
				}
				that.list = that.list.concat(res.data)
				that.page++;
				if(res.data.length == 0 || data.page == res.last_page){
					that.loadStatus = 'nomore';
					return
				}
				that.loadStatus = 'loadmore';
			}).catch(err => {
				console.log('catch', err);
			});
		},
		getTips(){ // /api/user/sign
			// let data = {
			// 	wx_openid: that.openid
			// }
			// that.$u.post('/api/user/getsign',data).then(res => {
			// 	console.log('getsign',res);
			// 	that.tips = res.sign
			// }).catch(err => {
			// 	console.log('getsign', err);
			// });
			that.$u.post('/api/user/sign').then(res => {
				console.log('getTips',res);
				that.tips = res.sign
			}).catch(err => {
				console.log('getTips', err);
			});
		},
		toRoute(e){
			console.log(e);
			that.$u.route('/pages/integralMall/mallDetail');
			// uni.switchTab({
			// 	url: '../mine/mine'
			// })
		},
		toMall(){
			that.$u.route('/pages/integralMall/integralMall');
		},
		tabChange(e){
			console.log(e);
			that.current = e;
			if(e == 0){
				let data = {
					page: 1,
					user_id: that.userInfo.user_id
				}
				that.getInfo(data)
			}
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
			line-height: 1;
			text{
				right: -100rpx;
				bottom: 20rpx;
				color: #D0D0D0;
				font-size: 40rpx;
			}
		}
		.btn{
			padding: 0 30rpx;
			color: #FFD524;
			border: 1rpx solid #FFD524;
			border-radius: 4rpx;
			line-height: 60rpx;
		}
	}
}
.cu-list.menu{
	.cu-item{
		.content{
			display: flex;
			flex-direction: column;
			width: calc(100vw - 60rpx - 500rpx);
			color: #606266;
			font-size: 28rpx;
			margin-right: 20rpx;
			.title{
				width: 100%;
				flex: 1;
			}
			.des{
				margin-top: 6rpx;
				font-size: 26rpx;
				color: #909399;
				line-height: 1.6;
			}
		}
		.action{
			font-size: 26rpx;
			color: #909399;
			
		}
	}
}
</style>
