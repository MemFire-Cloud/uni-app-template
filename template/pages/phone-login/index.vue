<template>
<view class="container">
  <form>
    <view class="inputView">
      <input class="inputText"  placeholder="请输入手机号" name="phone" v-model="phone" />
    </view>
    <view class="inputView">
      <input class="inputText" v-model="code" placeholder="请输入验证码" name="code" />
      <button :class="disabled ? 'disabled line':'line'"  :type="disabled?'defalut':'primary'" :disabled="disabled" size="mini" @click="sendcode">{{codebtn}}</button>
      </view>
    <view class="loginBtnView">
      <button class="loginBtn" type="primary" @click="submit">登录</button>
    </view>
  </form>
</view>
</template>

<script>
	import { supabase } from '../../lib/supabaseClient'
	export default {
		data() {
			return {
				phone: '',
				code: '',
				codebtn: '发送验证码',
				disabled: false,
			}
		},
		methods: {
			  //发送验证码
			  async sendcode(res) {
				var that = this;
				var phone = that.phone;
				let reg = /^[1][3,4,5,7,8][0-9]{9}$/;
				if (!reg.test(phone)) {
				  uni.showToast({
				    title: '手机号码格式不正确',
				    icon: "none",
				    duration: 2000
				  })
				  return false;
				}
				var time = 60;
				that.disabled = true;
				let { data, error } = await supabase.auth.signInWithOtp({
				  phone: phone,
				})
				if (error) {
				  uni.showToast({
					title: error.message || error.error_description,
					duration: 1500,
					icon: "none",
				  });
				  that.disabled =  false;
				} else {
				  setTimeout(() => {
					that.disabled =  false;
				  }, 60000);
				}
			  },
			  // 登录处理
			  async submit() {
				var phone = this.phone;
				var code = this.code;
				if(!code){
					uni.showToast({
						title: '请输入验证码',
						duration: 1500,
						icon: "none",
					});
					return false;
				}
				let { data, error } = await supabase.auth.verifyOtp({
				  phone: phone,
				  token: code,
				  type: 'sms',
				})
				if(error){
				  uni.showToast({
					title: error.message || error.error_description,
					duration: 1500,
					icon:'none'
				  });
				}else{
				  getApp().globalData.userInfo = data.session.user;
				  if(JSON.stringify(data.session.user.user_metadata) === '{}'){
					uni.showToast({
					  title: '登录成功,前往修改个人信息页面',
					  duration: 1500
					});
					uni.switchTab({
					  url: '/pages/tabBar/userinfo/index',
					})
				  }else{
					uni.showToast({
					  title: '登录成功',
					  duration: 1500
					});
					uni.switchTab({
					  url: '/pages/tabBar/index/index',
					})
				  }

				}
			  },
		}
	}
</script>

<style>

</style>
