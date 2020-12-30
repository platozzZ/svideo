<template>
	<view class="">
		<!-- <u-navbar title="我的海报"></u-navbar> -->
		<view class="container padding-lr">
			<view class="banner padding-tb">
				<view class="pre-box" v-if="art.poster_video">
					 <!-- v-for="(item, index) in lists" :key="index" -->
					<view class="pre-item">
						<image class="pre-item-image" :src="art.poster_video" mode="aspectFill"></image>
						<!-- <view class="u-delete-icon" @tap.stop="deleteItem(index)">
							<u-icon name="close" size="20" color="#ffffff"></u-icon>
						</view> -->
						<u-upload ref="uUpload" name="poster_video" :show-upload-list="showUploadList" :custom-btn="true" :auto-upload="true" :show-progress="false"
							:form-data="model"
							@on-change="onChange"
							@on-progress="onProgress"
							@on-success="onSuccess"
							action="https://jjsp.activitysign.com/api/user/upPoster"
						>
							<view slot="addBtn" class="slot-btn-again" hover-stay-time="150">
								<text class="u-font-26">更换封面</text>
							</view>
						</u-upload>
						<!-- <u-line-progress v-if="item.progress > 0 && !item.error" :show-percent="false" height="16" class="u-progress"
						 :percent="item.progress"></u-line-progress> -->
					</view>
				</view>
				<u-upload ref="uUpload" name="poster_video" max-count="1" :show-upload-list="showUploadList" :custom-btn="true" :auto-upload="true" :show-progress="false"
					:form-data="model"
					@on-change="onChange"
					action="https://jjsp.activitysign.com/api/user/upPoster"
					v-else
				>
					<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
						<u-icon name="plus" size="120" color="#c0c4cc"></u-icon>
						<text class="u-font-26 u-tips-color">上传封面</text>
					</view>
				</u-upload>
			</view>
			<view class="title flex align-center justify-between u-border u-p-l-20">
				<view class="flex-sub" :class="!model.introduce?'u-type-info':''" v-if="!isEdit" @click="editTitle">
					{{model.introduce?model.introduce: '请输入简介'}}
				</view>
				<u-input v-model="model.introduce" :custom-style="customStyle" height="60" type="text" :focus="true" placeholder="说点什么吧" v-else />
				<view class="margin-xs padding-left-xs u-border-left " @click="editTitle">
					<u-icon name="edit-pen" size="40" color="#e4e7ed" v-if="!isEdit"></u-icon>
					<text class="u-type-warning" v-else @click="sendTitle">确认</text>
				</view>
				
			</view>
			<view class="info padding-tb flex align-center ">
				<view class="avatar">
					<u-avatar :src="art.photo" size="42"></u-avatar>
				</view>
				<text class="u-m-l-10">{{art.username}}</text>
			</view>
			<view class="des u-p-t-40 u-border-top flex align-center">
				<view class="code">
					<u-image :src="art.code" width="100%" mode="widthFix"></u-image>
				</view>
				<view class="des-content flex flex-direction u-m-l-30">
					<text>分享有好礼，积分兑大奖。收益可提现。</text>
					<text>店铺名称：{{art.distributor}}</text>
				</view>
				
			</view>
		</view>
		
		<view class="saveImage">
			<view class="btn" @click="tapPoster">
				保存海报
			</view>
			
		</view>
		<u-popup border-radius="40" v-model="posterShow"
			mode="center" 
			width="100%"
			:closeable="true"
			close-icon-color="#fa3534"
			close-icon-size="40"
			:safe-area-inset-bottom="true"
			>
			<view class="content u-p-t-50">
				<view>
					<u-image border-radius="10" :src="art.poster" mode="widthFix"></u-image>
				</view>
				<view class="u-m-t-50 flex align-center justify-center">
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
		<u-toast ref="uToast" />
	</view>
</template>

<script>
var that
export default {
	data() {
		return {
			art: '',
			poster: '',
			model: {
				introduce: '',
				user_id: '',
			},
			showUploadList: false,
			lists: [],
			title: '',
			isEdit: false,
			customStyle: {
				flex: '1'
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
		}
	},
	onLoad() {
		that = this
		that.model.user_id = that.userInfo.user_id
		let data = {
			user_id: that.userInfo.user_id
		}
		that.getPoster(data)
	},
	methods: {
		getPoster(data){
			that.$u.post('/api/user/myPoster', data).then(res => {
				console.log('getPoster',res);
				that.art = res
				that.model.introduce = res.introduce
			}).catch(err => {
				console.log('getPoster-catch', err);
			});
		},
		onProgress(res, index, lists, name){
			console.log('onProgress', res);
			console.log('onProgress', lists);
			uni.showLoading()
		},
		onChange(res, index, lists, name) {
			console.log('onChange', res);
			console.log('onChange', index);
			console.log('onChange', lists);
			console.log('onChange', name);
			that.art.poster_video = lists[index].url
			console.log(that.art.poster_video);
			let data = JSON.parse(res.data)
			console.log(data);
			if(data.statusCode == 200){
				that.$u.toast('更换成功')
			} else {
				that.$u.toast(data.message)
			}
		},
		onSuccess(res, index, lists, name){
			that.art.poster = res.data.poster
			console.log('onSuccess', res);
			console.log('onSuccess', index);
			console.log('onSuccess', lists);
			console.log('onSuccess', name);
			
		},
		editTitle(){
			that.isEdit = true
		},
		sendTitle(){
			let data = that.model
			that.$u.post('/api/user/upPoster', data).then(res => {
				console.log('sendTitle',res);
				that.isEdit = false
				that.art.poster = res.poster
				that.$u.toast('修改成功')
			}).catch(err => {
				console.log('sendTitle-catch', err);
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
		tapPoster(e){
			console.log(e);
			that.posterShow = true
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
			    url: that.art.poster, 
			    success: (res) => {
					console.log(res);
			        if (res.statusCode === 200) {
			            console.log('下载成功');
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success: function () {
								that.showToast('保存成功','success')
								that.posterShow = false
								console.log('save success');
							}
						});
			        }
			    }
			});
		},
	}
}
</script>

<style lang="scss">
page{
	background-color: #fff;
}
.container{
	width: 100%;
	.banner{
		.pre-box {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			.pre-item {
				flex: 1;
				border-radius: 10rpx;
				overflow: hidden;
				position: relative;
				.pre-item-image {
					width: 100%;
					height: 360rpx;
				}
				.u-progress {
					position: absolute;
					bottom: 10rpx;
					left: 8rpx;
					right: 8rpx;
					z-index: 9;
					width: auto;
				}
				.u-delete-icon {
					position: absolute;
					top: 10rpx;
					right: 10rpx;
					z-index: 10;
					background-color: $u-type-error;
					border-radius: 100rpx;
					width: 44rpx;
					height: 44rpx;
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}
		}
		
		/deep/ .u-upload{
			width: 100%;
			// height: 360rpx;
			>view{
				width: 100%;
				height: 100%;
				
			}
			
		}
		.slot-btn {
			width: 100%;
			height: 360rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			background: rgb(244, 245, 246);
			border-radius: 10rpx;
			&.slot-btn__hover {
				background-color: rgb(235, 236, 238);
			}
		}
		.slot-btn-again{
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			line-height: 60rpx;
			text-align: center;
			background: rgba(0, 0, 0, 0.5);
			color: #fff;
		}
	}
	.title{
		height: 68rpx;
		/deep/ u-input{
			flex: 1;
		}
	}
	.info{
		color: #858585;
		.avatar{
			width: 42rpx;
			height: 42rpx;
		}
	}
	.des{
		.code{
			width: 140rpx;
			height: 140rpx;
		}
		.des-content{
			color: #515151;
		}
	}
}
.saveImage{
	position: fixed;
	width: 100%;
	bottom: 50rpx;
	left: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	.btn{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 60%;
		background: #FFD524;
		border-radius: 6px;
		line-height: 100rpx;
		font-weight: 500;
		font-size: 36rpx;
	}
	
	
}
.content{
	width: 90%;
	margin: 0 auto;
}
</style>
