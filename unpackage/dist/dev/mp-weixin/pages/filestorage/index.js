"use strict";
const common_vendor = require("../../common/vendor.js");
const lib_supabaseClient = require("../../lib/supabaseClient.js");
const pages_filestorage_api = require("./api.js");
require("../../utils/util.js");
const _sfc_main = {
  data() {
    return {
      fileName: "",
      fileList: [],
      btnList: [
        { name: "全部", id: 0 },
        { name: "图片", id: 1 },
        { name: "文档", id: 2 },
        { name: "视频", id: 3 }
      ],
      activeItem: 0,
      imageValue: "",
      itemFileName: "",
      currentIndex: 0
      //默认是活动项
    };
  },
  methods: {
    pagechange(e) {
      if ("touch" === e.detail.source) {
        this.currentIndex = e.detail.current;
        pages_filestorage_api.ListProfixFile(this.btnList[this.currentIndex].name).then((res) => {
          this.fileList = res;
        }).catch((err) => {
          common_vendor.index.showToast({
            title: err,
            icon: "none",
            duration: 2e3
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
      pages_filestorage_api.ListProfixFile(this.btnList[this.currentIndex].name).then((res) => {
        this.fileList = res;
      }).catch((err) => {
        common_vendor.index.showToast({
          title: err,
          icon: "none",
          duration: 2e3
        });
      });
    },
    select(res) {
      const that = this;
      if (res) {
        res.tempFiles[0].tempFilePath = res.tempFiles[0].path;
        delete res.tempFiles[0].path;
        that.fileName = res.tempFiles[0].name;
        pages_filestorage_api.UploadFile(res.tempFiles[0]).then((res2) => {
          common_vendor.index.showToast({
            title: "上传成功!",
            icon: "none",
            duration: 2e3
          });
          this.getListFile();
        }).catch((err) => {
          common_vendor.index.showToast({
            title: err,
            icon: "none",
            duration: 2e3
          });
        });
      }
    },
    async downloadFile() {
      const name = this.itemFileName;
      const { data, error } = await lib_supabaseClient.supabase.storage.from("files").createSignedUrl(name, 60);
      common_vendor.index.downloadFile({
        url: data.signedUrl,
        success(res) {
          if (name.slice(name.lastIndexOf(".") + 1) === "png" || name.slice(name.lastIndexOf(".") + 1) === "jpg" || name.slice(name.lastIndexOf(".") + 1) === "mp4") {
            common_vendor.index.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              //图片文件路径
              success: function(data2) {
                common_vendor.index.hideLoading();
                common_vendor.index.showModal({
                  title: "提示",
                  content: "保存成功",
                  modalType: false
                });
              },
              // 接口调用失败的回调函数
              fail: function(err) {
                if (err.errMsg === "saveImageToPhotosAlbum:fail:auth denied" || err.errMsg === "saveImageToPhotosAlbum:fail auth deny" || err.errMsg === "saveImageToPhotosAlbum:fail authorize no response") {
                  common_vendor.index.showModal({
                    title: "提示",
                    content: "需要您授权保存相册",
                    modalType: false,
                    success: (modalSuccess) => {
                      common_vendor.index.openSetting({
                        success(settingdata) {
                          console.log("settingdata", settingdata);
                          if (settingdata.authSetting["scope.writePhotosAlbum"]) {
                            common_vendor.index.showModal({
                              title: "提示",
                              content: "获取权限成功,再次点击图片即可保存",
                              modalType: false
                            });
                          } else {
                            common_vendor.index.showModal({
                              title: "提示",
                              content: "获取权限失败，将无法保存到相册哦~",
                              modalType: false
                            });
                          }
                        },
                        fail(failData) {
                          console.log("failData", failData);
                        },
                        complete(finishData) {
                          console.log("finishData", finishData);
                        }
                      });
                    }
                  });
                }
              },
              complete(res2) {
                common_vendor.index.hideLoading();
              }
            });
          } else {
            common_vendor.index.openDocument({
              filePath: res.tempFilePath,
              showMenu: true,
              //关键点
              success: function(res2) {
                console.log("打开文档成功");
              },
              fail: function(err) {
                common_vendor.index.showToast({
                  title: err.errMsg,
                  icon: "none",
                  duration: 2e3
                });
              }
            });
          }
          this.$refs.popup.close();
        }
      });
    },
    getListFile() {
      pages_filestorage_api.ListFile().then((res) => {
        this.fileList = res;
      }).catch((err) => {
        common_vendor.index.showToast({
          title: err,
          icon: "none",
          duration: 2e3
        });
      });
    },
    async removeFile() {
      const name = this.itemFileName;
      pages_filestorage_api.RemoveFile(name).then((res) => {
        common_vendor.index.showToast({
          title: "删除成功",
          icon: "none",
          duration: 2e3
        });
        this.getListFile();
        this.$refs.popup.close();
      }).catch((err) => {
        common_vendor.index.showToast({
          title: err,
          icon: "none",
          duration: 2e3
        });
      });
    },
    onUpload() {
      var that = this;
      common_vendor.index.chooseMessageFile({
        count: 1,
        type: "all",
        async success(res) {
          res.tempFiles[0].tempFilePath = res.tempFiles[0].path;
          delete res.tempFiles[0].path;
          const file = res.tempFiles[0];
          const filePath = res.tempFiles[0].name;
          that.fileName = filePath;
          const { data, error } = await lib_supabaseClient.supabase.storage.from("files").upload(filePath, file, {
            cacheControl: "3600"
          });
          if (error) {
            common_vendor.wx$1.showToast({
              title: error.data.message || error.data.error_description,
              icon: "none",
              duration: 2e3
            });
          } else {
            common_vendor.wx$1.showToast({
              title: "上传成功",
              icon: "none",
              duration: 2e3
            });
            that.getListFile();
          }
        }
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getListFile();
  }
};
if (!Array) {
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  _easycom_uni_popup2();
}
const _easycom_uni_popup = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-popup/uni-popup.js";
if (!Math) {
  _easycom_uni_popup();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.btnList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: common_vendor.n(index == $data.currentIndex ? "fontColorBox" : ""),
        c: common_vendor.n(index == $data.currentIndex ? "lineBox titleBox" : "titleBox"),
        d: index,
        e: common_vendor.o(($event) => $options.titleClick(index), index)
      };
    }),
    b: common_vendor.f($data.fileList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: common_vendor.t(item.size),
        c: common_vendor.t(item.created_at),
        d: index,
        e: common_vendor.o(($event) => $options.onOpenPop(item.name), index)
      };
    }),
    c: common_vendor.f($data.fileList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: common_vendor.t(item.size),
        c: common_vendor.t(item.created_at),
        d: index,
        e: common_vendor.o(($event) => $options.onOpenPop(item.name), index)
      };
    }),
    d: common_vendor.f($data.fileList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: common_vendor.t(item.size),
        c: common_vendor.t(item.created_at),
        d: index,
        e: common_vendor.o(($event) => $options.onOpenPop(item.name), index)
      };
    }),
    e: common_vendor.f($data.fileList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: common_vendor.t(item.size),
        c: common_vendor.t(item.created_at),
        d: index,
        e: common_vendor.o(($event) => $options.onOpenPop(item.name), index)
      };
    }),
    f: common_vendor.o((...args) => $options.pagechange && $options.pagechange(...args)),
    g: $data.currentIndex,
    h: common_vendor.o((...args) => $options.onUpload && $options.onUpload(...args)),
    i: common_vendor.o((...args) => $options.downloadFile && $options.downloadFile(...args)),
    j: common_vendor.o((...args) => $options.removeFile && $options.removeFile(...args)),
    k: common_vendor.o((...args) => _ctx.onClosePop && _ctx.onClosePop(...args)),
    l: common_vendor.sr("popup", "7cb633ce-0"),
    m: common_vendor.p({
      ["background-color"]: "#fff",
      type: "bottom"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/project/使用cli或npx创建模版/uni-app-template/pages/filestorage/index.vue"]]);
wx.createPage(MiniProgramPage);
