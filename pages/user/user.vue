<template>
	<view>
		<view class="user-view">
			<view class="img-view">
				<image mode="aspectFill" :src="userInfo.avatarUrl"></image>
			</view>
			<view class="name-view">
				<view style="display: flex;align-items: center;">
					<text class="name-text">{{userInfo.nickname}}</text>
					<text style="margin-left: 20rpx;background-color: #FFFFFF;color: #ff5500;font-size: 20rpx;padding-left: 6rpx;padding-right:6rpx;border-radius: 6rpx;">未实名</text>
					<image v-if="openId != userOpenId" src="../../static/myIcon/chat.png" mode="aspectFill" class="chat-img" @click="toChat"></image>
				</view>
				<view class="love-view">
					发布的领养 {{petCount.petAdoptCount}}&nbsp;&nbsp;
					发布的寻宠 {{petCount.petFindCount}}
				</view>
			</view>
		</view>
		<view class="content">
			<view class="typeView">
				<axb-check-box :list="typeList" @change="chooseType"></axb-check-box>
			</view>
			<view class="content-view" v-for="(item, index) in dataList" :key="index" @click="toDetail(item)" v-if="dataList[0].avatarUrl == null">
				<view style="float: left;">
					<image :src="item.pictures[0]" class="content-img" mode="aspectFill"></image>
				</view>
				<view class="content-content">
					<view v-if="item.physicalCondition != undefined" class="logo">{{item.isFinish == "0" ? "已被领养" : "等待领养"}}</view>
					<text style="margin-top: -30rpx;">{{item.nickname}}，{{item.age}}</text>
					<text class="content-text" style="margin-top: 26upx; font-size: 24rpx; color: #778288;height: 70rpx;">{{item.content}}</text>
					<view class="note">
						<text v-if="item.physicalCondition[0]" style="background-color: #368BE3;">{{item.physicalCondition[0]}}</text>
						<text v-if="item.physicalCondition[1]" style="background-color: #70AF48;">{{item.physicalCondition[1]}}</text>
						<text v-if="item.physicalCondition[2]" style="background-color: #F08080;">{{item.physicalCondition[2]}}</text>
					</view>
					<text v-if="item.physicalCondition == undefined" style="margin-top: 10upx; font-size: 24rpx;">📍{{item.city}}</text>
					<view v-if="item.physicalCondition == undefined">
						<text style="margin-top: 36upx; font-size: 24rpx; color: #778288;">{{item.updateTime}}发布</text>
						<text style="margin-top: 36upx; font-size: 24rpx; color: #778288;margin-left: 20rpx;">👀{{item.view}}</text>
					</view>
				</view>
			</view>
			
			<!-- 动态列表 -->
			<view class="content-area" v-if="dataList[0].avatarUrl != null">
				<view class="content-view" v-for="(item, index) in dataList" :key="index" @click="toCircleDetail(item)">
					<view>
						<!-- <image :src="item.avatarUrl" mode="aspectFill"></image> -->
						<!-- <view>
							<text>{{item.nickname}}</text>
							</br>
							<text style="font-size: 22rpx;color: #999999;">{{item.updateTime}}</text>
						</view>
						<text style="font-size: 22rpx;color: #55aaff;"></text> -->
					</view>
					<view>{{item.content}}</view>
					<view>
						<image style="width: 60%;height: 500rpx;border-radius: 10rpx;" mode="aspectFill"
							v-if="item.pictures.length == 1" :src="item.pictures[0]" @click="previewImage(item.pictures[0], index)"></image>
						<image v-if="item.pictures.length > 1" v-for="(i, ind) in item.pictures" :key="ind" mode="aspectFill"
							:src="i" @click="previewImage(i, index)"></image>
					</view>
					<view style="font-size: 22rpx;color: #999999;clear: both;">发布时间：{{item.updateTime}}</view>
					<view style="height: 20rpx;clear: both;"></view>
				</view>
			</view>
			
			<view class="cue-words" v-if="dataList.length == 0">没有更多数据</view>
			<view style="height: 80rpx;"></view>
		</view>
	</view>
</template>

<script>
	import axbCheckBox from '../../components/axb-checkbox/axb-checkbox.vue'
	import http from '@/api/backend.js'
	export default {
		components: {
			axbCheckBox
		},
		data() {
			return {
				dataList: [],
				typeList: [{
						name: "发布的领养",
						value: "1",
						checked: 1
					},
					{
						name: "发布的寻宠",
						value: "2",
						checked: 0
					},
					{
						name: "发布的动态",
						value: "3",
						checked: 0
					}
				],
				openId: "",
				type: "1",
				userInfo: {},
				petCount: {},
				userOpenId: ''
			}
		},
		onLoad(option) {
			const userInfo = uni.getStorageSync('userInfo')
			this.userOpenId = userInfo.openId
			this.openId = option.openId
			this.getUserInfo(option.openId)
			this.queryPetCount(option.openId)
			this.chooseType("1")
		},
		onPullDownRefresh() {
			this.queryPetCount(this.openId)
			this.getUserInfo(this.openId)
			if(this.type == "1") {
				this.queryPetAdopts(1, 10, this.openId, "", "")
			}else if(this.type == "2") {
				this.queryPetFinds(1, 10, this.openId, "", "")
			}else if(this.type == "3") {
				this.queryPetCircles(this.openId, 1, 10)
			}
			uni.stopPullDownRefresh()
		},
		methods: {
			// 查询用户信息
			getUserInfo(openId) {
				http.getUserInfo({openId: openId}).then(res => {
					this.userInfo = res.data
				})
			},
			// 查询领养列表
			queryPetAdopts(pageNum, pageSize, openId, city, updateTime) {
				const obj = {
					openId: openId,
					pageNum: pageNum,
					pageSize: pageSize,
					city: city,
					updateTime: updateTime
				}
				http.queryPetAdopts(obj).then(res => {
					this.dataList = res.data
				})
			},
			// 查询寻宠列表
			queryPetFinds(pageNum, pageSize, openId, city, updateTime) {
				const obj = {
					pageNum: pageNum,
					pageSize: pageSize,
					openId: openId,
					city: city,
					updateTime: updateTime
				}
				http.queryPetFinds(obj).then(res => {
					this.dataList = res.data
				})
			},
			// 查询动态列表
			queryPetCircles(openId, pageNum, pageSize) {
				const obj = {
					openId: openId,
					pageNum: pageNum,
					pageSize: pageSize
				}
				http.queryPetCircles(obj).then(res => {
					this.dataList = res.data
				})
			},
			chooseType(e) {
				this.type = e
				if(e == "1") {
					this.queryPetAdopts(1, 10, this.openId, "", "")
				}else if(e == "2") {
					this.queryPetFinds(1, 10, this.openId, "", "")
				}else if(e == "3") {
					this.queryPetCircles(this.openId, 1, 10)
				}
			},
			toDetail(item) {
				let url = ""
				if(this.type == "1") {
					url = `/pages/home/detail?id=${item.id}`
				}else {
					url = `/pages/find/detail?id=${item.id}`
				}
				uni.navigateTo({
					url: url
				});
			},
			queryPetCount(openId) {
				http.queryPetCount({openId: openId}).then(res => {
					this.petCount = res.data
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
			// 去聊天
			toChat() {
				uni.navigateTo({
					url: `/pages/chat/detail?toId=${this.userInfo.openId}`
				});
			},
			// 社区详情
			toCircleDetail(item) {
				uni.navigateTo({
					url: `/pages/community/detail?id=${item.id}`
				});
			}
		}
	}
</script>

<style lang="scss">
	.content {
		padding: 30rpx;
	}
	
	.user-view {
		background-color: #f8a500;
		padding: 100rpx;
		height: 100rpx;
		
		.img-view {
			float: left;
			
			image {
				width: 130rpx;
				height: 130rpx;
				border-radius: 20rpx;
			}
		}
		
		.name-view {
			float: left;
			margin-left: 40rpx;
			color: #FFFFFF;
			
			.name-text {
				float: left;
				font-size: 32rpx;
			}
			
			.love-view {
				float: left;
				margin-top: 50rpx;
				font-size: 24rpx;
			}
			
			.chat-img {
				width: 50rpx;
				height: 50rpx;
				float: right;
			}
		}
	}
	
	.content > .content-view {
		width: 100%;
		height: 300upx;
		box-shadow: 0 0 9px 3px #cee1eb;
		margin: 0 auto;
		border-radius: 20upx;
		margin-top: 40rpx;
		
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
			justify-content:center;
			padding-left: 30upx;
			
			.logo {
				width: 120rpx;
				height: 50rpx;
				background-color: #fca400;
				position: relative;
				left: 270rpx;
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
	.typeView {
		margin-left: -20upx;
		margin-top: 20rpx;
	}
	
	
	.content-area {
		margin-top: 25rpx;
		
		.content-view {
			clear: both;
			border-top: 2rpx solid #d0e3ec;
			margin-bottom: 30rpx;
		}
		
		.content-view view:first-child {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		
		.content-view view:nth-child(2) {
			margin-top: 20rpx;
			margin-bottom: 20rpx;
			font-size: 30rpx;
		}
		
		.content-view view:nth-child(3) {
			height: 100%;
			margin-left: -10rpx;
			
			image {
				width: 30%;
				height: 200rpx;
				float: left;
				margin: 10rpx;
				border-radius: 10rpx;
			}
		}
		
		.content-view view:first-child image {
			width: 100rpx;
			height: 100rpx;
			border-radius: 12rpx;
		}
		
		.content-view view:first-child view {
			margin-left: -370rpx;
		}
	}
</style>
