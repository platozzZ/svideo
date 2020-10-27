<template>
	<view class="">
		<u-navbar title="发布视频"></u-navbar>
		<view class="padding-tb-sm padding-lr">
			<view class="video-container flex align-center justify-center" @click="addVideo" v-if="!model.videosrc">
				<u-icon name="plus" size="120" color="#c0c4cc"></u-icon>
			</view>
			<view class="" v-else>
				<video :src="model.videosrc" class="video"></video>
			</view>
		</view>
		<view class="u-p-l-30 u-p-r-30 u-p-b-50">
			<u-form :model="model" :rules="rules" ref="uForm" :label-style="labelStyle" :border-bottom="false" :label-position="'right'" :errorType="errorType">
				<u-form-item :border-bottom="false"  label-width="120" label="视频标题" prop="name">
					<u-input :border="border" :border-color="borderColor" placeholder="输入视频的标题，最多30个字" maxlength="30" v-model="model.name" type="text"></u-input>
				</u-form-item>
				<u-form-item label-width="120" label="车辆类型" prop="name">
					<view class="u-m-r-10">
						<u-input :border="border" :border-color="borderColor" type="select" :select-open="selectShow" v-model="model.goodsType" placeholder="品牌" @click="selectShow = true"></u-input>
					</view>
					<view class="u-m-r-10">
						<u-input :border="border" :border-color="borderColor" type="select" :select-open="selectShow" v-model="model.goodsType" placeholder="车型" @click="selectShow = true"></u-input>
					</view>
					<view class="u-m-r-10">
						<u-input :border="border" :border-color="borderColor" type="select" :select-open="selectShow" v-model="model.goodsType" placeholder="车系" @click="selectShow = true"></u-input>
					</view>
				</u-form-item>
				<u-form-item :border-bottom="false"  label-width="120" label="4S店标题" prop="name">
					<u-input :border="border" :border-color="borderColor" placeholder="输入4S店的标题，最多30个字" maxlength="30" v-model="model.name" type="text"></u-input>
				</u-form-item>
				<u-form-item :border-bottom="false" label="发布时间" prop="time" label-width="150">
					<u-input :border="border" :border-color="borderColor" type="select" :select-open="pickerShow" v-model="model.time" placeholder="请选择时间" @click="pickerShow = true"></u-input>
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
			<u-select mode="single-column" :list="selectList" v-model="selectShow" @confirm="selectConfirm"></u-select>
			<u-picker v-model="pickerShow" mode="time" @confirm="timeConfirm"></u-picker>
		</view>
		<view class="footer">
			<view class="footer-seat"></view>
			<view class="footer-content flex align-center">
				<view class="footer-btn bg-pyellow felx-sub">
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
				videosrc: '',
				name: '',
				sex: '',
				likeFruit: '',
				time: '',
				intro: '',
				payType: '支付宝',
				agreement: false,
				region: '',
				goodsType: '',
				phone: '',
				code: '',
				password: '',
				rePassword: '',
				remember: false,
				photo: ''
			},
			labelStyle: {
				color: '#4C4C4C'
			},
			selectList: [
				{
					value: '电子产品',
					label: '电子产品'
				},
				{
					value: '服装',
					label: '服装'
				},
				{
					value: '工艺品',
					label: '工艺品'
				}
			],
			rules: {
				name: [
					{
						required: true,
						message: '请输入姓名',
						trigger: 'blur' ,
					},
					{
						min: 3,
						max: 5,
						message: '姓名长度在3到5个字符',
						trigger: ['change','blur'],
					},
					{
						// 此为同步验证，可以直接返回true或者false，如果是异步验证，稍微不同，见下方说明
						validator: (rule, value, callback) => {
							// 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
							return this.$u.test.chinese(value);
						},
						message: '姓名必须为中文',
						// 触发器可以同时用blur和change，二者之间用英文逗号隔开
						trigger: ['change','blur'],
					},
					// 异步验证，用途：比如用户注册时输入完账号，后端检查账号是否已存在
					// {
					// 	trigger: ['blur'],
					// 	// 异步验证需要通过调用callback()，并且在里面抛出new Error()
					// 	// 抛出的内容为需要提示的信息，和其他方式的message属性的提示一样
					// 	asyncValidator: (rule, value, callback) => {
					// 		this.$u.post('/ebapi/public_api/index').then(res => {
					// 			// 如果验证出错，需要在callback()抛出new Error('错误提示信息')
					// 			if(res.error) {
					// 				callback(new Error('姓名重复'));
					// 			} else {
					// 				// 如果没有错误，也要执行callback()回调
					// 				callback();
					// 			}
					// 		})
					// 	},
					// }
				],
				sex: [
					{
						required: true,
						message: '请选择性别',
						trigger: 'change'
					},
				],
				intro: [
					{
						required: true,
						message: '请填写简介'
					},
					{
						min: 5,
						message: '简介不能少于5个字',
						trigger: 'change' ,
					},
					// 正则校验示例，此处用正则校验是否中文，此处仅为示例，因为uView有this.$u.test.chinese可以判断是否中文
					{
						pattern: /^[\u4e00-\u9fa5]+$/gi,
						message: '简介只能为中文',
						trigger: 'change',
					},
				],
				likeFruit: [
					{
						required: true,
						message: '请选择您喜欢的水果',
						trigger: 'change',
						type: 'array',
					}
				],
				payType: [
					{
						required: true,
						message: '请选择任意一种支付方式',
						trigger: 'change',
					}
				],
				region: [
					{
						required: true,
						message: '请选择地区',
						trigger: 'change',
					}
				],
				goodsType: [
					{
						required: true,
						message: '请选择商品类型',
						trigger: 'change',
					}
				],
				phone: [
					{
						required: true,
						message: '请输入手机号',
						trigger: ['change','blur'],
					},
					{
						validator: (rule, value, callback) => {
							// 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
							return this.$u.test.mobile(value);
						},
						message: '手机号码不正确',
						// 触发器可以同时用blur和change，二者之间用英文逗号隔开
						trigger: ['change','blur'],
					}
				],
				code: [
					{
						required: true,
						message: '请输入验证码',
						trigger: ['change','blur'],
					},
					{
						type: 'number',
						message: '验证码只能为数字',
						trigger: ['change','blur'],
					}
				],
				password: [
					{
						required: true,
						message: '请输入密码',
						trigger: ['change','blur'],
					},
					{
						// 正则不能含有两边的引号
						pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]+\S{5,12}$/,
						message: '需同时含有字母和数字，长度在6-12之间',
						trigger: ['change','blur'],
					}
				],
				rePassword: [
					{
						required: true,
						message: '请重新输入密码',
						trigger: ['change','blur'],
					},
					{
						validator: (rule, value, callback) => {
							return value === this.model.password;
						},
						message: '两次输入的密码不相等',
						trigger: ['change','blur'],
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
			radioCheckWidth: 'auto',
			radioCheckWrap: false,
			codeTips: '',
			errorType: ['message'],
		};
	},
	onLoad() {
		that = this
	},
	computed: {
		borderCurrent() {
			return this.border ? 0 : 1;
		}
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
					console.log(that.model.videosrc);
					that.model.videosrc = res.tempFilePath;
					// self.src = res.tempFilePath;
				}
			});
		},
		submit() {
			this.$refs.uForm.validate(valid => {
				if (valid) {
					if(!this.model.agreement) return this.$u.toast('请勾选协议');
					console.log('验证通过');
				} else {
					console.log('验证失败');
				}
			});
		},
		// 点击actionSheet回调
		actionSheetCallback(index) {
			uni.hideKeyboard();
			this.model.sex = this.actionSheetList[index].text;
		},
		// checkbox选择发生变化
		checkboxGroupChange(e) {
			this.model.likeFruit = e;
		},
		// radio选择发生变化
		radioGroupChange(e) {
			this.model.payType = e;
		},
		// 勾选版权协议
		checkboxChange(e) {
			this.model.agreement = e.value;
		},
		// 选择地区回调
		regionConfirm(e) {
			this.model.region = e.province.label + '-' + e.city.label + '-' + e.area.label;
		},
		timeConfirm(e){
			console.log(e);
			this.model.time = e.year + '-' + e.month + '-' + e.day;
		},
		// 选择商品类型回调
		selectConfirm(e) {
			this.model.goodsType = '';
			e.map((val, index) => {
				this.model.goodsType += this.model.goodsType == '' ? val.label : '-' + val.label;
			})
		},
		borderChange(index) {
			this.border = !index;
		},
		radioCheckboxChange(index) {
			if(index == 0) {
				this.radioCheckWrap = false;
				this.radioCheckWidth = 'auto';
			} else if(index == 1) {
				this.radioCheckWrap = true;
				this.radioCheckWidth = 'auto';
			} else if(index == 2) {
				this.radioCheckWrap = false;
				this.radioCheckWidth = '50%';
			}
		},
		labelPositionChange(index) {
			this.labelPosition = index == 0 ? 'left' : 'right';
		},
		codeChange(text) {
			this.codeTips = text;
		},
		// 获取验证码
		getCode() {
			if(this.$refs.uCode.canGetCode) {
				// 模拟向后端请求验证码
				uni.showLoading({
					title: '正在获取验证码',
					mask: true
				})
				setTimeout(() => {
					uni.hideLoading();
					// 这里此提示会被this.start()方法中的提示覆盖
					this.$u.toast('验证码已发送');
					// 通知验证码组件内部开始倒计时
					this.$refs.uCode.start();
				}, 2000);
			} else {
				this.$u.toast('倒计时结束后再发送');
			}
		},
		errorChange(index) {
			if(index == 0) this.errorType = ['message'];
			if(index == 1) this.errorType = ['toast'];
			if(index == 2) this.errorType = ['border-bottom'];
			if(index == 3) this.errorType = ['border'];
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
.form-tips-color{
	color: #001C00;
}
</style>
