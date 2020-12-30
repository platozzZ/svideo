<template>
	<view>
		<!-- <u-navbar title="订单填写"></u-navbar> -->
		<block v-if="showContainer">
		<view class="container">
			<view v-if="!art.addemt" class="no-address ">
				<!-- <view class="new-address u-border">
					
				</view> -->
				<u-button type="error" plain ripple size="default" @click="handleAddress(0)">+ 新建地址</u-button>
			</view>
			<view v-else class="p-container u-border-bottom" @click="handleAddress(1)">
				<view class="logo">
					<u-image width="98rpx" height="98rpx" src="https://jjsp.activitysign.com/image/location.png"></u-image>
				</view>
				<view class="content">
					<view class="info">
						<view class="title">
							{{art.addemt.name}}
						</view>
							{{art.addemt.tel}}
					</view>
					<view class="adress">
							{{art.addemt.address_xq}}
					</view>
				</view>
				<view class="action">
					<u-icon name="arrow-right" color="#B1B1B1" size="32"></u-icon>
				</view>
			</view>
			<view class="p-container detail">
				<view class="logo">
					<u-image width="156rpx" height="156rpx" :src="art.imgurl"></u-image>
				</view>
				<view class="content detail-content">
					<view class="d-title">
						{{art.product_title}}
					</view>
					<view class="d-info">
						<view class="price"> 
							{{art.integral + '积分'}}                               
						</view>
						<view class="num">
							x 1
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="footer">
			<view class="footer-seat"></view>
			<view class="footer-content flex align-center">
				<view class="price felx-sub">
					合计：
					<text class="price-num price-red">{{art.integral}}</text>
					<text class="price-red">积分</text>
				</view>
				<view v-if="!!address_id" class="footer-btn bg-pyellow felx-sub" @click="handleClick">
					立即支付
				</view>
				<view v-else class="footer-btn bg-pgray felx-sub">
					立即支付
				</view>
			</view>
		</view>
		<u-toast ref="uToast" />
		</block>
	</view>
</template>

<script>
var that
export default {
	data() {
		return {
			showContainer: false,
			art: '',
			address_id: '',
		}
	},
	onLoad(options) {
		that = this
		that.$u.vuex('address', '')
		that.$u.vuex('addressid', '')
		console.log(options)
		let data = {
			id: options.id,
			user_id: that.userInfo.user_id
		}
		that.getInfo(data)
	},
	watch:{
		address(newVal, oldVal) {
			this.$set(this.art, 'addemt', newVal)
		},
		addressid(newVal, oldVal) {
			this.address_id = newVal
		},
	},
	methods: {
		getInfo(data){
			that.$u.post('/api/integral/integral_axios', data).then(res => {
				console.log('getInfo',res);
				that.art = res
				that.showContainer = true
				if(!res.addemt){
					return
				}
				that.address_id = res.addemt.id
			}).catch(err => {
				console.log('catch', err);
			});
		},
		handleClick(){
			uni.showModal({
			    title: '',
			    content: '确认兑换吗？',
			    success: function (res) {
			        if (res.confirm) {
						let data = {
							id: that.art.id,
							address_id: that.address_id,
							user_id: that.userInfo.user_id,
							pay_password: ''
						}
						that.pay(data)
			            console.log('用户点击确定');
			        } else if (res.cancel) {
			            console.log('用户点击取消');
			        }
			    }
			});
		},
		pay(data){
			that.$u.post('/api/integral/payment', data).then(res => {
				console.log('pay',res);
				that.showToast('兑换成功','success','/pages/order/order')
			}).catch(err => {
				console.log('catch', err);
			});
		},
		handleAddress(type){
			if(type == 0){
				that.$u.route('/pages/addressadd/index',{from: 'ex'})
				return
			}
			that.$u.route('/pages/address/index',{id: that.address_id})
		},
		showToast(title,type,url) {
			that.$refs.uToast.show({
				title: title,
				type: type,
				icon: false,
				url: url
			})
		},
	},
}
</script>

<style lang="scss">
.container{
	padding: 0 30rpx;
	background-color: #fff;
	.no-address{
		padding: 30rpx 0;
		.new-address{
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 32rpx;
			color: #F22D2D;
			border-radius: 8rpx;
			line-height: 80rpx;
			
		}
	}
	.p-container{
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 30rpx 0;
		.logo{
			margin-right: 20rpx;
		}
		.content{
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			flex: 1;
			font-size: 28rpx;
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
			width: 32rpx;
			height: 32rpx;
			margin-left: 20rpx;
		}
	}
}
.footer{
	background-color: #f1f1f1;
	.felx-sub{
		flex: 1;
	}
	.price{
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24rpx;
		color: #4C4C4C;
		white-space: nowrap;
		.price-num{
			font-size: 32rpx;
		}
		.price-red{
			color: #F22D2D;
		}
	}
}
.bg-pgray{
	background: #DEDEDE;
}
</style>
