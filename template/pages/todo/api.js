import { supabase } from '../../lib/supabaseClient'
//列表模块API
// 获取列表数据
export const FetchTodo = async () => {
        const { data:{data}, error } = await supabase
            .from('todo_list')
            .select('*')
        if (error) {
            throw error.message || error.error_description
        } else {
            return data.length > 0 ? data.length : 0
        }
}
// 分页查询
export const FetchPage = async (start, end) => {
        const { data:{data}, error } = await supabase
            .from('todo_list')
            .select('*')
            .order('created_at', { ascending: false })
            .range(start, end)
            .limit(10);
        if (error) {
            throw error.message || error.error_description
        } else {
            return data
        }
}
// 模糊查询
export const SearchText = async (query) => {
        const { data:{data}, error } = await supabase
            .from('todo_list')
            .select('*').order('created_at', { ascending: false }).filter('todo', 'ilike', `%${query ? query : ''}%`)
            .limit(10);
        if (error) {
            throw error.message || error.error_description
        } else {
            return data
        }
}

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
//删除数据
export const DeleteTodo = async (id) => {
        const { error } = await supabase
            .from('todo_list')
            .delete()
            .eq('id', id);
        if (error) {
            throw error.message || error.error_description
        } else {
            return 'success'
        }
}
