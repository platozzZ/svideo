<template>
	<view class="login">
		<!-- <u-navbar title="获取授权"></u-navbar> -->
		<view class="getAuthorize" v-if="!userInfo || userInfo.username == ''">
			<u-button class="btn" shape="square" :custom-style="customStyle" open-type="getUserInfo" @getuserinfo="getUserInfo" hover-class="none">
				<u-icon name="weixin-fill" color="#fff" size="40"></u-icon><text class="u-m-l-10">获取微信授权</text>
			</u-button>
		</view>
		<view class="getAuthorize" v-else>
			<u-button class="btn" shape="square" :custom-style="customStyle" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" hover-class="none">
				<u-icon name="weixin-fill" color="#fff" size="40"></u-icon><text class="u-m-l-10">获取手机号</text>
			</u-button>
		</view>
		<u-modal v-model="modalShow" ref="uModal" @cancel="modalCancel" :show-cancel-button="true" :show-title="false" content="部分功能需要获取您的手机号,请确认">
			<view class="confirm-button u-rela flex align-center justify-center" slot="confirm-button">
				确认
				<u-button :custom-style="modalCustomStyle" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber"></u-button>
			</view>
		</u-modal>
		<u-toast ref="uToast" />
		
		<u-popup v-model="showBind" mode="center" width="80%" border-radius="8" @close="bindClose">
			<view class="model-bind bg-pwhite padding-lg">
				<view class="text-center">
					请手动绑定手机号
				</view>
				<view class="margin-tb">
					<!-- <u-form-item> -->
						<u-input placeholder="请输入手机号" v-model="modelPhone" maxlength="11" border type="number" custom-style="customBindStyle"></u-input>
					<!-- </u-form-item> -->
				</view>
				<view>
					<u-button type="primary" @click="bindPhone">绑定</u-button>
				</view>
				
			</view>
		</u-popup>
	</view>
</template>

<script>
var that
export default {
	data() {
		return {
			customStyle: {
				backgroundColor: '#04BE02',
				color: '#fff'
			},
			modalShow: false,
			modalCustomStyle: {
				width: '100%',
				height: '100%',
				position: 'absolute',
				top: '0',
				left: '0',
				opacity: 0
			},
			modelPhone: '',
			customBindStyle: {
				background: '#f1f1f1'
			}
		}
	},
	onLoad() {
		that = this
		console.log('that.userInfo',that.userInfo);
		console.log('that.userInfo.username',that.userInfo.username);
		console.log("that.userInfo.username == ''",that.userInfo.username == '');
		console.log("!that.userInfo || that.userInfo.username == ''",!that.userInfo || that.userInfo.username == '');
		console.log("!!userInfo && that.userInfo.username != '' && !that.userInfo.phone",!!that.userInfo && that.userInfo.username != '' && !that.userInfo.phone);
	},
	methods: {
		getUserInfo(e){
			console.log(e);
			if(!e.detail.userInfo){
				return
			}
			let data = {
				type: 3,
				wx_openid: that.openid,
				userInfo: JSON.stringify(e.detail.userInfo)
			}
			that.login(data)
		},
		
		bindPhone(){
			if(!that.$u.test.mobile(that.modelPhone)){
				that.$u.toast('请输入正确的手机号')
				return
			}
			let data = {
				wx_openid: that.openid,
				phone: that.modelPhone
			}
			that.$u.post('api/user/bdphone', data).then(res => {
				console.log('bindPhone',res);
				that.$u.vuex('userInfo.phone', that.modelPhone)
			}).catch(err => {
				console.log('catch', err);
			});
		},
		login(data){
			that.$u.post('/api/user/login', data).then(res => {
				console.log('login',res);
				that.$u.vuex('token', res.token)
				that.$u.vuex('userInfo', res)
				if(!res.phone){
					that.modalShow = true
				}
			}).catch(err => {
				console.log('catch', err);
			});
		},
		getPhoneNumber(e){
			console.log('getPhoneNumber',e);
			that.modalShow = false
			let data = {
				type: 3,
				wx_openid: that.openid,
				encryptedData:e.detail.encryptedData,
				iv: e.detail.iv
			}
			that.getphone(data)
		},
		getphone(data){
			console.log('getphone',data);
			that.$u.post('/api/user/getphone', data).then(res => {
				console.log('getphone',res);
				that.$u.vuex('userInfo.phone', res.phone)
				// that.$u.vuex('token', res.token)
				// that.$u.vuex('userInfo', res)
				that.showToast()
			}).catch(err => {
				console.log('catch', err);
			});
		},
		bindClose(){
			console.log('bindClose');
		},
		showToast() {
			that.$refs.uToast.show({
				title: '授权成功',
				type: 'success',
				back: true
			})
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
	.getAuthorize{
		position: fixed;
		top: 40%;
		left: 0;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 40rpx;
		.btn{
			width: 100%;
		}
		
	}

}
</style>
