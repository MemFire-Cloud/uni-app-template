"use strict";
const common_vendor = require("../../common/vendor.js");
const lib_supabaseClient = require("../../lib/supabaseClient.js");
const _sfc_main = {
  data() {
  },
  onLoad() {
  },
  methods: {
    login() {
      common_vendor.index.login({
        success: async (res) => {
          const { data, error } = await lib_supabaseClient.supabase.auth.signInWithWechat({ code: res.code });
          if (error) {
            common_vendor.index.showToast({
              title: (error == null ? void 0 : error.error) || (error == null ? void 0 : error.msg),
              icon: "none",
              duration: 2e3
            });
          } else if (data) {
            if (JSON.stringify(data.user.data.user.user_metadata) === "{}") {
              setTimeout(() => {
                common_vendor.index.showModal({
                  title: "提示",
                  content: "登录成功！去填充个人资料吧！",
                  success(res2) {
                    if (res2.confirm) {
                      common_vendor.index.redirectTo({
                        url: "/pages/userinfo/index"
                      });
                    } else if (res2.cancel)
                      ;
                  }
                });
              }, 1e3);
            } else {
              getApp().globalData.userInfo = data.user.data.user;
              common_vendor.index.switchTab({
                url: "/pages/tabBar/index/index"
              });
            }
          }
        },
        fail(err) {
          common_vendor.index.showToast({
            title: err.errMsg,
            icon: "none",
            duration: 2e3
          });
        }
      });
    },
    phoneLogin() {
      common_vendor.index.redirectTo({
        url: "/pages/phone-login/index"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.login && $options.login(...args)),
    b: common_vendor.o((...args) => $options.phoneLogin && $options.phoneLogin(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/project/使用cli创建vue和react模板/uni-app/uni-app-template/pages/login/index.vue"]]);
wx.createPage(MiniProgramPage);
