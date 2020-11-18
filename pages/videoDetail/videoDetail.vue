<template>
	<view class="">
		<u-navbar title="视频详情"></u-navbar>
		<block v-if="showContainer">
		<view class="" v-if="showVideo">
			<video class="video" id="myVideo" 
			:src="art.video_url"
			 enable-play-gesture title="视频详情" 
			 controls :poster="art.nimages"
			 @play="videoPlay"
			 @ended="videoEnd"
			 ></video>
		</view>
		<view class="container">
			<view class="title">{{art.title}}</view>
			<view class="info flex align-center justify-between">
				<view class="left flex align-center">
					<image :src="art.photo" class="avatar"></image>
					<text class="margin-lr-xs">{{art.username}}</text>
					<!-- <view class="btn-follow"> + 关注</view> -->
					<!-- <u-button @click="btnClick" size="mini" :hairLine="false" :custom-style="customStyle">关注</u-button> -->
				</view>
				<view class="center">
					{{art.nsendtime}}
				</view>
				<view class="right">
					播放:{{art.play}}
				</view>
			</view>
			
			<view class="ad" v-if="art.ad" @click="toDetail(art.ad.video_id)">
				<image :src="art.ad.img_url" mode=""></image>
			</view>
			<view class="">
				<u-tabs name="cate_name" :list="list" :is-scroll="false" inactive-color="#909399" active-color="#F5CB2B" :active-item-style="activeStyle" bar-width="80" :current="current" @change="change"></u-tabs>
			</view>
			<view class="u-content" v-if="current == 0">
				<u-parse :html="art.survey"></u-parse>
			</view>
			<view class="u-content" v-if="current == 1">
				<u-parse :html="art.parameter"></u-parse>
			</view>
			<view class="u-content" v-if="current == 2">
				<u-parse :html="art.store"></u-parse>
			</view>
		</view>
		<view class="footer">
			<view class="footer-seat"></view>
			<view class="footer-content">
				<view class="handle flex align-center justify-around padding-lr-sm padding-top-xs solid-top u-rela">
					<view class="handle-mask u-abso" v-if="!userInfo.username" @click="toLogin"></view>
					<view class="handle-item" @click="tpaCollect">
						<image src="../../static/image/videodetail/collect.png" mode="widthFix" v-if="art.is_collect == 0"></image>
						<image src="../../static/image/videodetail/collect_select.png" mode="widthFix" v-else></image>
					</view>
					<view class="handle-item">
						<view class="share-btn u-abso">
							<u-button :custom-style="customStyle" open-type="share" @click="tapShare"></u-button>
						</view>
						<image src="../../static/image/videodetail/share.png" mode="widthFix"></image>
					</view>
					<view class="handle-item" @click="showComment">
						<image src="../../static/image/videodetail/comment.png" mode="widthFix"></image>
						<u-badge color=" #0B0B0B" bgColor="rgba(255,255,255,0)" :offset="offset" :count="art.comment"></u-badge>
					</view>
					<view class="handle-item" @click="makePhoneCall">
						<image src="../../static/image/videodetail/phone.png" mode="widthFix"></image>
					</view>
					<view class="handle-item" @click="tapPoster">
						<image src="../../static/image/videodetail/poster.png" mode="widthFix"></image>
					</view>
				</view>
			</view>
		</view>
		</block>
		<u-popup border-radius="40" v-model="show"
			mode="bottom" 
			:closeable="true"
			:safe-area-inset-bottom="true"
			>
			<view class="content flex flex-direction">
				<view class="title u-border-bottom">
					全部评论
				</view>
				<scroll-view class="flex-sub" scroll-y="true" style="max-height: 800rpx;">
					<view class="flex align-center justify-center" style="height: 400rpx;" v-if="commentList.length == 0">
						暂无评论
					</view>
					<view class="p-list" v-else>
						<view class="p-item u-border-bottom" v-for="(item,index) in commentList" :key="index">
							<view class="p-avatar">
								<u-avatar src="../static/image/loginlogo.png" size="68"></u-avatar>
							</view>
							<view class="p-content">
								<view class="p-content-t u-tips-color u-font-24 u-m-b-10">
									<text class="u-m-r-40 u-main-color">那么那</text>
									<text> 12小时前</text>
								</view>
								<view class="p-content-c u-main-color u-font-28">
									巧了，刚想去呢，这就来了巧了，刚想去呢，这就来了巧了，刚想去呢，这就来了巧了，刚想去呢，这就来了
								</view>
							</view>
							<view class="p-action">
								<u-icon name="heart" color="#7D7D7D" size="46"></u-icon>
							</view>
						</view>
					</view>
				</scroll-view>
				<view class="confrim-btn padding-lr padding-tb-xs">
					<u-form-item>
						<u-input v-model="commentValue" height="60" type="text" :clearable="false" :custom-style="commentCustomStyle" placeholder="说点什么吧" />
						<view slot="right" class="u-main-color u-font-30 u-p-l-20" @click="sendComment">发送</view>
					</u-form-item>
					<!-- <u-input v-model="commentValue" height="60" type="text" :clearable="false" :custom-style="commentCustomStyle" placeholder="说点什么吧" />
					<view class="u-p-l-30">
						发送
					</view> -->
				</view>
			</view>
		</u-popup>
		
		<!-- :close-icon-pos="closeIconPos" -->
		
		<u-popup border-radius="40" v-model="posterShow"
			mode="center" 
			width="100%"
			:closeable="true"
			close-icon-color="#fa3534"
			close-icon-size="40"
			:safe-area-inset-bottom="true"
			>
			<view class="content flex flex-direction align-center justify-center u-p-l-50 u-p-r-50 u-p-t-50">
				<view class="response">
					<u-image mode="widthFix" border-radius="10" width="100%" src="https://img-blog.csdnimg.cn/20190124095040684.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE3NDcwMTY1,size_16,color_FFFFFF,t_70"></u-image>
					
				</view>
				<view class="u-m-t-50">
					<u-button @click="getSetting" size="medium" shape="circle" type="warning">保存到相册</u-button>
				</view>
			</view>
		</u-popup>
		<u-modal v-model="modalShow" ref="uModal" :show-cancel-button="true" :show-title="false" content="保存图片需要获取您的相册权限,请确认">
			<view class="confirm-button u-rela flex align-center justify-center" slot="confirm-button">
				确认
				<u-button :custom-style="modalCustomStyle" open-type="openSetting" @click="modalConfirm"></u-button>
			</view>
		</u-modal>
	</view>
</template>

<script>
var that
export default {
	data() {
		return {
			art: '',
			newsId: '',
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
			customStyle: {
				width: '100%',
				height: '100%',
				opacity: 0
			},
			posterShow: false,
			modalShow: false,
			modalCustomStyle: {
				width: '100%',
				height: '100%',
				position: 'absolute',
				top: '0',
				left: '0',
				opacity: 0
			},
			commentList: [],
			commentValue: '',
			commentCustomStyle: {
				background: '#fff',
				padding: '0 20rpx',
				borderRadius: '6rpx'
			},
			showContainer: false
		}
	},
	onLoad(options) {
		that = this
		console.log(options);
		that.newsId = options.id
		let data = {
			news_id: options.id,
			user_id: that.userInfo.user_id
		}
		that.getInfo(data)
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
	onShareAppMessage() {
		console.log('onShareAppMessage');
				that.share()
		return {
			title: '自定义转发标题',
			path: '/page/user?id=123',
			success(){
				console.log('onShareAppMessage-success');
			}
		}
	    // return custom share data when user share.
	},
	onShareTimeline() { //测试API 仅限安卓部分版本
		console.log('onShareTimeline');
	    return{
			title: that.art.title,
			query: 'a=1&b=2'
		}
	},
	methods: {
		getInfo(data){
			that.$u.post('/api/video/info',data).then(res => {
				console.log('getInfo',res);
				that.art = res
				that.showContainer = true
				that.getComment(that.newsId)
			}).catch(err => {
				console.log('getList-catch', err);
			});
		},
		getComment(id){ // /api/comment/list/内容id
			that.$u.get('/api/comment/list/' + id).then(res => {
				console.log('getComment',res);
				that.commentList = res.data
			}).catch(err => {
				console.log('getComment-catch', err);
			});
		},
		videoPlayer(type){
			let data = {
				news_id: that.newsId,
				user_id: that.userInfo.user_id,
				type: type
			}
			console.log(data);
			that.$u.post('/api/news/play',data).then(res => {
				console.log('videoPlayer',res);
				// that.$u.toast('收藏成功')
				// that.$set(that.art,'is_collect',that.art.is_collect == 0?1:0)
				// that.art = res
			}).catch(err => {
				console.log('videoPlayer-catch', err);
			});
		},
		videoPlay(e){ // /api/news/play
			that.videoPlayer(0)
		},
		videoEnd(){
			that.videoPlayer(1)
		},
		showComment(){
			that.show = true
		},
		addComment(){ // /api/comment/commentadd
			that.$u.post('/api/video/info',data).then(res => {
				console.log('getInfo',res);
				that.art = res
				that.getComment(that.newsId)
			}).catch(err => {
				console.log('getList-catch', err);
			});
		},
		// https://qn.kemean.cn/upload/202006/05/15913462289486a12js7d.png
		makePhoneCall(e){
			if(!that.userInfo.phone){
				that.$u.route('/pages/login/login')
				return
			}
			uni.makePhoneCall({
			    phoneNumber: that.art.phone
			});
		},
		share(){ // /api/news/share
			let data = {
				news_id: that.newsId,
				user_id: that.userInfo.user_id,
			}
			console.log('share-data:',data);
			that.$u.post('/api/news/share',data).then(res => {
				console.log('share',res);
				// that.$u.toast('收藏成功')
				// that.$set(that.art,'is_collect',that.art.is_collect == 0?1:0)
				// that.art = res
			}).catch(err => {
				console.log('share-catch', err);
			});
		},
		tapShare(e){
			console.log(e);
		},
		tapPoster(e){
			console.log(e);
			that.posterShow = true
		},
		tpaCollect(){
			let data = {
				news_id: that.newsId,
				user_id: that.userInfo.user_id,
				type: that.art.is_collect
			}
			console.log(data);
			that.$u.post('/api/news/collect',data).then(res => {
				console.log('tpaCollect',res);
				// that.$u.toast('收藏成功')
				that.$set(that.art,'is_collect',that.art.is_collect == 0?1:0)
				// that.art = res
			}).catch(err => {
				console.log('tpaCollect-catch', err);
			});
		},
		modalConfirm(){
			console.log('modalConfirm');
			that.modalShow = false
		},
		getSetting(){
			let isFirstSaveImage = that.isFirstSaveImage
			uni.getSetting({
				success(res) {
					console.log('getSetting',res)
					console.log("!res.authSetting['scope.writePhotosAlbum']",!res.authSetting['scope.writePhotosAlbum']);
					if (!res.authSetting['scope.writePhotosAlbum']) {
						uni.authorize({
						    scope: 'scope.writePhotosAlbum',
						    success(auth) {
								console.log('authorize',auth);
						        // uni.getLocation()
						    },
							fail() {
								console.log('authorize-fail');
								if(isFirstSaveImage == 0){
									that.$u.vuex('isFirstSaveImage', 1)
								} else {
									that.modalShow = true
									// uni.openSetting({
									// 	success(res) {
									// 		console.log(res.authSetting)
									// 	}
									// })
								}
							}
						})
					}else{
						that.saveImage()
					}
				}
			})
		},
		saveImage(){
			uni.downloadFile({
			    url: 'https://img-blog.csdnimg.cn/20190124095040684.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzE3NDcwMTY1,size_16,color_FFFFFF,t_70', 
			    success: (res) => {
					console.log(res);
			        if (res.statusCode === 200) {
			            console.log('下载成功');
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success: function () {
								
								console.log('save success');
							}
						});
			        }
			    }
			});
		},
		toDetail(id){
			console.log(id);
			// that.$u.route('/pages/videoDetail/videoDetail');
			that.$u.route({
				url: '/pages/videoDetail/videoDetail',
				type: 'redirect',
				params: {
					id: id
				}
			})
			
		},
		toLogin(){
			that.$u.route('/pages/login/login');
		},
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
		image{
			width: 100%;
			height: 100%;
		}
	}
	.u-content{
		padding-top: 24rpx;
		font-size: 28rpx;
		color: $u-content-color;
		line-height: 1.6;
	}
}
.handle{
	width: 100%;
	height: 100%;
	.handle-mask{
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		z-index: 99;
	}
	.handle-item{
		position: relative;
		width: 50rpx;
		image{
			width: 100%;
		}
		.share-btn{
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			overflow: hidden;
		}
	}
}
// /deep/ .u-mode-center-box{
// 	background-color: rgba(255,255,255,0);
// 	.content{
// 		width: 100%;
// 		height: 100%;
// 	}
// }
.content{
	.title{
		height: 90rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 36rpx;
		color: #161616;
	}
	
	.p-list{
		.p-item{
			display: flex;
			align-items: flex-start;
			justify-content: space-between;
			position: relative;
			padding: 20rpx 30rpx;
			&:last-child{
				&::after{
					display: none;
				}
			}
			&::after{
				width: calc(200% - 296rpx);
				left: 118rpx;
			}
			.p-avatar{
				margin-right: 20rpx;
			}
			.p-content{
				flex: 1;
				display: flex;
				flex-direction: column;
				.p-content-t{
					display: flex;
					align-items: center;
				}
			}
			.p-action{
				margin-left: 20rpx;
			}
		}
	}
	.confrim-btn{
		background: #F8F8F8;
	}
}
</style>
