<template>
	<view class="">
		<u-navbar :is-back="false" title="消息中心"></u-navbar>
		<view class="p-list">
			<view class="p-item" v-for="(item,index) in list" :key="index" hover-class="u-cell-hover" @click="showDetail(index)">
				<view class="p-avatar">
					<image :src="item.avatar"></image>
				</view>
				<view class="p-content">
					<view class="p-top">
						<view class="p-title">{{item.title}}</view>
						<view class="p-time">{{item.time}}</view>
					</view>
					<view class="p-des">
						{{item.des}}
					</view>
				</view>
			</view>
		</view>
		<u-popup v-model="show" mode="center" width="90%" border-radius="8" @open="open" @close="close" :closeable="true">
			<view class="msg-pop" v-if="curIndex != null">
				<view class="msg-avatar">
					<image :src="list[curIndex].avatar"></image>
				</view>
				<view class="msg-title">{{list[curIndex].title}}</view>
				<view class="msg-content">{{list[curIndex].des}}</view>
			</view>
		</u-popup>
		<u-tabbar
		    :list="vuex_tabbar"
			:mid-button="vuex_midButton"
			:mid-button-size="vuex_midButton_size"
			:icon-size="vuex_iconsize"
			@change="tabBarChange"
		></u-tabbar>
	</view>
</template>

<script>
export default {
		data() {
			return {
				list: [
					{
						title: '系统消息',
						des: '您的“北京现代轿车”视频已经提交并已经短信通知审核人员，请耐心等待。',
						time: '下午1:30',
						avatar: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23343_s.jpg',
					},
					{
						title: '系统消息',
						des: '您的“北京现代轿车”视频已经提交并已经短信通知审核人员，请耐心等待。',
						time: '下午1:30',
						avatar: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23343_s.jpg',
					},
					{
						title: '系统消息',
						des: '您的“北京现代轿车”视频已经提交并已经短信通知审核人员，请耐心等待。',
						time: '下午1:30',
						avatar: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23343_s.jpg',
					},
				],
				show: false,
				curIndex: null
			}
		},
		methods: {
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
</style>
