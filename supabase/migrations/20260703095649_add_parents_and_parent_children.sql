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

alter table parents enable row level security;
alter table parent_children enable row level security;
