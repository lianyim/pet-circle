<template>
	<view class="page">
		<view class="top">
			<view class="background"></view>
		</view>
		<view class="user-card">
			<view class="card">
				<view class="top">
					<view class="userImage">
						<!-- <open-data type="userAvatarUrl"></open-data> -->
						<image mode="aspectFill" :src="userInfo.avatarUrl" @click="toUser(userInfo.openId)"></image>
					</view>
				</view>
				<view class="bottom">
					<view class="left">
						<view class="user-text">
							<!-- <open-data type="userNickName"></open-data> -->
							<view v-if="userInfo">{{userInfo.nickname}}</view>
							<view v-if="!userInfo" @click="getUserProfile">请登录</view>
						</view>
						<view v-if="userInfo.phone" class="user-phone"> {{userInfo.phone}} </view>
						<button class="phoneButton" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" v-if="!userInfo.phone && userInfo"> 手机号未绑定 </button>
					</view>
					<view class="right flex-center">
						<u-icon class="icon" name="arrow-right"></u-icon>
					</view>
				</view>
			</view>
		</view>
		<view class="list-card">
			<view class="card">
				<view class="item item-bottom-solid">
					<view class="left flex-center">
						<image src="../../static/myIcon/qiu.png" mode="aspectFit"></image>
					</view>
					<view class="center" @click="toChat">
						<text>消息</text>
						<text class="unread-msg" v-if="unreadMsgTotal != 0">{{unreadMsgTotal}}</text>
					</view>
					<view class="right flex-center">
						<u-icon class="icon" name="arrow-right">></u-icon>
					</view>
				</view>
			</view>
			<view class="card">
				<view class="item item-bottom-solid">
					<view class="left flex-center">
						<image src="../../static/myIcon/1.png" mode="aspectFit"></image>
					</view>
					<view class="center" @click="toFollow">
						<text>我的关注</text>
					</view>
					<view class="right flex-center">
						<u-icon class="icon" name="arrow-right">></u-icon>
					</view>
				</view>
			</view>
			<view class="card">
				<view class="item">
					<view class="left flex-center">
						<image src="../../static/myIcon/2.png" mode="aspectFit"></image>
					</view>
					<view class="center" @click="lyClick">
						<text>我的收藏</text>
					</view>
					<view class="right flex-center">
						<u-icon class="icon" name="arrow-right">></u-icon>
					</view>
				</view>
			</view>
		</view>
		<view class="quit flex-center">
			<view class="btn flex-center" v-if="userInfo" @click="onremoveLogout()">
				退出登录
			</view>
		</view>
	</view>
</template>

<script>
	import http from '@/api/backend.js';
	import {mapMutations, mapState} from 'vuex';
	var _self;
	export default {
		created() {
			_self = this
		},
		data() {
			return {
				userInfo: {},
				unreadMsgTotal: 0
			}
		},
		onPullDownRefresh() {
			this.queryUnreadTotal()
			uni.stopPullDownRefresh()
		},
		onShow() {
			this.init()
			// #ifdef APP-PLUS
			if(this.userInfo == undefined || this.userInfo == '') {
				uni.navigateTo({url: '/pages/user/login'});
			}
			// #endif
			setInterval(() => {
				this.queryUnreadTotal()
			}, 1000);
		},
		onLoad() {
			
		},
		methods: {
			...mapMutations(['login', 'logout']),
			// 初始化用户信息
			init() {
				const userInfo = uni.getStorageSync('userInfo');
				this.userInfo = userInfo
			},
			// 登录
			getUserProfile(e) {
				uni.getUserProfile({
					lang: 'zh_CN',
					desc: '获取微信用户的昵称与头像',
					success: function(resp) {
						uni.login({
							success: function(res) {
								// console.log(resp)
								// console.log(res)
								let user = {
									code: res.code,
									nickname: resp.userInfo.nickName,
									avatarUrl: resp.userInfo.avatarUrl,
									city: resp.userInfo.city,
									country: resp.userInfo.country,
									province: resp.userInfo.province,
									gender: resp.userInfo.gender
								}
								http.login(user).then(res => {
									_self.userInfo = res.data
									// 缓存用户信息
									_self.login(res.data)
								})
								// 初始化用户信息
								setTimeout(function() {
									_self.init()
								}, 1000);
							},
							fail: function() {
								console.log("fail use getUserProfile");
							}
						})
					}
				})
				
			},
			// 获取手机号
			getPhoneNumber(phoneNumber) {
				const userInfo = uni.getStorageSync('userInfo')
				let obj = {
					sessionKey: userInfo.sessionKey,
					iv: phoneNumber.detail.iv,
					encryptedData: phoneNumber.detail.encryptedData
				}
				http.getPhoneNumber(obj).then(res => {
					userInfo.phone = res.data.phone
					// 缓存用户信息
					_self.login(userInfo)
					// 初始化用户信息
					setTimeout(function() {
						_self.init()
					}, 1000);
				})
			},
			// 是否退出登录
			onremoveLogout() {
				uni.showModal({
					title: '提示',
					content: '是否退出登录',
					success: function(res) {
						if (res.confirm) {
							_self.logout(res)
							// 初始化用户信息
							setTimeout(function() {
								_self.init()
							}, 1000);
							// #ifdef APP-PLUS
							if(this.userInfo == undefined || this.userInfo == '') {
								uni.navigateTo({url: '/pages/user/login'});
							}
							// #endif
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			},
			toUser(e) {
				uni.navigateTo({url: `/pages/user/user?openId=${e}`});
			},
			lyClick() {
				const userInfo = this.userInfo
				if(userInfo.openId == undefined || userInfo.openId == null) {
					uni.showToast({
						title: '请先登录哦',
						icon: 'none'
					})
					return
				}
				uni.navigateTo({url: `/pages/user/collect?userId=${userInfo.openId}`});
			},
			toChat() {
				const userInfo = this.userInfo
				if(userInfo.openId == undefined || userInfo.openId == null) {
					uni.showToast({
						title: '请先登录哦',
						icon: 'none'
					})
					return
				}
				uni.navigateTo({url: '/pages/chat/index'});
			},
			// 查询未读消息条数
			queryUnreadTotal() {
				const userInfo = this.userInfo
				if(userInfo.openId == undefined || userInfo.openId == null) {
					return
				}
				http.queryUnreadTotal({userId: userInfo.openId}).then(res => {
					this.unreadMsgTotal = res.data
				})
			},
			toFollow() {
				const userInfo = this.userInfo
				if(userInfo.openId == undefined || userInfo.openId == null) {
					uni.showToast({
						title: '请先登录哦',
						icon: 'none'
					})
					return
				}
				uni.navigateTo({url: `/pages/user/follow?openId=${this.userInfo.openId}`});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.top {
		height: 250rpx;
		position: relative;

		.background {
			background-color: #ffaa00;
			border-bottom-left-radius: 22px;
			border-bottom-right-radius: 22px;
			position: absolute;
			height: 180rpx;
			width: 100%;
		}
	}

	.icon {
		color: #96a1ae;
		font-size: 40rpx;
	}

	.user-card {
		height: 170rpx;
		padding: 0 15px;

		.card {
			position: relative;
			bottom: 62px;
			height: 250rpx;
			background-color: white;
			border-radius: 5px;

			.top {
				height: 30%;
				position: relative;

				.userImage {
					position: absolute;
					bottom: 24%;
					left: 10%;
					width: 150rpx;
					height: 150rpx;
					overflow: hidden;
					border-radius: 50%;
					border: 2px solid white;
					
					image {
						width: 100%;
						height: 100%;
					}
				}
			}

			.bottom {
				display: flex;
				height: 70%;

				.left {
					width: 80%;
					height: 100%;
					position: relative;

					.user-text {
						width: 100%;
						font-size: 36rpx;
						padding-left: 80rpx;
						height: 50%;
					}

					.user-phone {
						color: #96a1ae;
						padding-left: 80rpx;
						height: 50%;
						width: 100%;
						font-size: 0.9em;
					}
				}

				.right {
					width: 20%;
					height: 50%;
				}
			}
		}
	}

	.list-card {
		padding: 0 15px;

		.card {
			border-radius: 5px;
			position: relative;
			background-color: white;
			border-radius: 5px;
			padding: 5px 30px;

			.item {
				display: flex;
				height: 120rpx;

				.left {
					width: 15%;

					image {
						width: 70rpx;
						height: 70rpx;
					}
				}

				.center {
					width: 65%;
					display: flex;
					justify-content: start;
					align-items: center;
					font-size: 32rpx;
				}

				.right {
					width: 20%;
					justify-content: flex-end;
				}
			}
		}
	}

	.item-bottom-solid {
		border-bottom: 1px solid #d4d6da;
	}

	.quit {
		height: 100rpx;
		margin-top: 50px;

		.btn {
			background-color: #4f99ff;
			border-radius: 30px;
			width: 80%;
			color: white;
			font-size: 32rpx;
			height: 100%;
		}
	}

	.flex-center {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.phoneButton {
		width: 300rpx;
		background-color: transparent;
		color: #96a1ae;
		font-size: 24rpx;
		display: inline-block;
		margin-top: -14rpx;
	}
	
	.phoneButton::after { border: none }
	
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
		margin-right: 10rpx;
		margin-left: 10rpx;
	}
	
</style>
