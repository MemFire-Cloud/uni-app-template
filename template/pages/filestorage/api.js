import { supabase } from '../../lib/supabaseClient'
import { formatTime } from '../../utils/util'
//上传文件
export const UploadFile = async (files) => {
        const file = files
        const { data, error } = await supabase
            .storage
            .from('files')
            .upload(file.name, file, {
                cacheControl: '3600',
            })
        if (error) {
            throw error.message || error.error_description
        } else {
            return data
        }
}
//下载文件
export const DownloadFile = async (filename) => {
        const { data, error } = await supabase
            .storage.from('files')
            .download(filename)
        if (error) {
            throw error.message || error.error_description
        } else {
            const link = document.createElement("a");
            link.href = URL.createObjectURL(data);
            link.download = filename;
            link.click();
        }
}
//删除文件
export const RemoveFile = async (filename) => {
        const { data, error } = await supabase
            .storage.from('files')
            .remove(filename)
        if (error) {
            throw error.message || error.error_description
        } else {
            return data
        }
}
//获取文件
export const ListFile = async () => {
        const { data:{data}, error } = await supabase
            .storage.from('files')
            .list()
        if (error) {
            throw error.message || error.error_description
        } else {
            if(data.length>0){
                data.map(item =>{
                    item.created_at = formatTime(item.created_at)
                    item.size = item.metadata.size;
                    delete item.metadata;
                })
            }
            return data
        }
}
//或者不同类型文件
export const ListProfixFile = async (type) => {
        const { data:{data}, error } = await supabase
            .storage.from('files')
            .list()
        if (error) {
            throw error.message || error.error_description
        } else {
            let res = []
            if(data.length>0){
                data.map((item,index) =>{
                    // .doc,.xml,.docx,
                    if(type === '文档'){
                        if(item.name.slice(item.name.lastIndexOf('.')+1) === 'doc' || item.name.slice(item.name.lastIndexOf('.')+1) === 'xml' || item.name.slice(item.name.lastIndexOf('.')+1) === 'docx'){
                            item.created_at = formatTime(item.created_at)
                            item.size = item.metadata.size;
                            delete item.metadata;
                            res.push(item)
                        }
                    }else if(type === '图片'){
                        if(item.name.slice(item.name.lastIndexOf('.')+1) === 'jpg' || item.name.slice(item.name.lastIndexOf('.')+1) === 'png'){
                            item.created_at = formatTime(item.created_at)
                            item.size = item.metadata.size;
                            delete item.metadata;
                            res.push(item)
                        }
                    }else if(type === '视频'){
                        if(item.name.slice(item.name.lastIndexOf('.')+1) === 'mp4'){
                            item.created_at = formatTime(item.created_at)
                            item.size = item.metadata.size;
                            delete item.metadata;
                            res.push(item)
                        }
                    }else if(type === '全部'){
                        item.created_at = formatTime(item.created_at)
                        item.size = item.metadata.size;
                        delete item.metadata;
                        res.push(item)
                    }

                })
            }
            return res
        }
}
