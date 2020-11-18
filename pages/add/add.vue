<template>
	<view class="">
		<u-navbar title="发布视频"></u-navbar>
		<view class="padding-tb-sm padding-lr">
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
		</view>
		<view class="u-p-l-30 u-p-r-30 u-p-b-50">
			<u-form :model="model" :rules="rules" ref="uForm" :label-style="labelStyle" :border-bottom="false" :label-position="'right'" :errorType="errorType">
				<u-form-item :border-bottom="false" label-width="120" label="视频封面" prop="cover_image">
					<view class="flex align-center">
						<!-- @on-success="onSuccess"
						@on-list-change="onListChange" -->
						<u-upload name="cover_image" width="160" height="160" max-count="1" :custom-btn="true" upload-text=" " :show-progress="false"
						
							action="https://jjsp.autovlog.com.cn/api/videofill/upload_img"
							@on-remove="onRemove" 
							@on-change="onChange" 
						>
							<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
								<u-icon name="plus" size="60" color="#c0c4cc"></u-icon>
							</view>
						</u-upload>
						<view class="u-p-l-10 u-tips-color u-font-12" style="line-height: 1.5;">上传视频封面，如果不上传，系统将自动截取</view>
					</view>
				</u-form-item>
				<u-form-item :border-bottom="false" label-width="120" label="视频标题" prop="title">
					<u-input :border="border" :border-color="borderColor" placeholder="输入视频的标题，最多30个字" maxlength="30" v-model="model.title" type="text"></u-input>
				</u-form-item>
				<u-form-item :border-bottom="false" label-width="120" label="车辆类型" prop="name">
					<u-input :border="border" :border-color="borderColor" type="select" :select-open="selectShow" v-model="model.goodsType" placeholder="请选择车辆类型" @click="selectShow = true"></u-input>
				</u-form-item>
				<u-form-item :border-bottom="false" label-width="120" label="4S店标题" prop="ftitle">
					<u-input :border="border" :border-color="borderColor" placeholder="输入4S店的标题，最多30个字" maxlength="30" v-model="model.ftitle" type="text"></u-input>
				</u-form-item>
				<u-form-item :border-bottom="false" label-width="150" label="发布时间" prop="nsendtime">
					<u-input :border="border" :border-color="borderColor" type="select" :select-open="pickerShow" v-model="model.nsendtime" placeholder="请选择时间" @click="pickerShow = true"></u-input>
				</u-form-item>
			</u-form>
			<view class="form-tips">
				<view class="u-main-color">
					店铺剩余积分：<text class="form-tips-color">1000</text>
				</view>
				<view class="u-tips-color u-m-t-10">
					发布视频奖励100积分。如店铺当日剩余积分不足或已清零。您可以选择修改发布时间，来保障您的收益。
				</view>
			</view>
			<!-- <u-select mode="single-column" :list="selectList" v-model="selectShow" @confirm="selectConfirm"></u-select> -->
			<u-picker v-model="pickerShow" mode="time" :params="params" @confirm="timeConfirm"></u-picker>
			<u-select :safe-area-inset-bottom="true" value-name="id" label-name="name" child-name="sub_type" v-model="selectShow" mode="mutil-column-auto" :list="selectList" @confirm="selectConfirm"></u-select>
		</view>
		<view class="footer">
			<view class="footer-seat"></view>
			<view class="footer-content flex align-center">
				<view class="footer-btn bg-disabled felx-sub" v-if="!model.video" @click="videoTips">
					发布
				</view>
				<view class="footer-btn bg-pyellow felx-sub" @click="submit" v-else>
					发布
				</view>
			</view>
		</view>
		<u-toast ref="uToast" />
		<u-modal ref="uModal" 
		v-model="modalShow" 
		:show-cancel-button="true"
			:show-title="false" 
			:async-close="true"
			@confirm="modalConfirm" 
			:content="modalContent"
		/>
	</view>
</template>

<script>
var that
export default {
	data() {
		return {
			model: {
				goodsType: '',
				user_id: '',// 用户id
				title: '',// 视频标题
				ftitle: '',// 4S店标题
				video: '',// 视频文件
				cover_image: '',
				distributor_id: '',// 所属4s店id
				longitude: '105.156525',// 经度
				latitude: '38.668237',// 纬度
				nclassify_id: '',// 一级标签id
				nclassify_two_id: '',// 二级标签id
				nclassify_three_id: '',// 三级标签id
				nsendtime: '',// 发布时间
			},
			labelStyle: {
				color: '#4C4C4C'
			},
			selectList: [],
			rules: {
				video: [
					{
						required: true,
						message: '视频不能为空',
						trigger: ['blur', 'change'],
					},
					
				],
				title: [
					{
						required: true,
						message: '请输入视频标题',
						trigger: 'blur' ,
					},
				],
				nclassify_id: [
					{
						required: true,
						message: '请选择车辆类型',
						trigger: 'change',
					}
				],
				nclassify_two_id: [
					{
						required: true,
						message: '请选择车辆类型',
						trigger: 'change',
					}
				],
				nclassify_three_id: [
					{
						required: true,
						message: '请选择车辆类型',
						trigger: 'change',
					}
				],
				ftitle: [
					{
						required: true,
						message: '请输入4S店的标题',
						trigger: 'blur'
					},
				],
				nsendtime: [
					{
						required: true,
						message: '请选择发布时间',
						trigger: 'change',
					}
				],
			},
			border: true,
			borderColor: '#F6F6F6',
			pickerShow: false,
			selectShow: false,
			params: {
				year: true,
				month: true,
				day: true,
				hour: true,
				minute: true,
				second: true
			},
			selectResult: '请选择车辆类型',
			codeTips: '',
			errorType: ['toast'],
			
			modalShow: false,
			modalContent: '确认删除视频吗？',
			// percent: 0,
			// progressType: 'success'
		};
	},
	onLoad() {
		that = this
		that.getType()
		that.getLocations()
		that.model.user_id = that.userInfo.user_id
		that.model.distributor_id = that.userInfo.distributor_id
		console.log(that.model)
	},
	onReady() {
		this.$refs.uForm.setRules(this.rules);
	},
	methods: {
		addVideo(e){
			uni.chooseVideo({
				count: 1,
				sourceType: ['album','camera'],
				maxDuration: 15,
				success: function (res) {
					console.log(res);
					console.log(that.model);
					console.log(that.model.video);
					that.model.video = res.tempFilePath;
					// self.src = res.tempFilePath;
				}
			});
		},
		submit() {
			that.$refs.uForm.validate(valid => {
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
			let uploadTask = uni.uploadFile({
				url: "https://jjsp.autovlog.com.cn/api/videofill/store",
				formData: data,
				filePath: data.video,
				name: "video",
				success: res => {
					console.log('uploadTask',res);
					// if (JSON.parse(res.data).code == 201) {}
					if (res.statusCode == 200) {
						let art = JSON.parse(res.data)
						console.log(art)
						if (art.statusCode == 200) {
							that.showToast("发布成功，等待审核",'success',true) 
							// that.progressType = 'success'
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
		deleteVideo(){
			console.log('deleteVideo')
			that.showModal()
		},
		getLocations(){
			console.log('getLocations');
			uni.getLocation({
			    success: function (res) {
					console.log(res);
					that.model.longitude = res.longitude
					that.model.latitude = res.latitude
			    },
				fail(err){
					console.log(err);
				}
			});
		},
		getType(){ // /api/video/type
			let data = {distributor_id: that.userInfo.distributor_id}
			console.log(data)
			that.$u.post('/api/video/type',data).then(res => {
				console.log('getType',res);
				that.selectList = res
			}).catch(err => {
				console.log('getType-catch', err);
			});
		},
		showSelect() {
			that.selectShow = true;
		},
		timeConfirm(e){
			console.log(e);
			that.model.nsendtime = e.year + '-' + e.month + '-' + e.day + ' ' + e.hour + ':' + e.minute + ':' + e.second;
		},
		showModal(){
			that.modalShow = true;
		},
		modalConfirm(e){
			setTimeout(() => {
				that.modalShow = false;
				that.model.video = ''
			}, 1500)
		},
		// 选择商品类型回调
		selectConfirm(e) {
			that.model.goodsType = ''
			console.log(e)
			console.log(e[0])
			console.log(e[0].value)
			e.map((val, index) => {
				that.model.goodsType += that.model.goodsType == '' ? val.label : '-' + val.label;
				if(index == 0){
					that.model.nclassify_id = val.value;
				} else if(index == 1){
					that.model.nclassify_two_id = val.value
				} else {
					that.model.nclassify_three_id = val.value
				}
			})
			// that.model.nclassify_id = e[0].value;
			// that.model.nclassify_two_id = e[1].value;
			// that.model.nclassify_three_id = e[3].value;
		},
		
		onSuccess(data, index, lists) {
			console.log('onSuccess-data', data);
			console.log('onSuccess-index', index);
			console.log('onSuccess-lists', lists);
		},
		onChange(res, index, lists, name){
			let art = JSON.parse(res.data);
			if(art.statusCode == 200){
				that.model.cover_image = art.data.img_url
			} else {
				that.showToast(res.response.message,'error')
			}
			// console.log('onChange-art', art);
			// console.log('onChange-res', res);
			// console.log('onChange-index', index);
			// console.log('onChange-lists', lists);
			// console.log('onChange-name', name);
		},
		onRemove(index, lists, name){
			that.model.cover_image = ''
			// console.log(lists.length);
			// console.log('onRemove-index', index);
			// console.log('onRemove-lists', lists);
			// console.log('onRemove-name', name);
		},
		onListChange(lists,name) {
			console.log('onListChange', lists);
			console.log('onListChange', lists.length);
			console.log('onListChange-name', name);
			if(lists.length == 0){
				that.model.cover_image = ''
				console.log(that.model);
				return
			}
				console.log(that.model);
			let res = lists[0]
			if(res.response.statusCode == 200){
				that.model.cover_image = res.response.data.img_url
			} else {
				that.showToast(res.response.message,'error')
			}
		},
		btop(base64) {
			console.log(base64);
			// this.base64 = base64;
			return new Promise(function(resolve, reject) {
				var arr = base64.split(','),
					mime = arr[0].match(/:(.*?);/)[1],
					bstr = atob(arr[1]),
					n = bstr.length,
					u8arr = new Uint8Array(n);
				while (n--) {
					u8arr[n] = bstr.charCodeAt(n);
				}
				return resolve((window.URL || window.webkitURL).createObjectURL(new Blob([u8arr], {
					type: mime
				})));
			});
		},
		base64(path){
		    return new Promise((resolve, reject) => {
		        uni.getFileSystemManager().readFile({
					filePath: path, //选择图片返回的相对路径
					encoding: 'base64', //编码格式
					success: res => {
						resolve('data:image/;base64,' + res.data)
					},
					fail: res => reject(res.errMsg)
		        })
		    })
		},
		videoTips(){
			that.$u.toast('请上传视频')
		},
		showToast(title,type,back) {
			if(back){
				that.$refs.uToast.show({
					title: title,
					type: type,
					icon: false,
					// back: true
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
	
	.slot-btn {
		width: 160rpx;
		height: 160rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: rgb(244, 245, 246);
		border-radius: 10rpx;
	}
	
	.slot-btn__hover {
		background-color: rgb(235, 236, 238);
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
</style>
