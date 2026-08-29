/**
 * Supabase health probe — works out WHICH part of the project is unhealthy.
 *
 *   node scripts/supabase-doctor.mjs
 *
 * The dashboard's single "Unhealthy" badge does not say what is wrong. This
 * pokes each subsystem separately (PostgREST, Auth, Storage, the tables this
 * app actually uses) and reports them one by one, so the badge turns into a
 * specific fault.
 *
 * Credentials are read from .env in the project root. Nothing is printed that
 * could leak a key: only status codes and row counts.
 */

import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

/* ----------------------------- .env parsing ------------------------------ */

function loadEnv() {
  const out = {};
  for (const name of ['.env.local', '.env']) {
    let text;
    try {
      text = readFileSync(join(ROOT, name), 'utf8');
    } catch {
      continue;
    }
    for (const line of text.split(/\r?\n/)) {
      const m = /^\s*([A-Z0-9_]+)\s*=\s*(.*)$/.exec(line);
      if (!m) continue;
      let v = m[2].trim();
      if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
      if (out[m[1]] === undefined) out[m[1]] = v; // .env.local wins
    }
  }
  return { ...out, ...process.env };
}

const env = loadEnv();
const URL_ = (env.NEXT_PUBLIC_SUPABASE_URL ?? '').replace(/\/+$/, '');
const KEY = env.SUPABASE_SERVICE_ROLE_KEY ?? '';

if (!URL_ || !KEY) {
  console.error('✗ NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY missing from .env');
  process.exit(1);
}

const headers = { apikey: KEY, Authorization: `Bearer ${KEY}` };
const TIMEOUT_MS = 15_000;

/* ------------------------------- probing --------------------------------- */

const results = [];

async function probe(label, path, opts = {}) {
  const started = Date.now();
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(`${URL_}${path}`, { ...opts, headers: { ...headers, ...opts.headers }, signal: ctl.signal });
    const ms = Date.now() - started;
    let detail = '';
    if (!res.ok) {
      const body = await res.text().catch(() => '');
      detail = body.slice(0, 200).replace(/\s+/g, ' ');
    }
    results.push({ label, ok: res.ok, status: res.status, ms, detail });
    return res;
  } catch (e) {
    results.push({
      label,
      ok: false,
      status: 0,
      ms: Date.now() - started,
      detail: e.name === 'AbortError' ? `no response in ${TIMEOUT_MS / 1000}s (timeout)` : (e.cause?.code ?? e.message)
    });
    return null;
  } finally {
    clearTimeout(timer);
  }
}

/** Row count via the Content-Range header — cheap, no data transferred. */
async function countRows(table) {
  // HEAD + select=* : works whatever the primary key is called (promo_codes is
  // keyed on `code`, rate_limits on `bucket`), and transfers no rows at all —
  // the count comes back in the Content-Range header.
  const res = await probe(`table: ${table}`, `/rest/v1/${table}?select=*`, {
    method: 'HEAD',
    headers: { Prefer: 'count=exact', Range: '0-0' }
  });
  if (!res?.ok) return;
  const range = res.headers.get('content-range');
  const total = range?.split('/')[1];
  if (total) results[results.length - 1].detail = `${total} rows`;
}

console.log(`\nProbing ${URL_}\n`);

await probe('PostgREST (database API)', '/rest/v1/');
await probe('Auth service', '/auth/v1/health');
await probe('Storage service', '/storage/v1/bucket');

for (const t of ['users', 'payments', 'promo_codes', 'rate_limits']) await countRows(t);

// The receipts bucket config matters for receipt uploads specifically.
const bucketRes = await probe('receipts bucket', '/storage/v1/bucket/receipts');
let bucket = null;
if (bucketRes?.ok) {
  bucket = await bucketRes.json().catch(() => null);
  if (bucket) {
    const mimes = bucket.allowed_mime_types;
    results[results.length - 1].detail =
      `public=${bucket.public}, limit=${bucket.file_size_limit ?? 'none'}, ` +
      `mime=${mimes ? mimes.join('/') : 'ANY (unrestricted)'}`;
  }
}

/* ------------------------------- report ---------------------------------- */

console.log('─'.repeat(78));
for (const r of results) {
  const mark = r.ok ? '✓' : '✗';
  const status = r.status ? String(r.status) : '---';
  console.log(`${mark}  ${r.label.padEnd(28)} ${status.padStart(4)}  ${String(r.ms).padStart(5)}ms  ${r.detail}`);
}
console.log('─'.repeat(78));

const failed = results.filter((r) => !r.ok);
const slow = results.filter((r) => r.ok && r.ms > 3000);

if (failed.length === 0) {
  console.log('\nEvery endpoint answered. The API layer is fine.');
  console.log('An "Unhealthy" badge with all-green probes is almost always resource');
  console.log('pressure on the instance rather than an outage — check');
  console.log('Dashboard → Reports → Database for the RAM and disk graphs.');
} else {
  console.log(`\n${failed.length} probe(s) failed:`);
  for (const r of failed) console.log(`  • ${r.label} → ${r.status || 'no response'} ${r.detail}`);
  console.log('\nReading the result:');
  console.log('  all three services down  → the instance is paused, restarting, or out of memory');
  console.log('  PostgREST down, others up → the database is up but connections are exhausted');
  console.log('  one table 404s           → schema drift; re-run supabase/schema.sql');
  console.log('  401 / 403 everywhere     → the service role key in .env is stale');
}

if (slow.length) {
  console.log(`\nSlow (>3s): ${slow.map((r) => r.label).join(', ')} — consistent with memory pressure.`);
}

if (bucket && bucket.allowed_mime_types) {
  console.log('\n⚠  The receipts bucket still restricts file types, so non-image receipts');
  console.log('   (PDF etc.) will fail to upload. Fix with:');
  console.log('     node scripts/receipts-allow-any-file.mjs --apply');
}

process.exit(failed.length ? 1 : 0);
