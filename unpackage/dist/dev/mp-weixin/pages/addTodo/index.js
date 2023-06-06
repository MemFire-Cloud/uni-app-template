"use strict";
const common_vendor = require("../../common/vendor.js");
require("../../lib/supabaseClient.js");
const pages_addTodo_api = require("./api.js");
const _sfc_main = {
  data() {
    return {
      id: null,
      todoInfo: {},
      user_id: null
    };
  },
  onLoad(e) {
    this.user_id = getApp().globalData.userInfo.id;
    if (e.id) {
      this.id = e.id;
      pages_addTodo_api.fetchOneTodo(this.id).then((res) => {
        this.todoInfo = res[0];
      }).catch((err) => {
        common_vendor.index.showToast({
          title: err,
          icon: "none",
          duration: 2e3
        });
      });
    }
  },
  methods: {
    addItem() {
      if (!this.id) {
        pages_addTodo_api.AddTodo({
          todo: this.todoInfo.todo,
          completed: false,
          user_id: this.user_id
        }).then((res) => {
          common_vendor.index.showToast({
            title: "新增成功",
            icon: "none",
            duration: 2e3
          });
          common_vendor.index.navigateTo({
            url: "/pages/todo/index"
          });
        }).catch((err) => {
          common_vendor.index.showToast({
            title: err,
            icon: "none",
            duration: 2e3
          });
        });
      } else {
        pages_addTodo_api.UpdateTodo({
          todo: this.todoInfo.todo,
          completed: this.todoInfo.completeCheck
        }, this.id).then((res) => {
          common_vendor.index.showToast({
            title: "修改成功",
            icon: "none",
            duration: 2e3
          });
          common_vendor.index.navigateTo({
            url: "/pages/todo/index"
          });
        }).catch((err) => {
          common_vendor.index.showToast({
            title: err,
            icon: "none",
            duration: 2e3
          });
        });
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.todoInfo.todo,
    b: common_vendor.o(($event) => $data.todoInfo.todo = $event.detail.value),
    c: common_vendor.o((...args) => $options.addItem && $options.addItem(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/project/使用cli或npx创建模版/uni-app-template/pages/addTodo/index.vue"]]);
wx.createPage(MiniProgramPage);
