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
// navigate.vue页面接受参数
export default {
	onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数

	}
}
</script>
