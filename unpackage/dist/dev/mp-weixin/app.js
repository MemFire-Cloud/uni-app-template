"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const lib_supabaseClient = require("./lib/supabaseClient.js");
if (!Math) {
  "./pages/tabBar/index/index.js";
  "./pages/tabBar/me/me.js";
  "./pages/login/index.js";
  "./pages/phone-login/index.js";
  "./pages/messages/index.js";
  "./pages/userinfo/index.js";
  "./pages/todo/index.js";
  "./pages/filestorage/index.js";
}
const _sfc_main = {
  globalData: {
    userInfo: null
  },
  onLaunch: async function() {
    const { data: { user }, error } = await lib_supabaseClient.supabase.auth.getUser();
    if (error || !user) {
      common_vendor.index.redirectTo({
        url: "/pages/login/index"
      });
    } else {
      this.globalData.userInfo = user.data;
      common_vendor.index.switchTab({
        url: "/pages/tabBar/index/index"
      });
    }
  },
  onShow: function() {
    console.log("App Show");
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/project/使用cli创建vue和react模板/uni-app/uni-app-template/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
