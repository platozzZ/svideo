<template>
	<view class="">
		<!-- <u-navbar title="积分商城"></u-navbar> -->
		<view class="container">
			<!-- <view class="padding-tb-sm padding-lr">
				<u-swiper :height="320" :list="swiperList" :title="title"
				 :title-style="swiperStyle" :interval="30000"></u-swiper>
			</view> -->
			<!-- <view class="mall-nav padding-lr padding-tb-sm">
				<view class="mall-nav-item" v-for="(item,index) in 3" :key="index" @click="toRoute">
					<view class="mall-nav-img">
						<u-image src="https://cdn.uviewui.com/uview/example/fade.jpg" height="100%"></u-image>
					</view>
					<view class="title">
						轻型厢  SQ-01轻型厢轻型厢  SQ-01
					</view>
					<view class="price">
						4545积分
					</view>
				</view>
				
			</view> -->
			<view class="mall-list">
				<view class="mall-item" :id="'item' + index" v-for="(item,index) in list" :key="index" @click="toRoute(item.id)">
					 <!-- :style="{height: imgBoxHeight + 'px'}" -->
					<view class="mall-item-img" :style="{height: imgBoxHeight + 'px'}">
						  <!-- height="100%" -->
						<u-image :src="item.imgurl" mode="aspectFill" height="100%"></u-image>
					</view>
					<view class="title">
						{{item.product_title}}
					</view>
					<view class="sub">
						{{item.subtitle}}
					</view>
					<view class="price">
						{{item.integral + '积分'}}
					</view>
				</view>
			</view>
				<u-loadmore :is-dot="true" :status="loadStatus" margin-top="20" margin-bottom="20"></u-loadmore>
		</view>
	</view>
</template>

<script>

var that
export default {
	data() {
		return {
			swiperList: [{
					image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
					title: '昨夜星辰昨夜风，画楼西畔桂堂东'
				},
				{
					image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
					title: '身无彩凤双飞翼，心有灵犀一点通'
				},
				{
					image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
					title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
				}
			],
			swiperStyle: {
				textAlign: 'center',
				paddingBottom: '32rpx'
			},
			title: false,
			page: 1,
			totalPage: 0,
			loadStatus: 'loadmore',
			list: [],
			span: 4,
			listSpan: 2,
			offset: 0,
			justify: 'between',
			imgBoxHeight: 0,
		}
	},
	onLoad() {
		that = this
		let data = {
			page: 1
		}
		that.getList(data)
		
	},
	onReachBottom() {
		that.loadStatus = 'loading';
		if (that.totalPage >= that.page) {
			let data = {
				page: that.page,
			}
			that.getList(data)
			return
		}
		that.loadStatus = 'nomore'
	},
	methods: {
		getList(data){ // /api/integral/index
			that.$u.post('/api/integral/index', data).then(res => {
				console.log('getList',res);
				that.totalPage = res.last_page;
				if (data.page == 1) {
					that.list = []
				}
				that.list = that.list.concat(res.data)
				that.page++;
				that.$nextTick(function(){
					const query = uni.createSelectorQuery().in(that);
					query.select(".mall-item").boundingClientRect(data=>{
					   console.log('获取单个dom节点：',data)
					   that.imgBoxHeight = res.width
					}).exec(); 
				})
				if(res.data.length == 0 || data.page == res.last_page){
					that.loadStatus = 'nomore';
					return
				}
				that.loadStatus = 'loadmore';
			}).catch(err => {
				console.log('catch', err);
			});
		},
		toRoute(e){
			console.log(e);
			that.$u.route('/pages/integralMall/mallDetail',{id: e});
			// uni.switchTab({
			// 	url: '../mine/mine'
			// })
		},
	}
}
</script>

<style lang="scss">
page{
	background-color: #fff;
}
/deep/ .u-indicator-item-round{
	width: 9rpx!important;
	height: 9rpx!important;
	background-color: #D5D5D5!important;
	&.u-indicator-item-round-active{
		width: 38rpx!important;
		background-color: #FFD524!important;
	}
}
.mall-nav{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	flex-wrap: wrap;
	.mall-nav-item{
		display: flex;
		flex-direction: column;
		width: 218rpx;
		overflow: hidden;
		margin-bottom: 16rpx;
		.mall-nav-img{
			height: 218rpx;
			width: 100%;
		}
		.title{
			width: 100%;
			font-size: 28rpx;
			margin: 6rpx;
			-webkit-line-clamp: 2;
			overflow: hidden;
			word-break: break-all;
			text-overflow: ellipsis; 
			display: -webkit-box; // 弹性伸缩盒
			-webkit-box-orient: vertical; // 设置伸缩盒子元素排列方式
	}
		.price{
			font-size: 26rpx;
			color: #f00000;
			padding: 0 6rpx;
		}
		
	}
}
.mall-list{
	height: auto;
	padding: 20rpx 30rpx 0;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-between;
	.mall-item{
		// flex: 0 0 47%;
		width: calc(50% - 15rpx);
		display: flex;
		flex-direction: column;
		margin-bottom: 30rpx;
		&:nth-child(odd) {
			margin-right: 15rpx;
		}
		&:nth-child(even) {
			margin-left: 15rpx;
		}
		.mall-item-img{
			flex-shrink: 0;
			width: 100%;
			min-height: 326rpx;
			margin-bottom: 16rpx;
			border: 1rpx solid #ececec;
			background-color: #f7f7f7;
		}
		.title{
			font-size: 30rpx;
			width: 100%;
			padding: 0 6rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			line-height: 32rpx;
			margin-bottom: 6rpx;
		}
		.sub{
			width: 100%;
			padding: 0 6rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			font-size: 22rpx;
			color: #828282;
			line-height: 28rpx;
			margin-bottom: 1px;
		}
		.price{
			font-size: 30rpx;
			color: #f00000;
			padding: 0 6rpx;
		}
	}
}
</style>
