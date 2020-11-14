<template>
	<view class="">
		<u-navbar title="我的视频"></u-navbar>
		<block v-if="list.length > 0">
		<view class="p-list">
			<view class="p-item u-border-bottom" v-for="(item,index) in list" :key="index" @click="toDetail(item)">
				<view class="p-avatar">
					<u-avatar :src="item.nimages" size="140" mode="square"></u-avatar>
				</view>
				<view class="p-content">
					<view class="title u-font-28 u-m-b-10 u-line-2">
						{{item.ntitle}}
					</view>
					<view class="info u-font-24 u-tips-color">
						<view class="user">
							{{item.nstatus == 0?'未发布':item.nstatus == 1?'已发布':'未通过'}}
						</view>
						<view class="user">
							{{item.nsendtime}}
						</view>
						<view class="play">
							播放:{{item.play}}
						</view>
						<view class="">
							收藏:{{item.collect}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<u-loadmore bg-color="rgb(240, 240, 240)" margin-top="20" margin-bottom="20" :status="loadStatus"></u-loadmore>
		</block>
		<view class="emptyContainer" v-else>
			<u-empty text="暂无更多数据" mode="list"></u-empty>
		</view>
	</view>
</template>

<script>
var that
export default {
	data() {
		return {
			list: [],
			loadStatus: 'loadmore',
			page: 1,
			totalPage: 0
		}
	},
	onLoad() {
		that = this
		let data = {
			type: 1,
			user_id: that.userInfo.user_id,
			page: 1
			
		}
		that.getList(data)
	},
	
	onReachBottom() {
		that.loadStatus = 'loading';
		if (that.totalPage >= that.page) {
			let data = {
				type: 1,
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
			that.$u.post('/api/video/my_list', data).then(res => {
				console.log('getList',res);
				that.totalPage = res.last_page;
				if (data.page == 1) {
					that.list = []
				}
				that.list = that.list.concat(res.data)
				// if(res.last_page == 1){
				// 	that.showLoadmore = false
				// } else {
				// 	that.showLoadmore = true
				// }
				// console.log('showLoadmore:',that.showLoadmore)
				// that.cmsList = that.cmsList.concat(art)
				// uni.stopPullDownRefresh();
				that.page++;
				// that.showLoadmore == true
				if(res.data.length == 0){
					that.loadStatus = 'nomore';
					return
				}
				that.loadStatus = 'loadmore';
				// that.$u.vuex('token', res.token)
			}).catch(err => {
				console.log('getList-catch', err);
			});
		},
		toDetail(art){
			console.log(art);
			if(art.nstatus == 1){	
				that.$u.route({
					url: '/pages/videoDetail/videoDetail',
					params: {
						id: id
					}
				})
			}
			
		},
	}
}
</script>

<style lang="scss">
.p-list{
	.p-item{
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		position: relative;
		padding: 20rpx 30rpx;
		background-color: #fff;
		&:last-child{
			&::after{
				display: none;
			}
		}
		&::after{
			width: calc(200% - 120rpx);
			left: 30rpx;
		}
		.p-avatar{
			margin-right: 20rpx;
		}
		.p-content{
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			height: 140rpx;
			.title{
				// color: #000;
			}
			.info{
				display: flex;
				align-items: center;
				justify-content: space-between;
				
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
