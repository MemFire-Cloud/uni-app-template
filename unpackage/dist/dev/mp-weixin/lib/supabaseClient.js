"use strict";
const common_vendor = require("../common/vendor.js");
const url = "https://ch2vlma5g6h9k9li2hag.baseapi.memfiredb.com";
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImV4cCI6MzIyMDIyNzgwMSwiaWF0IjoxNjgyMzA3ODAxLCJpc3MiOiJzdXBhYmFzZSJ9.8PMIzn8CSYYwyocokw4O3EMqNsKubxQ4SeFM5j05ZSA";
const supabase = common_vendor.module.createClient(url, key);
exports.supabase = supabase;
