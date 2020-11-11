<template>
	<view class="">
		<u-navbar title="发布视频"></u-navbar>
		<view class="padding-tb-sm padding-lr">
			<view class="video-container flex align-center justify-center" @click="addVideo" v-if="!model.video">
				<u-icon name="plus" size="120" color="#c0c4cc"></u-icon>
			</view>
			<view class="" v-else>
				<video :src="model.video" class="video"></video>
			</view>
		</view>
		<view class="u-p-l-30 u-p-r-30 u-p-b-50">
			<u-form :model="model" :rules="rules" ref="uForm" :label-style="labelStyle" :border-bottom="false" :label-position="'right'" :errorType="errorType">
				<u-form-item :border-bottom="false" label-width="120" label="视频标题" prop="title">
					<u-input :border="border" :border-color="borderColor" placeholder="输入视频的标题，最多30个字" maxlength="30" v-model="model.title" type="text"></u-input>
				</u-form-item>
				<u-form-item :border-bottom="false" label-width="120" label="车辆类型" prop="name">
					<!-- <view class="u-select-container" @click="showSelect"> {{selectResult}}</view> -->
					<u-input :border="border" :border-color="borderColor" type="select" :select-open="selectShow" v-model="model.goodsType" placeholder="请选择车辆类型" @click="selectShow = true"></u-input>
					<!-- <view class="u-m-r-10">
						<u-input :border="border" :border-color="borderColor" type="select" :select-open="selectShow" v-model="model.goodsType" placeholder="品牌" @click="selectShow = true"></u-input>
					</view>
					<view class="u-m-r-10">
						<u-input :border="border" :border-color="borderColor" type="select" :select-open="selectShow" v-model="model.goodsType" placeholder="车型" @click="selectShow = true"></u-input>
					</view>
					<view class="u-m-r-10">
						<u-input :border="border" :border-color="borderColor" type="select" :select-open="selectShow" v-model="model.goodsType" placeholder="车系" @click="selectShow = true"></u-input>
					</view> -->
				</u-form-item>
				<u-form-item :border-bottom="false" label-width="120" label="4S店标题" prop="ftitle">
					<u-input :border="border" :border-color="borderColor" placeholder="输入4S店的标题，最多30个字" maxlength="30" v-model="model.ftitle" type="text"></u-input>
				</u-form-item>
				<u-form-item :border-bottom="false"label="发布时间" prop="nsendtime" label-width="150">
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
			<u-select :safe-area-inset-bottom="true" value-name="name" label-name="name" child-name="sub_type" v-model="selectShow" mode="mutil-column-auto" :list="selectList" @confirm="selectConfirm"></u-select>
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
				distributor_id: '',// 所属4s店id
				longitude: '',// 经度
				latitude: '',// 纬度
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
			check: false,
			selectStatus: 'close',
			checkboxList: [
				{
					name: '荔枝',
					checked: false,
					disabled: false
				},
				{
					name: '香蕉',
					checked: false,
					disabled: false
				},
				{
					name: '橙子',
					checked: false,
					disabled: false
				},
				{
					name: '草莓',
					checked: false,
					disabled: false
				}
			],
			radioList: [
				{
					name: '支付宝',
					checked: true,
					disabled: false
				},
				{
					name: '微信',
					checked: false,
					disabled: false
				},
				{
					name: '银联',
					checked: false,
					disabled: false
				},
				{
					name: '现金',
					checked: false,
					disabled: false
				}
			],
			radio: '支付宝',
			actionSheetList: [
				{
					text: '男'
				},
				{
					text: '女'
				},
				{
					text: '保密'
				}
			],
			actionSheetShow: false,
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
			radioCheckWidth: 'auto',
			radioCheckWrap: false,
			codeTips: '',
			errorType: ['toast'],
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
			that.$u.post('/api/videofill/store',data).then(res => {
				console.log('add',res);
				
			}).catch(err => {
				console.log('add-catch', err);
			});
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
		// 选择地区回调
		regionConfirm(e) {
			this.model.region = e.province.label + '-' + e.city.label + '-' + e.area.label;
		},
		timeConfirm(e){
			console.log(e);
			that.model.nsendtime = e.year + '-' + e.month + '-' + e.day + ' ' + e.hour + ':' + e.minute + ':' + e.second;
		},
		// 选择商品类型回调
		selectConfirm(e) {
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
		videoTips(){
			that.$u.toast('请上传视频')
		}
	}
};
</script>

<style lang="scss">
page{
	background-color: #fff;
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
</style>
