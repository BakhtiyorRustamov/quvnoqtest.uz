# Payments & admin panel

Manual card transfer with receipt upload. There is no payment gateway: the user
transfers 15 000 so'm to one of two cards, uploads the screenshot their banking
app produced, and access opens immediately once an automated plausibility check
passes. Money is verified by reconciling monthly totals against the two cards —
not by inspecting each receipt.

## Setup (do this before the first deploy)

1. **Set the admin password.**

   ```bash
   node scripts/hash-admin-password.mjs "a-long-password-you-remember"
   ```

   Put the printed `ADMIN_PASSWORD_HASH=scrypt$…` line into `.env` and into
   Vercel → Settings → Environment Variables. The plaintext is never stored.

2. **Set `ADMIN_TELEGRAM_ID`** (already `526302966` in `.env`). Send `/start` to
   your own bot once, otherwise Telegram refuses to deliver messages to you.

3. **Apply the database schema.** Already applied to the live project as
   migrations `payments_promo_admin`, `payment_grant_functions` and
   `revoke_public_execute_rls_auto_enable`. For a fresh project, run
   `supabase/schema.sql` in the SQL editor.

4. **Confirm the `receipts` storage bucket is private** (Storage → receipts →
   not public). Receipts are only ever served through 60-second signed URLs.

5. **Set a Vercel spend limit.** Settings → Billing → Spend Management, with
   pause-on-limit. This is the single most valuable protection against a bill
   run up by abuse, and it is not something code can do.

## How the receipt check works

`src/lib/receipt.ts`, heuristics only — no AI, no external API calls.

A bank receipt is a **screenshot**; a photo of a hand, carpet or table is a
**camera photo**. Those differ sharply in ways that are cheap to measure:

| Signal | What it catches |
| --- | --- |
| Adjacent pixels bit-identical (`uniformRatio`) | Rendered UI has vast uniform areas (~0.95); a camera sensor almost never repeats a pixel (~0.02) |
| Mean adjacent-pixel gradient | Screenshots ~0.3, photos ~40 |
| Long runs of identical pixels per row | Screenshots ~870 rows, photos 0 |
| Camera EXIF (Make/Model/exposure/GPS) | A photo straight off a phone camera |
| Saturation and distinct-colour count | Photos are broadly mid-saturation with thousands of colours |
| Aspect ratio | Phone screenshots are tall (9:16–9:21); photos are usually 4:3 |
| Full-resolution std-dev | Blank or solid-colour frames |

**Measured at native resolution on a centre crop, never on a thumbnail.**
Downscaling averages away sensor noise — on a 128px thumbnail photos actually
look *flatter* than screenshots, which is backwards.

Scored 0–100:

- `≤ 25` → upload refused, user asked to try again (max 3 attempts/day)
- `26–54` → **accepted and unlocked**, marked `needs_review` and pushed to
  Telegram
- `≥ 55` → accepted and unlocked silently

EXIF is only a modifier (−15), not decisive, because forwarding an image through
Telegram or WhatsApp strips it entirely. The texture metrics carry the decision,
so an EXIF-stripped photo of a carpet is still rejected.

Every raw measurement is stored in `payments.check_reasons.metrics`, so the
thresholds can be re-tuned against real receipts later:

```sql
select check_score, check_reasons->'metrics' from payments order by created_at desc limit 50;
```

## Duplicate detection

The realistic fraud is not forgery — it is one real receipt circulating in a
class group chat.

- **SHA-256** of the file, with a unique index, blocks exact re-uploads. The
  database is the arbiter, so two simultaneous submissions cannot both win.
- **dHash** (64-bit perceptual hash) blocks the same picture after cropping,
  resizing or recompression. Verified: an original PNG vs. a cropped, resized,
  re-compressed JPEG of it differ by 7 bits; the threshold is 10, and unrelated
  receipts sit at 17+.

A duplicate is refused outright and pushed to Telegram immediately.

## Admin panel — `/admin`

| Tab | Purpose |
| --- | --- |
| **Money** | Expected so'm per card per month. Compare directly against your Humo and Uzum balances. |
| **Receipts** | Review queue. `A` approve, `R` reject, `←` `→` browse. Defaults to the flagged filter. |
| **Users** | Search by ID/name/phone/email. Extend by N days, set or clear an expiry date, disable/re-enable an account, clear strikes. |
| **Promo codes** | Generate codes for teachers, testers and refunds. |
| **Audit log** | Every admin action, immutable. |

Rejecting a receipt notifies the user (in-app banner + any linked parent's
Telegram) and **leaves their access alone**. The separate *Reject + revoke +
strike* button rolls their subscription back to what it was before that payment.

## Security notes

- `POST /api/pay` has been **deleted**. It previously granted 30 days to anyone
  who called it with no body and no authentication — `fetch('/api/pay',{method:'POST'})`
  from the browser console was unlimited free access.
- Admin auth is independent of the app's user model (an app "account" is just an
  anonymous device cookie, far too weak to guard receipts and paid access).
  scrypt-hashed password, random 32-byte session tokens stored only as SHA-256,
  `SameSite=Strict`, 12-hour expiry, 5 login attempts per 15 minutes.
- Subscription grants happen in SQL (`grant_days`), so concurrent requests
  cannot lose an update. Extending stacks onto an existing expiry; an expired
  subscription restarts from today.
- Receipts are re-encoded to JPEG with all metadata stripped, so children's
  camera photos cannot leak GPS coordinates into storage.
- Rate limiting for anything that costs money (`/api/ai`, `/api/payments`,
  `/api/promo`, admin login) is Postgres-backed, because the in-memory limiter
  resets on every serverless cold start and is not shared between instances.
- Origin is checked on every state-changing request, in both middleware and the
  route handlers, on top of `SameSite` cookies.
- CSP is set in `next.config.mjs`. `'unsafe-inline'` is unavoidable for styles
  (Framer Motion writes inline styles) and scripts (Next's hydration bootstrap);
  nonces would fix that but would force every page to render dynamically. The
  directives that do hold regardless are `connect-src`, `img-src`,
  `frame-ancestors 'none'`, `form-action 'self'` and `object-src 'none'`.

### About the "RLS enabled, no policy" advisories

Supabase reports these as INFO for every table. They are **correct and
intended**: this app reaches the database only from server-side route handlers
using the service-role key, which bypasses RLS. No policies means
deny-everything for `anon`, which is exactly right — adding policies would open
a direct client-side surface that does not currently exist.

## DDoS / abuse

Vercel's edge absorbs volumetric (L3/L4) attacks already, so the exposure is
cost, not downtime.

1. Vercel spend limit with pause-on-limit (step 5 above).
2. Firewall → **Attack Challenge Mode** — leave it off, switch it on if attacked.
3. Postgres-backed rate limits on the expensive endpoints (done).
4. Upload bodies rejected at 8 MB before being read into memory (done).
