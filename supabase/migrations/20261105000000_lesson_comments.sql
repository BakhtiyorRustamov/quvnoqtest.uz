create table if not exists public.lesson_comments (
  id bigint generated always as identity primary key,
  page text not null check (char_length(page) between 1 and 120),
  user_id uuid not null references public.users(id) on delete cascade,
  author text not null default '' check (char_length(author) <= 60),
  body text not null check (char_length(body) between 1 and 1000),
  hidden boolean not null default false,
  created_at timestamptz not null default now()
);
create index if not exists lesson_comments_page_idx on public.lesson_comments (page, created_at desc) where not hidden;
create index if not exists lesson_comments_user_idx on public.lesson_comments (user_id, created_at desc);
alter table public.lesson_comments enable row level security;
revoke all on public.lesson_comments from anon, authenticated;

-- video queue (Mufassal answers → YouTube / Instagram) and a public bucket for Reels upload
create table if not exists public.board_videos (
  id bigint generated always as identity primary key,
  question text not null check (char_length(question) between 1 and 500),
  lesson jsonb not null,
  lang text not null default 'uz',
  model text,
  status text not null default 'new' check (status in ('new','recorded','published','skipped')),
  youtube_id text,
  instagram_id text,
  created_at timestamptz not null default now()
);
create index if not exists board_videos_status_idx on public.board_videos (status, created_at desc);
alter table public.board_videos enable row level security;
revoke all on public.board_videos from anon, authenticated;
insert into storage.buckets (id, name, public) values ('videos', 'videos', true) on conflict (id) do nothing;
