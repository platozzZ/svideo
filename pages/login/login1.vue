<template>
	<view class="login">
		<u-navbar title="登录"></u-navbar>
		<view class="container flex flex-direction">
			<view class="header flex align-center justify-center">
				<view class="avatar flex align-center flex-direction">
					<u-avatar src="./../../static/image/loginlogo.png" size="176"></u-avatar>
				</view>
			</view>
			<view class="form" v-show="toogleLogin">
				<u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType">
					<u-form-item :rightIconStyle="{color: '#888', fontSize: '32rpx'}" label="+86" prop="phone">
						<u-input placeholder="请输入手机号" v-model="model.phone" maxlength="11" type="number"></u-input>
					</u-form-item>
					<u-form-item prop="vcode">
						<u-input placeholder="请输入验证码" v-model="model.vcode" type="number"></u-input>
						<view slot="right" class="codeBtn u-border-left" :class="!showVeriFication?'checked':''" @click="getCode">{{codeTips}}</view>
						<!-- <u-button slot="right" type="success" size="mini" @click="getCode">{{codeTips}}</u-button> -->
					</u-form-item>
					<view class="flex align-center u-tips-color text-sm u-m-t-20" v-if="!showVeriFication">
						<u-icon name="checkmark-circle" size="26" color="#18b566" class="u-m-r-5"></u-icon>
						短信验证码已发送至手机<text class="u-type-warning">{{model.phone}}</text>，请查收
					</view>
				</u-form>
				<u-verification-code seconds="60" @end="end" @start="start" ref="uCode" @change="codeChange"></u-verification-code>
			</view>
			<view class="form" v-show="!toogleLogin">
				<u-form :model="modelPwd" :rules="rulesPwd" ref="uFormPwd" :errorType="errorType">
					<u-form-item :rightIconStyle="{color: '#888', fontSize: '32rpx'}" label="+86" prop="phone">
						<u-input placeholder="请输入手机号" v-model="modelPwd.phone" maxlength="11" type="number"></u-input>
					</u-form-item>
					<u-form-item prop="password">
						<u-input :password-icon="true" placeholder="请输入密码" v-model="modelPwd.password"></u-input>
					</u-form-item>
					<!-- <input type="text" value="" hidden /> -->
				</u-form>
			</view>
			<view class="">
				<u-button class="btn" type="warning" shape="circle" @click="submit" >提交</u-button>
				<view class="u-m-t-20 u-type-warning text-sm text-right" @click="toogle">
					{{toogleLogin?'账号密码登录':'验证码登录'}}
				</view>
			</view>
			<view class="footer">
				<view class="text">
					<u-loadmore status="nomore" color="#909399" font-size="24" :load-text="loadText"/>
				</view>
				<view class="other flex align-center justify-center u-m-t-20">
					<view class="other-item" >
						<u-icon name="weixin-circle-fill" label="微信" label-pos="bottom" size="90" color="#18b566" label-color="#909399" label-size="28"></u-icon>
						<!-- <button type="" open-type="getPhoneNumber"></button> -->
						<view class="getPhoneNumber">
							<u-button :custom-style="customStyle" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber"></u-button>
						</view>
					</view>
				</view>
			</view>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
var that
export default {
	data() {
		return {
			errorType: ['toast'],
			codeTips: '',
			model: {
				type: 2,
				phone: '',
				vcode: '',
			},
			modelPwd: {
				type: 1,
				phone: '',
				password: '',
				wx_openid: '',
				
			},
			rules: {
				phone: [
					{
						required: true,
						message: '请输入手机号',
						trigger: ['blur'],
					},
					{
						validator: (rule, value, callback) => {
							// 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
							return this.$u.test.mobile(value);
						},
						message: '手机号码不正确',
						// 触发器可以同时用blur和change，二者之间用英文逗号隔开
						trigger: ['blur'],
					}
				],
				vcode: [
					{
						required: true,
						message: '请输入验证码',
						trigger: ['blur'],
					},
					{
						type: 'number',
						message: '验证码只能为数字',
						trigger: ['blur'],
					}
				],
			},
			rulesPwd: {
				phone: [
					{
						required: true,
						message: '请输入手机号',
						trigger: ['blur'],
					},
					{
						validator: (rule, value, callback) => {
							// 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
							return this.$u.test.mobile(value);
						},
						message: '手机号码不正确',
						// 触发器可以同时用blur和change，二者之间用英文逗号隔开
						trigger: ['blur'],
					}
				],
				password: [
					{
						required: true,
						message: '请输入密码',
						trigger: ['blur'],
					},
					// {
					// 	type: 'number',
					// 	message: '验证码只能为数字',
					// 	trigger: ['blur'],
					// }
				],
			},
			loadText: {
				nomore: '其他登录方式'
			},
			customStyle: {
				backgroundColor: 'rgba(0,0,0,0)'
			},
			showVeriFication: true,
			toogleLogin: true
		}
	},
	onLoad() {
		that = this
		that.modelPwd.wx_openid = that.openid
		console.log(that);
	},
	// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
	onReady() {
		this.$refs.uForm.setRules(this.rules);
		this.$refs.uFormPwd.setRules(this.rulesPwd);
	},
	methods: {
		submit() {
			// that.$u.route('/pages/login/success');
			if(that.toogleLogin){
				
				that.$refs.uForm.validate(valid => {
					console.log(valid);
					if (valid) {
						that.login(that.model)
						console.log('验证通过');
					} else {
						console.log('验证失败');
					}
				});
			} else {
				that.$refs.uFormPwd.validate(valid => {
					console.log(valid);
					if (valid) {
						that.login(that.modelPwd)
						console.log('验证通过');
					} else {
						console.log('验证失败');
					}
				});
				
			}
		},
		login(data){
			that.$u.post('/api/user/login', data).then(res => {
				console.log('login',res);
				that.$u.vuex('token', res.token)
				that.$u.vuex('userInfo', res)
				that.showToast()
				// that.$u.route({
				// 	type: 'back'
				// })
				// resolve(res)
			}).catch(err => {
				console.log('catch', err);
			});
		},
		showToast() {
			that.$refs.uToast.show({
				title: '登录成功',
				type: 'success',
				back: true
			})
		},
		getPhoneNumber(e){
			console.log(e);
		},
		toIntegral(){
			that.$u.route('/pages/integral/integral');
		},
		toLogin(){
			that.$u.route('/pages/login/login');
		},
		toogle(){
			that.toogleLogin = !that.toogleLogin
		},
		end() {
			that.showVeriFication = true
			// that.$u.toast('倒计时结束');
		},
		start() {
			that.showVeriFication = false
			that.$u.toast('验证码已发送');
		},
		codeChange(text) {
			that.codeTips = text;
		},// 获取验证码
		getCode() { // /api/user/captcha
			console.log(that.model.phone.length);
			if(!that.$u.test.mobile(that.model.phone)){
				that.$u.toast('请输入正确手机号');
				return
			}
			// that.$refs.uCode.start();
			if(that.$refs.uCode.canGetCode) {
				let data = {
					phone: that.model.phone
				}
				console.log(data);
				that.$u.post('/api/user/captcha', data).then(res => {
					console.log('getCode',res);
					// 这里此提示会被this.start()方法中的提示覆盖
					// that.$u.toast('验证码已发送');
					// 通知验证码组件内部开始倒计时
					that.$refs.uCode.start();
				}).catch(err => {
					console.log('catch', err);
				});
				
			} else {
				that.$u.toast('倒计时结束后再发送');
			}
		},
	}
}
</script>

<style lang="scss">
page,.login{
	background-color: #fff;
	height: 100%;
}
.login{
	height: 100%;
	display: flex;
	flex-direction: column;
	.container{
		padding: 40rpx 70rpx;
		flex: 1;
		.header{
			.avatar{
				margin-top: 50rpx;
				// width: 200rpx;
				// height: 200rpx;
				// border: 1rpx solid #e4e7ed;
				// border-radius: 50%;
				overflow: hidden;
				// image{
				// 	width: 100%;
				// 	height: 100%;
				// }
			}
		}
		.form{
			margin-top: 80rpx;
			margin-bottom: 80rpx;
			.codeBtn{
				color: #EC463B;
				padding-left: 20rpx;
				&.checked{
					color: #F3B5BB;
				}
				&::after{
					top: calc(35rpx / 2);
					height: 70rpx;
				}
			}
			.btn{
				color: $u-main-color;
			}
		}
		.footer{
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: flex-end;
			padding-bottom: 40rpx;
			.other{
				.other-item{
					position: relative;
					.getPhoneNumber{
						position: absolute;
						top: 0;
						left: 0;
						width: 100%;
						height: 100%;
						/deep/ .u-btn{
							width: 100%;
							height: 100%;
							opacity: 0;
						}
					}
				}
			}
		}
	}

}
</style>
