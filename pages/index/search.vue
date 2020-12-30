<template>
	<view class="">
		<!-- <u-navbar title="搜索"></u-navbar> -->
		<view class="container">
			<view class="u-p-l-30 u-p-r-30 u-p-t-20">
				<u-search placeholder="请输入需要搜索的内容" v-model="title" :show-action="false" focus @search="search"></u-search>
			</view>
			<view class="padding-top-sm" v-if="showContainer">
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
			</view>
			<view v-else class="emptyContainer">
				<u-empty text="没有搜索结果" mode="search"></u-empty>
			</view>
		</view>
	</view>
</template>

<script>
var that
export default {
	data() {
		return {
			showContainer: false,
			title: '',
			loadStatus: 'loadmore',
			flowList: [],
			current: 0,
			page: 1,
			totalPage: 0,
			isPage1: true
		}
	},
	onLoad(options) {
		that = this
	},
	onReachBottom() {
		that.loadStatus = 'loading';
		if (that.totalPage >= that.page) {
			let data = {
				title: that.title,
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
		search(){
			let data = {
				title: that.title,
				distributor_id: that.userInfo.distributor_id?that.userInfo.distributor_id:0,
				page: 1,
				user_id: that.userInfo.user_id?that.userInfo.user_id:0,
			}
			that.getList(data);
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
					if(list.length > 0){
						that.showContainer = true
					} else {
						that.showContainer = false
					}
				} else {
					that.isPage1 = false
				}
				console.log(that.flowList)
				that.flowList = that.flowList.concat(list)
				// console.log(that.flowList)
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
		toDetail(id){
			console.log(id);
			that.$u.route('/pages/videoDetail/videoDetail', {id: id})
		},
	}
}
</script>

<style lang="scss">
page{
	background-color: #fff;
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
.emptyContainer{
	position: fixed;
	top: 30%;
	left: 0;
	width: 100%;
}
</style>
