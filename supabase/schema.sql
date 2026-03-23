-- Create projects table
create table public.projects (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  name text not null,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create ai_logs table
create table public.ai_logs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  user_input text not null,
  ai_output jsonb not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.projects enable row level security;
alter table public.ai_logs enable row level security;

-- Policies for projects
create policy "Users can view their own projects."
  on public.projects for select
  to authenticated
  using ( auth.uid() = user_id );

create policy "Users can create their own projects."
  on public.projects for insert
  to authenticated
  with check ( auth.uid() = user_id );

create policy "Users can update their own projects."
  on public.projects for update
  to authenticated
  using ( auth.uid() = user_id );

create policy "Users can delete their own projects."
  on public.projects for delete
  to authenticated
  using ( auth.uid() = user_id );

-- Policies for ai_logs
create policy "Users can view their own logs."
  on public.ai_logs for select
  to authenticated
  using ( auth.uid() = user_id );

create policy "Users can create their own logs."
  on public.ai_logs for insert
  to authenticated
  with check ( auth.uid() = user_id );
