<template>
	<view class="">
		<!-- <u-navbar title="邀请商家入驻"></u-navbar> -->
		<!-- <view class="padding-tb-sm padding-lr">
			<view class="video-container flex align-center justify-center" @click="addVideo" v-if="!model.video">
				<u-icon name="plus" size="120" color="#c0c4cc"></u-icon>
			</view>
			<view class="u-rela" v-else>
				<video :src="model.video" class="video"></video>
				<cover-view class="delete u-abso"  @tap.stop="deleteVideo">
					<u-icon name="close" size="20" color="#ffffff"></u-icon>
				</cover-view>
			</view>
			<view class="tips u-tips-color flex align-center justify-end u-p-t-10 u-font-10">*视频大小不能超过100M</view>
		</view> -->
		
		<view class="u-p-l-30 u-p-r-30 u-p-t-30 u-p-b-50">
			<view class="u-p-b-30">
				
				<view class="pre-box" v-if="!showUploadList">
					<view class="pre-item" v-for="(item, index) in lists" :key="index">
						<image class="pre-item-image" :src="item.url" mode="aspectFill"></image>
						<view class="u-delete-icon" @tap.stop="deleteItem(index)">
							<u-icon name="close" size="20" color="#ffffff"></u-icon>
						</view>
						<u-line-progress v-if="item.progress > 0 && !item.error" :show-percent="false" height="16" class="u-progress"
						 :percent="item.progress"></u-line-progress>
					</view>
				</view>
				<u-upload ref="uUpload" name="license" max-count="1" :show-upload-list="showUploadList" :custom-btn="true" :auto-upload="false" :show-progress="false"
					@on-list-change="onListChange" :form-data="model"
					action="https://jjsp.activitysign.com/api/distributor/add"
				>
					<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
						<u-icon name="plus" size="120" color="#c0c4cc"></u-icon>
						<text class="u-font-26 u-tips-color">上传营业执照</text>
					</view>
				</u-upload>
			</view>
			<u-form :model="model" :rules="rules" ref="uForm" :label-style="labelStyle" :border-bottom="false" label-position="right" :errorType="errorType">
				<u-form-item :border-bottom="false" label-width="120" label="商家名称" prop="name">
					<u-input :border="border" :border-color="borderColor" placeholder="请输入商家名称" maxlength="30" v-model="model.name" type="text"></u-input>
				</u-form-item>
				<u-form-item :border-bottom="false" label-width="120" label="商家电话" prop="phone">
					<u-input :border="border" :border-color="borderColor" placeholder="请输入您的手机号码" v-model="model.phone" maxlength="11" type="number"></u-input>
				</u-form-item>
				<u-form-item :border-bottom="false" label-width="120" label="联系人名称" prop="real_name">
					<u-input :border="border" :border-color="borderColor" placeholder="请输入联系人名称" maxlength="30" v-model="model.real_name" type="text"></u-input>
				</u-form-item>
				<u-form-item :border-bottom="false" label-width="120" label="营业时间" prop="work_time">
					<view class="flex align-center">
						<u-input :border="border" :border-color="borderColor" type="select" default-time="08:00" :select-open="pickerShow1" v-model="model.start_time" placeholder="时/分" @click="pickerShow1 = true"></u-input>
						<text class="u-m-l-20 u-m-r-20">-</text> 
						<u-input :border="border" :border-color="borderColor" type="select" default-time="18:00" :select-open="pickerShow2" v-model="model.end_time" placeholder="时/分" @click="pickerShow2 = true"></u-input>
				
					</view>
				</u-form-item>
				<u-form-item :border-bottom="false" label-width="120" label="品牌" prop="brand_id">
					<u-input :border="border" :border-color="borderColor" v-model="model.brand_name" :disabled="true" placeholder="请选择品牌" @click="toBrand">
					</u-input>
					<!-- <view class="" slot="right">
						<u-icon name="arrow-right" color="#C0C4CC" size="28"></u-icon>
					</view> -->
				</u-form-item>
				<u-form-item :border-bottom="false" label-width="120" label="商家地址" prop="address">
					<view class="flex flex-direction response">
						<view class="flex align-center justify-between u-m-b-20">
							<view class="flex-sub u-m-r-20 u-line-2 u-font-24 flex flex-direction" style="line-height: 1.4;" v-if="!!chooseAdress">
								<view class="u-font-24">
									{{chooseAdress.name}}
								</view>
								<view class="u-font-10 u-tips-color">
									{{chooseAdress.address}}
								</view>
								
							</view>
							<!-- <view class="" @click="chooseLocations">
								{{!chooseAdress?'选择地址':'修改地址'}}
							</view> -->
							<u-button :plain="true" :custom-style="!chooseAdress?customStyle:customStyle2" :size="!chooseAdress?'medium':'mini'" type="warning" @click="chooseLocations">{{!chooseAdress?'选择地址':'修改地址'}}</u-button>
						</view>
						<u-input :border="border" :border-color="borderColor" placeholder="详细地址" maxlength="30" v-model="model.address" type="text"></u-input>
					</view>
				</u-form-item>
				
				<u-form-item  prop="latitude" v-show="false">
					<u-input  v-model="model.latitude"  />
				</u-form-item>
				<u-form-item prop="longitude" v-show="false">
					<u-input v-model="model.longitude"  />
				</u-form-item>
				<u-form-item :border-bottom="false" label-position="left" label-width="300" label="是否是二级经销商" prop="is_two">
					<u-radio-group v-model="model.is_two" @change="radioGroupChange" slot="right">
						<u-radio shape="circle" active-color="#ff9900" v-for="(item, index) in radioList" :key="index" :name="item.value">{{ item.name }}</u-radio>
					</u-radio-group>
				</u-form-item>
				<u-form-item :border-bottom="false" label-width="120" label="商家介绍" prop="introduce">
					<u-input type="textarea" :border="border" border-color="#F6F6F6" height="200" placeholder="输入商家介绍" v-model="model.introduce" />
				</u-form-item>
			</u-form>
			<u-picker v-model="pickerShow1" mode="time" :params="params" @confirm="timeConfirm1"></u-picker>	
			<u-picker v-model="pickerShow2" mode="time" :params="params" @confirm="timeConfirm2"></u-picker>	
			<!-- <u-select :safe-area-inset-bottom="true" value-name="id" label-name="name" v-model="selectShow" mode="single-column" :list="selectList" @confirm="selectConfirm"></u-select> -->
		
		</view>
		<view class="footer">
			<view class="footer-seat"></view>
			<view class="footer-content flex align-center">
				<view class="footer-btn bg-disabled felx-sub" v-if="!model.license" @click="licenseTips">
					提交
				</view>
				<view class="footer-btn bg-pyellow felx-sub" @click="submit" v-else>
					提交
				</view>
			</view>
		</view>
		<u-toast ref="uToast" />
		<u-popup mode="top" v-model="shareShow" border-radius="10" width="100%" :custom-style="customShareStyle">
			<view class="shareContainer u-font-30">
				请点击右上角『 <u-icon name="more-dot-fill" color="#000" size="40"></u-icon> 』发送给您的车商，邀请商家入驻有奖励。
				<view class="arrow u-abso">
					 <!-- :style="{right: arrowRight + 'px' }" -->
					<u-icon name="arrow-up-fill" color="#fff" size="40"></u-icon>
				</view>
			</view>
		</u-popup>
		<u-modal v-model="modalShow" ref="uModal" :show-title="false" confirm-text="去授权" content="入驻车商需要获得微信授权" @confirm="modalConfirm">
			
		</u-modal>
	</view>
</template>

<script>
var that
export default {
	data() {
		return {
			model: {
				user_id: '', //当前登录用户id
				name: '', //店铺名称
				real_name: '', //联系人名称
				phone: '', //电话号码
				address: '', //地址
				latitude: '', //纬度
				longitude: '', //经度
				is_two: null, //是否是二级经销商
				introduce: '', //简介
				license: '', //营业执照base64传输
				start_time: '',
				end_time: '',
				work_time: '',
				brand_name: '',
				brand_id: '',
			},
			rules: {
				name: [
					{
						required: true,
						message: '请输入商家名称',
						trigger: 'blur' ,
					},
				],
				phone: [
					{
						required: true,
						message: '请输入联系人手机号',
					},
					{
						validator: (rule, value, callback) => {
							// 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
							return this.$u.test.mobile(value);
						},
						message: '手机号码不正确',
					}
				],
				real_name: [
					{
						required: true,
						message: '请输入联系人姓名',
					},
				],
				work_time: [
					{
						required: true,
						message: '请选择营业时间',
					},
				],
				start_time: [
					{
						required: true,
						message: '请选择上班时间',
					},
				],
				end_time: [
					{
						required: true,
						message: '请选择下班时间',
					},
				],
				brand_id: [
					{
						required: true,
						message: '请选择品牌',
					},
				],
				latitude: [
					{
						required: true,
						message: '请选择地址',
					}
				],
				longitude: [
					{
						required: true,
						message: '请选择地址',
					}
				],
				address: [
					{
						required: true,
						message: '请输入详细地址',
					}
				],
				is_two: [
					{
						required: true,
						message: '请选择是否是二级经销商',
					}
				],
				introduce: [
					{
						required: true,
						message: '请输入商家介绍',
					}
				],
			},
			
			chooseAdress: '',
			labelStyle: {
				color: '#4C4C4C'
			},
			customStyle: {
				width: '100%', // 注意驼峰命名，并且值必须用引号包括，因为这是对象
			},
			customStyle2: {
				width: 'auto', // 注意驼峰命名，并且值必须用引号包括，因为这是对象
			},
			radioList: [
				{
					name: '是',
					value: 1,
					checked: false,
					disabled: false
				},
				{
					name: '否',
					value: 0,
					checked: false,
					disabled: false
				}
			],
			selectList: [],
			border: true,
			borderColor: '#F6F6F6',
			pickerShow1: false,
			pickerShow2: false,
			startTime: '',
			endTime: '',
			selectShow: false,
			showUploadList: false,
			params: {
				year: false,
				month: false,
				day: false,
				hour: true,
				minute: true,
				second: false
			},
			selectResult: '请选择车辆类型',
			codeTips: '',
			errorType: ['toast'],
			lists: [],
			share_openid: '',
			shareShow: true,
			customShareStyle: {
				backgroundColor: 'rgba(255,255,255,0)'
			},
			menuButtonInfo: '',
			sys: '',
			arrowRight: '',
			modalShow: false
			// percent: 0,
			// progressType: 'success'
		};
	},
	onLoad(options) {
		that = this
		that.$u.vuex('brandid', '')
		that.$u.vuex('brandname', '')
		if(!!options.openid){
			that.share_openid = options.openid
			that.shareShow = false
		}
		console.log('that.openid',that.openid);
		console.log('!that.openid',!that.openid);
		if(!that.openid){
			that.$getOpenid(that)
		} else {
			that.$getUserInfo(that,that.openid)
			if(!options.openid){
				return
			}
			let bindData = {
				wx_openid: that.openid,
				father_openid: options.openid,
				type: 1
			}
			console.log(bindData)
			that.$bindUser(that,bindData)
		}
		// #ifdef MP-WEIXIN
			let menuButtonInfo = uni.getMenuButtonBoundingClientRect()
			console.log('menuButtonInfo',menuButtonInfo);
			// that.menuButtonInfo = menuButtonInfo
			let sys = that.$u.sys()
			console.log('that.sys',that.sys);
			let arrowRight = sys.screenWidth - menuButtonInfo.left - menuButtonInfo.width/4
			console.log(arrowRight);
			that.arrowRight = arrowRight
		// #endif
		if(!that.latitude || !that.longitude){
			that.getLocations()
		}
		if(!that.userInfo || that.userInfo.username == ''){
			that.modalShow = true
			return
		}
		
	},
	computed: {
		worktime: function(){
			if(!this.model.start_time || !this.model.end_time){
				return 
			}
			return this.model.start_time + '-' + this.model.end_time
		}
	},
	watch: {
	    openid(val) {
			console.log('val', val);
			if(!val){
				return
			}
			this.$getUserInfo(this,val)
			if(!that.share_openid){
				return
			}
			let bindData = {
				wx_openid: val,
				father_openid: that.share_openid,
				type: 1
			}
			console.log(bindData)
			that.$bindUser(that,bindData)
	    },
		brandname(newVal, oldVal) {
			this.$set(this.model, 'brand_name', newVal)
		},
		brandid(newVal, oldVal) {
			this.$set(this.model, 'brand_id', newVal)
		},
		worktime(newVal, oldVal) {
			this.$set(this.model, 'work_time', newVal)
		},
		// 'model.brandname' (nval, oval) {
		//     that.model.brand_
		// },
		// 'model.brandid' (nval, oval) {
		//     return this.brandid
		// },
	},
	onReady() {
		this.$refs.uForm.setRules(this.rules);
	},
	onShow() {
		that.model.user_id = that.userInfo.user_id
		console.log('that.brandname',that.brandname);
	},
	onShareAppMessage() {
		console.log('onShareAppMessage');
		// that.share()
		return {
			title: '邀请商家入驻',
			path: '/pages/business/business?openid=' + that.openid,
			success(){
				console.log('onShareAppMessage-success');
			}
		}
	},
	methods: {
		submit() {
			// that.$refs.uToast.show({
			// 	title: "发布成功，等待审核",
			// 	type: 'success',
			// 	icon: false,
			// 	url: '/pages/inviteClerk/inviteClerk'
			// })
			// return
			that.$refs.uForm.validate(valid => {
					console.log(that.model);
				if (valid) {
					that.add(that.model)
					console.log('验证通过');
				} else {
					console.log('验证失败');
				}
			});
		},
		add(data){ // 
			console.log(data)
			  // that.$refs.uUpload.upload();
			  // return
			let uploadTask = uni.uploadFile({
				url: "https://jjsp.activitysign.com/api/distributor/add",
				formData: data,
				filePath: data.license,
				name: "license",
				success: res => {
					console.log('uploadTask',res);
					// if (JSON.parse(res.data).code == 201) {}
					if (res.statusCode == 200) {
						let art = JSON.parse(res.data)
						console.log(art)
						if (art.statusCode == 200) {
							// that.showToast("发布成功，等待审核",'success',true) 
							that.$refs.uToast.show({
								title: "发布成功，等待审核",
								type: 'success',
								icon: false,
								url: '/pages/inviteClerk/inviteClerk?id=' + art.data.distributor_id
							})
							// that.progressType = 'success'
						} else if(art.statusCode == 201){
							that.$refs.uToast.show({
								title: art.message,
								type: 'warning',
								icon: false,
								url: '/pages/login/login'
							})
						} else {
							that.showToast(art.message,'warning',true)
							// that.progressType = 'warning'
						}
					} else {
						that.showToast('文件过大','error')
						// that.progressType = 'error'
					}
				}
			  });
			  uploadTask.onProgressUpdate(res => {
				  console.log(res)
				  if(res.progress < 100){
					  uni.showLoading({
						title: '上传中...'
					})
				  } else {
					  uni.hideLoading()
				  }
			  });
		},
		chooseLocations(){
			console.log('chooseLocations');
			console.log('that.latitude',that.latitude);
			console.log('that.longitude',that.longitude);
			uni.chooseLocation({
				latitude: that.latitude,
				longitude: that.longitude,
			    success: function (res) {
					console.log(res);
					that.chooseAdress = res
			        that.model.latitude = res.latitude //纬度
			        that.model.longitude = res.longitude //纬度
			    },
				fail: () => {
					
				}
			});
		},
		getLocations(){
			console.log('getLocations');
			uni.getLocation({
			    success: function (res) {
					console.log(res);
					// that.model.longitude = res.longitude
					// that.model.latitude = res.latitude
					that.$u.vuex('longitude', res.longitude)
					that.$u.vuex('latitude', res.latitude)
			    },
				fail(err){
					console.log(err);
					that.$getSetting(that)
				}
			});
		},
		toBrand(){
			that.$u.route('/pages/business/brand');
		},
		radioGroupChange(e) {
			console.log(e);
			that.model.is_two = e;
		},
		timeConfirm1(e){
			console.log(e);
			// that.startTime = e.hour + ':' + e.minute;
			that.model.start_time = e.hour + ':' + e.minute;
		},
		timeConfirm2(e){
			console.log(e);
			// that.endTime = e.hour + ':' + e.minute;
			that.model.end_time = e.hour + ':' + e.minute;
		},
		licenseTips() {
			that.$u.toast('请上传营业执照')
		},
		
		deleteItem(index) {
			console.log(index);
			that.$refs.uUpload.remove(index);
		},
		onListChange(lists,name) {
			console.log('onListChange', lists);
			console.log('onListChange', lists.length);
			that.lists = lists;
			if(lists.length == 0){
				that.model.license = ''
				console.log(that.model);
				return
			}
			console.log(that.model);
			that.model.license = lists[0].url
		},
		modalConfirm(){
			that.$u.route('/pages/login/login');
		},
		showToast(title,type,back) {
			if(back){
				that.$refs.uToast.show({
					title: title,
					type: type,
					icon: false,
					back: true
				})
			} else {
				that.$refs.uToast.show({
					title: title,
					type: type,
					icon: false
				})
			}
			
		},
	}
};
</script>

<style lang="scss">
page{
	background-color: #fff;
}
.delete{
	top: -10rpx;
	right: -10rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #fff;
	background-color: #fa3534;
	padding: 10rpx;
	border-radius: 50%;
	z-index: 99999;
}
.video-container{
	width: 100%;
	height: 340rpx;
	background-color: #EDEDED;
	border-radius: 8rpx;
}
.video{
	width: 100%;
	border-radius: 8rpx;
}
/deep/ .u-form-item{
	padding: 0 0 20rpx;
	line-height: 1.8;
	.u-input{
		background-color: #F6F6F6;
		padding: 0 30rpx;
		border-radius: 4rpx;
	}
	
}
.u-select-container{
	flex: 1;
	background-color: #F6F6F6;
	padding: 0 20rpx;
	border-radius: 4rpx;
	height: 70rpx;
}
.form-tips-color{
	color: #001C00;
}
.bg-disabled{
	background-color: $u-type-info-disabled;
}

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
			height: 340rpx;
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
	>view{
		width: 100%;
		height: 100%;
		.slot-btn {
			width: 100%;
			height: 340rpx;
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
	}
	
}


/deep/{
	.u-drawer{
		.u-drawer-content{
			background-color: rgba(255,255,255,0)!important;
			.shareContainer{
				position: relative;
				left: 15px;
				margin-top: 30px;
				width: calc(100% - 30px);
				padding: 30rpx;
				background-color: #fff;
				border-radius: 10rpx;
				z-index: 10099;
				.arrow{
					position: absolute;
					top: -14px;
					right: 55px;
					z-index: 10099;
				}
			}
		}
	}
	
} 
</style>
