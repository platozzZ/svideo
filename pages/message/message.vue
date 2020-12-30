<template>
	<view class="">
		<!-- <u-navbar title="消息"></u-navbar> -->
		<block v-if="list.length > 0">
		<view class="p-list">
			<view class="p-item" v-for="(item,index) in list" :key="index" hover-class="u-cell-hover" @click="showDetail(index)">
				<view class="p-avatar">
					<image :src="item.photo"></image>
				</view>
				<view class="p-content">
					<view class="p-top">
						<view class="p-title">{{item.type_name}}</view>
						<view class="p-time">{{item.create_time}}</view>
					</view>
					<view class="p-des">
						{{item.message}}
					</view>
				</view>
			</view>
		</view>
		<u-loadmore :is-dot="true" :status="loadStatus" margin-top="20" margin-bottom="20"></u-loadmore>
		</block>
		<view class="emptyContainer" v-else>
			<!-- <u-empty text="暂无更多数据" mode="list"></u-empty> -->
		</view>
		
		<u-popup v-model="show" mode="center" width="90%" border-radius="8" @open="open" @close="close" :closeable="true">
			<view class="msg-pop" v-if="curIndex != null">
				<view class="msg-avatar">
					<image :src="list[curIndex].photo"></image>
				</view>
				<view class="msg-title">{{list[curIndex].type_name}}</view>
				<view class="msg-content">{{list[curIndex].message}}</view>
			</view>
		</u-popup>
		<!-- <u-tabbar
		    :list="vuex_tabbar"
			:mid-button="vuex_midButton"
			:mid-button-size="vuex_midButton_size"
			:icon-size="vuex_iconsize"
			@change="tabBarChange"
		></u-tabbar> -->
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
			totalPage: 0,
			show: false,
			curIndex: null
		}
	},
	onLoad(options){
		that = this
		let data = {
			user_id: that.userInfo.user_id,
			page: 1
		}
		that.getList(data)
	},
	onReachBottom() {
		that.loadStatus = 'loading';
		if (that.totalPage >= that.page) {
			let data = {
				page: that.page,
				user_id: that.userInfo.user_id?that.userInfo.user_id:0,
			}
			console.log(data)
			that.getList(data);
			return
		}
		that.loadStatus = 'nomore'
	},
	methods: {
		getList(data){
			that.$u.post('/api/user/myMessage', data).then(res => {
				console.log('getList',res);
				that.totalPage = res.last_page;
				let list = res.data
				list.map((item,index) => {
					item.guid_id = that.$u.guid();
				})
				console.log(list);
				if (data.page == 1) {
					that.list = []
				}
				that.list = that.list.concat(list)
				that.page++;
				if(res.data.length == 0 || data.page == res.last_page){
					that.loadStatus = 'nomore';
					return
				}
				that.loadStatus = 'loadmore';
			}).catch(err => {
				console.log('catch', err);
			});
		},
		showDetail(index){
			this.curIndex = index
			console.log(index);
			console.log(this.curIndex);
			// this.open()
			this.show = true
		},
		close() {
			console.log(this.curIndex);
			this.curIndex = null
			console.log(this.curIndex);
			console.log('close');
		},
		open() {
			console.log('open');
			this.show = true
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
	}
};
</script>

<style lang="scss">
.p-list{
	.p-item{
		position: relative;
		background-color: #fff;
		padding: 30rpx 40rpx;
		display: flex;
		align-items: flex-start;
		&:last-child{
			&::after{
				display: none;
			}
		}
		&::after{
			content: ' ';
			position: absolute;
			left: 130rpx;
			top: 0;
			pointer-events: none;
			transform-origin: 0 0;
			width: calc(200% - 320rpx);
			height: 200%;
			transform: scale(0.5, 0.5);
			border-bottom: 1rpx solid #e4e7ed;
			z-index: 2;
		}
		.p-avatar{
			width: 80rpx;
			height: 80rpx;
			border-radius: 50%;
			overflow: hidden;
			margin-right: 20rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.p-content{
			flex: 1;
			width: calc(100vw - 160rpx);
			display: flex;
			flex-direction: column;
			.p-top{
				display: flex;
				align-items: center;
				justify-content: space-between;
				.p-title{
					font-size: 32rpx;
					color: $u-main-color;
				}
				.p-time{
					font-size: 24rpx;
					color: $u-type-info;
				}
			}
			.p-des{
				margin-top: 10rpx;
				font-size: 22rpx;
				color: #7F7F7F;
			}
		}
	}
}
.msg-pop{
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 40rpx;
	background-color: #fff;
	.msg-avatar{
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		overflow: hidden;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.msg-title{
		margin-top: 20rpx;
		font-size: 32rpx;
		color: $u-main-color;
	}
	.msg-content{
		margin-top: 20rpx;
		font-size: 24rpx;
		color: #7F7F7F;
	}
}

.emptyContainer{
	position: fixed;
	top: 30%;
	left: 0;
	width: 100%;
}
</style>
