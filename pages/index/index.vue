<template>
	<view class="">
		<u-navbar :is-back="false">
			<view class="slot-wrap">
				<!-- <view class=""> -->
					<image src="../../static/image/logo.png" class="logo"></image>
				<!-- </view> -->
				<!-- <view class="search-wrap">
					<u-search v-model="keyword" :show-action="showAction" height="56" :action-style="{color: '#fff'}"></u-search>
				</view> -->
			</view>
		</u-navbar>
		<view class="container">
			<view class="padding-tb-sm padding-lr p-swiper">
				<u-swiper :height="320" :list="swiperList" :title="title"
				 :title-style="swiperStyle" name="cf_image" :interval="30000" @click="tapBanner"></u-swiper>
			</view>
			<view class="padding-lr-sm">
				<u-grid col="5" :border="false">
					<u-grid-item v-for="(item,index) in gridList" :key="item.id" :custom-style="gridItemStyle" @click="toRoute">
						<view class="grid-image-container">
							<image :src="'../../static/image/nav/' + item.id + '.png'" class="grid-image"></image>
						</view>
						<view class="grid-text text-xs u-m-t-10 u-tips-color">{{item.name}}</view>
					</u-grid-item>
				</u-grid>
			</view>
			<view class="padding-top-sm">
				<u-waterfall v-model="flowList" ref="uWaterfall">
					<template v-slot:left="{ leftList }">
						<view class="demo-warter" v-for="(item, index) in leftList" :key="item.guid_id" @click="toDetail(item.id)">
							<!-- 微信小程序需要hx2.8.11版本才支持在template中引入其他组件，比如下方的u-lazy-load组件 -->
							<u-lazy-load threshold="-450" border-radius="10" :image="item.nimages" :index="item.guid_id"></u-lazy-load>
							<view class="demo-title u-p-l-10 u-p-r-10">{{ item.ntitle }}</view>
							<view class="demo-bottom margin-top-sm flex align-center justify-between u-p-l-10 u-p-r-10">
								<view class="avatar-container flex align-center text-pgray text-sm">
									<image :src="item.photo" class="avatar margin-right-xs"></image>
									{{item.username}}
								</view>
								<view class="readVol text-pgray text-sm">
									播放:{{item.play}}
								</view>
							</view>
						</view>
					</template>
					<template v-slot:right="{ rightList }">
						<view class="demo-warter" v-for="(item, index) in rightList" :key="item.guid_id" @click="toDetail(item.id)">
							<u-lazy-load threshold="-450" border-radius="10" :image="item.nimages" :index="item.guid_id"></u-lazy-load>
							<view class="demo-title u-p-l-10 u-p-r-10">{{ item.ntitle }}</view>
							<view class="demo-bottom margin-top-sm flex align-center justify-between u-p-l-10 u-p-r-10">
								<view class="avatar-container flex align-center text-pgray text-sm">
									<image :src="item.photo" class="avatar margin-right-xs"></image>
									{{item.username}}
								</view>
								<view class="readVol text-pgray text-sm">
									播放:{{item.play}}
								</view>
							</view>
						</view>
					</template>
				</u-waterfall>
				<u-loadmore bg-color="rgb(240, 240, 240)" :status="loadStatus" margin-top="20" margin-bottom="20"></u-loadmore>
			</view>
		</view>
		<view class="p-add" @click="toAdd">
			<u-image src="../../static/image/tabbar/add.png" width="100%" shape="circle" mode="widthFix"></u-image>
		</view>
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
			background: {
				// backgroundColor: '#001f3f',、
				// 导航栏背景图
				background: 'url(../../static/image/logo.png) center no-repeat',
				// 还可以设置背景图size属性
				backgroundSize: '172rpx 50rpx',
				backgroundColor: '#fff'
				// 渐变色
				// backgroundImage: 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
			},
			keyword: '',
			showAction: false,
			swiperList: [],
			swiperStyle: {
				textAlign: 'center',
				paddingBottom: '32rpx'
			},
			title: true,
			gridList: [
				{name:'推荐',id: 'recommend'},{name:'最新',id: 'new'},{name:'最热',id: 'hot'},{name:'附近',id: 'nearby'},{name:'关注',id: 'follow'}
			],
			gridItemStyle: {
				padding: '15rpx 0',
				// justifyContent: 'space-between',
				minHeight: '120rpx'
			},
			loadStatus: 'loadmore',
			flowList: [],
			current: 0,
			page: 1,
			totalPage: 0
			
		}
	},
	onLoad() {
		that = this
		// #ifdef MP-WEIXIN
		if(!that.openid){
			getApp().newPromise().then(function (res) {
				console.log('newPromise:',res);
				that.$u.vuex('openid', res.openid)
				that.$u.vuex('isSwitch', res.switch)
				that.getUserInfo(res.openid)
			});
		} else {
			that.getUserInfo(that.openid)
		}
		// #endif
		let data = {
			distributor_id: that.userInfo.distributor_id,
			page: 1
		}
		that.getList(data);
		that.getBanner()
		that.getLocations()
	},
	onReachBottom() {
		that.loadStatus = 'loading';
		if (that.totalPage >= that.page) {
			let data = {
				distributor_id: that.userInfo.distributor_id,
				page: that.page
			}
			that.getList(data)
			return
		}
		that.loadStatus = 'nomore'
		// 模拟数据加载
		// setTimeout(() => {
		// 	that.addRandomData();
		// 	that.loadStatus = 'loadmore';
		// }, 1000);
	},
	methods: {
		getBanner(){
			that.$u.get('/api/carouselfigure/list').then(res => {
				console.log('getBanner',res);
				let list = res
				list.map((item,index) => {
					item.title = item.cf_title
				})
				that.swiperList = list
			}).catch(err => {
				console.log('getBanner-catch', err);
			});
		},
		getList(data){
			that.$u.post('/api/video/list_new',data).then(res => {
				console.log('getList',res);
				that.totalPage = res.last_page;
				if (data.page == 1) {
					that.flowList = []
				}
				that.addRandomData(res.data)
				// that.cmsList = that.cmsList.concat(art)
				// uni.stopPullDownRefresh();
				that.page++;
				if(res.data.length == 0){
					that.loadStatus = 'nomore';
					return
				}
				that.loadStatus = 'loadmore';
			}).catch(err => {
				console.log('getList-catch', err);
			});
			// this.$u.api.getInfo({id: 3}).then(res => {
			// 	console.log(res);
			// })
		},
		addRandomData(list) {
			let flowList = []
			for (let i = 0; i < list.length; i++) {
				let index = that.$u.random(0, list.length - 1);
				// console.log(index);
				// 先转成字符串再转成对象，避免数组对象引用导致数据混乱
				let item = JSON.parse(JSON.stringify(list[index]));
				// console.log(item);
				item.guid_id = that.$u.guid();
				// console.log(item);
				flowList.push(item);
			}
			that.flowList = flowList
			console.log(flowList)
		},
		getUserInfo(e){
			let data = {
				wx_openid:e
			}
			that.$u.post('/api/user/getUserInfo',data).then(res => {
				console.log('getUserInfo',res);
				
			}).catch(err => {
				console.log('getUserInfo-catch', err);
			});
		},
		toAdd(e){
			if(!that.userInfo.username || !that.userInfo.phone){
				that.$u.route('/pages/login/login');
				return
			}
			that.$u.route('/pages/add/add');
		},
		tapBanner(index){
			console.log(index);
			let id = that.swiperList[index].cf_id
			that.toDetail(id)
		},
		toRoute(e){
			console.log(e);
			that.$u.route('/pages/integralMall/integralMall');
			// uni.switchTab({
			// 	url: '../mine/mine'
			// })
		},
		toDetail(id){
			console.log(id);
			// that.$u.route('/pages/videoDetail/videoDetail');
			that.$u.route({
				url: '/pages/videoDetail/videoDetail',
				params: {
					id: id
				}
			})
			
		},
		getLocations(){
			console.log('getLocations');
			uni.getLocation({
			    success: function (res) {
					console.log(res);
					that.$u.vuex('longitude', res.longitude)
					that.$u.vuex('latitude', res.latitude)
					// that.longitude = res.longitude
					// that.latitude = res.latitude
			    },
				fail(err){
					console.log(err);
					that.$getSetting(that)
				}
			});
		},
	}
}
</script>

<style lang="scss">
page{
	background-color: #fff;
}

.slot-wrap {
	padding: 0 30rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	flex: 1;
	.logo {
		height: 50rpx;
		width: 172rpx;
	}
	.search-wrap{
		flex: 1;
		margin-left: 30rpx;
	}
}
.p-swiper /deep/ .u-indicator-item-round{
	width: 9rpx!important;
	height: 9rpx!important;
	background-color: #D5D5D5!important;
	&.u-indicator-item-round-active{
		width: 38rpx!important;
		background-color: #FFD524!important;
	}
}
.grid-image-container{
	// flex: 1;
	width: 70rpx;
	height: 70rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	.grid-image{
		height: 100%;
		width: 100%;
	}
}
.u-waterfall{
	padding: 0 20rpx;
	
	.demo-warter {
		border-radius: 8px;
		margin: 0 0 20rpx;
		background-color: #ffffff;
		padding: 0 10rpx 20rpx;
		position: relative;
		.demo-title{
			font-size: 28rpx;
			margin-top: 5px;
			color: $u-main-color;
			padding: 0 6rpx;
		}
		.demo-bottom{
			.avatar-container{
				line-height: 40rpx;
				.avatar{
					width: 40rpx;
					height: 40rpx;
					border-radius: 50%;
				}
				.readVol{}
			}
		}
	}
}
.p-add {
	width: 120rpx;
	height: 120rpx;
	position: fixed;
	bottom: 180rpx;
	right: 30rpx;
	z-index: 9;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: rgba(255,255,255,0);
	color: $u-content-color;
	
}
</style>
