"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  onLoad: function(option) {
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
  return {
    a: common_vendor.p({
      title: "todoList",
      link: true,
      to: "/pages/todo/index"
    }),
    b: common_vendor.p({
      title: "网盘",
      link: "reLaunch",
      to: "/pages/filestorage/index"
    }),
    c: common_vendor.p({
      title: "聊天室",
      link: "reLaunch",
      to: "/pages/messages/index"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/project/uni-app/test/pages/tabBar/index/index.vue"]]);
wx.createPage(MiniProgramPage);
