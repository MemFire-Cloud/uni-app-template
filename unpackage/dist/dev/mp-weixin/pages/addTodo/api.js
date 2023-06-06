"use strict";
const lib_supabaseClient = require("../../lib/supabaseClient.js");
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
const fetchOneTodo = async (id) => {
  const { data: { data }, error } = await lib_supabaseClient.supabase.from("todo_list").select("*").eq("id", id);
  if (error) {
    throw error.message || error.error_description;
  } else {
    return data;
  }
};
exports.AddTodo = AddTodo;
exports.UpdateTodo = UpdateTodo;
exports.fetchOneTodo = fetchOneTodo;
