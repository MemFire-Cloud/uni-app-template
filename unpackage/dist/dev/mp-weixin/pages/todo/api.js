"use strict";
const lib_supabaseClient = require("../../lib/supabaseClient.js");
const FetchPage = async () => {
  const { data: { data }, error } = await lib_supabaseClient.supabase.from("todo_list").select("*").order("created_at", { ascending: false });
  if (error) {
    throw error.message || error.error_description;
  } else {
    return data;
  }
};
const SearchText = async (query) => {
  const { data: { data }, error } = await lib_supabaseClient.supabase.from("todo_list").select("*").order("created_at", { ascending: false }).filter("todo", "ilike", `%${query ? query : ""}%`).limit(10);
  if (error) {
    throw error.message || error.error_description;
  } else {
    return data;
  }
};
const UpdateTodo = async (update, id) => {
  const { error } = await lib_supabaseClient.supabase.from("todo_list").update(update).eq("id", id);
  if (error) {
    throw error.message || error.error_description;
  } else {
    return "success";
  }
};
const DeleteTodo = async (id) => {
  const { error } = await lib_supabaseClient.supabase.from("todo_list").delete().eq("id", id);
  if (error) {
    throw error.message || error.error_description;
  } else {
    return "success";
  }
};
exports.DeleteTodo = DeleteTodo;
exports.FetchPage = FetchPage;
exports.SearchText = SearchText;
exports.UpdateTodo = UpdateTodo;
