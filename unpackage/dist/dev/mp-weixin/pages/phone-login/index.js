"use strict";
const common_vendor = require("../../common/vendor.js");
const lib_supabaseClient = require("../../lib/supabaseClient.js");
const _sfc_main = {
  data() {
    return {
      phone: "",
      code: "",
      codebtn: "发送验证码",
      disabled: false
    };
  },
  methods: {
    //发送验证码
    async sendcode(res) {
      var that = this;
      var phone = that.phone;
      let reg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (!reg.test(phone)) {
        common_vendor.index.showToast({
          title: "手机号码格式不正确",
          icon: "none",
          duration: 2e3
        });
        return false;
      }
      that.disabled = true;
      let { data, error } = await lib_supabaseClient.supabase.auth.signInWithOtp({
        phone
      });
      if (error) {
        common_vendor.index.showToast({
          title: error.message || error.error_description,
          duration: 1500,
          icon: "none"
        });
        that.disabled = false;
      } else {
        setTimeout(() => {
          that.disabled = false;
        }, 6e4);
      }
    },
    // 登录处理
    async submit() {
      var phone = this.phone;
      var code = this.code;
      if (!code) {
        common_vendor.index.showToast({
          title: "请输入验证码",
          duration: 1500,
          icon: "none"
        });
        return false;
      }
      let { data, error } = await lib_supabaseClient.supabase.auth.verifyOtp({
        phone,
        token: code,
        type: "sms"
      });
      if (error) {
        common_vendor.index.showToast({
          title: error.message || error.error_description,
          duration: 1500,
          icon: "none"
        });
      } else {
        getApp().globalData.userInfo = data.session.user;
        if (JSON.stringify(data.session.user.user_metadata) === "{}") {
          common_vendor.index.showToast({
            title: "登录成功,前往修改个人信息页面",
            duration: 1500
          });
          common_vendor.index.navigateTo({
            url: "/pages/userinfo/index"
          });
        } else {
          common_vendor.index.showToast({
            title: "登录成功",
            duration: 1500
          });
          common_vendor.index.switchTab({
            url: "/pages/tabBar/index/index"
          });
        }
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.phone,
    b: common_vendor.o(($event) => $data.phone = $event.detail.value),
    c: $data.code,
    d: common_vendor.o(($event) => $data.code = $event.detail.value),
    e: common_vendor.t($data.codebtn),
    f: common_vendor.n($data.disabled ? "disabled line" : "line"),
    g: $data.disabled ? "defalut" : "primary",
    h: $data.disabled,
    i: common_vendor.o((...args) => $options.sendcode && $options.sendcode(...args)),
    j: common_vendor.o((...args) => $options.submit && $options.submit(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/project/使用cli创建vue和react模板/uni-app/uni-app-template/pages/phone-login/index.vue"]]);
wx.createPage(MiniProgramPage);
