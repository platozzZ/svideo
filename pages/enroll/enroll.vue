<template>
	<view class="">
		<u-navbar :is-back="false" title="活动"></u-navbar>
		<view class="padding-tb-sm padding-lr p-swiper">
			<u-swiper :height="320" :list="swiperList" :title="title"
			 :title-style="swiperStyle" name="cf_image" :interval="30000" @click="tapBanner"></u-swiper>
		</view>
		<view class="list">
			<view class="item" v-for="(item,index) in 5" :key="index">
				<view class="top">
					<u-image src="https://cdn.uviewui.com/uview/example/fade.jpg" width="100%" mode="widthFix"></u-image>
				</view>
				<view class="content padding-top-sm padding-bottom padding-lr">
					<view class="title u-font-36 u-line-1">
						到底是来比赛还是旅行？玩这么嗨！
					</view>
					<view class="des u-type-info-disabled u-font-24 margin-tb-xs u-line-2">
						今年的活动也有些不一样的地方，TDS的营地和商家展示区的位置都与往年不同，这主要是受限于当地的土地管…
					</view>
					<view class="info u-type-info-dark u-font-22 flex align-center justify-between">
						<text>地址：北京海淀区工人体育场</text>
						<text>时间：2018/09/12-09/22</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
var that
export default {
	data() {
		return {
			swiperList: [],
			swiperStyle: {
				textAlign: 'center',
				paddingBottom: '32rpx'
			},
			title: true,
			loadStatus: 'loadmore',
			current: 0,
			page: 1,
			totalPage: 0
			
		}
	},
	onLoad() {
		that = this
		let data = {
			distributor_id: that.userInfo.distributor_id,
			page: 1
		}
		that.getList(data);
		that.getBanner()
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
		toAdd(e){
			that.$u.route('/pages/add/add');
		},
		tapBanner(index){
			console.log(index);
			let id = that.swiperList[index].cf_id
			that.toDetail(id)
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
	}
}
</script>

<style lang="scss">
page{
	background-color: #fff;
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
.list{
	.item{
		position: relative;
		background-color: #ffffff;
		overflow: hidden;
		border-radius: 8rpx;
		margin: 20rpx 30rpx 30rpx;
		display: flex;
		flex-direction: column;
		// box-shadow: 0 2rpx 6rpx;
		box-shadow: 0 0 6px 0 rgba(0,0,0,0.28);
		.top{
			width: 100%;
			height: 256rpx;
			overflow: hidden;
		}
	}
}
</style>

