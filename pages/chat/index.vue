<template>
	<view class="content">
		<view class="chat-view" v-for="(item, index) in dataList" :key="index" @click="toDetail(item)">
			<image mode="aspectFill" :src="item.avatarUrl"></image>
			<view style="float: left;width: 80%;">
				<view class="name-view">
					<view class="unread-msg" v-if="item.count != 0">{{item.count}}</view>
					<view style="float: left;">{{item.nickname}}</view>
					<view style="float: right;font-size: 28rpx;color: #6b6b6b;">{{item.time}}</view>
				</view>
				<view class="content-view">{{item.latestContent}}</view>
			</view>
		</view>
		<view class="cue-words" v-if="dataList.length == 0">暂无消息</view>
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
		onShow() {
			this.queryChatCount()
		},
		onLoad(option) {
			setInterval(() => {
				this.queryChatCount()
			}, 1000);
		},
		onPullDownRefresh() {
			this.queryChatCount()
			uni.stopPullDownRefresh()
		},
		methods: {
			toDetail(item) {
				uni.navigateTo({
					url: `/pages/chat/detail?toId=${item.userId}`
				});
			},
			queryChatCount() {
				const userInfo = uni.getStorageSync('userInfo')
				http.queryChatCount({userId: userInfo.openId}).then(res => {
					this.dataList = res.data != null ? res.data : []
				})
			}
		}
	}
</script>

<style lang="scss">
	.content {
		padding: 20rpx;
	}
	.chat-view {
		width: 100%;
		float: left;
		padding-bottom: 30rpx;
		margin-bottom: 20rpx;
		border-bottom: 2rpx solid #ececec;
		
		image {
			width: 100rpx;
			height: 100rpx;
			border-radius: 100rpx;
			float: left;
		}
		
		.name-view {
			margin-left: 20rpx;
			
			.unread-msg {
				background-color: red;
				color: #FFFFFF;
				border-radius: 100rpx;
				width: 26rpx;
				height: 26rpx;
				font-size: 28rpx;
				line-height: 26rpx;
				text-align: center;
				float: left;
				padding: 4rpx;
				margin-left: -30rpx;
				margin-right: 10rpx;
			}
		}
		
		.content-view {
			clear: both;
			margin-top: 56rpx;
			margin-left: 20rpx;
			font-size: 28rpx;
			color: #6b6b6b;
		}
	}
	.cue-words {
		text-align: center;
		font-size: 28rpx;
		color: #778288;
		margin-top: 12rpx;
	}
</style>
