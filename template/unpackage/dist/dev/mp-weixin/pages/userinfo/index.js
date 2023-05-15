"use strict";
const common_vendor = require("../../common/vendor.js");
const lib_supabaseClient = require("../../lib/supabaseClient.js");
const utils_commonApi = require("../../utils/commonApi.js");
const _sfc_main = {
  data() {
    var _a, _b, _c;
    return {
      username: ((_a = getApp().globalData.userInfo) == null ? void 0 : _a.user_metadata.username) ? getApp().globalData.userInfo.user_metadata.username : "",
      avatar: ((_b = getApp().globalData.userInfo) == null ? void 0 : _b.user_metadata.avatar) ? getApp().globalData.userInfo.user_metadata.avatar : "",
      introduction: ((_c = getApp().globalData.userInfo) == null ? void 0 : _c.user_metadata.introduction) ? getApp().globalData.userInfo.user_metadata.introduction : "",
      filePath: ""
    };
  },
  methods: {
    // 提交用户信息
    submit: async function() {
      const that = this;
      let path = "";
      if (that.filePath) {
        path = that.filePath;
      } else {
        path = getApp().globalData.userInfo.user_metadata.avatar;
      }
      const { data, error } = await lib_supabaseClient.supabase.auth.updateUser({
        data: { avatar: path, username: that.username, introduction: that.introduction }
      });
      if (error) {
        common_vendor.index.showToast({
          title: error.message || error.error_description,
          duration: 1500,
          icon: "none"
        });
      } else {
        getApp().globalData.userInfo = data.user.data;
        common_vendor.index.showToast({
          title: "修改成功",
          duration: 1500
        });
        common_vendor.index.switchTab({
          url: "/pages/tabBar/me/me"
        });
      }
    },
    // 更新头像
    async onChooseAvatar(e) {
      let { avatarUrl } = e.detail;
      let that = this;
      common_vendor.index.getImageInfo({
        src: avatarUrl,
        // 图片路径，必须是本地路径，可以相对路径或绝对路径
        success: async function(res) {
          const file = { fileType: "image", width: res.width, height: res.height, tempFilePath: avatarUrl };
          const fileExt = avatarUrl.split(".").pop();
          const fileName = `${Math.random()}.${fileExt}`;
          const filePath = `${fileName}`;
          that.filePath = filePath;
          let { error: uploadError } = await lib_supabaseClient.supabase.storage.from("avatars").upload(filePath, file);
          if (uploadError) {
            throw uploadError;
          }
          that.avatar = await utils_commonApi.DownloadImage(filePath);
        }
      });
    }
  },
  onLoad: async function() {
    var _a, _b;
    if (getApp().globalData.userInfo) {
      if (JSON.stringify(getApp().globalData.userInfo.user_metadata) !== "{}") {
        if (getApp().globalData.userInfo.user_metadata.avatar) {
          this.avatar = getApp().globalData.userInfo.user_metadata.avatar;
        }
      }
      this.username = ((_a = getApp().globalData.userInfo) == null ? void 0 : _a.user_metadata.username) ? getApp().globalData.userInfo.user_metadata.username : "";
      this.introduction = ((_b = getApp().globalData.userInfo) == null ? void 0 : _b.user_metadata.introduction) ? getApp().globalData.userInfo.user_metadata.introduction : "";
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !$data.avatar
  }, !$data.avatar ? {} : {
    b: $data.avatar
  }, {
    c: common_vendor.o((...args) => $options.onChooseAvatar && $options.onChooseAvatar(...args)),
    d: $data.username,
    e: common_vendor.o(($event) => $data.username = $event.detail.value),
    f: $data.introduction,
    g: common_vendor.o(($event) => $data.introduction = $event.detail.value),
    h: common_vendor.o((...args) => $options.submit && $options.submit(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/project/uni-app/test/pages/userinfo/index.vue"]]);
wx.createPage(MiniProgramPage);
