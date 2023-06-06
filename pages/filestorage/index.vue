<template>
  <view>
    <view>
      <!-- Tab布局 -->
      <view class="navBox">
        <view
          :class="index == currentIndex ? 'lineBox titleBox' : 'titleBox'"
          v-for="(item, index) in btnList"
          :key="index"
          @click="titleClick(index)"
        >
          <text :class="index == currentIndex ? 'fontColorBox' : ''">{{
            item.name
          }}</text>
        </view>
      </view>
      <!-- 内容布局 -->
      <swiper
        class="swiperTtemBox"
        @change="pagechange"
        :current="currentIndex"
      >
        <swiper-item class="swiperTtemBox">
          <view
            class="f-ab border-bottom"
            v-for="(item, index) in fileList"
            :key="index"
            @click="onOpenPop(item.name)"
          >
            <view class="item-box">
              <image src="../../static/file.svg"></image>
              <view class="content-box">
                <text class="cell">{{ item.name }}</text>
                <text class="t-s mt-10">{{ item.size }}</text>
              </view>
            </view>
            <view class="t-s">
              {{ item.created_at }}
            </view>
          </view>
        </swiper-item>
        <swiper-item class="swiperTtemBox">
          <view
            class="f-ab border-bottom"
            v-for="(item, index) in fileList"
            :key="index"
            @click="onOpenPop(item.name)"
          >
            <view class="item-box">
              <image src="../../static/image.svg"></image>
              <view class="content-box">
                <text class="cell">{{ item.name }}</text>
                <text class="t-s mt-10">{{ item.size }}</text>
              </view>
            </view>
            <view class="t-s">
              {{ item.created_at }}
            </view>
          </view>
        </swiper-item>
        <swiper-item class="swiperTtemBox">
          <view
            class="f-ab border-bottom"
            v-for="(item, index) in fileList"
            :key="index"
            @click="onOpenPop(item.name)"
          >
            <view class="item-box">
              <image src="../../static/file.svg"></image>
              <view class="content-box">
                <text class="cell">{{ item.name }}</text>
                <text class="t-s mt-10">{{ item.size }}</text>
              </view>
            </view>
            <view class="t-s">
              {{ item.created_at }}
            </view>
          </view>
        </swiper-item>
        <swiper-item class="swiperTtemBox">
          <view
            class="f-ab border-bottom"
            v-for="(item, index) in fileList"
            :key="index"
            @click="onOpenPop(item.name)"
          >
            <view class="item-box">
              <image src="../../static/vadio.svg"></image>
              <view class="content-box">
                <text class="cell">{{ item.name }}</text>
                <text class="t-s mt-10">{{ item.size }}</text>
              </view>
            </view>
            <view class="t-s">
              {{ item.created_at }}
            </view>
          </view>
        </swiper-item>
      </swiper>
    </view>
    <!-- <nut-tabs swipeable v-model="activeItem" @change="onChangeTab">
      <nut-tabpane title="全部" pane-key="0">
        <view class="f-ab border-bottom" v-for="(item, index) in fileList" :key="index" @click="onOpenPop(item.name)">
          <view class="item-box">
            <image src="../../static/file.svg"></image>
            <view class="content-box">
              <text class="cell">{{ item.name }}</text>
              <text class="t-s mt-10">{{ item.size }}</text>
            </view>
          </view>
          <view class="t-s">
            {{ item.created_at }}
          </view>
        </view>
      </nut-tabpane>
      <nut-tabpane title="图片" pane-key="1">
        <view class="f-ab border-bottom" v-for="(item, index) in fileList" :key="index" @click="onOpenPop(item.name)">
          <view class="item-box">
            <image src="../../static/image.svg"></image>
            <view class="content-box">
              <text class="cell">{{ item.name }}</text>
              <text class="t-s mt-10">{{ item.size }}</text>
            </view>
          </view>
          <view class="t-s">
            {{ item.created_at }}
          </view>
        </view>
      </nut-tabpane>
      <nut-tabpane title="文档" pane-key="2">
        <view class="f-ab border-bottom" v-for="(item, index) in fileList" :key="index" @click="onOpenPop(item.name)">
          <view class="item-box">
            <image src="../../static/file.svg"></image>
            <view class="content-box">
              <text class="cell">{{ item.name }}</text>
              <text class="t-s mt-10">{{ item.size }}</text>
            </view>
          </view>
          <view class="t-s">
            {{ item.created_at }}
          </view>
        </view>
      </nut-tabpane>
      <nut-tabpane title="视频" pane-key="3">
        <view class="f-ab border-bottom" v-for="(item, index) in fileList" :key="index" @click="onOpenPop(item.name)">
          <view class="item-box">
            <image src="../../static/vadio.svg"></image>
            <view class="content-box">
              <text class="cell">{{ item.name }}</text>
              <text class="t-s mt-10">{{ item.size }}</text>
            </view>
          </view>
          <view class="t-s">
            {{ item.created_at }}
          </view>
        </view>
      </nut-tabpane>
    </nut-tabs> -->

    <view class="container2">
      <button class="add-btn" @click="onUpload">上传</button>
    </view>
    <uni-popup ref="popup" background-color="#fff" type="bottom">
      <view class="pop-btn" @click="downloadFile">下载</view>
      <view class="pop-btn err-color" @click="removeFile">删除</view>
      <view class="pop-cansel" @click="onClosePop">取消</view>
    </uni-popup>
  </view>
</template>

<script>
import { supabase } from "../../lib/supabaseClient";
import { UploadFile, RemoveFile, ListFile, ListProfixFile } from "./api";
export default {
  data() {
    return {
      fileName: "",
      fileList: [],
      btnList: [
        { name: "全部", id: 0 },
        { name: "图片", id: 1 },
        { name: "文档", id: 2 },
        { name: "视频", id: 3 },
      ],
      activeItem: 0,
      imageValue: "",
      itemFileName: "",
      currentIndex: 0, //默认是活动项
    };
  },
  methods: {
    pagechange(e) {
      // 通过touch判断，改变tab的下标值
      if ("touch" === e.detail.source) {
        // 拿到当前索引并动态改变
        this.currentIndex = e.detail.current;
        ListProfixFile(this.btnList[this.currentIndex].name)
          .then((res) => {
            this.fileList = res;
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
    onOpenPop(name) {
      this.$refs.popup.open();
      this.itemFileName = name;
    },
    //点击tab时触发
    titleClick(e) {
      this.currentIndex = e;
      ListProfixFile(this.btnList[this.currentIndex].name)
        .then((res) => {
          this.fileList = res;
        })
        .catch((err) => {
          uni.showToast({
            title: err,
            icon: "none",
            duration: 2000,
          });
        });
    },
    select(res) {
      const that = this;
      if (res) {
        res.tempFiles[0].tempFilePath = res.tempFiles[0].path;
        delete res.tempFiles[0].path;
        that.fileName = res.tempFiles[0].name;
        UploadFile(res.tempFiles[0])
          .then((res) => {
            uni.showToast({
              title: "上传成功!",
              icon: "none",
              duration: 2000,
            });
            this.getListFile();
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
    async downloadFile() {
	  const name = this.itemFileName
      const { data, error } = await supabase.storage
        .from("files")
        .createSignedUrl(name, 60);
      uni.downloadFile({
        url: data.signedUrl,
        success(res) {
          if (
            name.slice(name.lastIndexOf(".") + 1) === "png" ||
            name.slice(name.lastIndexOf(".") + 1) === "jpg" ||
            name.slice(name.lastIndexOf(".") + 1) === "mp4"
          ) {
            uni.saveImageToPhotosAlbum({
              filePath: res.tempFilePath, //图片文件路径
              success: function (data) {
                uni.hideLoading(); //隐藏 loading 提示框
                uni.showModal({
                  title: "提示",
                  content: "保存成功",
                  modalType: false,
                });
              },
              // 接口调用失败的回调函数
              fail: function (err) {
                if (
                  err.errMsg === "saveImageToPhotosAlbum:fail:auth denied" ||
                  err.errMsg === "saveImageToPhotosAlbum:fail auth deny" ||
                  err.errMsg ===
                    "saveImageToPhotosAlbum:fail authorize no response"
                ) {
                  uni.showModal({
                    title: "提示",
                    content: "需要您授权保存相册",
                    modalType: false,
                    success: (modalSuccess) => {
                      uni.openSetting({
                        success(settingdata) {
                          console.log("settingdata", settingdata);
                          if (
                            settingdata.authSetting["scope.writePhotosAlbum"]
                          ) {
                            uni.showModal({
                              title: "提示",
                              content: "获取权限成功,再次点击图片即可保存",
                              modalType: false,
                            });
                          } else {
                            uni.showModal({
                              title: "提示",
                              content: "获取权限失败，将无法保存到相册哦~",
                              modalType: false,
                            });
                          }
                        },
                        fail(failData) {
                          console.log("failData", failData);
                        },
                        complete(finishData) {
                          console.log("finishData", finishData);
                        },
                      });
                    },
                  });
                }
              },
              complete(res) {
                uni.hideLoading(); //隐藏 loading 提示框
              },
            });
          } else {
            uni.openDocument({
              filePath: res.tempFilePath,
              showMenu: true, //关键点
              success: function (res) {
                console.log("打开文档成功");
              },
              fail: function (err) {
                uni.showToast({
                  title: err.errMsg,
                  icon: "none",
                  duration: 2000,
                });
              },
            });
          }
		  this.$refs.popup.close();
        },
      });
    },
    getListFile() {
      ListFile()
        .then((res) => {
          this.fileList = res;
        })
        .catch((err) => {
          uni.showToast({
            title: err,
            icon: "none",
            duration: 2000,
          });
        });
    },
    async removeFile() {
	  const name = this.itemFileName
      RemoveFile(name)
        .then((res) => {
          uni.showToast({
            title: "删除成功",
            icon: "none",
            duration: 2000,
          });
          this.getListFile();
		  this.$refs.popup.close()
        })
        .catch((err) => {
          uni.showToast({
            title: err,
            icon: "none",
            duration: 2000,
          });
        });
    },
    onUpload() {
      var that = this;
      uni.chooseMessageFile({
        count: 1,
        type: "all",
        async success(res) {
          res.tempFiles[0].tempFilePath = res.tempFiles[0].path;
          delete res.tempFiles[0].path;
          const file = res.tempFiles[0];
          const filePath = res.tempFiles[0].name;
          that.fileName = filePath;
          const { data, error } = await supabase.storage
            .from("files")
            .upload(filePath, file, {
              cacheControl: "3600",
            });
          if (error) {
            wx.showToast({
              title: error.data.message || error.data.error_description,
              icon: "none",
              duration: 2000,
            });
          } else {
            wx.showToast({
              title: "上传成功",
              icon: "none",
              duration: 2000,
            });
            that.getListFile();
          }
        },
      });
    },
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getListFile();
  },
};
</script>

<style>
.uni-table-td {
  white-space: nowrap;
}
</style>
