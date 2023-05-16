"use strict";
const lib_supabaseClient = require("../../lib/supabaseClient.js");
const utils_util = require("../../utils/util.js");
const UploadFile = async (files) => {
  const file = files;
  const { data, error } = await lib_supabaseClient.supabase.storage.from("files").upload(file.name, file, {
    cacheControl: "3600"
  });
  if (error) {
    throw error.message || error.error_description;
  } else {
    return data;
  }
};
const RemoveFile = async (filename) => {
  const { data, error } = await lib_supabaseClient.supabase.storage.from("files").remove(filename);
  if (error) {
    throw error.message || error.error_description;
  } else {
    return data;
  }
};
const ListFile = async () => {
  const { data: { data }, error } = await lib_supabaseClient.supabase.storage.from("files").list();
  if (error) {
    throw error.message || error.error_description;
  } else {
    if (data.length > 0) {
      data.map((item) => {
        item.created_at = utils_util.formatTime(item.created_at);
        item.size = item.metadata.size;
        delete item.metadata;
      });
    }
    return data;
  }
};
const ListProfixFile = async (type) => {
  const { data: { data }, error } = await lib_supabaseClient.supabase.storage.from("files").list();
  if (error) {
    throw error.message || error.error_description;
  } else {
    let res = [];
    if (data.length > 0) {
      data.map((item, index) => {
        if (type === "文档") {
          if (item.name.slice(item.name.lastIndexOf(".") + 1) === "doc" || item.name.slice(item.name.lastIndexOf(".") + 1) === "xml" || item.name.slice(item.name.lastIndexOf(".") + 1) === "docx") {
            item.created_at = utils_util.formatTime(item.created_at);
            item.size = item.metadata.size;
            delete item.metadata;
            res.push(item);
          }
        } else if (type === "图片") {
          if (item.name.slice(item.name.lastIndexOf(".") + 1) === "jpg" || item.name.slice(item.name.lastIndexOf(".") + 1) === "png") {
            item.created_at = utils_util.formatTime(item.created_at);
            item.size = item.metadata.size;
            delete item.metadata;
            res.push(item);
          }
        } else if (type === "视频") {
          if (item.name.slice(item.name.lastIndexOf(".") + 1) === "mp4") {
            item.created_at = utils_util.formatTime(item.created_at);
            item.size = item.metadata.size;
            delete item.metadata;
            res.push(item);
          }
        } else if (type === "全部") {
          item.created_at = utils_util.formatTime(item.created_at);
          item.size = item.metadata.size;
          delete item.metadata;
          res.push(item);
        }
      });
    }
    return res;
  }
};
exports.ListFile = ListFile;
exports.ListProfixFile = ListProfixFile;
exports.RemoveFile = RemoveFile;
exports.UploadFile = UploadFile;
