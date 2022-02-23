<template>
	<view class="content">
		<video style="width: 100%;" :src="videoUrl" show-mute-btn enable-play-gesture></video>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				videoUrl: "https://pet-life.oss-cn-beijing.aliyuncs.com/videos/author/%E5%A4%B1%E7%89%A9%E6%8B%9B%E9%A2%86%20%28%E3%80%8A%E4%BB%A5%E5%B9%B4%E4%B8%BA%E5%8D%95%E4%BD%8D%E7%9A%84%E6%81%8B%E7%88%B1%E3%80%8B%E7%94%B5%E5%BD%B1%E6%83%85%E6%84%9F%E4%B8%BB%E9%A2%98%E6%9B%B2%29.mkv"
			}
		},
		onLoad(option) {
			this.url = option.url
		},
		onPullDownRefresh() {
			uni.stopPullDownRefresh()
		},
		methods: {
			
		}
	}
</script>

<style>
</style>
