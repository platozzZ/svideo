<template>
	<view class="">
		<u-navbar :is-back="false">
			<view class="slot-wrap">
				<view class="">
					<image src="https://jjsp.activitysign.com/image/logo.png" class="logo"></image>
				</view>
				<view class="search-wrap">
					<view class="searchContainer" @click="toSearch">
						<u-icon name="search" color="#BDBDBD" size="24" label="搜索需要的内容" label-size="24" label-color="#BDBDBD"></u-icon>
					</view>
					<!-- <u-search v-model="keyword" :show-action="showAction" height="56" :action-style="{color: '#fff'}"></u-search> -->
				</view>
			</view>
		</u-navbar>
		<view class="container">
			<view class="padding-tb-sm padding-lr p-swiper">
				<u-swiper :height="320" :list="swiperList" :title="title"
				 :title-style="swiperStyle" name="cf_image" :interval="30000" @click="tapBanner"></u-swiper>
			</view>
			<view class="padding-lr-sm">
				<u-tabs :list="gridList" 
					active-color="#060606" inactive-color="#898989" 
					:active-item-style="activeItemstyle"
					:bar-style="barStyle"
					:is-scroll="false" :current="tabCur" @change="change"
				></u-tabs>
			</view>
			<view class="padding-top-sm" v-if="flowList.length > 0">
				<!-- <block v-if="tabCur == index" v-for="(item,index) in gridList" :key="index"> -->
				<u-waterfall v-model="flowList" ref="uWaterfall" :isPage1="isPage1">
					<template v-slot:left="{ leftList }">
						<view class="demo-warter" v-for="(item, index) in leftList" :key="item.guid_id" @click="toDetail(item.id)">
							<u-lazy-load threshold="-450" border-radius="10" :image="item.nimages" :index="item.guid_id"></u-lazy-load>
							<view class="demo-title u-p-l-10 u-p-r-10 u-rela">{{ item.ntitle }}
								<view class="u-abso demo-near padding-lr-sm">
									{{item.distance}}
								</view>
							</view>
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
							<view class="demo-title u-p-l-10 u-p-r-10 u-rela">{{ item.ntitle }}
								<view class="u-abso demo-near padding-lr-sm">
									{{item.distance}}
								</view>
							</view>
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
				<u-loadmore :is-dot="true" :status="loadStatus" margin-top="20" margin-bottom="20"></u-loadmore>
				<!-- </block> -->
			</view>
			
		</view>
		<view class="p-add" @click="toAdd">
			<u-image src="https://jjsp.activitysign.com/image/tabbar/add.png" width="120rpx" height="120rpx" shape="circle"></u-image>
		</view>
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
				background: 'url(https://jjsp.activitysign.com/image/logo.png) center no-repeat',
				// 还可以设置背景图size属性
				backgroundSize: '172rpx 50rpx',
				backgroundColor: '#fff'
				// 渐变色
				// backgroundImage: 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
			},
			tabCur: 0,
			activeItemstyle: {
				fontSize: '32rpx',
			},
			barStyle: {
				backgroundColor: '#FFD524',
			},
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
			totalPage: 0,
			isPage1: true
			
		}
	},
	watch: {
		openid(nVal, oVal){
			console.log('nVal', nVal);
			console.log('oVal', oVal);
			this.$getUserInfo(this,nVal)
			
			
		}
	},
	onLoad(options) {
		that = this
		if(!that.openid){
			that.$getOpenid(that)
		}
		//  else {
		// 	that.getUserInfo(that.openid)
		// }
		let data = {
			type: 0,
			distributor_id: that.userInfo.distributor_id?that.userInfo.distributor_id:0,
			page: 1,
			user_id: that.userInfo.user_id?that.userInfo.user_id:0
		}
		that.getList(data);
		let bannerData = {
			type: 0
		}
		that.getBanner(bannerData)
		that.getLocations()
		console.log(that.userInfo)
	},
	
	onShareAppMessage() {
		console.log('onShareAppMessage');
		// that.share()
		return {
			title: '每周疯视频',
			path: '/pages/index/index',
			success(){
				console.log('onShareAppMessage-success');
			}
		}
	},
	onReachBottom() {
		that.loadStatus = 'loading';
		if (that.totalPage >= that.page) {
			let data = {
				type: that.tabCur,
				distributor_id: that.userInfo.distributor_id?that.userInfo.distributor_id:0,
				page: that.page,
				user_id: that.userInfo.user_id?that.userInfo.user_id:0,
				
			}
			that.getList(data);
			return
		}
		that.loadStatus = 'nomore'
	},
	methods: {
		getBanner(data){
			that.$u.post('/api/carouselfigure/list',data).then(res => {
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
			console.log(data)
			that.$u.post('/api/video/list',data).then(res => {
				console.log('getList',res);
				that.totalPage = res.last_page;
				that.page = data.page
				let list = res.data
				list.map((item,index) => {
					item.guid_id = that.$u.guid();
				})
				console.log(list);
				if (data.page == 1) {
					that.isPage1 = true
					that.flowList = []
				} else {
					that.isPage1 = false
				}
				that.flowList = that.flowList.concat(list)
				that.page++;
				if(res.data.length == 0 || data.page == res.last_page){
					that.loadStatus = 'nomore';
					return
				}
				that.loadStatus = 'loadmore';
			}).catch(err => {
				console.log('getList-catch', err);
			});
		},
		change(e){
			console.log(e)
			that.tabCur = e
			// that.page = 1
			let data = {
				type: e,
				distributor_id: that.userInfo.distributor_id?that.userInfo.distributor_id:0,
				page: 1,
				user_id: that.userInfo.user_id?that.userInfo.user_id:0,
				
			}
			that.getList(data);
			
		},
		clearWaterfall() {
			that.$nextTick(function(){
				that.$refs.uWaterfall.clear();
			})
			
		},
		toSearch(){
			that.$u.route('pages/index/search')
		},
		toAdd(e){
			if(!that.userInfo || that.userInfo.username == '' || !that.userInfo.phone){
				that.$u.route('/pages/login/login');
				return
			}
			if(!that.userInfo.distributor_id){
				uni.showModal({
					content: '您还没有绑定商家，无法发布视频，请邀请商家入驻',
					success(res) {
						if(res.confirm){
							that.$u.route('/pages/business/business');
						}
					}
				})
				
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
		},
		toDetail(id){
			console.log(id);
			that.$u.route('/pages/videoDetail/videoDetail',{id: id})
		},
		getLocations(){
			console.log('getLocations');
			uni.getLocation({
			    success: function (res) {
					console.log(res);
					that.$u.vuex('longitude', res.longitude)
					that.$u.vuex('latitude', res.latitude)
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
		height: 62rpx;
		width: 100rpx;
	}
	.search-wrap{
		flex: 1;
		margin-left: 30rpx;
		.searchContainer{
			background-color: #fff;
			height: 56rpx;
			box-shadow: 0px 0px 6px 0px rgba(216, 216, 216, 0.5);
			border-radius: 40rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}
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
			margin-top: 10rpx;
			color: $u-main-color;
			padding: 0 6rpx;
			.demo-near{
				top: -65rpx;
				left: 20rpx;
				font-size: 20rpx;
				line-height: 40rpx;
				height: 40rpx;
				color: #fff;
				background-color: rgba(0, 0, 0, 0.6);
				border-radius: 6rpx;
			}
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
