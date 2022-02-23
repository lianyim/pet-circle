<template>
	<view class="content">
		<view class="swiper-view">
			<swiper class="swiper" indicator-dots autoplay interval="2000" duration="800">
				<swiper-item class="swiper-item" v-for="(item, index) in petCircle.pictures" :key="index">
					<view class="image-wrapper">
						<image :src="item" mode="aspectFill" @click="previewImage(item)"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="content-view">{{petCircle.content}}</view>
		<view class="time-view">{{petCircle.updateTime}}</view>
		
		<view class="user-view">
			<view class="user-text">
				<image :src="petCircle.avatarUrl" @click="toUser(petCircle.userId)"></image>
				<view class="user-info">
					<view class="nickname">{{petCircle.nickname}}</view>
					<view class="is-real-name">{{petCircle.isRealName ? "已实名" : "未实名"}}</view>
				</view>
				<view class="collect-view" v-if="isFollowUser" @click="unFollow">
					<image class="collect-img" src="../../static/focus.png" v-if="openId != petCircle.userId"></image>
					<text v-if="openId != petCircle.userId">已关注</text>
				</view>
				<view class="collect-view" v-if="!isFollowUser" @click="follow">
					<image class="collect-img" src="../../static/un_focus.png" v-if="openId != petCircle.userId"></image>
					<text v-if="openId != petCircle.userId">关注</text>
				</view>
			</view>
		</view>
		
		<view style="font-size: 28rpx;color: #444444;margin-top: 20rpx;padding: 20rpx;clear: both;">评论 {{commentCount}}</view>
		<view class="pl-view">
			<image mode="aspectFill" :src="user.avatarUrl"></image>
			<view>
				<input v-model="commentContent" type="text" placeholder="爱评论的人运气不会差哦" />
				<button @click="submit(null, null)">发送</button>
			</view>
		</view>
		
		<!-- 父评论 -->
		<view class="comment-view" v-for="(item, index) in comments" :key="index" v-if="item.parentId == null">
			<image mode="aspectFill" :src="item.avatarUrl" @click="toUser(item.ownerId)"></image>
			<view class="comment-text">
				<view style="color: #666666;">
					<text style="color: #FFFFFF;" class="owner-text" v-if="petCircle.userId == item.ownerId">作者</text>
					{{item.nickname}}
				</view>
				<view @click="reply(item, null)">{{item.content}} <text>{{item.createTime}}</text></view>
			</view>
			<!-- 子评论 -->
			<view class="comment-child" v-for="(i, ind) in commentsChild" :key="ind" v-if="item.id == i.parentId">
				<image mode="aspectFill" :src="i.avatarUrl" @click="toUser(i.ownerId)"></image>
				<view style="float: left;">
					<view style="color: #666666;">
						<text style="color: #FFFFFF;" class="owner-text" v-if="petCircle.userId == i.ownerId">作者</text>
						{{i.nickname}}
					</view>
					<view @click="reply(i, item)">{{i.content}} <text>{{i.createTime}}</text></view>
				</view>
			</view>
			<!-- 三级评论 -->
			<view class="comment-child" v-for="(i, ind) in commentsChild" :key="ind" v-if="item.id == i.grandId">
				<image mode="aspectFill" :src="i.avatarUrl" @click="toUser(i.ownerId)"></image>
				<view style="float: left;">
					<view style="color: #666666;">
						<text style="color: #FFFFFF;" class="owner-text" v-if="petCircle.userId == i.ownerId">作者</text>
						{{item.nickname}}
					</view>
					<view @click="reply(i, item)">@{{i.parentName}} {{i.content}} <text>{{i.createTime}}</text></view>
				</view>
			</view>
		</view>
		<view class="cue-words" v-if="comments.length == 0">快来抢沙发呀!</view>
		<view style="height: 80rpx;"></view>
	</view>
</template>

<script>
	import http from '@/api/backend.js'
	export default {
		data() {
			return {
				user: {},
				openId: "",
				petCircle: {},
				comments: [],
				commentsChild: [],
				commentContent: "",
				peyCircleId: "",
				commentCount: 0,
				isFollowUser: false ,// 是否关注
				type: 'CIRCLE'
			}
		},
		onLoad(option) {
			const userInfo = uni.getStorageSync('userInfo')
			this.user = userInfo
			this.openId = userInfo.openId
			this.peyCircleId = option.id
			this.getCircle(option.id)
			this.queryComments(option.id, this.type)
			this.queryCommentCount(option.id, this.type)
			setTimeout(() => {
				this.isFollow()
			}, 500)
		},
		methods: {
			// 查询动态
			getCircle(id) {
				http.getPetcircle({id: id}).then(res => {
					this.petCircle = res.data
				})
			},
			// 查询评论
			queryComments(fromId, type) {
				http.queryComments({fromId: fromId,type: type}).then(res => {
					if(res.data != null) {
						this.commentsChild = []
						this.comments = res.data
						this.comments.map(item => {
							if(item.parentId != null) {
								this.commentsChild.push(item)
							}
						})
					}
				})
			},
			// 查询数量
			queryCommentCount(fromId, type) {
				http.queryCommentCount({fromId: fromId,type: type}).then(res => {
					this.commentCount = res.data
				})
			},
			// 图片预览
			previewImage(item) {
				uni.previewImage({
					current: item,
					urls: this.petCircle.pictures,
					// loop: true   // 是否可循环预览
				});
			},
			// 发表评论
			submit(parentId, grandId) {
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
				if(this.commentContent == "") {
					uni.showToast({
						title: '请输入评论内容',
						icon: 'none'
					})
					return
				}
				const params = {
					parentId: parentId,
					grandId: grandId,
					ownerId: openId,
					formId: this.peyCircleId,
					content: this.commentContent,
					type: this.type
				}
				http.addComment(params).then(res => {
					if(res.data == 1) {
						uni.showToast({
							title: "发布成功",
							icon: "success"
						})
						this.queryComments(this.peyCircleId, this.type)
						this.queryCommentCount(this.peyCircleId, this.type)
						this.commentContent = ""
						return
					}
					uni.showToast({
						title: "接口请求异常",
						icon: error
					})
				})
			},
			// 回复评论
			reply(item, parent) {
				let _self = this
				const userInfo = uni.getStorageSync('userInfo')
				// 本人评论(可删除)
				if(item.ownerId == userInfo.openId) {
					uni.showModal({
						title: '确定要删除吗',
						success: function (res) {
							if(res.confirm) {
								http.deleteComment({id: item.id}).then(re => {
									if(re.data == 1) {
										uni.showToast({title: '删除成功',icon: 'success'})
										_self.queryComments(_self.peyCircleId, _self.type)
										_self.queryCommentCount(_self.peyCircleId, _self.type)
										return
									}
									uni.showToast({
										title: "接口请求异常",
										icon: error
									})
								})
							}
						}
					})
				}else {
					// 回复评论
					uni.showModal({
					    title: '评论',
						confirmText: '回复',
						editable: true,
						placeholderText: '回复@' + item.nickname,
					    success: function (res) {
					        if (res.confirm) {
								_self.commentContent = res.content
								_self.submit(item.id, parent != null ? parent.id : null)
					        }
					    }
					});
				}
			},
			toUser(e) {
				uni.navigateTo({url: `/pages/user/user?openId=${e}`});
			},
			// 查询是否关注
			isFollow() {
				if(this.openId == '' || this.openId == undefined) {
					return
				}
				http.isFollow({userId: this.openId,followId: this.petCircle.userId}).then(res => {
					this.isFollowUser = res.data
				})
			},
			// 关注
			follow() {
				if(this.openId == '' || this.openId == undefined) {
					uni.showToast({
						title: '登录后才能关注哦',
						icon: 'none'
					})
					return
				}
				const params = {
					userId: this.openId,
					followId: this.petCircle.userId
				}
				http.addUserFollow(params).then(res => {
					if(res.data) {
						this.isFollowUser = true
					}
				})
			},
			// 取消关注
			unFollow() {
				const params = {
					userId: this.openId,
					followId: this.petCircle.userId
				}
				http.unUserFollow(params).then(res => {
					if(res.data) {
						this.isFollowUser = false
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.content {
		
	}
	.picture-view {
		
		image {
			width: 100%;
			
		}
	}
	
	.content-view {
		padding: 20rpx;
		font-size: 28rpx;
	}
	.time-view {
		font-size: 24rpx;
		color: #778288;
		margin-top: 20rpx;
		padding-left: 20rpx;
		padding-right: 20rpx;
	}
	
	.swiper {
		height: 760rpx;
	}
	
	.swiper-view .swiper .swiper-item image {
		width: 100%;
		height: 680rpx;
	}
	
	.pl-view {
		padding: 20rpx;
		
		image {
			width: 60rpx;
			height: 60rpx;
			border-radius: 100rpx;
			float: left;
		}
		
		input {
			background-color: #f1f1f1;
			padding: 10rpx;
			font-size: 26rpx;
			border-radius: 10rpx;
			padding-left: 20rpx;
			float: left;
			margin-left: 20rpx;
			width: 60%;
		}
		
		button {
			background-color: transparent;
			height: 60rpx;
			line-height: 60rpx;
			font-size: 28rpx;
			color: #000000;
			width: 120rpx;
		}
	}
	.cue-words {
		text-align: center;
		font-size: 28rpx;
		color: #778288;
		margin-top: 12rpx;
	}
	
	.comment-view {
		margin-top: 10rpx;
		padding: 20rpx;
		
		.owner-text {
			margin-right: 16rpx;
			color: #FFFFFF;
			font-size: 24rpx;
			background-color: #ffaa00;
			padding-left: 6rpx;
			padding-right: 6rpx;
			border-radius: 10rpx;
		}
		
		image {
			width: 60rpx;
			height: 60rpx;
			border-radius: 100rpx;
			float: left;
			margin-right: 20rpx;
		}
		
		.comment-text {
			
			
			view {
				font-size: 26rpx;
			}
			text {
				font-size: 22rpx;
				color: #7a7a7a;
				margin-left: 10rpx;
			}
		}
		
		.comment-child {
			display: flex;
			margin-left: 80rpx;
			margin-top: 20rpx;
			
			view {
				font-size: 26rpx;
			}
			text {
				font-size: 22rpx;
				color: #7a7a7a;
				margin-left: 10rpx;
			}
		}
	}
	.user-view {
		width: 85%;
		height: 100rpx;
		margin: 0 auto;
		box-shadow: 0 0 9px 3px #eaeaea;
		border-radius: 10rpx;
		padding: 30rpx;
		margin-top: 30rpx;
		
		.title {
			float: left;
			font-size: 30rpx;
		}
		
		.collect-view {
			float: right;
			font-size: 26rpx;
			display: flex;
			margin-top: 26rpx;
			
			.collect-img {
				width: 45rpx;
				height: 45rpx;
			}
			
			text {
				align-self: center;
				margin-left: 10rpx;
			}
		}
		
		.user-text {
			clear: both;
			height: 144rpx;
			
			image {
				width: 100rpx;
				height: 100rpx;
				float: left;
				border-radius: 100rpx;
			}
			
			.user-info {
				float: left;
				margin-left: 20rpx;
				
				.is-real-name {
					font-size: 20rpx;
					border: 2rpx solid green;
					padding: 2rpx;
					width: 80rpx;
					color: green;
					border-radius: 14rpx;
					text-align: center;
					margin-top: 10rpx;
				}
				
				.num-view {
					margin-top: 10rpx;
					font-size: 24rpx;
					
					.doing-num {
						color: #ff5500;
					}
					
					.done-num {
						
						color: #ff5500;
					}
				}
			}
			
		}
	}
</style>
