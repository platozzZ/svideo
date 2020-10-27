<template>
	<view class="">
		<u-navbar :is-back="false">
			<view class="slot-wrap">
				<view class="">
					<image src="../../static/image/logo.png" class="logo"></image>
				</view>
				<view class="search-wrap">
					<!-- 如果使用u-search组件，必须要给v-model绑定一个变量 -->
					<u-search v-model="keyword" :show-action="showAction" height="56" :action-style="{color: '#fff'}"></u-search>
				</view>
			</view>
		</u-navbar>
		<u-sticky>
			<u-tabs bg-color="#fff" inactive-color="#909399" active-color="#303030" :active-item-style="activeStyle" :show-bar="false" font-size="28" :list="tabList"
			@change="tabChange" :current="current" :is-scroll="isScroll"></u-tabs>
		</u-sticky>
		<view class="">
			<u-waterfall v-model="flowList" ref="uWaterfall">
				<template v-slot:left="{ leftList }">
					<view class="demo-warter" v-for="(item, index) in leftList" :key="index">
						<!-- 微信小程序需要hx2.8.11版本才支持在template中引入其他组件，比如下方的u-lazy-load组件 -->
						<u-lazy-load threshold="-450" border-radius="10" :image="item.image" :index="index"></u-lazy-load>
						<view class="demo-title">{{ item.title }}</view>
						<view class="demo-bottom margin-top-sm flex align-center justify-between">
							<view class="avatar-container flex align-center text-pgray text-sm">
								<image :src="item.image" class="avatar margin-right-xs"></image>
								叽里咕噜
							</view>
							<view class="readVol text-pgray text-sm">
								播放:123
							</view>
						</view>
					</view>
				</template>
				<template v-slot:right="{ rightList }">
					<view class="demo-warter" v-for="(item, index) in rightList" :key="index">
						<u-lazy-load threshold="-450" border-radius="10" :image="item.image" :index="index"></u-lazy-load>
						<view class="demo-title">{{ item.title }}</view>
						<view class="demo-bottom margin-top-sm flex align-center justify-between">
							<view class="avatar-container flex align-center text-pgray text-sm">
								<image :src="item.image" class="avatar margin-right-xs"></image>
								叽里咕噜
							</view>
							<view class="readVol text-pgray text-sm">
								播放:123
							</view>
						</view>
					</view>
				</template>
			</u-waterfall>
			<u-loadmore bg-color="rgb(240, 240, 240)" :status="loadStatus" @loadmore="addRandomData"></u-loadmore>
		</view>
		
		<u-tabbar
		    :list="vuex_tabbar"
			:mid-button="vuex_midButton"
			:icon-size="vuex_iconsize"
			@change="tabBarChange"
		></u-tabbar>
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
					name: '附件'
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
			list: [
				{
					price: 35,
					title: '北国风光，千里冰封，万里雪飘',
					shop: '李白杜甫白居易旗舰店',
					image: 'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg'
				},
				{
					price: 75,
					title: '望长城内外，惟余莽莽',
					shop: '李白杜甫白居易旗舰店',
					image: 'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23325_s.jpg'
				},
				{
					price: 385,
					title: '大河上下，顿失滔滔',
					shop: '李白杜甫白居易旗舰店',
					image: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg'
				},
				{
					price: 784,
					title: '欲与天公试比高',
					shop: '李白杜甫白居易旗舰店',
					image: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/zzpic23369_s.jpg'
				},
				{
					price: 7891,
					title: '须晴日，看红装素裹，分外妖娆',
					shop: '李白杜甫白居易旗舰店',
					image: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2130_s.jpg'
				},
				{
					price: 2341,
					shop: '李白杜甫白居易旗舰店',
					title: '江山如此多娇，引无数英雄竞折腰',
					image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23346_s.jpg'
				},
				{
					price: 661,
					shop: '李白杜甫白居易旗舰店',
					title: '惜秦皇汉武，略输文采',
					image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23344_s.jpg'
				},
				{
					price: 1654,
					title: '唐宗宋祖，稍逊风骚',
					shop: '李白杜甫白居易旗舰店',
					image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23343_s.jpg'
				},
				{
					price: 1678,
					title: '一代天骄，成吉思汗',
					shop: '李白杜甫白居易旗舰店',
					image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23343_s.jpg'
				},
				{
					price: 924,
					title: '只识弯弓射大雕',
					shop: '李白杜甫白居易旗舰店',
					image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23343_s.jpg'
				},
				{
					price: 8243,
					title: '俱往矣，数风流人物，还看今朝',
					shop: '李白杜甫白居易旗舰店',
					image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23343_s.jpg'
				}
			],
			current: 0,
			
		}
	},
	onLoad() {
		that = this
		this.addRandomData();
	},
	methods: {
		addRandomData() {
			for (let i = 0; i < 10; i++) {
				let index = this.$u.random(0, this.list.length - 1);
				// console.log(index);
				// 先转成字符串再转成对象，避免数组对象引用导致数据混乱
				let item = JSON.parse(JSON.stringify(this.list[index]));
				// console.log(item);
				item.id = this.$u.guid();
				// console.log(item);
				this.flowList.push(item);
			}
		},
		tabChange(e){
			console.log(e);
			this.current = e;
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
		toRoute(e){
			console.log(e);
			uni.switchTab({
				url: '../mine/mine'
			})
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
