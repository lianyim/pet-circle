<template>
	<view class="sun-index">		<view class="sun-logo-box">			<view class="sun-logo">				<image class="sun-icon-img" src="@/static/imgs/moom_white.png"/>			</view>		</view>
		<view class="sun-login-box">			<view class="sun-label">				<image style="width: 28rpx;height:39rpx;" src="@/static/imgs/mobile_icon.png"/>				<text class="label-text">手机</text>			</view>			<view class="sun-input-box">				<input v-model="mobile" type="text" placeholder="请输入手机号" placeholder-class="placeholder-class"/>				<image @click="mobile=''" class="close-icon" src="@/static/imgs/close_icon.png"/>			</view>		</view>		<view class="sun-login-box">			<view class="sun-label">				<image style="width: 29rpx;height:29rpx;" src="@/static/imgs/code_icon.png"/>				<text class="label-text">验证码</text>			</view>			<view class="sun-input-box">				<input v-model="code" type="text" placeholder="请输入验证码" placeholder-class="placeholder-class"/>				<text class="code-text" :class="{gray:showTime}" @click="handleGetCodeClick">{{showTime ?currentCountTime+'s后重新获取':'获取验证码'}}</text>			</view>		</view>		<view class="sun-login-box">			<view class="sun-label">				<image style="width: 29rpx;height:37rpx;" src="@/static/imgs/pwd_icon.png"/>				<text class="label-text">密码</text>			</view>			<view class="sun-input-box">				<input v-model="password" type="text" placeholder="请输入密码" placeholder-class="placeholder-class"/>				<image @click="password=''" class="close-icon" src="@/static/imgs/close_icon.png"/>			</view>		</view>		<view class="login-btn-box">			<view class="login-btn" @click="handleSubmit">注册</view>		</view>	</view>
</template>

<script>
	export default {
		data() {
			return {
				mobile:'',				password:'',				code:'',				countTime: 60, 				currentCountTime: 0,				showTime:false,				timeId:null
			}
		},		created() {			this.currentCountTime = this.countTime		},
		onLoad() {

		},
		methods: {
			handleSubmit() {				if(!this.mobile) return uni.showToast({title: '请输入手机号',icon:'none',duration: 1500})				if(!this.code) return uni.showToast({title: '请输入验证码',icon:'none',duration: 1500})				if(!this.password) return uni.showToast({title: '请输入密码',icon:'none',duration: 1500})				uni.showToast({title: '注册成功',duration: 1500})			},			handleGetCodeClick() {				this.showTime = true				if(this.showTime && this.currentCountTime !== this.countTime) return				this.currentCountTime				this.timeId = setInterval(()=>{					if(this.currentCountTime <= 0) {						this.currentCountTime = this.countTime						this.showTime = false						clearInterval(this.timeId)					}					this.currentCountTime--				},1000)			}
		}
	}
</script>

<style scoped>	.sun-logo-box {		display: flex;		justify-content: center;		align-items: center;		width: 750rpx;		height: 300rpx;	}	.sun-icon-img {		width: 120rpx;		height: 120rpx;	}
	.sun-logo {		display: flex;		justify-content: center;		align-items: center;		width: 180rpx;		height: 180rpx;		border-radius: 15rpx;		background-color: #12C8B9;		box-shadow: 0rpx 0rpx 30rpx rgba(18,200,185,0.5);	}	.close-icon {		width: 36rpx;		height: 34rpx;	}	.sun-login-box {		padding: 20rpx 60rpx;	}	.sun-label {		display: flex;		align-items: center;	}	.label-text {		margin-left: 16rpx;		font-weight: 500;		color: #272e2d;		font-size: 30rpx;	}	.sun-input-box {		display: flex;		align-items: center;		height: 100rpx;		border-bottom: 1rpx solid #eee;		padding: 0px 10rpx;	}	.sun-input-box input {		flex: 1;	}	.placeholder-class {		font-size: 30rpx;		color: #C0C0C0;	}	.sun-tip {		display: flex;		justify-content: space-between;		padding: 0rpx 68rpx;	}	.sun-tip-text {		color: #30C6B3;	}	.login-btn-box {		position: absolute;		bottom: 129rpx;		left: 0;		width: 750rpx;		padding: 50rpx 68rpx 0rpx;	}	.login-btn {		height: 82rpx;		border-radius: 41rpx;		background-color: #12C8B9;		box-shadow: -1px 12px 11px 0px rgba(16, 170, 157, 0.4);		text-align: center;		line-height: 82rpx;		font-size: 36rpx;		font-weight: 500;		color: #fff;	}	.code-text {		font-size: 28rpx;		color: #30C6B3;	}	.gray {		color: #C0C0C0;	}</style>
