<template>
	<view>
		<view class="head head-height">
			<block v-if="!hasUserInfo">
				<view class="userinfo">
					<image class="userinfo-avatar" src="../../../static/avatar.png" mode="cover"></image>
					<text class="userinfo-nickname">登录</text>
				</view>
			</block>
			<block v-else>
				<view class="userinfo">
					<image bindtap="bindViewTap" class="userinfo-avatar" :src="userInfo.avatar ? userInfo.avatar : '../../../static/avatar.png'" mode="cover"></image>
					<text class="userinfo-nickname">{{ userInfo?.username ? userInfo?.username : '微信用户' }}</text>
				</view>
			</block>
		</view>
		<view class="list-wrapper"  v-if="hasUserInfo">
		  <view class="row m32 mt64"  @click="goUserInfo">
		    <view class="left-t t34">基本信息</view>
		    <view class="right-t">
		      <image src="../../../static/arrow.svg" />
		    </view>
		  </view>
		
		  <view class="row m32 mt64"  @click="loginOut">
		    <view class="left-t t34">退出登录</view>
		    <view class="right-t">
		      <image src="../../../static/arrow.svg" />
		    </view>
		  </view>
		  </view>
	</view>
</template>

<script>
import { supabase } from '../../../lib/supabaseClient';
import { DownloadImage } from '../../../utils/commonApi'

export default {
	data() {
		return {
			hasUserInfo: false,
			userInfo: null,
			extraIcon_user: {
				color: '#909090',
				size: '24',
				type: 'auth-filled'
			},
			extraIcon_out: {
				color: '#909090',
				size: '24',
				type: 'refresh-filled'
			}
		}

	},
	methods: {
		async loginOut() {
			const { error } = await supabase.auth.signOut();
			if (error) {
				uni.showToast({
					title: error.message || error.error_description,
					duration: 1500,
					icon: 'none'
				});
			} else {
				getApp().globalData.userInfo = null;
				this.userInfo = null;
				this.hasUserInfo = false;
				uni.showToast({
					title: '退出成功',
					duration: 1500
				});
				uni.redirectTo({
					url: '/pages/login/index'
				});
			}
		},
		goUserInfo(){
			uni.navigateTo({
			  url: "/pages/userinfo/index",
			});
		},
		async setUserInfo(userInfo) {
			if (userInfo != null) {
				if (userInfo.avatar) {
					var avatar = await DownloadImage(userInfo.avatar);
				}
				this.userInfo = userInfo;
				this.userInfo.avatar = avatar;
				this.hasUserInfo = true;
			}
		}
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var that = this;
		if (getApp().globalData.userInfo) {
			if (JSON.stringify(getApp().globalData.userInfo.user_metadata) !== '{}') {
				that.setUserInfo(getApp().globalData.userInfo.user_metadata);
			}
		} else {
			uni.redirectTo({
				url: '/pages/login/index'
			})

		}
	}
};
</script>

<style></style>
