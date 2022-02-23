<template>
	<view class="content">
		<view class="text-area-view">
			<textarea v-model="obj.content" placeholder="写下这一刻的想法..."></textarea>
		</view>

		<view class="imgView" @click="choseImg()" v-if="imgArr.length === 0">
			<image src="../../static/upload.png"></image>
		</view>
		<view style="font-size: 26rpx;color: #999999;margin-top: 20rpx;">单张图片大小不能超过10M</view>
		<!-- 预览图片 -->
		<view class="preImage" v-if="imgArr.length !== 0">
			<view v-for="(item, index) in imgArr" :key="index" style="float: left;margin-left: 20rpx;">
				<image mode="aspectFill" :src='item' @click="previewImg(item)"></image>
				<image @click="deleteImg(item)"
					style="width: 30rpx;height: 30rpx;margin-bottom: 130rpx;margin-left: -6rpx;"
					src="../../static/x.png"></image>
			</view>
			<view></view>
			<!-- <view @click="choseImg()" class="addView">
				<image src="../../static/add2.png"></image>
			</view> -->
			<!-- <view class="addView">
				<image src="../../static/add2.png"></image>
			</view> -->
		</view>
		
		<view class="btn-view" v-if="Object.keys(this.obj).length > 0">
			<button class="confirm-btn" @click="submit(obj)">发表</button>
		</view>
	</view>
</template>

<script>
	import http from '@/api/backend.js'
	export default {
		data() {
			return {
				imgArr: [],
				obj: {}
			}
		},
		onLoad() {
			http.getFlag().then(res => {
				if(res.data) {
					uni.switchTab({url: '/pages/home/index'})
				}
			})
		},
		methods: {
			choseImg() {
				var me = this
				var serverUrl = this.serverUrl;
				uni.chooseImage({
					count: 8,
					sizeType: ['original', 'compressed'],
					success: function(res) {
						let arr = res.tempFiles
						for(let i = 0; i < arr.length; i++) {
							if(arr[i].size > 10458760) {
								uni.showToast({
									title: "图片过大",
									icon: 'error'
								});
								return
							}
						}
						uni.showLoading({title: "上传中"});
						const uploadTask = http.uploadFile(res.tempFilePaths).then(picRes => {
							me.imgArr = picRes
							me.obj.pictures = picRes
							uni.hideLoading()
							uni.showToast({
								title: "上传成功",
								icon: 'success'
							});
						})
					}
				});
			},
			previewImg(item) {
				uni.previewImage({
					current: item,
					urls: this.imgArr
				})
			},
			deleteImg(item) {
				http.deletePic({picture: item}).then(res => {
					if(res.success) {
						let arr = this.imgArr
						this.imgArr = arr.filter(function(i) {
						    return i != item
						});
						this.obj.pictures = this.imgArr
						return;
					}
					this.error()
				})
			},
			submit(e) {
				const userInfo = uni.getStorageSync('userInfo')
				this.obj.openId = userInfo.openId
				if (!this.paramCheck()) return
				http.addPetCircle(this.obj).then(res => {
					console.log(res)
					if(res.success) {
						uni.showToast({
							title: '发布成功',
							icon: 'success',
							duration: 2000
						})
						setTimeout(function(){
							uni.switchTab({
								url: '/pages/community/index'
							});
						}, 1500)
						return;
					}
					this.error()
				})
			},
			error() {
				uni.showToast({
					title: '接口请求异常',
					icon: 'error',
					duration: 2000
				})
			},
			paramCheck() {
				if(this.obj.openId == null || this.obj.openId == "") {
					uni.showToast({title: '您还未登录',icon: 'none'});
					return false
				}
				if(this.obj.content == null || this.obj.content == "") {
					uni.showToast({title: '请填写您的想法',icon: 'none'});
					return false
				}
				if(this.obj.pictures == null || this.obj.pictures == "") {
					uni.showToast({title: '请选择照片',icon: 'none'});
					return false
				}
				return true
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
	
	.text-area-view {
		
		textarea {
			width: 100%;
			height: 200rpx;
			font-size: 28rpx;
		}
	}

	.imgView {
		width: 240rpx;
		height: 240rpx;
		background-color: #f1f1f1;
		display: flex;
		border-radius: 10rpx;
		margin-top: 20rpx;

		image {
			width: 80rpx;
			height: 80rpx;
			align-self: center;
			margin: 0 auto;
		}
	}

	.preImage {
		margin-left: -20rpx;
		margin-top: 20rpx;

		image {
			width: 160rpx;
			height: 160rpx;
			border-radius: 16rpx;

		}

		.addView {
			width: 160rpx;
			height: 160rpx;
			// background-color: #f1f1f1;
			display: flex;
			margin-left: 20rpx;

			image {
				width: 80rpx;
				height: 80rpx;
				align-self: center;
				margin: 0 auto;
			}
		}
	}
	.btn-view {
		width: 100%;
		height: 100rpx;
		margin-top: 100rpx;
	
		.confirm-btn {
			float: left;
			border-radius: 20rpx;
			background-color: #fea724;
			width: 20%;
			height: 60rpx;
			line-height: 60rpx;
			color: #FFFFFF;
			font-size: 30rpx;
		}
	}
</style>
