<template>
	<view class="">
		<!-- <u-navbar title="订单详情"></u-navbar> -->
		<view class="container">
			<view class="detail u-border-bottom">
				<view class="left">
					<u-image width="156rpx" height="156rpx" :src="art.imgurl"></u-image>
				</view>
				<view class="content">
					<view class="title u-line-2">{{art.p_name}}</view>
					<view class="des">
						<text v-if="art.price"> ¥ {{art.price}}</text>实付：
						<text class="total-price">
							{{art.allow + '积分'}}
						</text>
					</view>
				</view>
			</view>
			<view class="info u-border-bottom">
				<view class="list">
					<view class="">
						订单编号：{{art.sNo}}
					</view>
					<view class="">
						订单状态：{{art.status |textFilter}}
					</view>
					<view class="">
						{{art.express_name}}：{{art.courier_num}}
						<text class="u-m-l-20 u-font-28 u-type-primary" @click.stop.prevent="copyNum(art.courier_num)">
							复制
						</text>
					</view>
					<view class="">
						下单时间：{{art.add_time}}
					</view>
				</view>
				<view class="action">
					<!-- <u-button size="mini" plain shape="circle">申请售后</u-button> -->
				</view>
			</view>
		</view>
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
			art: '',
			current: 0,
			swiperCurrent: 0,
			tabsHeight: 0,
			loadStatus: 'loadmore',
			page: 1,
			totalPage: 0,
			customStyle: {
				minWidth: '140rpx'
			}
		};
	},
	onLoad(options) {
		that = this
		let data = {
			order_id: options.id,
		}
		that.getInfo(data)
	},
	methods: {
		getInfo(data){
			// /api/integral/myOrder
			that.$u.post('/api/integral/order_details', data).then(res => {
				console.log('getInfo',res);
				that.art = res
				
			}).catch(err => {
				console.log('catch', err);
			});
		},
		// tab栏切换
		change(index) {
			this.current = index;
			
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
		copyNum(data){
			console.log(data)
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
		handleClick(e){
			if(e == 'wl'){
				that.$u.route('/pages/logistics/index')
			} else if(e == 'tx'){
				
			} else if(e == 'sh'){
				
			}
		},
	}
};
</script>

<style lang="scss">
page{
	background-color: #fff;
}
.container{
	padding: 0 30rpx;
	.detail{
		display: flex;
		padding: 30rpx 0;
		.left{
			margin-right: 20rpx;
		}
		.content{
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			width: calc(100% - 176rpx);
			.title{
				font-size: 32rpx;
				color: #000;
			}
			.des{
				font-size: 26rpx;
				color: #B9B9B9;
				.total-price{
					color: #F22D2D;
				}
			}
		}
		
	}
	.info{
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 30rpx 0;
		.list{
			color: #555555;
			font-size: 26rpx;
			line-height: 1.8;
		}
	}
}
</style>
