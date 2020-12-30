<template>
	<view class="">
		<!-- <u-navbar title="我的地址"></u-navbar> -->
		<view class="container">
			<view v-for="(item,index) in list" :key="index" class="item u-border-bottom" @click="handleClick(item,'choose')">
				<view class="content">
					<view class="info">
						<view class="title">
							{{item.name}}
						</view>
							{{item.tel}}
					</view>
					<view class="adress">
						<u-tag text="默认" size="mini" type="warning" :show="!!item.is_default" />
						<text class="u-p-l-20" v-if="!!item.is_default"></text>
							{{item.address_xq}}
					</view>
				</view>
				<view class="action u-border-left" @click.prevent.stop="handleClick(item,'edit')">
					<u-icon name="edit-pen" size="40" color="#B1B1B1"></u-icon>
				</view>
			</view>
		</view>
		<u-loadmore :is-dot="true" :status="loadStatus" margin-top="20" margin-bottom="20"></u-loadmore>
		<view class="footer">
			<view class="footer-seat"></view>
			<view class="footer-content flex align-center">
				<view class="footer-btn bg-pyellow felx-sub" @click="handleClick('add')">添加新地址</view>
			</view>
		</view>
		
	</view>
</template>

<script>
var that
export default {
	data() {
		return {
			art: '',
			value: '',
			from: '',
			tagShow: true,
			list: [],
			loadStatus: 'loadmore',
			page: 1,
			totalPage: 0,
			isFirst: true
		}
	},
	onLoad(options) {
		that = this
		console.log(options)
		let data = {
			page: 1,
			user_id: that.userInfo.user_id
		}
		that.getList(data)
	},
	onShow() {
		if (!that.isFirst) {
			let data = {
				page: 1,
				user_id: that.userInfo.user_id
			}
			that.getList(data)
			return
		}
		that.isFirst = false
	},
	// onPullDownRefresh() {
	// 	let data = {
	// 		page: 1,
	// 		user_id: that.userInfo.user_id
	// 	}
	// 	that.getList(data)
	// },
	onReachBottom() {
		that.loadStatus = 'loading';
		if (that.totalPage >= that.page) {
			let data = {
				user_id: that.userInfo.user_id,
				page: that.page,
			}
			that.getList(data)
			return
		}
		that.loadStatus = 'nomore'
	},
	methods: {
		getList(data){
			// /api/integral/goodsdetail
			that.$u.post('/api/integral/address', data).then(res => {
				console.log('getList',res);
				that.totalPage = res.last_page;
				if (data.page == 1) {
					that.list = []
				}
				that.list = that.list.concat(res.data)
				that.page++;
				// that.showLoadmore == true
				if(res.data.length == 0 || data.page == res.last_page){
					that.loadStatus = 'nomore';
					return
				}
				that.loadStatus = 'loadmore';
				
			}).catch(err => {
				console.log('catch', err);
			});
		},
		handleClick(item,type){
			console.log(type);
			if(item == 'add'){
				that.$u.route('/pages/addressadd/index',{from: 'ad'})
				return
			}
			if(type == 'edit'){
				item.from = 'ad'
				console.log(this.$u.queryParams(item,false))
				that.$u.route('/pages/addressadd/index',item)
			} else {
				that.$u.vuex('address', item)
				that.$u.vuex('addressid', item.id)
				// let pages = getCurrentPages();
				// let prevPage = pages[pages.length - 2]; //上一个页面
				// console.log(prevPage);
				// prevPage.address_id = item.id
				// prevPage.art.addemt = item
				that.$u.route({
					type: 'back',
				});
				// that.$u.route('/pages/addressadd/index',{from: 'ad',id: id})
			}
		},
		showToast(title,type,back) {
			that.$refs.uToast.show({
				title: title,
				type: type,
				icon: false,
				back: back
			})
		},
	},
}
</script>

<style lang="scss">
.container{
	// padding: 0 30rpx;
	background-color: #fff;
	.item{
		// width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20rpx 0 20rpx 30rpx;
		// .logo{
		// 	margin-right: 20rpx;
		// }
		.content{
			width: calc(100vw - 30rpx - 80rpx);
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			flex: 1;
			font-size: 28rpx;
			padding-right: 10rpx;
			&.detail-content{
				min-height: 156rpx;
			}
			.info{
				display: flex;
				align-items: center;
				color: #B1B1B1;
				.title{
					color: #3D3D3D;
					margin-right: 10rpx;
					// margin-left: 10rpx;
				}
			}
			.adress{
				margin-top: 20rpx;
				color: #3D3D3D;
			}
			.d-title{
				font-size: 32rpx;
				color: #000;
			}
			.d-info{
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 26rpx;
				margin-top: 30rpx;
				.price{
					color: #F22D2D;
				}
				.num{
					color: #B9B9B9
				}
			}
		}
		.action{
			display: flex;
			align-items: center;
			justify-content: center;
			padding-left: 20rpx;
			padding-right: 20rpx;
			min-height: 60rpx;
		}
	}
}
.footer{
	background-color: #f1f1f1;
}
</style>
