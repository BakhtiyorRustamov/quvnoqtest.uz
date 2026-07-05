-- QuvnoqTest.uz schema (SRS §12). Run in the Supabase SQL editor.
-- The app uses the service-role key from server-side route handlers only,
-- so RLS stays enabled with no public policies (deny-by-default for anon).

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  public_id text unique not null,
  email text unique,
  name text,
  phone text,
  grade int not null default 1 check (grade between 1 and 11),
  locale text not null default 'uz',
  paid_until timestamptz,
  device_token text,
  created_at timestamptz not null default now()
);
create index if not exists users_device_token_idx on users (device_token);

create table if not exists progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users (id) on delete cascade,
  subject_key text not null,
  topic_key text not null,
  status text not null default 'completed' check (status in ('in_progress', 'completed')),
  score int not null default 0,
  completed_at timestamptz,
  unique (user_id, topic_key)
);

create table if not exists quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users (id) on delete cascade,
  topic_key text not null,
  answers jsonb,
  score int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists ai_usage (
  user_id uuid not null references users (id) on delete cascade,
  usage_date date not null,
  message_count int not null default 0,
  tokens_used int not null default 0,
  primary key (user_id, usage_date)
);

create table if not exists magic_links (
  token text primary key,
  email text not null,
  user_id uuid references users (id) on delete set null,
  expires_at timestamptz not null,
  consumed_at timestamptz
);

-- optional (SRS §12.6) — v1.0 keeps drawings client-side; table provided for later
create table if not exists drawings (
  user_id uuid not null references users (id) on delete cascade,
  subject_key text not null,
  canvas jsonb,
  primary key (user_id, subject_key)
);

-- Parents (Telegram mini-app users) and their linked children
create table if not exists parents (
  id uuid primary key default gen_random_uuid(),
  telegram_id bigint unique not null,
  name text,
  username text,
  locale text not null default 'uz',
  created_at timestamptz not null default now()
);

create table if not exists parent_children (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid not null references parents (id) on delete cascade,
  child_user_id uuid not null references users (id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (parent_id, child_user_id)
);
create index if not exists parent_children_parent_idx on parent_children (parent_id);

alter table users enable row level security;
alter table progress enable row level security;
alter table quiz_attempts enable row level security;
alter table ai_usage enable row level security;
alter table magic_links enable row level security;
alter table drawings enable row level security;
alter table parents enable row level security;
alter table parent_children enable row level security;
