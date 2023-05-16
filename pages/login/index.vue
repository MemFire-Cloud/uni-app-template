<template>
<view class="container">
  <view class="login">
    <button class="wechat" @click="login">微信用户一键登录</button>
    <button class="phone" @click="phoneLogin">手机登录/注册</button>
  </view>
</view>
</template>

<script>
	import { supabase } from '../../lib/supabaseClient'
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {
		  login(){
			uni.login({
			  success: async res => {
				const { data, error } = await supabase.auth.signInWithWechat({code:res.code})
				if(error){
				  uni.showToast({
					title: error?.error || error?.msg,
					icon: "none",
					duration: 2000
				  })
				}else if(data){
				  if(JSON.stringify(data.user.data.user.user_metadata) === "{}"){
					setTimeout(() => {
					  uni.showModal({
						title: '提示',
						content: '登录成功！去填充个人资料吧！',
						success (res) {
						  if (res.confirm) {
							uni.redirectTo({
							  url:'/pages/userinfo/index'
							})
						  } else if (res.cancel) {
						  }
						}
					  })
					}, 1000);
				  }else {
					getApp().globalData.userInfo = data.user.data.user;
					uni.switchTab({
					  url:'/pages/tabBar/index/index'
					})
				  }

				}
			  },
			  fail(err){
				uni.showToast({
				  title: err.errMsg,
				  icon: "none",
				  duration: 2000
				})
			  }
			})
		  },
		  phoneLogin(){
			uni.redirectTo({
			  url: '/pages/phone-login/index',
			})
		  }
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
