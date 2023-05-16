"use strict";
const lib_supabaseClient = require("../lib/supabaseClient.js");
const DownloadImage = async (path) => {
  const { data, error } = lib_supabaseClient.supabase.storage.from("avatars").getPublicUrl(path);
  if (error) {
    throw error.message || error.error_description;
  } else {
    return data.publicUrl;
  }
};
exports.DownloadImage = DownloadImage;
