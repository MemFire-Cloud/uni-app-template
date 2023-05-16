<template>
<view class="container-chat">
  <view class="main-chat">
    <view class="msg-items" style="display:flex;flex-direction: column;">
      <!-- 每条信息 -->
      <view :class="item.user_id == userInfo.id ? 'r-re msg-box':'msg-box'" v-for="(item, index) in messages" :key="index">
      <image  :class="item.user_id == userInfo.id ? 'sj':'osj'"  :src="item.imgUrl" />
        <view :class="item.user_id == userInfo.id ? 'me chat-item':'chat-item'">
          <view class="clearfix">
            <view class="user-name">
              {{ item.user_name }}
            </view>
            <view class="msg-bubble-box">
              <view class="msg-bubble-area clearfix">
                <view :class="item.user_id == userInfo.id ? 'msg-bubble':'other-bubble msg-bubble'">
                  <view class="text">{{item.message}}</view>
                </view>
              </view>
              <view class="time">{{item.created_at}}</view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view class="send-msg-box-wrapper">
      <view class="send-msg-box">
        <view class="input-area">
          <input type="text" class="msg-content"  @confirm="send" v-model="inputTxt" />
        </view>
        <view class="btn-area">
          <image src="../../static/send.png" @click="send" class="plus-icon" alt=""/>
        </view>
      </view>
    </view>

  </view>
  
</view>
</template>

<script>
	import { supabase } from '../../lib/supabaseClient'
	import { DownloadImage } from '../../utils/commonApi'
	var mySubscription;
	export default {
		data() {
			return {
				userInfo: null,
				totalPeoples: [],
				messages: null,
				inputTxt: '',
			}
		},
		methods: {
			  async send() {
			    const { error } = await supabase.from("messages").insert([
			      {user_id: this.userInfo.id,
			        message:this.inputTxt,
			        avatar: this.userInfo.user_metadata.avatar ? this.userInfo.user_metadata.avatar :'',
			        user_name: this.userInfo.user_metadata.username ? this.userInfo.user_metadata.username :'微信用户',
			      },
			    ]);
			    this.inputTxt = ''
			  },
			  async getInitialMessages() {
			    const { data:{data}, error } = await supabase
			      .from('messages')
			      .select()
			    if (error) {
			      throw error.message || error.error_description
			    } else {
			      if (data.length > 0) {
			        const responses = [];
			        for (const item of data) {
			          item.imgUrl = await DownloadImage(item.avatar);
			          responses.push(item);
			        }
			      }
			      return data
			    }
			  }
		},
		  onLoad: async function (options) {
		    let mySubscriptions = supabase
		      .channel("public:messages")
		      .on(
		        "postgres_changes",
		        {
		          event: "*",
		          schema: "public",
		          table: "messages",
		        },
		        (payload) => {
		          this.getInitialMessages()
		            .then((res) => {
		              this.messages = res
		            })
		            .catch((err) => {
		              uni.showToast({
		                title: err,
		                duration: 1500,
		                icon:'none'
		              });
		            });
		        }
		      )
		      .subscribe();
		    //查询个人信息
		    if (getApp().globalData.userInfo.id) {
		      this.userInfo = getApp().globalData.userInfo
		    } else {
		      uni.showToast({
		        title: '请先登录',
		        duration: 1500,
		        icon:'none'
		      });
		    }
		    //获取聊天数据
		    this.getInitialMessages()
		      .then((res) => {
		        this.messages = res
		      })
		      .catch((err) => {
		        uni.showToast({
		          title: err,
		          duration: 1500,
		          icon:'none'
		        });
		      });
		      mySubscription = mySubscriptions
		  },
		  onUnload: function () {
		    // 页面关闭
		    supabase.removeChannel(mySubscription);
		  },
	}
</script>

<style>

</style>
