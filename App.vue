<script>
	import { supabase } from './lib/supabaseClient'
	export default {
		globalData: {  
		            userInfo: null
		        },
		onLaunch: async function() {
			      const { data: { user }, error } = await supabase
			        .auth.getUser()
			      if (error || !user) {
					  uni.redirectTo({
					  	url:'/pages/login/index'
					  })
			      } else {
			        this.globalData.userInfo = user.data;
			        uni.switchTab({
			          url: '/pages/tabBar/index/index',
			        })
			      }
		},
		onShow: function() {
			console.log('App Show')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import './common/style.css';
</style>
