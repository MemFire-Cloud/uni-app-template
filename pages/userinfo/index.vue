<template>
<view class="container">
  <view class="user-info">
    <button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
    <text v-if="!avatar">点我获取头像</text>
    <image v-else class="avatar" :src="avatar"></image>
  </button> 
    <input class="username" placeholder="请输入用户名"  v-model="username" />

  </view>
  <view class="user-intro">
    <textarea class="intro-text" placeholder="请输入个人简介"  v-model="introduction" />
  </view>
  <button class="submit" @click="submit">提交</button>
</view>
</template>

<script>
	import { supabase } from '../../lib/supabaseClient'
	import { DownloadImage } from '../../utils/commonApi'
	export default {
		data() {
			return {
				username:'',
				avatar: '',
				introduction: '',
				filePath:'',
			}
		},
		methods: {
			  // 提交用户信息
			  submit: async function () {
			    const that = this;
			    let path = '';
			    if(that.filePath){
			      path = that.filePath
			    }else{
			      path =  getApp().globalData.userInfo.user_metadata.avatar
			    }
			    const { data, error } = await supabase.auth.updateUser({
			      data: { avatar: path, username: that.username, introduction: that.introduction }
			    })
			    if (error) {
			      uni.showToast({
			        title: error.message || error.error_description,
			        duration: 1500,
			        icon:'none'
			      });
			    } else {
			      getApp().globalData.userInfo = data.user.data
			      uni.showToast({
			        title: '修改成功',
			        duration: 1500
			      });
			      uni.switchTab({
			        url: '/pages/tabBar/me/me',
			      })
			    }
			
			  },
		  // 更新头像
		  async onChooseAvatar(e) {
			let { avatarUrl } = e.detail;
			let that = this;
			uni.getImageInfo({
			  src: avatarUrl, // 图片路径，必须是本地路径，可以相对路径或绝对路径
			  success: async function (res) {
				const file = { fileType: "image", width: res.width, height: res.height, tempFilePath: avatarUrl }
				const fileExt = avatarUrl.split('.').pop()
				const fileName = `${Math.random()}.${fileExt}`
				const filePath = `${fileName}`
				that.filePath = filePath;
				let { error: uploadError } = await supabase.storage
				  .from('avatars')
				  .upload(filePath, file)
				if (uploadError) {
				  throw uploadError
				}
				that.avatar =  await DownloadImage(filePath) 
			  }
			})
		  },
		},
	   onLoad: async function () {
		if(getApp().globalData.userInfo){
		  if (JSON.stringify(getApp().globalData.userInfo.user_metadata) !== '{}') {
			if(getApp().globalData.userInfo.user_metadata.avatar){
			  this.avatar = getApp().globalData.userInfo.user_metadata.avatar
			}
		  }
		  this.username = getApp().globalData.userInfo?.user_metadata.username ? getApp().globalData.userInfo.user_metadata.username : '';
		  this.introduction = getApp().globalData.userInfo?.user_metadata.introduction ? getApp().globalData.userInfo.user_metadata.introduction : ''
		}
	  },
	}
</script>

<style>

</style>
