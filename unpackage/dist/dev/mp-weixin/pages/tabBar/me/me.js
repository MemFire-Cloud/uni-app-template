"use strict";
const common_vendor = require("../../../common/vendor.js");
const lib_supabaseClient = require("../../../lib/supabaseClient.js");
const utils_commonApi = require("../../../utils/commonApi.js");
const _sfc_main = {
  data() {
    return {
      hasUserInfo: false,
      userInfo: null,
      extraIcon_user: {
        color: "#909090",
        size: "24",
        type: "auth-filled"
      },
      extraIcon_out: {
        color: "#909090",
        size: "24",
        type: "refresh-filled"
      }
    };
  },
  methods: {
    async loginOut() {
      const { error } = await lib_supabaseClient.supabase.auth.signOut();
      if (error) {
        common_vendor.index.showToast({
          title: error.message || error.error_description,
          duration: 1500,
          icon: "none"
        });
      } else {
        getApp().globalData.userInfo = null;
        this.userInfo = null;
        this.hasUserInfo = false;
        common_vendor.index.showToast({
          title: "退出成功",
          duration: 1500
        });
        common_vendor.index.redirectTo({
          url: "/pages/login/index"
        });
      }
    },
    goUserInfo() {
      common_vendor.index.navigateTo({
        url: "/pages/userinfo/index"
      });
    },
    async setUserInfo(userInfo) {
      if (userInfo != null) {
        if (userInfo.avatar) {
          var avatar = await utils_commonApi.DownloadImage(userInfo.avatar);
        }
        this.userInfo = userInfo;
        this.userInfo.avatar = avatar;
        this.hasUserInfo = true;
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    if (getApp().globalData.userInfo) {
      if (JSON.stringify(getApp().globalData.userInfo.user_metadata) !== "{}") {
        that.setUserInfo(getApp().globalData.userInfo.user_metadata);
      }
    } else {
      common_vendor.index.redirectTo({
        url: "/pages/login/index"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _a, _b;
  return common_vendor.e({
    a: !$data.hasUserInfo
  }, !$data.hasUserInfo ? {} : {
    b: $data.userInfo.avatar ? $data.userInfo.avatar : "../../../static/avatar.png",
    c: common_vendor.t(((_a = $data.userInfo) == null ? void 0 : _a.username) ? (_b = $data.userInfo) == null ? void 0 : _b.username : "微信用户")
  }, {
    d: $data.hasUserInfo
  }, $data.hasUserInfo ? {
    e: common_vendor.o((...args) => $options.goUserInfo && $options.goUserInfo(...args)),
    f: common_vendor.o((...args) => $options.loginOut && $options.loginOut(...args))
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/project/使用cli或npx创建模版/uni-app-template/pages/tabBar/me/me.vue"]]);
wx.createPage(MiniProgramPage);
