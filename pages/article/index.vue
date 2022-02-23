<template>
	<view class="content">
		<view style="font-size: 32rpx;margin-top: 20rpx;margin-bottom: 20rpx;">{{dataList[0].label}}</view>
		<view class="list-view" v-for="(item, index) in dataList" :key="index" @click="toDetail(item)">
			<view class="title-view">
				<view class="title-text">{{item.title}}</view>
				<!-- <view class="view-text">浏览 {{item.view}}</view> -->
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
				dataList: []
			}
		},
		onLoad(option) {
			this.queryList(1, 20, option.label)
		},
		onPullDownRefresh() {
			this.queryList(1, 20)
			uni.stopPullDownRefresh()
		},
		methods: {
			queryList(pageNum, pageSize, label) {
				const obj = {
					pageNum: pageNum,
					pageSize: pageSize,
					label: label
				}
				http.queryArticles(obj).then(res => {
					this.dataList = res.data
				})
			},
			toDetail(item) {
				uni.navigateTo({
					url: `/pages/article/detail?url=${item.url}`
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
