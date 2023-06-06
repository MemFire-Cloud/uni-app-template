"use strict";
const common_vendor = require("../../common/vendor.js");
const lib_supabaseClient = require("../../lib/supabaseClient.js");
const utils_commonApi = require("../../utils/commonApi.js");
var mySubscription;
const _sfc_main = {
  data() {
    return {
      userInfo: null,
      totalPeoples: [],
      messages: null,
      inputTxt: ""
    };
  },
  methods: {
    async send() {
      await lib_supabaseClient.supabase.from("messages").insert([
        {
          user_id: this.userInfo.id,
          message: this.inputTxt,
          avatar: this.userInfo.user_metadata.avatar ? this.userInfo.user_metadata.avatar : "",
          user_name: this.userInfo.user_metadata.username ? this.userInfo.user_metadata.username : "微信用户"
        }
      ]);
      this.inputTxt = "";
    },
    async getInitialMessages() {
      const { data: { data }, error } = await lib_supabaseClient.supabase.from("messages").select();
      if (error) {
        throw error.message || error.error_description;
      } else {
        if (data.length > 0) {
          for (const item of data) {
            item.imgUrl = await utils_commonApi.DownloadImage(item.avatar);
          }
        }
        return data;
      }
    }
  },
  onLoad: async function(options) {
    let mySubscriptions = lib_supabaseClient.supabase.channel("public:messages").on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "messages"
      },
      (payload) => {
        this.getInitialMessages().then((res) => {
          this.messages = res;
        }).catch((err) => {
          common_vendor.index.showToast({
            title: err,
            duration: 1500,
            icon: "none"
          });
        });
      }
    ).subscribe();
    if (getApp().globalData.userInfo.id) {
      this.userInfo = getApp().globalData.userInfo;
    } else {
      common_vendor.index.showToast({
        title: "请先登录",
        duration: 1500,
        icon: "none"
      });
    }
    this.getInitialMessages().then((res) => {
      this.messages = res;
    }).catch((err) => {
      common_vendor.index.showToast({
        title: err,
        duration: 1500,
        icon: "none"
      });
    });
    mySubscription = mySubscriptions;
  },
  onUnload: function() {
    lib_supabaseClient.supabase.removeChannel(mySubscription);
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.messages, (item, index, i0) => {
      return {
        a: common_vendor.n(item.user_id == $data.userInfo.id ? "sj" : "osj"),
        b: item.imgUrl,
        c: common_vendor.t(item.user_name),
        d: common_vendor.t(item.message),
        e: common_vendor.n(item.user_id == $data.userInfo.id ? "msg-bubble" : "other-bubble msg-bubble"),
        f: common_vendor.t(item.created_at),
        g: common_vendor.n(item.user_id == $data.userInfo.id ? "me chat-item" : "chat-item"),
        h: common_vendor.n(item.user_id == $data.userInfo.id ? "r-re msg-box" : "msg-box"),
        i: index
      };
    }),
    b: common_vendor.o((...args) => $options.send && $options.send(...args)),
    c: $data.inputTxt,
    d: common_vendor.o(($event) => $data.inputTxt = $event.detail.value),
    e: common_vendor.o((...args) => $options.send && $options.send(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/project/使用cli或npx创建模版/uni-app-template/pages/messages/index.vue"]]);
wx.createPage(MiniProgramPage);
