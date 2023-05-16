## 用法

1.创建MemFire Cloud 应用

2.创建数据表

```sql
-- 创建todo表(todo)
CREATE TABLE "public"."todo_list" (
  "id" SERIAL,
  "created_at" timestamp default now(),
  "user_id" uuid references auth.users NOT NULL,
  "todo" VARCHAR NOT NULL,
  "completed" BOOLEAN default false NOT NULL
);
-- 创建聊天记录表(Chatroom)
CREATE TABLE "public"."messages" (
  "id" SERIAL primary key,
  "user_id" uuid references auth.users NOT NULL,
  "created_at" timestamp default now(),
  "message" TEXT NOT NULL,
  "user_name" TEXT NOT NULL,
  "avatar" TEXT NOT NULL
);
-- 开启 RLS
alter table todo_list enable row level security;
alter table messages enable row level security;

-- 表开启 realtime
alter publication supabase_realtime add table public.messages;

-- todo_list 策略
create policy "用户只能增删查改自己的todos" on todo_list
  for all
  using ( auth.uid() = user_id )
  with check ( auth.uid() = user_id );

-- messages 策略
create policy "聊天室内的信息所有人可见" on messages
  for select
  using (true);

create policy "用户只能发送自己的信息" on messages
  for insert
  with check (auth.uid() = user_id);

-- 创建存储桶
insert into storage.buckets (id, name)
  values ('avatars', 'avatars');

insert into storage.buckets (id, name)
  values ('files', 'files');

-- 存储 策略
create policy "允许所有人上传下载删除修改文件" on storage.objects
  for all
  using ( true )
  with check (true);

-- 将avatars改为公开的存储桶
update storage.buckets set public=true where id='avatars';

```
3.在lib/supabaseClient.js文件里配置memfire cloud应用的API访问地址和anon_key