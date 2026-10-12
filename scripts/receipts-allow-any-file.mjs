/**
 * Lifts the file-type restriction on the private `receipts` storage bucket so
 * that any file — PDF, document, anything — can be uploaded as a receipt.
 *
 *   node scripts/receipts-allow-any-file.mjs            # show current setting
 *   node scripts/receipts-allow-any-file.mjs --apply    # remove the restriction
 *   node scripts/receipts-allow-any-file.mjs --restore  # put images-only back
 *
 * This is the storage half of turning the receipt checking off. The other half
 * is RECEIPT_CHECK=off in .env (see src/lib/receiptFlags.ts) and dropping the
 * unique index on payments.receipt_sha256, which needs the SQL editor:
 * supabase/migrations/2026-08-01_disable_receipt_checking.sql
 *
 * The bucket stays PRIVATE either way — receipts are only ever served through
 * short-lived signed URLs in the admin panel.
 */

import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

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
      if (out[m[1]] === undefined) out[m[1]] = v;
    }
  }
  return { ...out, ...process.env };
}

const IMAGE_MIMES = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'];
const BUCKET = 'receipts';

const env = loadEnv();
const URL_ = (env.NEXT_PUBLIC_SUPABASE_URL ?? '').replace(/\/+$/, '');
const KEY = env.SUPABASE_SERVICE_ROLE_KEY ?? '';

if (!URL_ || !KEY) {
  console.error('✗ NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY missing from .env');
  process.exit(1);
}

const headers = { apikey: KEY, Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' };
const mode = process.argv.includes('--apply') ? 'apply' : process.argv.includes('--restore') ? 'restore' : 'show';

async function getBucket() {
  const res = await fetch(`${URL_}/storage/v1/bucket/${BUCKET}`, { headers });
  if (res.status === 404) {
    console.error(`✗ No bucket named "${BUCKET}". Create it as a PRIVATE bucket in Storage → New bucket.`);
    process.exit(1);
  }
  if (!res.ok) {
    console.error(`✗ Could not read the bucket (HTTP ${res.status}). Is the service role key current?`);
    process.exit(1);
  }
  return res.json();
}

function describe(b) {
  const mimes = b.allowed_mime_types;
  return [
    `  public:          ${b.public}`,
    `  size limit:      ${b.file_size_limit ?? 'none'} bytes`,
    `  allowed types:   ${mimes ? mimes.join(', ') : 'ANY (unrestricted)'}`
  ].join('\n');
}

const before = await getBucket();
console.log(`\nBucket "${BUCKET}" — current:\n${describe(before)}\n`);

if (mode === 'show') {
  console.log('Nothing changed. Re-run with --apply to allow any file type,');
  console.log('or --restore to go back to images only.');
  process.exit(0);
}

const allowed = mode === 'apply' ? null : IMAGE_MIMES;

const res = await fetch(`${URL_}/storage/v1/bucket/${BUCKET}`, {
  method: 'PUT',
  headers,
  body: JSON.stringify({
    id: BUCKET,
    name: BUCKET,
    public: false, // never make receipts public
    file_size_limit: 8388608, // 8 MB, matches MAX_UPLOAD_BYTES
    allowed_mime_types: allowed
  })
});

if (!res.ok) {
  const body = await res.text().catch(() => '');
  console.error(`✗ Update failed (HTTP ${res.status}): ${body.slice(0, 300)}`);
  process.exit(1);
}

const after = await getBucket();
console.log(`Updated:\n${describe(after)}\n`);
console.log(
  mode === 'apply'
    ? '✓ Any file type is now accepted for receipt uploads.'
    : '✓ Image-only restriction restored.'
);

if (mode === 'apply') {
  console.log('\nStill to do, in the Supabase SQL editor, to allow the SAME receipt twice:');
  console.log('  drop index if exists payments_sha256_uniq;');
  console.log('  create index if not exists payments_sha256_idx');
  console.log('    on payments (receipt_sha256) where receipt_sha256 is not null;');
  console.log('(the app already survives without this, but it stops storing fingerprints)');
}
