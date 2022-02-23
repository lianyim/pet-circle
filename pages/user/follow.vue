<template>
	<view class="content">
		<view class="chat-view" v-for="(item, index) in dataList" :key="index" @click="toDetail(item)">
			<image mode="aspectFill" :src="item.avatarUrl"></image>
			<view style="float: left;width: 80%;">
				<view class="name-view">
					<view style="float: left;">{{item.nickname}}</view>
					<view style="float: right;font-size: 28rpx;color: #6b6b6b;">已关注</view>
				</view>
			</view>
		</view>
		<view class="cue-words" v-if="dataList.length == 0">暂无关注</view>
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
			
		},
		onLoad(option) {
			this.queryUserFollows(option.openId)
		},
		onPullDownRefresh() {
			this.queryUserFollows()
			uni.stopPullDownRefresh()
		},
		methods: {
			toDetail(item) {
				uni.navigateTo({
					url: `/pages/user/user?openId=${item.userId}`
				});
			},
			queryUserFollows(e) {
				http.queryUserFollows({userId: e}).then(res => {
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
		align-items: center;
		display: flex;
		
		image {
			width: 100rpx;
			height: 100rpx;
			border-radius: 100rpx;
			float: left;
		}
		
		.name-view {
			margin-left: 20rpx;
			
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
