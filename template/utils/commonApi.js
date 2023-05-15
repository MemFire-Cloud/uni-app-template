 import { supabase } from '../lib/supabaseClient'
 export const DownloadImage = async (path) => {
  const { data,error } = supabase
  .storage
  .from('avatars')
  .getPublicUrl(path)
  if (error) {
      throw error.message || error.error_description
  } else {
      return data.publicUrl
  }
}
