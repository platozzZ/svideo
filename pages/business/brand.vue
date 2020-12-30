<template>
	<view class="">
		<!-- <u-navbar title="品牌选择"></u-navbar> -->
		<u-index-list :scrollTop="scrollTop" :index-list="indexList">
			<view v-for="(item, index) in list" :key="item.guid_id">
				<u-index-anchor :index="item.initials" ></u-index-anchor>
				<view class="list-cell u-border-bottom" v-for="(iteml, indexl) in item.brand" :key="iteml.guid_id" @click="toRoute(iteml)">
					<u-image width="70rpx" height="70rpx" :src="iteml.icon"></u-image>
					<text class="u-m-l-20">{{iteml.name}}</text>
				</view>
			</view>
		</u-index-list>
	</view>
</template>

<script>
var that
export default {
	data() {
		return {
			scrollTop: 0,
			indexList: [],
			list: [],
			listLen: 0
		}
	},
	onLoad() {
		that = this
		that.getList()
	},
	onPageScroll(e) {
		that.scrollTop = e.scrollTop;
	},
	methods: {
		getList(e){
			that.$u.post('/api/distributor/brand').then(res => {
				console.log('getList',res);
				let listLen = 0
				res.map((item,index) => {
					item.guid_id = that.$u.guid();
					item.brand.map((iteml,indexl) => {
						listLen++
						iteml.guid_id = that.$u.guid();
					})
				})
				console.log(listLen);
				let letterArr = res.map(val => {
					return val.initials;
				})
				that.list = res
				that.indexList = letterArr
				that.listLen = listLen
				// that.calcCellHeight()
				// that.$nextTick(function(){
				// 	this.createSelectorQuery()
				// 	.selectAll('.list-cell')
				// 	.boundingClientRect(rectList => {
				// 		console.log(rectList)
				// 	// resolve(rectList);
				// 	})
				// 	.exec()

				// })
			}).catch(err => {
				console.log('getList-catch', err);
			});
		},
		toRoute(e){
			console.log(e);
			// that.$u.vuex('brandInfo',e)
			
			that.$u.vuex('brandid', e.id)
			that.$u.vuex('brandname', e.name)
			// let pages = getCurrentPages();
			// let curPage = pages[pages.length - 1]; //上一个页面
			// let prevPage = pages[pages.length - 2]; //上一个页面
			// console.log(pages);
			// console.log(curPage.model);
			// console.log(prevPage.model);
			// that.$set(prevPage.model,'brand_id',e.id)
			// that.$set(prevPage.model,'brand_name',e.name)
			// prevPage.model.brand_id = e.id
			// prevPage.model.brand_name = e.name
			that.$u.route({
				type: 'back',
			});
		},

		calcCellHeight() {
			that.$nextTick(function(){
				this.createSelectorQuery()
				.selectAll('.list-cell')
				.boundingClientRect(rectList => {
					console.log(rectList)
					// resolve(rectList);
				})
				.exec()
				
			})
		},
		
		recycleCard(rectList) {
			const newList = [];
			for (let i = 0; i < this.listLen; i++) {
				const rect = rectList[i];
				if (rect && Math.abs(rectList[i].top - 0) > pageHeight * 2) {
					newShowCards.push({
						type: 'empty-card',
						height: rectList[i].bottom - rectList[i].top
					});
				} else {
					const feed = totalCards[i];
					newShowCards.push(feed);
				}
			}
			this.setData({
				showCards: newShowCards
			});
		}
	}
}
</script>

<style>
.list-cell {
	display: flex;
	box-sizing: border-box;
	align-items: center;
	width: 100%;
	padding: 20rpx 30rpx;
	overflow: hidden;
	font-size: 28rpx;
	line-height: 1.6;
	background-color: #fff;
}
</style>
