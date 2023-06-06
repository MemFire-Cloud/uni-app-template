"use strict";
const common_vendor = require("../../common/vendor.js");
const pages_todo_api = require("./api.js");
require("../../lib/supabaseClient.js");
const _sfc_main = {
  data() {
    return {
      searchVal: "",
      todoList: [],
      user_id: null,
      todo_id: null,
      formData: {}
    };
  },
  // 获取列表
  onLoad: function(options) {
    this.getTodoList();
  },
  methods: {
    deleteItem(id) {
      pages_todo_api.DeleteTodo(id).then((res) => {
        this.getTodoList();
        common_vendor.index.showToast({
          title: "删除成功！",
          icon: "none",
          duration: 2e3
        });
      }).catch((err) => {
        common_vendor.index.showToast({
          title: err,
          icon: "none",
          duration: 2e3
        });
      });
    },
    addItem() {
      common_vendor.index.navigateTo({
        url: "/pages/addTodo/index"
      });
    },
    onOpenTodo(id) {
      common_vendor.index.navigateTo({
        url: "/pages/addTodo/index?id=" + id
      });
    },
    radioChange(id, type) {
      if (type === "completed") {
        pages_todo_api.UpdateTodo({
          completed: true
        }, id).then((res) => {
          this.getTodoList();
        }).catch((err) => {
          common_vendor.index.showToast({
            title: err,
            icon: "none",
            duration: 2e3
          });
        });
      } else if (type === "nocCompleted") {
        pages_todo_api.UpdateTodo({
          completed: false
        }, id).then((res) => {
          this.getTodoList();
        }).catch((err) => {
          common_vendor.index.showToast({
            title: err,
            icon: "none",
            duration: 2e3
          });
        });
      }
    },
    // 获取数据
    getTodoList() {
      pages_todo_api.FetchPage().then((res) => {
        this.todoList = res;
      }).catch((err) => {
        common_vendor.index.showToast({
          title: err,
          icon: "none",
          duration: 2e3
        });
      });
    },
    async handerSearch() {
      pages_todo_api.SearchText(this.searchVal).then((res) => {
        this.todoList = res;
      }).catch((err) => {
        common_vendor.index.showToast({
          title: err,
          icon: "none",
          duration: 2e3
        });
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_swipe_action_item2 = common_vendor.resolveComponent("uni-swipe-action-item");
  (_easycom_uni_search_bar2 + _easycom_uni_icons2 + _easycom_uni_swipe_action_item2)();
}
const _easycom_uni_search_bar = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-search-bar/uni-search-bar.js";
const _easycom_uni_icons = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons.js";
const _easycom_uni_swipe_action_item = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-swipe-action-item/uni-swipe-action-item.js";
if (!Math) {
  (_easycom_uni_search_bar + _easycom_uni_icons + _easycom_uni_swipe_action_item)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($options.handerSearch),
    b: common_vendor.o(($event) => $data.searchVal = $event),
    c: common_vendor.p({
      modelValue: $data.searchVal
    }),
    d: common_vendor.f($data.todoList, (item, index, i0) => {
      return common_vendor.e({
        a: !item.completed
      }, !item.completed ? {
        b: item.completed,
        c: common_vendor.t(item.todo),
        d: common_vendor.o(() => {
        }, index),
        e: common_vendor.o(($event) => $options.radioChange(item.id, "completed"), index),
        f: "01f8c46d-2-" + i0 + "," + ("01f8c46d-1-" + i0),
        g: common_vendor.p({
          type: "right",
          size: "18"
        }),
        h: common_vendor.o(($event) => $options.onOpenTodo(item.id), index),
        i: common_vendor.o(($event) => $options.deleteItem(item.id), index),
        j: "01f8c46d-1-" + i0
      } : {}, {
        k: index
      });
    }),
    e: common_vendor.f($data.todoList, (item, index, i0) => {
      return common_vendor.e({
        a: item.completed
      }, item.completed ? {
        b: common_vendor.t(item.todo),
        c: common_vendor.o(($event) => $options.radioChange(item.id, "noCompleted"), index),
        d: common_vendor.o(() => {
        }, index),
        e: "01f8c46d-4-" + i0 + "," + ("01f8c46d-3-" + i0),
        f: common_vendor.p({
          type: "right",
          size: "18"
        }),
        g: common_vendor.o(($event) => $options.onOpenTodo(item.id), index),
        h: common_vendor.o(($event) => $options.deleteItem(item.id), index),
        i: "01f8c46d-3-" + i0
      } : {}, {
        j: index
      });
    }),
    f: common_vendor.o((...args) => $options.addItem && $options.addItem(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/project/使用cli或npx创建模版/uni-app-template/pages/todo/index.vue"]]);
wx.createPage(MiniProgramPage);
