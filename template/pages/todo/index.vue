<template>
	<view class="container">
		<view class="search">
			<input class="input" @confirm="handerSearch" v-model="searchVal" type="text" maxlength="20" placeholder="搜索" />
		</view>
		<uni-table ref="table" :loading="loading" border emptyText="暂无更多数据">
			<uni-tr>
				<uni-th  align="center">待办事项</uni-th>
				<uni-th  align="center">是否完成</uni-th>
				<uni-th  align="center">操作</uni-th>
			</uni-tr>
			<uni-tr v-for="(item, index) in todoList" :key="index">
				<uni-td>{{ item.todo }}</uni-td>
				<uni-td align="center">{{ item.completed ? '完成' : '未完成' }}</uni-td>
				<uni-td>
					<view class="uni-group">
						<button class="uni-button" size="mini" @click="updateItem(item)" type="primary">修改</button>
						<button class="uni-button" size="mini" @click="deleteItem(item.id)" type="warn">删除</button>
					</view>
				</uni-td>
			</uni-tr>
		</uni-table>
		<view class="uni-pagination-box"><uni-pagination show-icon :page-size="pageSize" :current="pageCurrent" :total="total" @change="change" /></view>

		<button class="add-btn" @click="addItem">添加</button>
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog :title="todo_id ? '修改' : '添加'" :duration="2000" :before-close="true" @close="close" @confirm="confirm">
				<view class="">
						<uni-forms :modelValue="formData" label-position="top">
							<uni-forms-item required label="待办事项" name="todo">
								<uni-easyinput type="text" v-model="formData.todo" placeholder="请输入姓名" />
							</uni-forms-item>
							<uni-forms-item required name="completed" label="是否完成">
								<switch :checked="formData.completed" @change="handerComplete"/>
							</uni-forms-item>
						</uni-forms>
					</view>
			</uni-popup-dialog>
		</uni-popup>
	</view>
</template>
<script>
import { supabase } from '../../lib/supabaseClient'
import { FetchTodo, FetchPage, SearchText, UpdateTodo, AddTodo, DeleteTodo } from './api';
export default {
	data() {
		return {
			searchVal: '',
			todoList: [],
			// 每页数据量
			pageSize: 10,
			// 当前页
			pageCurrent: 1,
			// 数据总量
			total: 0,
			loading: false,
			showModal: false,
			completeCheck: false,
			user_id: null,
			todo_id: null,
			start: 0,
			end: 9,
			formData:{}
		}

	},
	// 获取列表
	onLoad: function (options) {
		this.getTodoList(this.start, this.end);
		this.allCount();
	},
	methods: {
	   deleteItem(id){
		     DeleteTodo(id)
		       .then((res) => {
		         this.getTodoList(this.start, this.end);
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
	   updateItem(item){
		   this.formData.todo = item.todo;
		   this.formData.completed = item.completed;
		   this.todo_id = item.id;
		   this.$refs.popup.open()
	   },
		/**
		 * 点击取消按钮触发
		 * @param {Object} done
		 */
		close() {
			// TODO 做一些其他的事情，before-close 为true的情况下，手动执行 close 才会关闭对话框
			// ...
			this.$refs.popup.close()
		},
		confirm() {
			  if (!this.todo_id) {
			    AddTodo({
			      user_id: getApp().globalData.userInfo.id,
				  ...this.formData
			    })
			      .then((res) => {
			        this.getTodoList(this.start, this.end);
					this.$refs.popup.close()
			        uni.showToast({
			        	title: '添加成功！',
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
			  } else if (this.todo_id) {
			    UpdateTodo(this.formData,this.todo_id)
			      .then((res) => {
			        this.getTodoList(this.start, this.end);
					this.$refs.popup.close()
			        uni.showToast({
			        	title: '修改成功！',
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
			  }
			
		},
		// 分页触发
		change(e) {
			this.$refs.table.clearSelection();
		    this.start = e.current * 10 - 10;
		    this.end = e.current * 10 - 1;
		    this.getTodoList(e.current * 10 - 10, e.current * 10 - 1);
		},
		getData() {

		},
	    addItem() {
		   this.formData = {};
		   this.todo_id = null;
		   this.$refs.popup.open()
	    },
		// 获取数据
		getTodoList(start, end) {
			FetchPage(start, end)
				.then((res) => {
					this.todoList = res;
					this.allCount();
				})
				.catch((err) => {
					uni.showToast({
						title: err,
						icon: 'none',
						duration: 2000
					})

				});
		},
		allCount() {
			FetchTodo()
				.then((res) => {
					this.total = res;
				})
				.catch((err) => {
					uni.showToast({
						title: err,
						icon: 'none',
						duration: 2000
					});
				});
		},
		async handerSearch() {
			SearchText(this.searchVal).then((res) =>{
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