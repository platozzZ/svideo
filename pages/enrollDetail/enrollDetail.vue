<template>
	<view>
		<u-navbar title="活动详情"></u-navbar>
		<block v-if="showContainer ">
		<u-image width="100%" height="520rpx" :src="art.poster"></u-image>
		<view class="container">
			<view class="info u-rela padding">
				<view class="title flex align-center justify-center u-font-32 u-p-t-20 u-p-b-40">
					{{art.name}}
				</view>
				<view class="content flex align-center justify-center padding-tb-lg u-border">
					<view class="content-text flex flex-direction u-font-26">
						<text class="">
							活动时间：{{art.starttime}} 至 {{art.endtime}}
						</text>
						<text class="">
							主办方：{{art.sponsorname}}
						</text>
						<text class="">
							电话：{{art.telephone}}
						</text>
						<text class="">
							举办地点：{{art.address}}
						</text>
					</view>
				</view>
				<view class="bottom flex align-center justify-center u-font-24 u-p-t-30 u-p-b-10">
					距离活动开始：
					<u-count-down ref="uCountDown" :timestamp="art.scoends" separator="zh" separator-size="24" separator-color="#939393" font-size="28" color="#333333"></u-count-down>
				</view>
			</view>
			<!-- <view class="u-m-t-30 ">
			</view>
			<view class="about u-m-t-30 padding-tb u-border-bottom u-border-top flex align-center justify-between">
				<u-icon name="man-add" color="#0051EC" size="26" :label="num" label-pos="right" label-size="24" margin-left="6"></u-icon>
				<view class="u-m-l-30 flex align-center">
					<view class="about-image" v-for="(item,index) in 10" :key="index">
						<u-image src="https://cdn.uviewui.com/uview/example/fade.jpg" height="100%" shape="circle"></u-image>
					</view>
				</view>
			</view>
			<view class="info flex align-center justify-between u-p-t-30">
				<u-icon name="map" color="#7A7A7A" size="32" :label="loacation" label-color="#7A7A7A" label-pos="right" label-size="26" margin-left="6"></u-icon>
				<u-icon name="phone" color="#7A7A7A" size="32" :label="phone" label-color="#7A7A7A" label-pos="right" label-size="26" margin-left="6"></u-icon>
			</view> -->
		</view>
		<u-gap height="100"></u-gap>
		<view class="detail">
			<view class="detail-tabs u-border-bottom">
				<u-tabs :list="art.matchdetail"
					name="tabname"
					active-color="#333333" inactive-color="#939393" 
					:active-item-style="activeItemstyle"
					:bar-style="barStyle"
					:is-scroll="false" :current="tabCur" @change="change"
				></u-tabs>
				
			</view>
			<view class="detail-content padding u-content-color ">
				<u-parse :html="art.matchdetail[tabCur].content" :lazy-load="true"></u-parse>
			</view>
		</view>
		
		<view class="footer">
			<view class="footer-seat"></view>
			<view class="footer-content flex align-center">
				<view class="btn-phone flex align-center justify-center" @click="makePhoneCall">
					<u-icon name="phone" color="#fff" size="32" label="电话咨询" label-pos="right" label-color="#fff" label-size="30" margin-left="6"></u-icon>
				</view>
				<view class="footer-btn bg-pyellow felx-sub flex align-center justify-center u-main-color" v-if="art.match_status.match_status_code == 20" @click="toSign">
					立即报名
				</view>
				<view class="footer-btn u-type-info-bg felx-sub flex align-center justify-center u-main-color" v-else>
					{{art.match_status.match_status_msg}}
				</view>
			</view>
		</view>
		
		</block>
		<view class="emptyContainer" v-else>
			<u-empty text="暂无更多数据" mode="data"></u-empty>
		</view>
	</view>
</template>

<script>
var that
export default {
	data() {
		return {
			art: '',
			list: [{
					image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
					title: '昨夜星辰昨夜风，画楼西畔桂堂东'
				},
				{
					image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
					title: '身无彩凤双飞翼，心有灵犀一点通'
				},
				{
					image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
					title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
				}
			],
			num: 13,
			loacation: '北京三里屯工人体育场120号',
			phone: '18888888888',
			commentList: [],
			commentValue: '',
			commentCustomStyle: {
				background: '#fff',
				padding: '0 20rpx',
				borderRadius: '6rpx'
			},
			showContainer: false,
			gridList: [
				{name:'赛事详情',id: 'recommend'},{name:'组别及奖项',id: 'new'},{name:'日程安排',id: 'hot'},{name:'报名须知',id: 'nearby'}
			],
			gridItemStyle: {
				padding: '15rpx 0',
				// justifyContent: 'space-between',
				minHeight: '120rpx'
			},
			tabCur: 0,
			activeItemstyle: {
				fontSize: '30rpx',
			},
			barStyle: {
				backgroundColor: '#333333',
			},
		}
	},
	onLoad(options) {
		console.log(options)
		that = this
		let data = {
			mid: options.id,
			num: 5
		}
		that.getDetail(data);
	},
	methods: {
		getDetail(data) {
			that.$u.post('/activity/gokart/matchInfo', data).then(res => {
				console.log('getDetail',res);
				that.art = res
				that.art.scoends = that.getDistanceDay(res.entryendtime)
				that.showContainer = true
			}).catch(err => {
				that.showContainer = true
				that.$u.toast(err.rspInfo.rspDesc)
				console.log('getDetail-catch', err);
			});
		},
		change(e){
			console.log(e)
			that.tabCur = e
			
		},
		makePhoneCall(e){
			if(!that.userInfo.phone){
				that.$u.route('/pages/login/login')
				return
			}
			uni.makePhoneCall({
			    phoneNumber: that.art.telephone
			});
		},
		getDistanceDay(time) {
			console.log(time);
			let _thistime = Date.parse(new Date());
			let sconeds = (time * 1000 - _thistime) / 1000
			console.log(sconeds);
			return sconeds
		},
		toSign(){
			if(!that.userInfo.phone){
				that.$u.route('/pages/login/login')
				return
			}
			let data = {
				mid: that.art.mid,
				openid: that.openid
			}
			that.$u.post('/activity/Gokart/saveMemberActivity', data).then(res => {
				console.log('toSign',res);
				uni.showToast({
					title: '报名成功',
					icon: 'success',
					duration: 2000
				})
			}).catch(err => {
				that.$u.toast(err.rspInfo.rspDesc)
				console.log('toSign-catch', err);
			});
			// that.$u.route('/pages/enrollDetail/enrollSign', {
			// 	id: that.art.mid
			// });
		},
	}
}
</script>

<style lang="scss">
.container{
	position: relative;
	z-index: 1;
	margin-top: -154rpx;
	.info{
		background-color: #fff;
		border-radius: 24rpx;
		.content{
			.content-text{
				color: #333;
				line-height: 1.6;
			}
		}
		.bottom{
			color: #939393;
		}
	}
}
.detail{
	.detail-content{
		background-color: #fff;
	}
}
.btn-phone{
	background-color: #2A2A2A;
	width: 300rpx;
	height: 100%;
}

.emptyContainer{
	position: fixed;
	top: 30%;
	left: 0;
	width: 100%;
}
</style>
