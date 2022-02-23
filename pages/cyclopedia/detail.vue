<template>
	<view class="content">
		<view class="rich-view">
			<rich-text :nodes="obj.content"></rich-text>
		</view>
	</view>
</template>

<script>
	import http from '@/api/backend.js'
	export default {
		data() {
			return {
				obj: {},
				id: ""
			}
		},
		onLoad(option) {
			this.id = option.id
			this.getPetCyclopedia(option.id)
		},
		onPullDownRefresh() {
			this.getPetCyclopedia(this.id)
			uni.stopPullDownRefresh()
		},
		methods: {
			getPetCyclopedia(e) {
				const params = {id: parseInt(e)}
				http.getPetCyclopedia(params).then(res => {
					this.obj = res.data
				})
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
</style>
