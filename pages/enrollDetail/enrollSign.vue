<template>
	<view class="">
		<!-- <u-navbar title="活动报名"></u-navbar> -->
		
		<view class="u-p-l-30 u-p-r-30 u-p-t-50 u-p-b-50">
			
			<u-form :model="model" :rules="rules" ref="uForm" :label-style="labelStyle" :border-bottom="false" label-position="right" :errorType="errorType">
				<u-form-item :border-bottom="false" label-width="120" label="姓名" prop="name">
					<u-input :border="border" :border-color="borderColor" placeholder="输入您的名字" maxlength="30" v-model="model.name" type="text"></u-input>
				</u-form-item>
				<u-form-item :border-bottom="false" label-width="120" label="电话" prop="phone">
					<u-input :border="border" :border-color="borderColor" placeholder="请输入您的手机号码" v-model="model.phone" maxlength="11" type="number"></u-input>
				</u-form-item>
				<u-form-item :border-bottom="false" label-width="120" label="身份证" prop="real_nam">
					<u-input :border="border" :border-color="borderColor" placeholder="输入您的身份证号" @click="showKeyBoard" maxlength="30" :disabled="true" v-model="model.real_nam" type="text">
					
					</u-input>
				</u-form-item>
				
			</u-form>
		</view>
		
		<view class="footer">
			<view class="footer-seat"></view>
			<view class="footer-content flex align-center">
				<view class="footer-btn bg-pyellow felx-sub" @click="submit">
					提交
				</view>
			</view>
		</view>
		<u-toast ref="uToast" />
		<u-keyboard ref="uKeyboard" :mode="keyBoardMode" v-model="keyBoardShow" :safe-area-inset-bottom="true"></u-keyboard>
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
				idcard: '', //联系人名称
				phone: '', //电话号码
				
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
				idcard: [
					{
						required: true,
						message: '请输入身份证号',
					},
					{
						validator: (rule, value, callback) => {
							// 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
							return this.$u.test.idCard(value);
						},
						message: '身份证号不正确',
					}
				],
				
			},
			errorType: ['toast'],
			keyBoardShow: false,
			keyBoardMode: 'card',
			labelStyle: {
				color: '#4C4C4C'
			},
			border: true,
			borderColor: '#F6F6F6',
			
		};
	},
	onLoad(options) {
		console.log(options);
		that = this
		console.log(that);
		if(!that.latitude || !that.longitude){
			that.getLocations()
		}
		that.model.user_id = that.userInfo.user_id
		console.log(that.model)
	},
	onReady() {
		this.$refs.uForm.setRules(this.rules);
	},
	methods: {
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
		sendMsg(data){ // /activity/order/save
			that.$u.post('/activity/order/save', data).then(res => {
				console.log('sendMsg',res);
				// that.isEdit = false
				// that.$u.toast('修改成功')
			}).catch(err => {
				console.log('sendMsg-catch', err);
			});
		},
		showKeyBoard(){
			that.keyBoardShow = true
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
/deep/ .u-form-item{
	padding: 0 0 20rpx;
	line-height: 1.8;
	.u-input{
		background-color: #F6F6F6;
		padding: 0 30rpx;
		border-radius: 4rpx;
	}
	.u-field{
		background-color: #F6F6F6;
		padding: 0 30rpx;
		border-radius: 4rpx;
		flex: 1;
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
