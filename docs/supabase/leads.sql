create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  full_name text,
  email text,
  company text,
  role text,
  message text,
  agree_to_terms boolean not null,
  marketing_opt_in boolean not null default false,
  ip text,
  user_agent text,
  source text
);

alter table public.leads
  enable row level security;

-- This table is write-only through server-side service role calls.
-- Do not expose public select policies.
