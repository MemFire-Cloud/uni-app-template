<template>
	<view class="section">
		<textarea placeholder="请输入内容" v-model="todoInfo.todo" auto-focus />

		<button class="add-btn" @click="addItem">确定</button>
	</view>
</template>
<script>
import { supabase } from '../../lib/supabaseClient'
import {
	UpdateTodo,
	AddTodo,
	fetchOneTodo
} from "./api";
export default {
	data() {
		return {
			id: null,
			todoInfo: {},
			user_id: null
		}
	},
	onLoad(e) {
		this.user_id = getApp().globalData.userInfo.id;
		if (e.id) {
			this.id = e.id;
			fetchOneTodo(this.id)
				.then((res) => {
					this.todoInfo = res[0]
				})
				.catch((err) => {
					uni.showToast({
						title: err,
						icon: "none",
						duration: 2000,
					});
				});
		}
	},
	methods: {
		addItem() {
			if (!this.id) {
				AddTodo({
					todo: this.todoInfo.todo,
					completed: false,
					user_id: this.user_id
				})
					.then((res) => {
						uni.showToast({
							title: '新增成功',
							icon: "none",
							duration: 2000
						});
						uni.navigateTo({
							url: '/pages/todo/index',
						})
					})
					.catch((err) => {
						uni.showToast({
							title: err,
							icon: "none",
							duration: 2000,
						});
					});
			} else {
				UpdateTodo({
					todo: this.todoInfo.todo,
					completed: this.todoInfo.completeCheck
				}, this.id)
					.then((res) => {
						uni.showToast({
							title: '修改成功',
							icon: "none",
							duration: 2000
						});
						uni.navigateTo({
							url: '/pages/todo/index',
						})
					})
					.catch((err) => {
						uni.showToast({
							title: err,
							icon: "none",
							duration: 2000,
						});
					});
			}
		}
	}
}
</script>