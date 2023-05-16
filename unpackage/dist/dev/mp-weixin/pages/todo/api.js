"use strict";
const lib_supabaseClient = require("../../lib/supabaseClient.js");
const FetchTodo = async () => {
  const { data: { data }, error } = await lib_supabaseClient.supabase.from("todo_list").select("*");
  if (error) {
    throw error.message || error.error_description;
  } else {
    return data.length > 0 ? data.length : 0;
  }
};
const FetchPage = async (start, end) => {
  const { data: { data }, error } = await lib_supabaseClient.supabase.from("todo_list").select("*").order("created_at", { ascending: false }).range(start, end).limit(10);
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
const AddTodo = async (todo) => {
  const { error } = await lib_supabaseClient.supabase.from("todo_list").insert(todo);
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
exports.AddTodo = AddTodo;
exports.DeleteTodo = DeleteTodo;
exports.FetchPage = FetchPage;
exports.FetchTodo = FetchTodo;
exports.SearchText = SearchText;
exports.UpdateTodo = UpdateTodo;
