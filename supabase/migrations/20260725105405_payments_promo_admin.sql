-- QuvnoqTest: manual-transfer payments, promo codes, admin panel.
-- All access is server-side via the service-role key, so RLS stays enabled
-- with no policies (deny-by-default for anon/authenticated).

-- ---------------------------------------------------------------- users
alter table users add column if not exists disabled_at timestamptz;
alter table users add column if not exists disabled_reason text;
alter table users add column if not exists strikes int not null default 0;

-- ---------------------------------------------------------------- payments
create table if not exists payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users (id) on delete cascade,

  amount int not null default 15000,
  currency text not null default 'UZS',
  -- which of the owner's cards the money was sent to (reconciliation)
  card_target text not null check (card_target in ('humo', 'visa_uzum')),

  -- receipt file (private storage bucket 'receipts')
  receipt_path text,
  receipt_mime text,
  receipt_bytes int,
  receipt_sha256 text,
  receipt_dhash text,

  -- automated plausibility check
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
-- duplicate detection: same exact file may never be submitted twice
create unique index if not exists payments_sha256_uniq
  on payments (receipt_sha256) where receipt_sha256 is not null;
create index if not exists payments_dhash_idx
  on payments (receipt_dhash) where receipt_dhash is not null;

-- ---------------------------------------------------------------- promo codes
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

-- ---------------------------------------------------------------- admin
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

-- ---------------------------------------------------------------- user notices
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

-- ---------------------------------------------------------------- rate limiting
-- Cross-instance limiter: the in-memory one resets on every cold start.
create table if not exists rate_limits (
  bucket text primary key,
  count int not null default 0,
  reset_at timestamptz not null
);
create index if not exists rate_limits_reset_idx on rate_limits (reset_at);

create or replace function rate_limit_hit(
  p_bucket text,
  p_limit int,
  p_window_seconds int
) returns boolean
language plpgsql
security invoker
set search_path = public
as $$
declare
  v_count int;
  v_reset timestamptz;
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
end;
$$;

revoke execute on function rate_limit_hit(text, int, int) from anon, authenticated;

-- ---------------------------------------------------------------- RLS
alter table payments enable row level security;
alter table promo_codes enable row level security;
alter table promo_redemptions enable row level security;
alter table admin_sessions enable row level security;
alter table admin_audit_log enable row level security;
alter table user_notices enable row level security;
alter table rate_limits enable row level security;

-- Pre-existing advisory: this helper was executable by anon over /rest/v1/rpc.
revoke execute on function public.rls_auto_enable() from anon, authenticated;
