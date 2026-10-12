# Deploying QuvnoqTest.uz

Stack: **Next.js app on Vercel** + **Supabase (Postgres) as the database**.
(Without Supabase the app still runs in per-device "cookie demo" mode.)

---

## 0. Pre-flight (on your machine)

```bash
cd C:\Users\user\q
npm install
npm run build      # must succeed before deploying
```

Already handled: `.gitignore` excludes `node_modules`, `.next`, `.env*`, and the
secret `gcloud-tts.json`. The 41 read-aloud `.wav` files (~45 MB) are committed
and served as static assets. Run `npm run seed:tts` first if any are missing.

---

## 1. Push to GitHub

Create an **empty** repo on github.com (no README/.gitignore), then:

```bash
cd C:\Users\user\q
git init
git add .
git commit -m "QuvnoqTest.uz: Grade 1 Math (41 lessons + review game)"
git branch -M main
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main
```

Verify on GitHub that `gcloud-tts.json` and `.env` are **NOT** present.

---

## 2. Supabase (the database)

1. Create a project at https://supabase.com/dashboard (free tier is fine).
2. Open **SQL Editor** → paste the contents of `supabase/schema.sql` → **Run**.
   (Creates `users`, `progress`, `ai_usage`, `magic_links`; RLS on, deny-by-default.)
3. **Project Settings → API**, copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **service_role** secret key → `SUPABASE_SERVICE_ROLE_KEY` (server-only, never expose)

---

## 3. Deploy on Vercel

1. https://vercel.com → **Add New → Project → Import** your GitHub repo.
2. Framework preset: **Next.js** (auto-detected). No build settings to change.
3. Add **Environment Variables** (see table below) → **Deploy**.
4. After the first deploy, set `NEXT_PUBLIC_APP_URL` to the real Vercel URL and redeploy.

### Environment variables (Vercel → Project → Settings → Environment Variables)

| Variable | Required | Value |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | yes | Supabase Project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | yes | Supabase service_role key (secret) |
| `SESSION_SECRET` | yes | long random string (one is generated for you below) |
| `NEXT_PUBLIC_APP_URL` | yes | your Vercel URL, e.g. `https://quvnoqtest.vercel.app` |
| `RESEND_API_KEY` | optional | enables email registration / magic-link delivery |
| `MAGIC_LINK_FROM` | optional | `"QuvnoqTest <login@yourdomain>"` |

#### AI tutor — pick ONE provider (all OpenAI-compatible)

The tutor turns on as soon as a provider is configured; otherwise it shows
"not configured." Set **either** the `AI_*` group **or** the `AZURE_OPENAI_*`
group (if both are set, Azure wins).

| Provider | Variables |
|---|---|
| **Groq** (free, hosted — recommended) | `AI_BASE_URL=https://api.groq.com/openai/v1`, `AI_MODEL=llama-3.3-70b-versatile`, `AI_API_KEY=gsk_…` |
| **OpenAI** | `AI_BASE_URL=https://api.openai.com/v1`, `AI_MODEL=gpt-4o-mini`, `AI_API_KEY=sk-…` |
| **Ollama** (local dev only) | `AI_BASE_URL=http://localhost:11434/v1`, `AI_MODEL=llama3.2` (no key). Does **not** work on Vercel — the cloud can't reach your localhost. |
| **Azure OpenAI** | `AZURE_OPENAI_ENDPOINT`, `AZURE_OPENAI_DEPLOYMENT`, `AZURE_OPENAI_API_KEY`, `AZURE_OPENAI_API_VERSION` (optional, default `2024-10-21`) |

Do **not** set the `GCLOUD_TTS_*` service-account vars in production — read-aloud
TTS is a local, one-time `npm run seed:tts` step; the deployed app only serves
the cached `.wav` files.

> **Important — Supabase table grants:** tables created from raw `schema.sql`
> can leave `service_role` without INSERT/SELECT/UPDATE/DELETE, making every API
> call fail with `permission denied for table users`. Run once in the SQL editor:
>
> ```sql
> grant all on all tables in schema public to anon, authenticated, service_role;
> grant all on all sequences in schema public to anon, authenticated, service_role;
> alter default privileges in schema public grant all on tables to anon, authenticated, service_role;
> ```
> RLS stays on, so the public `anon` key is still blocked — only the server's
> service_role can read/write.

---

## 4. After deploy

- Visit the Vercel URL, complete the demo lesson, confirm progress persists
  (it now writes to Supabase, not the cookie).
- Pushing new commits to `main` auto-redeploys on Vercel.
