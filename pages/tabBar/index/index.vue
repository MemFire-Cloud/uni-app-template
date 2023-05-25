<template>
	<view>
		<view class="container2" @click="tabLink('todolist')">
			<text class="top-banner">模板集</text>
			<view class="wall-box mt40">
				<view class="banner-box"> ToDoList </view>
			</view>
			<view class="wall-box mt40" @click="tabLink('messages')">
				<view class="banner-box"> 聊天室 </view>
			</view>
			<view class="wall-box mt40" @click="tabLink('filestorage')">
				<view class="banner-box"> 网盘 </view>
			</view>
			<view class="wall-box mt40" @click="tabLink('login')">
				<view class="banner-box"> 登录认证 </view>
			</view>
		</view>
	</view>
</template>
<script>
	import {
		supabase
	} from '../../../lib/supabaseClient.js'
	// navigate.vue页面接受参数
	export default {
		onShow: async function() {
			const {
				data: {
					session
				},
				error
			} = await supabase
				.auth.getSession()
			if (!session || error) {
				uni.redirectTo({
					url: '/pages/login/index'
				})
			}
		},
		methods: {
			tabLink(tab) {
				if (tab === "todolist") {
					uni.navigateTo({
						url: "/pages/todo/index",
					});
				} else if (tab === "messages") {
					uni.navigateTo({
						url: "/pages/messages/index",
					});
				} else if (tab === "filestorage") {
					uni.navigateTo({
						url: "/pages/filestorage/index",
					});
				} else {
					uni.navigateTo({
						url: "/pages/login/index",
					});
				}
			}
		}

	}
</script>