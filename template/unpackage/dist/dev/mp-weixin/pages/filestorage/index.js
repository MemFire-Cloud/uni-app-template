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
      imageValue: ""
    };
  },
  methods: {
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
    async downloadFile(name) {
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
    handertab(id) {
      this.activeItem = id;
      pages_filestorage_api.ListProfixFile(this.btnList[this.activeItem].name).then((res) => {
        this.fileList = res;
      }).catch((err) => {
        common_vendor.index.showToast({
          title: err,
          icon: "none",
          duration: 2e3
        });
      });
    },
    async removeFile(name) {
      pages_filestorage_api.RemoveFile(name).then((res) => {
        common_vendor.index.showToast({
          title: "删除成功",
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
              title: error.message || error.error_description,
              icon: "none",
              duration: 2e3
            });
          } else {
            common_vendor.wx$1.showToast({
              title: "上传成功",
              icon: "none",
              duration: 2e3
            });
            that.ListFile();
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
  const _easycom_uni_th2 = common_vendor.resolveComponent("uni-th");
  const _easycom_uni_tr2 = common_vendor.resolveComponent("uni-tr");
  const _easycom_uni_td2 = common_vendor.resolveComponent("uni-td");
  const _easycom_uni_table2 = common_vendor.resolveComponent("uni-table");
  const _easycom_uni_file_picker2 = common_vendor.resolveComponent("uni-file-picker");
  (_easycom_uni_th2 + _easycom_uni_tr2 + _easycom_uni_td2 + _easycom_uni_table2 + _easycom_uni_file_picker2)();
}
const _easycom_uni_th = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-th/uni-th.js";
const _easycom_uni_tr = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-tr/uni-tr.js";
const _easycom_uni_td = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-td/uni-td.js";
const _easycom_uni_table = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-table/uni-table.js";
const _easycom_uni_file_picker = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-file-picker/uni-file-picker.js";
if (!Math) {
  (_easycom_uni_th + _easycom_uni_tr + _easycom_uni_td + _easycom_uni_table + _easycom_uni_file_picker)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.btnList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: common_vendor.n($data.activeItem === item.id ? "selected item-st" : "item-st"),
        c: common_vendor.o(($event) => $options.handertab(item.id), index),
        d: index
      };
    }),
    b: common_vendor.p({
      align: "center"
    }),
    c: common_vendor.p({
      align: "center"
    }),
    d: common_vendor.p({
      align: "center"
    }),
    e: common_vendor.p({
      align: "center"
    }),
    f: common_vendor.f($data.fileList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: "68f9a494-7-" + i0 + "," + ("68f9a494-6-" + i0),
        c: common_vendor.t(item.size),
        d: "68f9a494-8-" + i0 + "," + ("68f9a494-6-" + i0),
        e: common_vendor.t(item.created_at),
        f: "68f9a494-9-" + i0 + "," + ("68f9a494-6-" + i0),
        g: common_vendor.o(($event) => $options.downloadFile(item.name), index),
        h: common_vendor.o(($event) => $options.removeFile(item.name), index),
        i: "68f9a494-10-" + i0 + "," + ("68f9a494-6-" + i0),
        j: index,
        k: "68f9a494-6-" + i0 + ",68f9a494-0"
      };
    }),
    g: common_vendor.p({
      align: "center"
    }),
    h: common_vendor.p({
      align: "center"
    }),
    i: common_vendor.sr("table", "68f9a494-0"),
    j: common_vendor.p({
      loading: _ctx.loading,
      border: true,
      emptyText: "暂无更多数据"
    }),
    k: common_vendor.o($options.select),
    l: common_vendor.o(($event) => _ctx.fileValue = $event),
    m: common_vendor.p({
      ["file-mediatype"]: "all",
      modelValue: _ctx.fileValue
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/project/uni-app/test/pages/filestorage/index.vue"]]);
wx.createPage(MiniProgramPage);
