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
| `ANTHROPIC_API_KEY` | optional | enables the AI tutor (omit → tutor shows "not configured") |
| `ANTHROPIC_MODEL` | optional | `claude-haiku-4-5-20251001` |
| `RESEND_API_KEY` | optional | magic-link email delivery |
| `MAGIC_LINK_FROM` | optional | `"QuvnoqTest <login@yourdomain>"` |

Do **not** set the `GEMINI_*` / `GCLOUD_TTS_*` vars in production — TTS is a
local, one-time `npm run seed:tts` step; the deployed app only serves the cached
`.wav` files.

---

## 4. After deploy

- Visit the Vercel URL, complete the demo lesson, confirm progress persists
  (it now writes to Supabase, not the cookie).
- Pushing new commits to `main` auto-redeploys on Vercel.
