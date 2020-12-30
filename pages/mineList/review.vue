<template>
	<view class="">
		<!-- <u-navbar title="审核列表"></u-navbar> -->
		<!-- <u-sticky :offset-top="navHeight"> -->
		<u-sticky offset-top="0">
			<view class="">
				<u-tabs :list="tabList"
					active-color="#060606" inactive-color="#898989" 
					:active-item-style="activeItemstyle"
					:bar-style="barStyle"
					:is-scroll="false" :current="tabCur" @change="change"
				></u-tabs>
			</view>
		</u-sticky>
		
		<block v-if="list.length > 0">
		
		<view class="list">
			<view class="item" v-for="(item,index) in list" :key="index">
				<view class="top" :class="item.nstatus == 1?'':'u-border-bottom u-p-b-20'" @click="toDetail(item)">
					<view class="avatar">
						<u-avatar :src="item.nimages" size="140" mode="square"></u-avatar>
					</view>
					<view class="content">
						<view class="title u-font-28 u-m-b-10 u-line-2">
							<u-tag :text="item.nstatus == 1?'已通过':'已拒绝'" :type="item.nstatus == 1?'success':'error'" size="mini" :show="tabCur == 1" shape="circleLeft" />
							<text class="u-p-r-10"></text>
							{{item.ntitle}}
						</view>
						<view class="info u-font-24 u-tips-color">
							<view class="user">
								<u-avatar :src="item.photo" size="40" ></u-avatar>
								<text class="u-m-l-10">{{item.username}}</text>
							</view>
							<view class="play">
								{{item.nsendtime}}
							</view>
						</view>
					</view>
				</view>
				<view class="bottom" v-if="tabCur == 0">
					<view class="btn-container">
						<view class="btn u-border u-type-info" @click="tapReview(item,1)">拒绝</view>
						<view class="btn u-type-warning-bg u-main-color" @click="tapReview(item,0)">通过</view>
					</view>
				</view>
				<view class="bottom u-font-24" v-if="tabCur == 1&&item.nstatus == 2">
					原因：<text class="u-type-error">{{item.nrefuse_desc}}</text>
				</view>
			</view>
		</view>
		
		<u-loadmore :is-dot="true" :status="loadStatus" margin-top="20" margin-bottom="20"></u-loadmore>
		</block>
		<view class="emptyContainer" v-else>
			<u-empty text="暂无更多数据" mode="list"></u-empty>
		</view>
		<u-popup v-model="show" mode="bottom" :safe-area-inset-bottom="true" @open="openPopup">
			<view class="pop-container">
				<view class="pop-textrea flex-sub u-m-r-30">
					<u-input ref="popinput" v-model="popValue" :focus="popFocus" :fixed="true" height="150" :custom-style="customStyle" :placeholder-style="placeholderStyle" :clearable="false" type="textarea" placeholder="请输入审核没通过的理由" />
				</view>
				<u-button type="warning" size="mini" :disabled="!popValue" @click="sendMessage">发送</u-button>
			</view>
		</u-popup>
		<u-toast :type="toastType" ref="uToast"></u-toast>
		<u-modal ref="uModal" v-model="modalShow" :show-cancel-button="true"
			:show-title="false" :async-close="true" confirm-color="#ff9900"
			@confirm="modalConfirm" content="确认通过审核吗？"
		>
		</u-modal>
	</view>
</template>

<script>
var that
export default {
	data() {
		return {
			tabList: [{name:'待审核',id: 'prev'},{name:'已审核',id: 'end'}],
			tabCur: 0,
			activeItemstyle: {
				fontSize: '32rpx',
			},
			barStyle: {
				backgroundColor: '#FFD524',
			},
			list: [],
			// art: '',
			loadStatus: 'loadmore',
			page: 1,
			totalPage: 0,
			navHeight: 0,
			show: false,
			popValue: '',
			popFocus: false,
			reviewId: '',
			customStyle: {
				background: '#f5f5f5',
				padding: '20rpx',
				borderRadius: '6rpx',
			},
			placeholderStyle: "color: #c0c4cc;",
			toastType: '',
			modalShow: false
		}
	},
	onLoad() {
		that = this
		let data = {
			type: 0,
			user_id: that.userInfo.user_id,
			page: 1
		}
		that.getList(data)
		// #ifdef MP
		let systemInfo = this.$u.sys()
		// 小程序特别处理，让导航栏高度 = 胶囊高度 + 两倍胶囊顶部与状态栏底部的距离之差(相当于同时获得了导航栏底部与胶囊底部的距离)
		// 此方法有缺陷，暂不用(会导致少了几个px)，采用直接固定值的方式
		// return menuButtonInfo.height + (menuButtonInfo.top - this.statusBarHeight) * 2;//导航高度
		let height = systemInfo.platform == 'ios' ? 44 : 48;
		let topPx = systemInfo.statusBarHeight + height
		// this.offsetTop = topPx / (uni.upx2px(topPx) / topPx) // px转rpx
		that.navHeight = topPx / (uni.upx2px(topPx) / topPx) // px转rpx
		console.log(that.navHeight);
		// #endif
		console.log(this.$u.sys())
	},
	
	onReachBottom() {
		that.loadStatus = 'loading';
		if (that.totalPage >= that.page) {
			let data = {
				type: that.tabCur,
				user_id: that.userInfo.user_id,
				page: that.page,
			}
			
			that.getList(data)
			return
		}
		that.loadStatus = 'nomore'
	},
	methods: {
		getList(data){
			that.$u.post('/api/video/examine_list', data).then(res => {
				console.log('getList',res);
				that.totalPage = res.last_page;
				if (data.page == 1) {
					that.list = []
				}
				that.list = that.list.concat(res.data)
				that.page++;
				if(res.data.length == 0 || data.page == res.last_page){
					that.loadStatus = 'nomore';
					return
				}
				that.loadStatus = 'loadmore';
			}).catch(err => {
				console.log('getList-catch', err);
			});
		},
		
		tapReview(art,type){
			that.reviewId = art.id
			if(type == 1 ){
				that.show = true
				return
			} 
			that.modalShow = true
			// that.review(data)
		},
		review(data){
			that.$u.post('/api/user/review', data).then(res => {
				console.log('tapReview',res);
				if(data.type == 1){
					that.hidePopup()
				} else {
					that.modalShow = false
				}
				that.showToast('操作成功','success')
				let datas = {
					type: 0,
					user_id: that.userInfo.user_id,
					page: 1
				}
				that.getList(datas)
			}).catch(err => {
				console.log('tapReview-catch', err);
				that.showToast(err,'error')
			});
		},
		openPopup(e){
			console.log(e);
			that.$nextTick(() => {
			    that.popFocus = true;
			}); 
		},
		modalConfirm(){
			let data = {
				uid: that.userInfo.user_id,
				news_id: that.reviewId,
				type: 0,
			}
			that.review(data)
		},
		sendMessage(){
			let data = {
				uid: that.userInfo.user_id,
				news_id: that.reviewId,
				type: 1,
				nrefuse: that.popValue
			}
			that.review(data)
		},
		change(e){
			console.log(e)
			that.tabCur = e
			that.page = 1
			let data = {
				type: e,
				user_id: that.userInfo.user_id,
				page: 1
			}
			
			console.log(data)
			that.getList(data);
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 0
			})
			
		},
		hidePopup(){
			that.show = false
			that.popValue = ''
		},
		toDetail(art){
			console.log(art);
			that.$u.route({
				url: '/pages/videoDetail/videoDetail',
				params: {
					id: art.id
				}
			})
			// if(art.nstatus == 1){	
			// 	that.$u.route({
			// 		url: '/pages/videoDetail/videoDetail',
			// 		params: {
			// 			id: art.id
			// 		}
			// 	})
			// }
			
		},
		showToast(title,type) {
			that.$refs.uToast.show({
				title: title,
				type: type,
			});
		},
	}
}
</script>

<style lang="scss">

.list{
	.item{
		margin: 30rpx;
		padding: 30rpx;
		background-color: #fff;
		border-radius: 8rpx;
		overflow: hidden;
		.top{
			display: flex;
			align-items: flex-start;
			justify-content: space-between;
			position: relative;
			.avatar{
				margin-right: 20rpx;
			}
			.content{
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				height: 140rpx;
				.title{
					// color: #000;
				}
				.info{
					display: flex;
					align-items: center;
					justify-content: space-between;
					.user{
						display: flex;
						align-items: center;
					}
				}
			}
		}
		.bottom{
			margin-top: 30rpx;
			.btn-container{
				display: flex;
				align-items: center;
				justify-content: space-around;
				.btn{
					flex: 1;
					margin: 0 50rpx;
					border-radius: 60rpx;
					position: relative;
					display: flex;
					align-items: center;
					justify-content: center;
					padding: 0 50rpx;
					line-height: 60rpx;
					&::after{
						border-radius: 60rpx;
						border-color: #c0c4cc;
						
					}
				}
			}
			
		}
	}
}

.emptyContainer{
	position: fixed;
	top: 30%;
	left: 0;
	width: 100%;
}
.pop-container{
	display: flex;
	align-items: center;
	padding: 30rpx;
	
	
}
</style>
