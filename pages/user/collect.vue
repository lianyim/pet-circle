<template>
	<view class="content">
		<view class="content-view" v-for="(item, index) in dataList" :key="index" @click="toDetail(item)">
			<view style="float: left;">
				<image :src="item.pictures[0]" class="content-img" mode="aspectFill"></image>
			</view>
			<view class="content-content">
				<view class="logo">{{item.isFinish == "0" ? "已被领养" : "等待领养"}}</view>
				<text style="margin-top: -30rpx;">{{item.nickname}}，{{item.age}}</text>
				<text class="content-text"
					style="margin-top: 26upx; font-size: 24rpx; color: #778288;height: 70rpx;">{{item.content}}</text>
				<view class="note">
					<text v-if="item.physicalCondition[0]"
						style="background-color: #368BE3;">{{item.physicalCondition[0]}}</text>
					<text v-if="item.physicalCondition[1]"
						style="background-color: #70AF48;">{{item.physicalCondition[1]}}</text>
					<text v-if="item.physicalCondition[2]"
						style="background-color: #F08080;">{{item.physicalCondition[2]}}</text>
				</view>
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
				dataList: [],
				userId: ''
			}
		},
		onLoad(option) {
			this.userId = option.userId
			this.queryList(1, 10, option.userId, "ADOPT")
		},
		onPullDownRefresh() {
			this.queryList(1, 10, this.userId, "ADOPT")
			uni.stopPullDownRefresh()
		},
		methods: {
			queryList(pageNum, pageSize, userId, type) {
				const obj = {
					pageNum: pageNum,
					pageSize: pageSize,
					userId: userId,
					type: type
				}
				http.queryCollect(obj).then(res => {
					this.dataList = res.data
				})
			},
			toDetail(item) {
				uni.navigateTo({
					url: `/pages/home/detail?id=${item.id}`
				});
			}
		}
	}
</script>

<style lang="scss">
	.content {
		padding: 20rpx;
	}
	.content-view {
		width: 100%;
		height: 300upx;
		box-shadow: 0 0 9px 3px #cee1eb;
		margin: 0 auto;
		border-radius: 20upx;
		margin-top: 30rpx;
	
		.content-img {
			width: 250upx;
			height: 240upx;
			margin-left: 22upx;
			margin-top: 40upx;
			border-radius: 10upx;
		}
	
		.content-content {
			display: flex;
			flex-direction: column;
			height: 300upx;
			justify-content: center;
			padding-left: 30upx;
	
			.logo {
				width: 120rpx;
				height: 50rpx;
				background-color: #fca400;
				position: relative;
				left: 300rpx;
				top: -52rpx;
				border-radius: 0 20upx 0 20upx;
				font-size: 24rpx;
				text-align: center;
				line-height: 50rpx;
				color: #FFFFFF;
			}
	
			// 文字超出...
			.content-text {
				text-overflow: -o-ellipsis-lastline;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				line-clamp: 2;
				-webkit-box-orient: vertical;
			}
	
			.note {
				margin-top: 4rpx;
	
				text {
					font-size: $uni-font-size-sm;
					margin: 10rpx;
					padding-left: 8rpx;
					padding-right: 8rpx;
					border-radius: 30rpx;
					color: #ffffff;
				}
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
