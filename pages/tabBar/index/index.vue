<template>
	<view>
		<uni-list>
			<uni-list-item title="todoList" link to="/pages/todo/index" ></uni-list-item>
			<uni-list-item title="网盘" link="reLaunch" to="/pages/filestorage/index" ></uni-list-item>
			<uni-list-item title="聊天室" link="reLaunch" to="/pages/messages/index"></uni-list-item>
		</uni-list>
	</view>
</template>
<script>
import { supabase } from '../../lib/supabaseClient'
// navigate.vue页面接受参数
export default {
	onShow: async function () {
			const { data: { session }, error } = await supabase
			.auth.getSession()
			if (!session || error) {
				uni.redirectTo({
				url:'/pages/login/index'
				})
			}
	}
}
</script>
