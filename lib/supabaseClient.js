// import { createClient } from 'supabase-minichat'
import { createClient } from 'supabase-wechat-stable-v2'

const url = "https://ch2vlma5g6h9k9li2hag.baseapi.memfiredb.com"
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImV4cCI6MzIyMDIyNzgwMSwiaWF0IjoxNjgyMzA3ODAxLCJpc3MiOiJzdXBhYmFzZSJ9.8PMIzn8CSYYwyocokw4O3EMqNsKubxQ4SeFM5j05ZSA"
export const supabase = createClient(url, key)