"use strict";
const common_vendor = require("../../../common/vendor.js");
const lib_supabaseClient = require("../../../lib/supabaseClient.js");
const _sfc_main = {
  onShow: async function() {
    const {
      data: {
        session
      },
      error
    } = await lib_supabaseClient.supabase.auth.getSession();
    if (!session || error) {
      common_vendor.index.redirectTo({
        url: "/pages/login/index"
      });
    }
  },
  methods: {
    tabLink(tab) {
      if (tab === "todolist") {
        common_vendor.index.navigateTo({
          url: "/pages/todo/index"
        });
      } else if (tab === "messages") {
        common_vendor.index.navigateTo({
          url: "/pages/messages/index"
        });
      } else if (tab === "filestorage") {
        common_vendor.index.navigateTo({
          url: "/pages/filestorage/index"
        });
      } else {
        common_vendor.index.navigateTo({
          url: "/pages/login/index"
        });
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $options.tabLink("messages")),
    b: common_vendor.o(($event) => $options.tabLink("filestorage")),
    c: common_vendor.o(($event) => $options.tabLink("login")),
    d: common_vendor.o(($event) => $options.tabLink("todolist"))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/project/使用cli创建vue和react模板/uni-app/uni-app-template/pages/tabBar/index/index.vue"]]);
wx.createPage(MiniProgramPage);
