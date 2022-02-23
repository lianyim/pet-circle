<template>
	<view>
		<web-view :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: ""
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
