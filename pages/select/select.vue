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
		<u-sticky  offset-top="0">
			<u-tabs bg-color="#fff" inactive-color="#909399" active-color="#303030" :active-item-style="activeStyle" :show-bar="false" font-size="28" :list="tabList"
			@change="tabChange" :current="current" :is-scroll="isScroll"></u-tabs>
		</u-sticky>
		<view class="">
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
			<view v-if="showLoadmore">
				<u-loadmore bg-color="rgb(240, 240, 240)" :status="loadStatus"></u-loadmore>
			</view>
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
			keyword: '',
			showAction: false,
			current: 0,
			tabList: [
				{
					name: '最新'
				}, {
					name:  '最热'
				}, {
					name: '附近'
				},{
					name: '关注'
				}
			],
			activeStyle: {
				fontSize: '30rpx'
			},
			isScroll: false,
			loadStatus: 'loadmore',
			flowList: [],
			current: 0,
			page: 1,
			totalPage: 0,
			showLoadmore: false,
			// longitude: '',
			// latitude: '',
		}
	},
	onLoad() {
		that = this
		// this.addRandomData();
		let data = {
			type: that.current,
			page: 1,
		}
		that.getList(data);
	},
	onReachBottom() {
		that.loadStatus = 'loading';
		if (that.totalPage >= that.page) {
			let data = {
				type: that.current,
				page: that.page,
			}
			if(that.current == 2){
				data.longitude = that.longitude,
				data.latitude = that.latitude
			} else if(that.current == 3){
				data.user_id = that.userInfo.user_id
			}
			console.log(data)
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
		getList(data){
			that.$u.post('/api/video/list',data).then(res => {
				console.log('getList',res);
				that.totalPage = res.last_page;
				if (data.page == 1) {
					that.flowList = []
				}
				that.addRandomData(res.data)
				if(res.last_page == 1){
					that.showLoadmore = false
				} else {
					that.showLoadmore = true
				}
				console.log('showLoadmore:',that.showLoadmore)
				// that.cmsList = that.cmsList.concat(art)
				// uni.stopPullDownRefresh();
				that.page++;
				// that.showLoadmore == true
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
		tabChange(e){
			console.log(e);
			if(that.current == e){
				return
			}
			let data = {
				type: e,
				page: 1,
			}
			if(e == 2){
				if(!that.longitude || !that.latitude){
					that.getLocations()
					return
				}
				data.longitude = that.longitude,
				data.latitude = that.latitude
			} else if(e == 3){
				data.user_id = that.userInfo.user_id
			}
			this.current = e;
			console.log(data)
			that.getList(data)
			// let data = {
			// 	type: e,
			// 	page: 1,
			// 	user_id: that.userInfo.user_id,
			// 	longitude: that.longitude,
			// 	latitude: that.latitude
			// }
		},
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
/deep/ .u-tab-item{
	&::after{
		content: '';
		position: absolute;
		right: 0;
		top: 25rpx;
		width: 2rpx;
		height: 30rpx;
		background-color: #909399;
	}
	&:last-child{
		&::after{
			display: none;
		}
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

</style>
