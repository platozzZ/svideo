<template>
	<view class="">
		<!-- <u-navbar title="邀请店员二维码"></u-navbar> -->
		<view class="container u-p-t-60" v-if="!!art">
			<view class="flex align-center justify-center"> 
				<u-image width="154" height="154" src="https://jjsp.activitysign.com/image/inviteSuccess.png" v-if="art.state == 1"></u-image>
				<u-image width="154" height="154" src="https://jjsp.activitysign.com/image/inviteTips.png" v-else-if="art.state == 0"></u-image>
				<u-image width="154" height="154" src="https://jjsp.activitysign.com/image/inviteFail.png" v-else></u-image>
			</view>
			<view class="u-font-40 u-m-t-30 flex align-center justify-center">
				<text v-if="art.state == 1">{{'恭喜您“' + art.name + '”入驻成功。'}}</text> 
				<text v-else-if="art.state == 0">您已提交，请等待审核结果。</text> 
				<text v-else>{{'您因为' + art.reason + '原因，入驻失败，请及时更改，重新提交。'}}</text> 
			</view>
			<view class="u-font-22 padding-tb-sm padding-lr-sm u-type-info-light-bg u-m-t-40 flex align-center justify-center" v-if="art.state == 1">
				{{'账号：' + art.phone + '   密码：000000'}}
			</view>
			<view class="flex align-center justify-between u-font-26 u-m-t-40" v-if="art.state == 1">
				后台网址：http://admin.autovlog.com.cn
				<view class="u-font-10 copy u-type-info u-border" @click="copyUrl">
					复制网址
				</view>
			</view>
			<!-- <view class="flex align-center justify-center u-m-t-80 u-m-b-80" v-if="art.state == 1">
				<u-image width="324" height="324" src="https://jjsp.activitysign.com/image/inviteSuccess.png"></u-image>
			</view> -->
			<view class="flex flex-direction align-center justify-center u-font-40 u-m-t-80" v-if="art.state == 1">
				<view class="btn">
					分享邀请
					<view class="share-btn u-abso">
						<u-button :custom-style="customStyle" open-type="share"></u-button>
					</view>
				</view>
				<!-- <view class="btn" @click="getSetting">
					保存到相册
				</view> -->
			</view>
			<view class="flex align-center justify-center  u-m-t-80 " v-else>
				<view class="btn-other" v-if="art.state == 0" @click="toIndex">
					返回首页
				</view>
				<view class="btn-other" v-else @click="toRoute">
					重新申请
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
			art: '',
			customStyle: {
				width: '100%',
				height: '100%',
				opacity: 0
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
	onLoad(options) {
		that = this
		let data
		if(!!options.id){
			data = {
				id: options.id
			}
		} else {
			data = {
				id: that.userInfo.distributor_id
			}
		}
		console.log(data);
		that.getInfo(data)
	},
	onShareAppMessage() {
		console.log('onShareAppMessage');
		return {
			title: '“' + that.art.name +'”邀请您加入',
			path: '/pages/index/index?openid=' + that.openid,
			imageUrl: 'https://jjsp.activitysign.com/image/logo.jpg',
			success(){
				console.log('onShareAppMessage-success');
			}
		}
	},
	methods: {
		getInfo(data){
			that.$u.post('/api/distributor/info', data).then(res => {
				console.log('getInfo',res);
				that.art = res
			}).catch(err => {
				console.log('catch', err);
			});
		},
		copyUrl(){
			uni.setClipboardData({
			    data: 'http://admin.autovlog.com.cn',
			    success: function () {
					that.$u.toast('已复制到剪切板');
			        console.log('success');
			    }
			});
		},
		toIndex(){
			that.$u.route({
				type: 'tab',
				url: '/pages/index/index',
				
			})
		},
		toRoute(e){
			that.$u.route({
				type: 'redirect',
				url: '/pages/business/business',
				
			})
		},
	}
}
</script>

<style lang="scss">
page{
	background-color: #fff;
}
.container{
	padding: 0 70rpx;
	// display: flex;
	// flex-direction: column;
	// align-items: center;
	.copy{
		padding: 0 10rpx;
		line-height: 36rpx;
	}
	.btn{
		background: #FFD524;
		border-radius: 6px;
		width: 320rpx;
		line-height: 100rpx;
		font-weight: 500;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		.share-btn{
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			overflow: hidden;
		}
	}
	.btn-other{
		background: #FFD524;
		border-radius: 6px;
		padding: 0 70rpx;
		line-height: 100rpx;
		font-weight: 500;
		display: flex;
		align-items: center;
		justify-content: center;
	}
}
</style>
