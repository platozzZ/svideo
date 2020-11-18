<template>
	<view class="login">
		<u-navbar title="获取授权"></u-navbar>
		<view class="getAuthorize" v-if="!userInfo.username">
			<u-button class="btn" shape="square" :custom-style="customStyle" open-type="getUserInfo" @getuserinfo="getUserInfo" hover-class="none">
				<u-icon name="weixin-fill" color="#fff" size="40"></u-icon><text class="u-m-l-10">获取微信授权</text>
			</u-button>
		</view>
		<view class="getAuthorize" v-if="!!userInfo.username && !userInfo.phone">
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
		}
	},
	onLoad() {
		that = this
		console.log(that);
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
				// that.$u.vuex('token', res.token)
				// that.$u.vuex('userInfo', res)
				// that.showToast()
			}).catch(err => {
				console.log('catch', err);
			});
		},
		modalCancel(){
			// that.$u.route({type: 'back'})
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
