<template>
	<view>
		<u-navbar title="我的订单"></u-navbar>
		<view class="">
			<view class="u-tabs-box">
				<u-tabs activeColor="#f29100" :list="tabList" :is-scroll="false" :current="current" @change="change"></u-tabs>
				<!-- <u-tabs-swiper activeColor="#f29100" ref="tabs" :list="list" :current="current" @change="change" :is-scroll="false" swiperWidth="750"></u-tabs-swiper> -->
			</view>
			<view class="page-box">
				<view class="order" v-for="(item, index) in list" :key="item.id" @click="toDetail(item.id)">
					<view class="top">
						<view class="left">
							订单号：{{item.sNo}}
						</view>
						<view class="right" :style="{color: item.status == 5?'#18b566':item.status == 1?'#ff9900':'#2979ff'}">{{ item.status | textFilter}}</view>
					</view>
					<view class="item">
						<view class="left">
							<u-image width="156rpx" height="156rpx" :src="item.imgurl"></u-image>
						</view>
						<view class="content">
							<view class="title u-line-2">{{ item.p_name }}</view>
							<view class="delivery-time">
								合计:
								<text class="total-price">
									{{item.allow}}
								</text>
								积分
							</view>
						</view>
					</view>
					<view class="bottom u-border-top" v-if="item.status == 1 || item.status == 2">
						<view class="left">
							<block v-if="item.status == 2">
								<text>{{'快递:' + item.courier_num + ' ' + item.express_name}}</text>
								<!-- <u-button size="mini" plain @click.stop.prevent="copyNum(item.courier_num)">复制</u-button> -->
								<view class="u-m-l-30 u-font-28" @click.stop.prevent="copyNum(item.courier_num)">
									复制
								</view>
							</block>
						</view>
						<view class="right">
							<!-- <u-button v-if="item.status == 1 && item.delivery_status" size="mini" plain shape="circle" :custom-style="customStyle">提醒发货</u-button> -->
							<u-button v-if="item.status == 1" size="mini" plain shape="circle" :custom-style="customStyle" @click.stop="handleClick('tx',item)">提醒发货</u-button>
							<!-- <u-button v-if="item.status == 2" size="mini" plain shape="circle" :custom-style="customStyle" @click="handleClick('wl',item)">查看物流</u-button> -->
							<u-button v-if="item.status == 2" type="warning" size="mini" plain shape="circle" :custom-style="customStyle" @click.stop="handleClick('sh',item)">确认收货</u-button>
							
						</view>
						<!-- <u-button v-if="item.status == 1 && item.delivery_status" size="mini" plain shape="circle" :custom-style="customStyle">提醒发货</u-button> -->
						<!-- <u-button v-if="item.status == 1" size="mini" plain shape="circle" :custom-style="customStyle" @click="handleClick('tx',item)">提醒发货</u-button> -->
						<!-- <u-button v-if="item.status == 2" size="mini" plain shape="circle" :custom-style="customStyle" @click="handleClick('wl',item)">查看物流</u-button> -->
						<!-- <u-button v-if="item.status == 2" type="warning" size="mini" plain shape="circle" :custom-style="customStyle" @click="handleClick('sh',item)">确认收货</u-button> -->
					</view>
				</view>
				<u-loadmore :is-dot="true" :status="loadStatus" margin-top="20" margin-bottom="20"></u-loadmore>
			</view>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
var that
export default {
    filters: {
      textFilter(status) {
        const statusMap = [
          '未付款',
          '未发货',
          '待收货',
          '待评论',
          '退货',
          '已完成',
          '订单失效',
          '订单关闭',
          '删除订单',
          '拼团中',
          '拼团失败-未退款',
          '拼团失败-已退款',
        ]
        return statusMap[status]
      },
    },
	// 1:未发货 2:待收货 4:退货 5:已完成
	// 订单状态 0:未付款 1:未发货 2:待收货 3:待评论 4:退货 5:已完成 6:订单失效 7:订单关闭 8:删除订单 9:拼团中 10:拼团失败-未退款 11:拼团失败-已退款
	data() {
		return {
			tabList: [
				{
					name: '全部'
				},
				{
					name: '待发货'
				},
				{
					name: '待收货'
				},
				{
					name: '完成'
				},
			],
			current: 0,
			swiperCurrent: 0,
			tabsHeight: 0,
			list: [],
			loadStatus: 'loadmore',
			page: 1,
			totalPage: 0,
			customStyle: {
				minWidth: '140rpx'
			},
		};
	},
	onLoad() {
		that = this
		let data = {
			ordervalue: '',
			order_type: 0,//0全部1待发货2待收货3完成
			page: 1,
			user_id: that.userInfo.user_id
			// user_id: 57
		}
		that.getList(data)
	},
	onReachBottom() {
		that.loadStatus = 'loading';
		if (that.totalPage >= that.page) {
			let data = {
				ordervalue: '',
				order_type: that.current,//0全部1待发货2待收货3完成
				page: that.page,
				user_id: that.userInfo.user_id
			}
			that.getList(data)
			return
		}
		that.loadStatus = 'nomore'
	},
	methods: {
		getList(data){
			// /api/integral/myOrder
			that.$u.post('/api/integral/myOrder', data).then(res => {
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
		// tab栏切换
		change(index) {
			that.current = index;
			
			let data = {
				ordervalue: '',
				order_type: index,//0全部1待发货2待收货3完成
				page: 1,
				user_id: that.userInfo.user_id
			}
			that.getList(data)
		},
		toDetail(id){
			that.$u.route('/pages/order/orderDetail',{id: id})
			
		},
		// /api/integral/delivery
		handleDelivery(data){
			that.$u.post('/api/integral/delivery', data).then(res => {
				console.log('handleDelivery',res);
				that.$refs.uToast.show({
					title: '提醒成功',
					type: 'success',
				})
			}).catch(err => {
				console.log('catch', err);
			});
		},
		copyNum(data){
			uni.setClipboardData({
			    data: data,
			    success: function (res) {
					// wx.hideToast();
					// console.log(res)
					// that.$refs.uToast.show({
					// 	title: '已复制到剪贴板',
					// 	type: 'success',
					// })
			    }
			});
		},
		handleConfirm(data){ //ok_Order
			that.$u.post('/api/integral/ok_Order', data).then(res => {
				console.log('handleConfirm',res);
				that.$refs.uToast.show({
					title: '确认收货成功',
					type: 'success',
					callback (call){
						let data = {
							ordervalue: '',
							order_type: that.current,//0全部1待发货2待收货3完成
							page: 1,
							user_id: that.userInfo.user_id
							// user_id: 57
						}
						that.getList(data)
					}
				})
			}).catch(err => {
				console.log('catch', err);
			});
		},
		handleClick(e,item){
			if(e == 'wl'){
				that.$u.route('/pages/logistics/index',{express_id: item.express_id, courier_num: item.courier_num})
			} else if(e == 'tx'){
				let data = {
					user_id: that.userInfo.user_id,
					order_id: item.sNo
				}
				that.handleDelivery(data)
			} else if(e == 'sh'){
				console.log(e);
				uni.showModal({
					content: '确认收货？',
					success: function (res) {
						if (res.confirm) {
							let data = {
								sNo: item.sNo
							}
							that.handleConfirm(data)
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			}
		},
	}
};
</script>

<style>
/* #ifndef H5 */
page {
	height: 100%;
	background-color: #f2f2f2;
}
/* #endif */
</style>

<style lang="scss" scoped>
.order {
	// width: 710rpx;
	background-color: #ffffff;
	margin: 20rpx 30rpx;
	border-radius: 20rpx;
	box-sizing: border-box;
	padding: 20rpx;
	font-size: 28rpx;
	.top {
		display: flex;
		justify-content: space-between;
		.left {
			display: flex;
			align-items: center;
			font-size: 26rpx;
			.store {
				margin: 0 10rpx;
				font-size: 32rpx;
				font-weight: bold;
			}
		}
		.right {
			// color: $u-type-warning-dark;
		}
	}
	.item {
		display: flex;
		margin: 20rpx 0 0;
		.left {
			margin-right: 20rpx;
			// image {
			// 	width: 200rpx;
			// 	height: 200rpx;
			// 	border-radius: 10rpx;
			// }
		}
		.content {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			width: calc(100% - 176rpx);
			.title {
				font-size: 28rpx;
				line-height: 44rpx;
			}
			.type {
				margin: 10rpx 0;
				font-size: 24rpx;
				color: $u-tips-color;
			}
			.delivery-time {
				// color: #e5d001;
				font-size: 24rpx;
				text-align: right;
				.total-price {
					font-size: 32rpx;
					color: #F22D2D;
				}
			}
		}
		.right {
			margin-left: 10rpx;
			padding-top: 20rpx;
			text-align: right;
			.decimal {
				font-size: 24rpx;
				margin-top: 4rpx;
			}
			.number {
				color: $u-tips-color;
				font-size: 24rpx;
			}
		}
	}
	.total {
		margin-top: 20rpx;
		text-align: right;
		font-size: 24rpx;
		.total-price {
			font-size: 32rpx;
		}
	}
	.bottom {
		display: flex;
		margin-top: 20rpx;
		padding: 20rpx 10rpx 0;
		justify-content: space-between;
		align-items: center;
		.left{
			display: flex;
			align-items: center;
			font-size: 20rpx;
			color: #909399;
		}
		.right{
			.btn {
				line-height: 52rpx;
				width: 160rpx;
				border-radius: 26rpx;
				border: 2rpx solid $u-border-color;
				font-size: 26rpx;
				text-align: center;
				color: $u-type-info-dark;
			}
			
		}
		.evaluate {
			color: $u-type-warning-dark;
			border-color: $u-type-warning-dark;
		}
	}
}
.centre {
	text-align: center;
	margin: 200rpx auto;
	font-size: 32rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	image {
		width: 164rpx;
		height: 164rpx;
		border-radius: 50%;
		margin-bottom: 20rpx;
	}
	.tips {
		font-size: 24rpx;
		color: #999999;
		margin-top: 20rpx;
	}
	.btn {
		margin: 80rpx auto;
		width: 200rpx;
		border-radius: 32rpx;
		line-height: 64rpx;
		color: #ffffff;
		font-size: 26rpx;
		background: linear-gradient(270deg, rgba(249, 116, 90, 1) 0%, rgba(255, 158, 1, 1) 100%);
	}
}
.wrap {
	display: flex;
	flex-direction: column;
	height: calc(100vh - var(--window-top));
	width: 100%;
}
.swiper-box {
	flex: 1;
}
.swiper-item {
	height: 100%;
}
</style>
