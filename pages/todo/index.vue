<template>
	<view>
		<view class="container2">
			<text class="top-banner">ToDoList</text>
			<view class="search">
				<uni-search-bar v-model="searchVal" @confirm="handerSearch"></uni-search-bar>
			</view>
			<view class="left-title">未完成</view>
		</view>
		<template v-for="(item, index) in todoList" :key="index">
			<uni-swipe-action-item v-if="!item.completed">
				<view class="swiper-item" @click="onOpenTodo(item.id)">
				  <radio-group  @change="radioChange(item.id,'completed')">
					<view @click.stop="">
					  <radio :checked="item.completed" />{{item.todo}}
					</view>
				  </radio-group>
					<uni-icons type="right" size="18"></uni-icons>
				</view>
				<template v-slot:right @click.capture.prevent>
					<view @click.stop="deleteItem(item.id)" class="swipe-cell__right"><text>删除</text></view>
				</template>
			</uni-swipe-action-item>
		</template>
		<view class="container2">
			<view class="left-title">已完成</view>
		</view>
		<template v-for="(item, index) in todoList" :key="index">
			<uni-swipe-action-item v-if="item.completed">
				<view class="swiper-item" @click="onOpenTodo(item.id)">
				  <radio-group @click.stop="">
					<view @click.stop="radioChange(item.id,'noCompleted')">
					  <radio checked="true" />{{item.todo}} 
					</view>
				</radio-group>
					<uni-icons type="right" size="18"></uni-icons>
				</view>
				<template v-slot:right @click.capture.prevent>
					<view @click.stop="deleteItem(item.id)" class="swipe-cell__right"><text>删除</text></view>
				</template>
			</uni-swipe-action-item>
		</template>
		<view class="container2">
			<button class="add-btn" @click="addItem">新建</button>
		</view>
	</view>
</template>
<script>
import {
	FetchPage,
	SearchText,
	UpdateTodo,
	DeleteTodo
} from './api';
export default {
	data() {
		return {
			searchVal: '',
			todoList: [],
			user_id: null,
			todo_id: null,
			formData: {}
		}

	},
	// 获取列表
	onLoad: function (options) {
		this.getTodoList();
	},
	methods: {
		deleteItem(id) {
			DeleteTodo(id)
				.then((res) => {
					this.getTodoList();
					uni.showToast({
						title: '删除成功！',
						icon: 'none',
						duration: 2000
					})
				})
				.catch((err) => {
					uni.showToast({
						title: err,
						icon: 'none',
						duration: 2000
					})
				});
		},
		addItem() {
			uni.navigateTo({
				url: '/pages/addTodo/index'
			})
		},
		onOpenTodo(id) {
			uni.navigateTo({
				url: '/pages/addTodo/index?id=' + id
			})
		},
		radioChange(id,type) {
			if(type === 'completed'){
				UpdateTodo({
					completed: true
				}, id)
					.then((res) => {
						this.getTodoList()
					})
					.catch((err) => {
						uni.showToast({
							title: err,
							icon: "none",
							duration: 2000,
						});
					});
			}else if(type === 'nocCompleted'){
				UpdateTodo({
					completed: false
				}, id)
					.then((res) => {
						this.getTodoList()
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
		// 获取数据
		getTodoList() {
			FetchPage()
				.then((res) => {
					this.todoList = res;
				})
				.catch((err) => {
					uni.showToast({
						title: err,
						icon: 'none',
						duration: 2000
					})
				});
		},
		async handerSearch() {
			SearchText(this.searchVal).then((res) => {
				this.todoList = res
			}).catch((err) => {
				uni.showToast({
					title: err,
					icon: 'none',
					duration: 2000
				});
			});
		}
	}
}
</script>

<style>
.uni-group {
	display: flex;
	align-items: center;
}
</style>