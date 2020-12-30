<template>
	<view class="">
		<!-- <u-navbar title="新建地址"></u-navbar> -->
		<u-form :model="model" :rules="rules" ref="uForm" label-width="150" :errorType="errorType">
		<view class="container">
			<u-form-item label="收货人" prop="name">
				<u-input placeholder="请输入姓名" v-model="model.name"></u-input>
			</u-form-item>
			<u-form-item label="手机号码" prop="tel">
				<u-input placeholder="请输入手机号码" v-model="model.tel" maxlength="11" type="number" />
			</u-form-item>
			<u-form-item label="所在地区" prop="adall">
				<u-input type="select" v-model="model.adall" placeholder="请选择地址" @click="show = true"></u-input>
			</u-form-item>
			<u-form-item label="详细地址" prop="address">
				<u-input type="textarea" placeholder="请输入详细地址" v-model="model.address" />
			</u-form-item>
		</view>
		<view class="container u-m-t-40">
			<u-form-item label="设置默认地址" label-width="220" prop="switchs">
				<u-switch v-model="model.switchs" active-value="1" inactive-value="0" slot="right" @change="switchChange"></u-switch>
			</u-form-item>
		</view>
		</u-form>
		<view class="delete" v-if="!!model.addr_id">
			删除收货地址
		</view>
		<view class="footer">
			<view class="footer-seat"></view>
			<view class="footer-content flex align-center">
				<view class="footer-btn bg-pyellow felx-sub" @click="$u.throttle(submit, 1000)">保存</view>
			</view>
		</view>
		<u-picker mode="region" v-model="show" @confirm="pickConfirm"></u-picker>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
var that
export default {
	data() {
		return {
			model: {
				addr_id: '',
				user_id: '', //用户id
				name: '', //联系人姓名
				tel: '', //联系人电话
				address: '', //详细地址
				is_default: 0, //是否默认地址
				province: '', //省
				city: '', //市
				county: '', //县
				adall: '',
				switchs: false
			},
			rules: {
				name: [
					{
						required: true,
						message: '请输入收货人姓名',
						trigger: 'blur',
					}
				],
				tel: [
					{
						required: true,
						message: '请输入手机号',
						trigger: 'blur',
					},
					{
						validator: (rule, value, callback) => {
							// 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
							return this.$u.test.mobile(value);
						},
						message: '手机号码不正确',
						// 触发器可以同时用blur和change，二者之间用英文逗号隔开
						trigger:'blur',
					}
				],
				adall: [
					{
						required: true,
						message: '请选择地址',
						trigger: ['change','blur']
					},
				],
				province: [
					{
						required: true,
						message: '请选择地址',
						trigger: ['change','blur']
					},
				],
				city: [
					{
						required: true,
						message: '请选择地址',
						trigger: ['change','blur']
					},
				],
				county: [
					{
						required: true,
						message: '请选择地址',
						trigger: ['change','blur']
					},
				],
				address: [
					{
						required: true,
						message: '请输入详细地址',
						trigger: 'blur',
					},
				],
			},
			show: false,
			errorType: ['message'],
			from: ''
		}
	},
	created () {
		this.model.user_id = this.userInfo.user_id
	},
	onLoad(options) {
		that = this
		console.log(options)
		that.from = options.from
		if(!options.id){
			return
		}
		that.model.addr_id = options.id
		that.model.name = options.name
		that.model.tel = options.tel
		that.model.is_default = options.is_default
		that.model.switchs = options.is_default == '1'?true:false
		that.model.address = options.address
		that.model.province = options.sheng
		that.model.city = options.city
		that.model.county = options.quyu
		that.model.adall = options.sheng + '-' + options.city + '-' + options.quyu;
	},
	onReady() {
		this.$refs.uForm.setRules(this.rules);
	},
	methods: {
		save(data){
			that.$u.post('/api/integral/up_adds', data).then(res => {
				console.log('save',res);
				if(that.from == 'ex'){
					// let pages = getCurrentPages();
					// let prevPage = pages[pages.length - 2]; //上一个页面
					// console.log(prevPage);
					// prevPage.address_id = res.id
					// prevPage.art.addemt = res
					
					that.$u.vuex('address', res)
					that.$u.vuex('addressid', res.id)
				}
				that.showToast(!that.model.addr_id?'添加成功':'修改成功','success',true)
				
			}).catch(err => {
				console.log('catch', err);
			});
		},
		submit() {
			this.$refs.uForm.validate(valid => {
				console.log(valid);
				if (valid) {
					that.save(that.model)
					console.log(that.model)
					console.log('验证通过');
				} else {
					console.log('验证失败');
				}
			});
		},
		switchChange(e){
			console.log(e);
			that.model.is_default = e
		},
		pickConfirm(e){
			console.log(e);
			that.model.province = e.province.label
			that.model.city = e.city.label
			that.model.county = e.area.label
			that.model.adall = e.province.label + '-' + e.city.label + '-' + e.area.label;
		},
		showToast(title,type,back) {
			that.$refs.uToast.show({
				title: title,
				type: type,
				icon: false,
				back: back
			})
		},
	},
}
</script>

<style lang="scss">
.container{
	background-color: #fff;
	padding: 0 30rpx;
}
.delete{
	padding: 40rpx 30rpx;
	color: #fa3534;
}
.footer{
	background-color: #f1f1f1;
}
</style>
