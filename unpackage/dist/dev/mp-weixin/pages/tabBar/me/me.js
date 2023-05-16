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
if (!Array) {
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  (_easycom_uni_list_item2 + _easycom_uni_list2)();
}
const _easycom_uni_list_item = () => "../../../node-modules/@dcloudio/uni-ui/lib/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../../node-modules/@dcloudio/uni-ui/lib/uni-list/uni-list.js";
if (!Math) {
  (_easycom_uni_list_item + _easycom_uni_list)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _a, _b;
  return common_vendor.e({
    a: !$data.hasUserInfo
  }, !$data.hasUserInfo ? {} : {
    b: $data.userInfo.avatar ? $data.userInfo.avatar : "../../../static/avatar.png",
    c: common_vendor.t(((_a = $data.userInfo) == null ? void 0 : _a.username) ? (_b = $data.userInfo) == null ? void 0 : _b.username : "微信用户")
  }, {
    d: common_vendor.p({
      ["show-extra-icon"]: true,
      ["extra-icon"]: $data.extraIcon_user,
      title: "完善信息",
      link: true,
      to: "/pages/userinfo/index"
    }),
    e: common_vendor.o(($event) => $options.loginOut($event)),
    f: common_vendor.p({
      ["show-extra-icon"]: true,
      extraIcon: $data.extraIcon_out,
      title: "退出登录",
      link: true
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/project/uni-app/test/pages/tabBar/me/me.vue"]]);
wx.createPage(MiniProgramPage);
