<template>
	<view class="content">
		<view class="top-view">
			<view class="swiper-view">
				<swiper class="swiper" indicator-dots autoplay interval="2000" duration="800">
					<swiper-item class="swiper-item" v-for="(item, index) in carouselList" :key="index">
						<view class="image-wrapper">
							<image :src="item" mode="aspectFill"></image>
						</view>
					</swiper-item>
				</swiper>
			</view>

			<view class="label-view">
				<view class="label" v-for="(item, index) in labelList" :key="index" @click="labelSelect(index)">
					<image mode="aspectFill" :src="item.pic"></image>
					</br>
					<text>{{item.title}}</text>
				</view>
			</view>

			<view class="cut-line"></view>

			<view class="notice">{{notice}}</view>

			<!-- 选择城市 -->
			<view class="city-view" @click="showCity = true">
				<image src="https://img0.baidu.com/it/u=3165573562,1012927251&fm=26&fmt=auto" mode="aspectFill"></image>
				{{city}}
			</view>
			<chose-city @selectCity="selectCity" v-if="showCity" @closeModal="closeModal"></chose-city>
		</view>

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
		<view class="addIcon">
			<image src="../../static/add.png" @click="toAdd()"></image>
		</view>
		<view style="height: 80rpx;"></view>
	</view>

</template>

<script>
	// 高德地图
	import amap from '@/components/amap-wx.130.js'
	// 选择城市组件
	import choseCity from "@/components/chose-city/chose-city"
	import http from '@/api/backend.js'
	export default {
		components: {
			choseCity
		},
		data() {
			return {
				pageNum: 1,
				pageSize: 10,
				share:{
					title: '喵喵宠物圈',
					path: '/pages/home/index',
					imageUrl: '',
					desc: '',
					content: '这是宠物圈'
				},
				showCity: false,
				carouselList: [
					"https://img2.baidu.com/it/u=3641303824,2346002884&fm=26&fmt=auto",
					"https://img0.baidu.com/it/u=2455893607,1922226866&fm=26&fmt=auto"
				],
				labelList: [{
						title: "签到",
						pic: "https://img1.baidu.com/it/u=2203396081,2820741733&fm=26&fmt=auto"
					},
					{
						title: "科普",
						pic: "https://img2.baidu.com/it/u=1495702358,1774492454&fm=26&fmt=auto"
					},
					{
						title: "领养流程",
						pic: "https://img2.baidu.com/it/u=1192709516,3548130280&fm=26&fmt=auto"
					},
					{
						title: "商城",
						pic: "https://img0.baidu.com/it/u=3505856860,2377911283&fm=26&fmt=auto"
					},
					{
						title: "答题星球",
						pic: "../../static/imgs/answer.png"
					}
				],
				notice: "通知：实时关注宠物动态",
				amapPlugin: null,
				key: 'd76b183c233f54efe31c24c6185750ab',
				city: "全国",
				dataList: [],
				// 微信小商店
				appId: "wxb960de1afae3ab9c",
				urlPath: "/pages/index/index"
			}
		},
		onShow() {
			this.amapPlugin = new amap.AMapWX({
				key: this.key
			});
			this.queryList(this.pageNum, this.pageSize, "", "")
		},
		onReachBottom() {
			this.pageNum++;
			this.queryList(this.pageNum, this.pageSize, "", "")
		},
		onLoad() {
			// 控制tabber显示隐藏
			http.getFlag().then(res => {
				if(res.data) {
					uni.hideTabBar();
				}
			})
			// 自动获取位置
			// this.getRegeo()
		},
		onPullDownRefresh() {
			this.queryList(1, 10, "", "")
			this.city = "全国"
			uni.stopPullDownRefresh()
		},
		methods: {
			queryList(pageNum, pageSize, city, updateTime) {
				const obj = {
					pageNum: pageNum,
					pageSize: pageSize,
					city: city,
					updateTime: updateTime
				}
				http.queryPetAdopts(obj).then(res => {
					this.dataList = this.dataList.concat(res.data)
				})
			},
			getRegeo() {
				uni.showLoading({
					title: '获取位置信息中'
				});
				this.amapPlugin.getRegeo({
					success: (data) => {
						this.addressName = data[0].name;
						this.province = data[0].regeocodeData.addressComponent.province
						this.city = data[0].regeocodeData.addressComponent.city
						uni.hideLoading();
					},
					fail: () => {
						uni.showToast({
							title: '获取位置信息失败，请检查是否开启权限！',
							duration: 2000,
							icon: none
						});
						uni.hideLoading();
					}
				});
			},
			toDetail(item) {
				uni.navigateTo({
					url: `/pages/home/detail?id=${item.id}`
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
					url: `/pages/home/add?openId=${openId}`
				});
			},
			// 点击标签
			labelSelect(e) {
				if (e == 0) {
					uni.navigateTo({
						url: '/pages/other/card'
					});
				}
				if (e == 1) {
					uni.navigateTo({
						url: '/pages/cyclopedia/index'
					});
				}
				if (e == 2) {
					uni.navigateTo({
						url: '/pages/path/adoptPath'
					});
				}
				if (e == 3) {
					// 跳转小商店
					uni.navigateToMiniProgram({
						appId: this.appId,
						path: this.urlPath,
						success: res => {
							// 打开成功
						},
						fail: err => {
							console.log(err);
						}
					});
				}
				if (e == 4) {
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
					// 跳转答题页面
					uni.navigateTo({
						url: `/pages/other/answer?userId=${openId}`
					});
				}
			},
			// 选择城市
			selectCity(item) {
				this.city = item.name
				this.showCity = false
				this.queryList(1, 10, item.name, "")
			},
			closeModal() {
				this.showCity = false
			}
		}
	}
</script>

<style lang="scss">
	.content {
		padding: 15rpx;

		&_list {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-around;

			&_lable {}

			&_content {
				flex: 1;
				width: auto;
				text-align: right;
			}
		}
	}

	.swiper {
		height: 400rpx;
	}
	
	.swiper-view {
	}

	.swiper-view .swiper .swiper-item image {
		width: 100%;
	}

	.label-view {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 40rpx;

		.label {
			text-align: center;
			font-size: $uni-font-size-base;
		}

		image {
			width: 120rpx;
			height: 120rpx;
			border-radius: 20rpx;
		}
	}

	.cut-line {
		width: 100%;
		height: 6rpx;
		background-color: #efefef;
		margin-top: 20rpx;
	}

	.notice {
		width: 100%;
		height: 10rpx;
		line-height: 10rpx;
		background-color: #FFFAF0;
		margin-top: 20rpx;
		border-radius: 10rpx;
		padding: 30rpx;
		font-size: $uni-font-size-sm;
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

	.city-view {
		font-size: 28rpx;
		margin-top: 12rpx;
		padding-left: 10rpx;
		display: flex;
		align-items: center;

		image {
			width: 30rpx;
			height: 30rpx;
		}
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
</style>
