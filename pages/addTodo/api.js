import { supabase } from '../../lib/supabaseClient'
//修改列表数据
export const UpdateTodo = async (update, id) => {
    const { error } = await supabase
        .from('todo_list')
        .update(update)
        .eq('id', id)
    if (error) {
        throw error.message || error.error_description
    } else {
        return 'success'
    }
}

//添加数据
export const AddTodo = async (todo) => {
    const { error } = await supabase
        .from('todo_list')
        .insert(todo)
    if (error) {
        throw error.message || error.error_description
    } else {
        return 'success'
    }
}

//获取具体数据
export const fetchOneTodo = async (id) => {
    const { data:{data}, error } = await supabase
    .from("todo_list")
    .select("*")
    .eq("id", id);
    if (error) {
        throw error.message || error.error_description
    } else {
        return data
    }
}