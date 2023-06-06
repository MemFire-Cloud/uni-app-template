"use strict";
const common_vendor = require("../common/vendor.js");
const url = "";
const key = "";
const supabase = common_vendor.module.createClient(url, key);
exports.supabase = supabase;
