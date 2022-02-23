<template>
	<view class="content">
		<view class="science-area">
			<scroll-view scroll-x="true">
				<view class="science-view">
					<view class="science" :style="{'background': item.bgColor}" v-for="(item, index) in articles" :key="index"
						@click="petClick(item)">
						<text>{{item.label}}</text>
					</view>
				</view>
			</scroll-view>
		</view>

		<view class="selected-area">
			<scroll-view scroll-x="true">
				<view class="selected-view">
					<view class="selected" @click="toAuthor"><text># 作者想说</text></view>
				</view>
			</scroll-view>
		</view>

		<view class="cut-line"></view>
		
		<view class="content-area-new">
			<view class="content-view-new">
				<view class="content-new" v-for="(item, index) in dataList" :key="index" @click="toDetail(item)">
					<image mode="aspectFill" class="picture-img" :src="item.pictures[0]"></image>
					<view class="title-view-new">{{item.content}}</view>
					<view class="user-view-new">
						<view style="float: left;display: flex;align-items: center;">
							<image mode="aspectFill" style="width: 40rpx;height: 40rpx;border-radius: 100rpx;" :src="item.avatarUrl"></image>
							<text style="margin-left: 20rpx;font-size: 26rpx;">{{item.nickname}}</text>
						</view>
						<!-- <view style="float: right;display: flex;align-items: center">
							<image mode="aspectFill" src="../../static/un_focus.png" style="width: 40rpx;height: 40rpx;"></image>
							<text style="margin-left: 20rpx;font-size: 26rpx;">136</text>
						</view> -->
					</view>
				</view>
			</view>
		</view>
		<view class="cue-words" v-if="dataList.length == 0">没有更多数据</view>
		<view class="addIcon">
			<image src="../../static/add.png" @click="toAdd()"></image>
		</view>
		<view style="height: 80rpx;"></view>

	</view>
</template>

<script>
	import http from '@/api/backend.js'
	export default {
		data() {
			return {
				dataList: [],
				imgs: [],
				articles: []
			}
		},
		onLoad() {
			this.queryList(1, 10)
			this.queryArticles(1, 10)
		},
		onPullDownRefresh() {
			this.queryList(1, 10)
			this.queryArticles(1, 10)
			uni.stopPullDownRefresh()
		},
		methods: {
			queryList(pageNum, pageSize) {
				const obj = {
					pageNum: pageNum,
					pageSize: pageSize
				}
				http.queryPetCircles(obj).then(res => {
					this.dataList = res.data
				})
			},
			// 预览图片
			previewImage(item, index) {
				uni.previewImage({
					current: item,
					urls: this.dataList[index].pictures,
					// loop: true   // 是否可循环预览
				});
			},
			toAdd() {
				const userInfo = uni.getStorageSync('userInfo')
				let openId = userInfo.openId
				if (openId === undefined) {
					uni.showToast({
						title: '您未登录，请前往登录',
						icon: 'none',
						duration: 1500
					});
					setTimeout(function() {
						uni.switchTab({
							url: '/pages/user/my',
						});
					}, 1500)
					return;
				}
				uni.navigateTo({
					url: `/pages/community/add?openId=${openId}`
				});
			},
			toUser(e) {
				console.log(e)
				uni.navigateTo({
					url: `/pages/user/user?openId=${e}`
				});
			},
			toDetail(item) {
				uni.navigateTo({
					url: `/pages/community/detail?id=${item.id}`
				});
			},
			// 跳转文章详情
			petClick(item) {
				uni.navigateTo({
					url: `/pages/article/index?label=${item.label}`
				});
			},
			// 查询文章列表
			queryArticles(pageNum, pageSize) {
				http.queryArticles({pageNum: pageNum, pageSize: pageSize}).then(res => {
					this.articles = res.data
				})
			},
			toAuthor() {
				uni.navigateTo({
					url: '/pages/author/index'
				});
			}
		}
	}
</script>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		/* align-items: center; */
		justify-content: center;
		padding: 15rpx;
		background-color: #f5f5f5;
	}

	scroll-view {
		white-space: nowrap;
	}

	.science-area .science-view .science {
		float: left;
		padding: 30rpx;
		margin: 10rpx;
		border-radius: 10rpx;
		font-size: $uni-font-size-base;
	}

	.science-area .science-view {
		display: inline-block;
		// 横向滚动
		width: 200%;
		display: flex;
		flex-wrap: nowrap;
	}

	.selected-area .selected-view {
		display: inline-block;
	}

	.selected-area .selected-view .selected {
		background-color: #F3FAFF;
		color: #007AFF;
		float: left;
		margin: 15rpx;
		border-radius: 50rpx;
		font-size: $uni-font-size-sm;
	}

	.cut-line {
		width: 100%;
		height: 6rpx;
		background-color: #efefef;
	}

	.addIcon {
		position: fixed;
		bottom: 60rpx;
		right: 40rpx;

		image {
			width: 70rpx;
			height: 70rpx;
		}
	}

	.cue-words {
		text-align: center;
		font-size: 28rpx;
		color: #778288;
		margin-top: 12rpx;
	}
	
	.countView {
		margin-left: 30upx;
		margin-top: 30upx;
		font-weight: bold;
		font-size: 28upx;
	}
	
	.userInfoVoew {
		display: block;
		flex-direction: row;
		margin-left: 30upx;
		margin-top: 20upx;
		/* 内容垂直居中 */
		display:flex;
		align-items:center;
	
		image {
			width: 60upx;
			height: 60upx;
			border-radius: 50upx;
		}
	
		text {
			margin-left: 20upx;
			color: #0081FF;
			display: inline-block;
		}
	}
	
	.comment {
		margin-left: 110upx;
		margin-right: 32upx;
	}
	
	.commentTime {
		margin-left: 110upx;
		margin-top: 10upx;
		color: #778288;
		font-size: 22rpx;
	}
	
	.noCommentView {
		margin-left: 35upx;
		margin-top: 30upx;
		color: #778288;
	}
	
	.content-area-new {
		width: 100%;
		
		.content-new {
			width: 49%;
			float: unset;
			float: left;
			margin-left: 6rpx;
			margin-top: 10rpx;
			background-color: #ffffff;
			padding-bottom: 20rpx;
			
			.title-view-new {
				height: 70rpx;
				font-size: 26rpx;
				padding-left: 15rpx;
				padding-right: 15rpx;
				// 超出...
				text-overflow: -o-ellipsis-lastline;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				line-clamp: 2;
				-webkit-box-orient: vertical;
			}
			
			.user-view-new {
				padding-left: 15rpx;
				padding-right: 15rpx;
				margin-top: 10rpx;
			}
			
			.picture-img {
				width: 100%;
				height: 280rpx;
				border-radius: 30rpx 30rpx 0 0;
			}
		}
	}
</style>
