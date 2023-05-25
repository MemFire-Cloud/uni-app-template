"use strict";
const common_vendor = require("../../common/vendor.js");
const pages_todo_api = require("./api.js");
require("../../lib/supabaseClient.js");
const _sfc_main = {
  data() {
    return {
      searchVal: "",
      todoList: [],
      // 每页数据量
      pageSize: 10,
      // 当前页
      pageCurrent: 1,
      // 数据总量
      total: 0,
      loading: false,
      showModal: false,
      completeCheck: false,
      user_id: null,
      todo_id: null,
      start: 0,
      end: 9,
      formData: {}
    };
  },
  // 获取列表
  onLoad: function(options) {
    this.getTodoList(this.start, this.end);
    this.allCount();
  },
  methods: {
    deleteItem(id) {
      pages_todo_api.DeleteTodo(id).then((res) => {
        this.getTodoList(this.start, this.end);
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
    updateItem(item) {
      this.formData.todo = item.todo;
      this.formData.completed = item.completed;
      this.todo_id = item.id;
      this.$refs.popup.open();
    },
    /**
     * 点击取消按钮触发
     * @param {Object} done
     */
    close() {
      this.$refs.popup.close();
    },
    confirm() {
      if (!this.todo_id) {
        pages_todo_api.AddTodo({
          user_id: getApp().globalData.userInfo.id,
          ...this.formData
        }).then((res) => {
          this.getTodoList(this.start, this.end);
          this.$refs.popup.close();
          common_vendor.index.showToast({
            title: "添加成功！",
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
      } else if (this.todo_id) {
        pages_todo_api.UpdateTodo(this.formData, this.todo_id).then((res) => {
          this.getTodoList(this.start, this.end);
          this.$refs.popup.close();
          common_vendor.index.showToast({
            title: "修改成功！",
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
      }
    },
    // 分页触发
    change(e) {
      this.$refs.table.clearSelection();
      this.start = e.current * 10 - 10;
      this.end = e.current * 10 - 1;
      this.getTodoList(e.current * 10 - 10, e.current * 10 - 1);
    },
    addItem() {
      this.formData = {};
      this.todo_id = null;
      this.$refs.popup.open();
    },
    // 获取数据
    getTodoList(start, end) {
      pages_todo_api.FetchPage(start, end).then((res) => {
        this.todoList = res;
        this.allCount();
      }).catch((err) => {
        common_vendor.index.showToast({
          title: err,
          icon: "none",
          duration: 2e3
        });
      });
    },
    allCount() {
      pages_todo_api.FetchTodo().then((res) => {
        this.total = res;
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
  const _easycom_uni_th2 = common_vendor.resolveComponent("uni-th");
  const _easycom_uni_tr2 = common_vendor.resolveComponent("uni-tr");
  const _easycom_uni_td2 = common_vendor.resolveComponent("uni-td");
  const _easycom_uni_table2 = common_vendor.resolveComponent("uni-table");
  const _easycom_uni_pagination2 = common_vendor.resolveComponent("uni-pagination");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_th2 + _easycom_uni_tr2 + _easycom_uni_td2 + _easycom_uni_table2 + _easycom_uni_pagination2 + _easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_forms2 + _easycom_uni_popup_dialog2 + _easycom_uni_popup2)();
}
const _easycom_uni_th = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-th/uni-th.js";
const _easycom_uni_tr = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-tr/uni-tr.js";
const _easycom_uni_td = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-td/uni-td.js";
const _easycom_uni_table = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-table/uni-table.js";
const _easycom_uni_pagination = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-pagination/uni-pagination.js";
const _easycom_uni_easyinput = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-forms-item/uni-forms-item.js";
const _easycom_uni_forms = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-forms/uni-forms.js";
const _easycom_uni_popup_dialog = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_th + _easycom_uni_tr + _easycom_uni_td + _easycom_uni_table + _easycom_uni_pagination + _easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_forms + _easycom_uni_popup_dialog + _easycom_uni_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.handerSearch && $options.handerSearch(...args)),
    b: $data.searchVal,
    c: common_vendor.o(($event) => $data.searchVal = $event.detail.value),
    d: common_vendor.p({
      align: "center"
    }),
    e: common_vendor.p({
      align: "center"
    }),
    f: common_vendor.p({
      align: "center"
    }),
    g: common_vendor.f($data.todoList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.todo),
        b: "19453598-6-" + i0 + "," + ("19453598-5-" + i0),
        c: common_vendor.t(item.completed ? "完成" : "未完成"),
        d: "19453598-7-" + i0 + "," + ("19453598-5-" + i0),
        e: common_vendor.o(($event) => $options.updateItem(item), index),
        f: common_vendor.o(($event) => $options.deleteItem(item.id), index),
        g: "19453598-8-" + i0 + "," + ("19453598-5-" + i0),
        h: index,
        i: "19453598-5-" + i0 + ",19453598-0"
      };
    }),
    h: common_vendor.p({
      align: "center"
    }),
    i: common_vendor.sr("table", "19453598-0"),
    j: common_vendor.p({
      loading: $data.loading,
      border: true,
      emptyText: "暂无更多数据"
    }),
    k: common_vendor.o($options.change),
    l: common_vendor.p({
      ["show-icon"]: true,
      ["page-size"]: $data.pageSize,
      current: $data.pageCurrent,
      total: $data.total
    }),
    m: common_vendor.o((...args) => $options.addItem && $options.addItem(...args)),
    n: common_vendor.o(($event) => $data.formData.todo = $event),
    o: common_vendor.p({
      type: "text",
      placeholder: "请输入姓名",
      modelValue: $data.formData.todo
    }),
    p: common_vendor.p({
      required: true,
      label: "待办事项",
      name: "todo"
    }),
    q: $data.formData.completed,
    r: common_vendor.o((...args) => _ctx.handerComplete && _ctx.handerComplete(...args)),
    s: common_vendor.p({
      required: true,
      name: "completed",
      label: "是否完成"
    }),
    t: common_vendor.p({
      modelValue: $data.formData,
      ["label-position"]: "top"
    }),
    v: common_vendor.o($options.close),
    w: common_vendor.o($options.confirm),
    x: common_vendor.p({
      title: $data.todo_id ? "修改" : "添加",
      duration: 2e3,
      ["before-close"]: true
    }),
    y: common_vendor.sr("popup", "19453598-10"),
    z: common_vendor.p({
      type: "dialog"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/project/使用cli创建vue和react模板/uni-app/uni-app-template/pages/todo/index.vue"]]);
wx.createPage(MiniProgramPage);
