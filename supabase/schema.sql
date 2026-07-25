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

-- ===========================================================================
-- Payments (manual card transfer + receipt), promo codes, admin panel.
-- Applied as migration `payments_promo_admin`.
-- ===========================================================================

alter table users add column if not exists disabled_at timestamptz;
alter table users add column if not exists disabled_reason text;
alter table users add column if not exists strikes int not null default 0;

create table if not exists payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users (id) on delete cascade,
  amount int not null default 15000,
  currency text not null default 'UZS',
  -- which of the owner's cards the money was sent to (monthly reconciliation)
  card_target text not null check (card_target in ('humo', 'visa_uzum')),
  -- receipt image, stored in the PRIVATE 'receipts' storage bucket
  receipt_path text,
  receipt_mime text,
  receipt_bytes int,
  receipt_sha256 text,
  receipt_dhash text,
  -- automated plausibility check (src/lib/receipt.ts)
  check_score int not null default 0 check (check_score between 0 and 100),
  check_reasons jsonb not null default '[]'::jsonb,
  status text not null default 'auto_approved'
    check (status in ('auto_approved', 'approved', 'rejected', 'needs_review')),
  granted_days int not null default 30,
  paid_until_before timestamptz,
  paid_until_after timestamptz,
  reviewed_by text,
  reviewed_at timestamptz,
  admin_note text,
  ip text,
  user_agent text,
  created_at timestamptz not null default now()
);
create index if not exists payments_user_idx on payments (user_id, created_at desc);
create index if not exists payments_status_idx on payments (status, created_at desc);
create index if not exists payments_created_idx on payments (created_at desc);
-- the identical file may never be submitted twice
create unique index if not exists payments_sha256_uniq
  on payments (receipt_sha256) where receipt_sha256 is not null;
create index if not exists payments_dhash_idx
  on payments (receipt_dhash) where receipt_dhash is not null;

create table if not exists promo_codes (
  code text primary key,
  days int not null default 30 check (days between 1 and 3650),
  max_uses int not null default 1 check (max_uses >= 1),
  used_count int not null default 0,
  note text,
  expires_at timestamptz,
  created_by text,
  created_at timestamptz not null default now(),
  disabled_at timestamptz
);

create table if not exists promo_redemptions (
  id uuid primary key default gen_random_uuid(),
  code text not null references promo_codes (code) on delete cascade,
  user_id uuid not null references users (id) on delete cascade,
  days int not null,
  redeemed_at timestamptz not null default now(),
  unique (code, user_id)
);
create index if not exists promo_redemptions_user_idx on promo_redemptions (user_id);

create table if not exists admin_sessions (
  token_hash text primary key,
  label text,
  ip text,
  user_agent text,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null,
  revoked_at timestamptz
);
create index if not exists admin_sessions_expires_idx on admin_sessions (expires_at);

create table if not exists admin_audit_log (
  id uuid primary key default gen_random_uuid(),
  actor text not null,
  action text not null,
  target_type text,
  target_id text,
  detail jsonb not null default '{}'::jsonb,
  ip text,
  created_at timestamptz not null default now()
);
create index if not exists admin_audit_created_idx on admin_audit_log (created_at desc);

create table if not exists user_notices (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users (id) on delete cascade,
  kind text not null check (kind in ('payment_rejected', 'payment_approved', 'info', 'warning')),
  title text not null,
  body text,
  created_at timestamptz not null default now(),
  dismissed_at timestamptz
);
create index if not exists user_notices_user_idx on user_notices (user_id, dismissed_at, created_at desc);

-- Cross-instance rate limiting. The in-memory limiter in src/lib/rateLimit.ts
-- resets on every serverless cold start, so anything security-relevant uses this.
create table if not exists rate_limits (
  bucket text primary key,
  count int not null default 0,
  reset_at timestamptz not null
);
create index if not exists rate_limits_reset_idx on rate_limits (reset_at);

create or replace function rate_limit_hit(p_bucket text, p_limit int, p_window_seconds int)
returns boolean language plpgsql security invoker set search_path = public as $$
declare v_count int; v_reset timestamptz;
begin
  insert into rate_limits (bucket, count, reset_at)
  values (p_bucket, 1, now() + make_interval(secs => p_window_seconds))
  on conflict (bucket) do update
    set count = case when rate_limits.reset_at <= now() then 1 else rate_limits.count + 1 end,
        reset_at = case when rate_limits.reset_at <= now()
                        then now() + make_interval(secs => p_window_seconds)
                        else rate_limits.reset_at end
  returning count, reset_at into v_count, v_reset;
  return v_count <= p_limit;
end; $$;
revoke execute on function rate_limit_hit(text, int, int) from anon, authenticated;

alter table payments enable row level security;
alter table promo_codes enable row level security;
alter table promo_redemptions enable row level security;
alter table admin_sessions enable row level security;
alter table admin_audit_log enable row level security;
alter table user_notices enable row level security;
alter table rate_limits enable row level security;

-- This helper was executable by anon over /rest/v1/rpc (security advisory).
revoke execute on function public.rls_auto_enable() from anon, authenticated;

-- Private bucket for receipts. Storage buckets cannot be created with plain
-- DDL in the SQL editor on all plans; if this errors, create a PRIVATE bucket
-- named "receipts" in Storage → New bucket instead.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('receipts', 'receipts', false, 8388608,
        array['image/jpeg','image/png','image/webp','image/heic','image/heif'])
on conflict (id) do update set public = false;
