-- Campaign generator history: one row per successful generation.
-- Run in Supabase SQL Editor, or: supabase db push (if using Supabase CLI linked project).

create table if not exists public.campaign_generations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  brief text not null,
  result_markdown text not null,
  model text not null default 'deepseek-chat',
  created_at timestamptz not null default now()
);

create index if not exists campaign_generations_user_created_idx
  on public.campaign_generations (user_id, created_at desc);

comment on table public.campaign_generations is 'Stored outputs from the dashboard campaign generator (per user).';

alter table public.campaign_generations enable row level security;

create policy "Users can read own campaign generations"
  on public.campaign_generations
  for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can insert own campaign generations"
  on public.campaign_generations
  for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Users can delete own campaign generations"
  on public.campaign_generations
  for delete
  to authenticated
  using (auth.uid() = user_id);
