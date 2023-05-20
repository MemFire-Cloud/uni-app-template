<template>
	<view class="container">
		<view class="category">
			<view class="title">文件分类</view>
			<view class="list">
				<view :class="activeItem === item.id ? 'selected item-st' : 'item-st'" @click="handertab(item.id)" v-for="(item, index) in btnList" :key="index">
					{{ item.name }}
				</view>
			</view>
		</view>

		<uni-table ref="table" :loading="loading" border emptyText="暂无更多数据">
			<uni-tr>
				<uni-th align="center">文件名</uni-th>
				<uni-th align="center">大小</uni-th>
				<uni-th align="center">上传时间</uni-th>
				<uni-th align="center">操作</uni-th>
			</uni-tr>
			<uni-tr v-for="(item, index) in fileList" :key="index">
				<uni-td>{{ item.name }}</uni-td>
				<uni-td align="center">{{ item.size }}</uni-td>
				<uni-td align="center">{{ item.created_at }}</uni-td>
				<uni-td>
					<view class="uni-group">
						<button class="uni-button" size="mini" @click="downloadFile(item.name)" type="primary">下载</button>
						<button class="uni-button" size="mini" @click="removeFile(item.name)" type="warn">删除</button>
					</view>
				</uni-td>
			</uni-tr>
		</uni-table>

		<view class="upload-section">
			<view class="title">上传文件</view>
			<view class="input-group">
				<uni-file-picker v-model="fileValue" file-mediatype="all" @select="select" />
			</view>
		</view>
	</view>
</template>

<script>
import { supabase } from '../../lib/supabaseClient'
import { UploadFile, RemoveFile, ListFile, ListProfixFile } from './api';
export default {
	data() {
		return {
			fileName: '',
			fileList: [],
			btnList: [
				{ name: '全部', id: 0 },
				{ name: '图片', id: 1 },
				{ name: '文档', id: 2 },
				{ name: '视频', id: 3 }
			],
			activeItem: 0,
			imageValue: ''
		};
	},
	methods: {
		select(res) {
			const that = this;
			if (res) {
				res.tempFiles[0].tempFilePath = res.tempFiles[0].path;
				delete res.tempFiles[0].path;
				that.fileName = res.tempFiles[0].name;
				UploadFile(res.tempFiles[0])
					.then((res) => {
						uni.showToast({
							title: '上传成功!',
							icon: 'none',
							duration: 2000
						})
						this.getListFile()
					})
					.catch((err) => {
						uni.showToast({
							title: err,
							icon: 'none',
							duration: 2000
						});
					})
			}
		},
		async downloadFile(name) {
			const { data, error } = await supabase.storage.from('files').createSignedUrl(name, 60)
			uni.downloadFile({
				url: data.signedUrl,
				success(res) {
					if (name.slice(name.lastIndexOf('.') + 1) === 'png' || name.slice(name.lastIndexOf('.') + 1) === 'jpg' || name.slice(name.lastIndexOf('.') + 1) === 'mp4') {
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath, //图片文件路径
							success: function (data) {
								uni.hideLoading(); //隐藏 loading 提示框
								uni.showModal({
									title: '提示',
									content: '保存成功',
									modalType: false
								});
							},
							// 接口调用失败的回调函数
							fail: function (err) {
								if (
									err.errMsg === 'saveImageToPhotosAlbum:fail:auth denied' ||
									err.errMsg === 'saveImageToPhotosAlbum:fail auth deny' ||
									err.errMsg === 'saveImageToPhotosAlbum:fail authorize no response'
								) {
									uni.showModal({
										title: '提示',
										content: '需要您授权保存相册',
										modalType: false,
										success: (modalSuccess) => {
											uni.openSetting({
												success(settingdata) {
													console.log('settingdata', settingdata)
													if (settingdata.authSetting['scope.writePhotosAlbum']) {
														uni.showModal({
															title: '提示',
															content: '获取权限成功,再次点击图片即可保存',
															modalType: false
														});
													} else {
														uni.showModal({
															title: '提示',
															content: '获取权限失败，将无法保存到相册哦~',
															modalType: false
														});
													}
												},
												fail(failData) {
													console.log('failData', failData);
												},
												complete(finishData) {
													console.log('finishData', finishData);
												}
											});
										}
									})
								}
							},
							complete(res) {
								uni.hideLoading(); //隐藏 loading 提示框
							}
						});
					} else {
						uni.openDocument({
							filePath: res.tempFilePath,
							showMenu: true, //关键点
							success: function (res) {
								console.log('打开文档成功');
							},
							fail: function (err) {
								uni.showToast({
									title: err.errMsg,
									icon: 'none',
									duration: 2000
								});
							}
						});
					}
				}
			})
		},
		getListFile() {
			ListFile()
				.then((res) => {
					this.fileList = res
				})
				.catch((err) => {
					uni.showToast({
						title: err,
						icon: 'none',
						duration: 2000
					});
				});
		},
		handertab(id) {
			this.activeItem = id;
			ListProfixFile(this.btnList[this.activeItem].name)
				.then((res) => {
					this.fileList = res;
				})
				.catch((err) => {
					uni.showToast({
						title: err,
						icon: 'none',
						duration: 2000
					});
				})
		},
		async removeFile(name) {
			RemoveFile(name)
				.then((res) => {
					uni.showToast({
						title: '删除成功',
						icon: 'none',
						duration: 2000
					});
					this.getListFile()
				})
				.catch((err) => {
					uni.showToast({
						title: err,
						icon: 'none',
						duration: 2000
					})
				});
		},
		onUpload() {
			var that = this
			uni.chooseMessageFile({
				count: 1,
				type: 'all',
				async success(res) {
					res.tempFiles[0].tempFilePath = res.tempFiles[0].path;
					delete res.tempFiles[0].path;
					const file = res.tempFiles[0];
					const filePath = res.tempFiles[0].name
					that.fileName = filePath;
					const { data, error } = await supabase.storage.from('files').upload(filePath, file, {
						cacheControl: '3600'
					})
					if (error) {
						wx.showToast({
							title: error.message || error.error_description,
							icon: 'none',
							duration: 2000
						})
					} else {
						wx.showToast({
							title: '上传成功',
							icon: 'none',
							duration: 2000
						})
						that.ListFile();
					}
				}
			});
		}
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.getListFile();
	}
};
</script>

<style>
.uni-table-td {
	white-space: nowrap;
}
</style>
