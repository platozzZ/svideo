<template>
	<view class="">
		<u-navbar title="视频详情"></u-navbar>
		<view class="" v-if="showVideo">
			<video class="video" id="myVideo" src="https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20181126-lite.m4v"
			 enable-play-gesture title="视频详情" controls poster="https://img-cdn-qiniu.dcloud.net.cn/uniapp/doc/poster.png"></video>
		</view>
		<view class="container">
			<view class="title">一键搞定霸道总裁 GL8四座版"头等</view>
			<view class="info flex align-center justify-between">
				<view class="left flex align-center">
					<image src="../../static/image/mine-avatar.png" class="avatar"></image>
					<text class="margin-lr-xs">茕茕墨朶</text>
					<view class="btn-follow"> + 关注</view>
					<!-- <u-button @click="btnClick" size="mini" :hairLine="false" :custom-style="customStyle">关注</u-button> -->
				</view>
				<view class="center">
					2020-01-22
				</view>
				<view class="right">
					播放 3433
				</view>
			</view>
			
			<view class="ad">
				
			</view>
			<view class="">
				<u-tabs name="cate_name" :list="list" :is-scroll="false" inactive-color="#909399" active-color="#F5CB2B" :active-item-style="activeStyle" bar-width="80" :current="current" @change="change"></u-tabs>
			</view>
		</view>
		<view class="footer">
			<view class="footer-seat"></view>
			<view class="footer-content">
				<view class="handle flex align-center justify-between padding-lr padding-top-xs solid-top">
					<view class="handle-item">
						<u-icon name="star" size="50" color="#909399"></u-icon>
					</view>
					<view class="handle-item">
						<image src="../../static/image/videodetail/share.png" mode="widthFix"></image>
					</view>
					<view class="handle-item">
						<image src="../../static/image/videodetail/comment.png" mode="widthFix"></image>
						<u-badge color=" #0B0B0B" bgColor="rgba(255,255,255,0)" :offset="offset" count="50"></u-badge>
					</view>
					<view class="handle-item">
						<image src="../../static/image/videodetail/phone.png" mode="widthFix"></image>
					</view>
					<view class="handle-item">
						<image src="../../static/image/videodetail/poster.png" mode="widthFix"></image>
					</view>
				</view>
			</view>
		</view>
		
		<u-popup border-radius="10" v-model="show"
			@close="close" @open="open" mode="bottom" 
		>
			1234
		</u-popup>
	</view>
</template>

<script>
export default {
	data() {
		return {
			show: false,
			title: 'video',
			src: '',
			showVideo: false,
			offset: [-20,-40],
			list: [{
				cate_name: '车系概览'
			}, {
				cate_name: '参数配置'
			}, {
				cate_name: '商家介绍'
			}],
			current: 0,
			activeStyle: {
				color: ''
			},
		}
	},
	onReady: function(res) {
		// #ifndef MP-ALIPAY || MP-TOUTIAO
		this.videoContext = uni.createVideoContext('myVideo')
		// #endif
		// #ifdef APP-PLUS || MP-BAIDU
		setTimeout(()=>{
			this.showVideo = true
		},350)
		// #endif
		// #ifndef APP-PLUS || MP-BAIDU
		this.showVideo = true
		// #endif
	},
	methods: {
		change(index) {
			this.current = index;
		}
	}
}
</script>

<style lang="scss">
page{
	background-color: #fff;
}
.video{
	width: 100%;
	display: block;
}
.container{
	padding: 20rpx 30rpx;
	.title{
		font-size: 36rpx;
		color: #000000;
	}
	.info{
		margin-top: 20rpx;
		color: #858585;
		.left{
			.avatar{
				width: 42rpx;
				height: 42rpx;
				border-radius: 50%;
			}
			.btn-follow{
				padding: 0 20rpx;
				height: 36rpx;
				background: #F5CB2B;
				color: #161616;
				font-size: 20rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 8rpx;
			}
		}
	}
	
	.ad{
		width: 100%;
		height: 100rpx;
		background-color: #F2F2F2;
		border-radius: 8rpx;
		overflow: hidden;
		margin: 30rpx 0;
	}
}
.handle{
	width: 100%;
	height: 100%;
	.handle-item{
		position: relative;
		width: 50rpx;
		image{
			width: 100%;
		}
	}
}
</style>
