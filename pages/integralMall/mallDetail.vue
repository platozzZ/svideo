<template>
	<view class="">
		<!-- <u-navbar title="商品详情"></u-navbar> -->
		<view class="container" v-if="showToogle">
			<u-swiper height="640" :list="swiperList" mode="number" indicator-pos="bottomRight" :interval="30000"></u-swiper>
			<view class="info padding bg-white u-border-top">
				<view class="title u-font-40 u-main-color">
					{{art.product_title}}
				</view>
				<view class="sub u-tips-color u-font-22 u-p-t-10 u-p-b-10">
					{{art.subtitle}}
				</view>
				<view class="price flex align-end u-font-12">
					<view class="price-l">
						<text class="u-font-40 u-m-r-10">{{art.integral}}</text>积分
					</view>
					<view class="price-r u-m-l-40">
						市场价 <text class="u-m-l-10 line-through">{{art.yprice}}元</text>
					</view>
				</view>
			</view>
			<view class="more flex align-center justify-center margin-tb-xl padding-tb u-tips-color" @click="toogle(false)">
				<u-icon name="arrow-right-double" label="点击查看更多产品信息" label-pos="left" label-color="#909399"></u-icon>
			</view>
			
		</view>
		<view class="detail" v-else>
			<u-sticky>
				<u-tabs bg-color="#fff" inactive-color="#909399" font-size="36" active-color="#303030"
				:show-bar="false" :list="tabList" @change="tabChange" :current="current" :is-scroll="isScroll"></u-tabs>
			</u-sticky>
			<view class="" style="height: 1000px;">
				
			</view>
			<u-back-top :top="top" :custom-style="customStyle">
				<view class="back-top" @click="toogle(true)">
					<u-icon name="arrow-upward" size="40" color="#909399"></u-icon>
				</view>
			</u-back-top>
		</view>
		<view class="footer">
			<view class="footer-seat"></view>
			<view class="footer-content flex align-center">
				<view class="footer-btn bg-pyellow felx-sub" @click="toRoute(art.id)">
					积分兑换
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
			art: '',
			showToogle: true,
			tabList: [
				{
					name: '商品详情'
				}, 
				{
					name:  '参数配置'
				}
			],
			isScroll: false,
			current: 0,
			scrollTop: 0,
			top: -1,
			customStyle: {
				zIndex: '9',
				opacity: 1
			}
		}
	},
	onLoad(options) {
		that = this
		console.log(options)
		let data = {
			id: options.id
		}
		that.getInfo(data)
	},
	onPullDownRefresh(){
		that.showToogle = true
		setTimeout(function () {
			uni.stopPullDownRefresh();
		}, 10);
	},
	methods: {
		getInfo(data){
			// /api/integral/goodsdetail
			that.$u.post('/api/integral/goodsdetail', data).then(res => {
				console.log('getInfo',res);
				that.swiperList = res.img_arr
				that.art = res
			}).catch(err => {
				console.log('catch', err);
			});
		},
		toRoute(e){
			console.log(e);
			that.$u.route('/pages/exchange/index',{id: e})
		},
		toogle(e){
			console.log(e);
			that.showToogle = e
		},
		tabChange(e){
			console.log(e);
			that.current = e;
		},
	},
	onPageScroll(e) {
		// console.log(e);
		that.scrollTop = e.scrollTop;
	}
}
</script>

<style lang="scss">
page{
	
}
.container{
	.info{
		.price{
			.price-l{
				color: #f00000;
				
			}
			.price-r{
				.line-through{
					text-decoration: line-through;
				}
			}
		}
	}
	.more{
		background-color: #fff;
	}
}
.detail{
	/deep/ .u-tab-item{
		&::after{
			content: '';
			position: absolute;
			right: 1rpx;
			top: 25rpx;
			width: 1rpx;
			height: 30rpx;
			background-color: #909399;
		}
		&:last-child{
			&::after{
				display: none;
			}
		}
	}
	.back-top{
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
}
.footer{
	background-color: #f1f1f1;
}
</style>
