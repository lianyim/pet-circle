<template>
	<view class="content">
		<view class="science-area">
			<scroll-view scroll-x="true">
				<view class="science-view">
					<view class="science" v-for="(item, index) in labelList" :key="index"
						@click="toDetail(item.id)"><text>{{item.title}}</text></view>
				</view>
			</scroll-view>
		</view>
		
		<view style="font-size: 28rpx;margin-top: 20rpx;margin-bottom: 20rpx;">科普知识</view>
		
		<view class="list-view" v-for="(item, index) in dataList" :key="index" @click="toDetail(item.id)">
			<view class="title-view">
				<view class="title-text">{{item.title}}</view>
				<view class="view-text">浏览 {{item.view}}</view>
			</view>
			<view class="img-view">
				<image mode="aspectFill" :src="item.picture"></image>
			</view>
		</view>
		
		<view class="cue-words" v-if="dataList.length == 0">没有更多数据</view>
		<view style="height: 80rpx;"></view>
	</view>
</template>

<script>
	import http from '@/api/backend.js'
	export default {
		data() {
			return {
				labelList: [],
				dataList: []
			}
		},
		onLoad() {
			this.queryList(1, 20)
		},
		onPullDownRefresh() {
			this.queryList(1, 20)
			uni.stopPullDownRefresh()
		},
		methods: {
			queryList(pageNum, pageSize) {
				this.labelList = []
				this.dataList = []
				const obj = {
					pageNum: pageNum,
					pageSize: pageSize
				}
				http.queryPetCyclopedias(obj).then(res => {
					let list = []
					list = res.data
					list.map(item => {
						if(item.type == '1') {
							this.labelList.push(item)
						}else {
							this.dataList.push(item)
						}
					})
				})
			},
			toDetail(e) {
				uni.navigateTo({
					url: `/pages/cyclopedia/detail?id=${e}`
				});
			}
		}
	}
</script>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 30rpx;
	}
	
	.science-area {
		.science:nth-child(1) {
			background-color: #FCF5C9;
		}
		.science:nth-child(2) {
			background-color: #EEF9FF;
		}
		.science:nth-child(3) {
			background-color: #FFEEEF;
		}
		.science-view {
			display: inline-block;
			margin-left: -20rpx;
			// 横向滚动
			width: 200%;
			display: flex;
			flex-wrap: nowrap;
			.science {
				float: left;
				padding: 30rpx;
				margin: 10rpx;
				border-radius: 10rpx;
				font-size: $uni-font-size-base;
			}
		}
	}
	
	.list-view {
		margin-top: 40rpx;
		border-bottom: 2rpx solid #d8d8d8;
		padding-bottom: 10rpx;
		
		.title-view {
			float: left;
			padding-top: 2rpx;
			padding-bottom: 2rpx;
			width: 420rpx;
			
			
			// 文字超出...
			.title-text {
				font-size: 24rpx;
				height: 70rpx;
				text-overflow: -o-ellipsis-lastline;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				line-clamp: 2;
				-webkit-box-orient: vertical;
			}
			.view-text {
				font-size: 22rpx;
				color: #999999;
				margin-top: 30rpx;
			}
		}
		.img-view {
			float: right;
			
			image {
				width: 200rpx;
				height: 140rpx;
				border-radius: 6rpx;
			}
		}
	}
	
	.cue-words {
		text-align: center;
		font-size: 28rpx;
		color: #778288;
		margin-top: 12rpx;
	}
	
</style>
