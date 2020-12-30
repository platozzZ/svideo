<template>
	<view class="">
		<!-- <u-navbar title="我的收藏"></u-navbar> -->
		<block v-if="list.length > 0">
		<view class="p-list">
			<view class="p-item u-border-bottom" v-for="(item,index) in list" :key="index" @click="toDetail(item.id)">
				<view class="p-avatar">
					<u-avatar :src="item.nimages" size="140" mode="square"></u-avatar>
				</view>
				<view class="p-content">
					<view class="title u-font-28 u-m-b-10 u-line-2">
						{{item.ntitle}}
					</view>
					<view class="info u-font-24 u-tips-color">
						<view class="user">
							<u-avatar :src="item.photo" size="40" ></u-avatar>
							<text class="u-m-l-10">{{item.username}}</text>
						</view>
						<view class="play">
							播放:{{item.play}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<u-loadmore :is-dot="true" :status="loadStatus" margin-top="20" margin-bottom="20"></u-loadmore>
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
			type: 2,
			user_id: that.userInfo.user_id,
			page: 1
			
		}
		that.getList(data)
	},
	
	onReachBottom() {
		that.loadStatus = 'loading';
		if (that.totalPage >= that.page) {
			let data = {
				type: 2,
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
			that.$u.post('/api/video/user_list', data).then(res => {
				console.log('getList',res);
				that.totalPage = res.last_page;
				if (data.page == 1) {
					that.list = []
				}
				that.list = that.list.concat(res.data)
				that.page++;
				if(res.data.length == 0){
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
				.user{
					display: flex;
					align-items: center;
				}
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
