// Shared helpers for the video scripts: .env loading, Supabase REST, paths.
import fs from 'node:fs';
import path from 'node:path';

export const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '..', '..');
export const VIDEOS_DIR = path.join(ROOT, 'videos');

export function loadEnv() {
  for (const f of ['.env', '.env.local']) {
    const p = path.join(ROOT, f);
    if (!fs.existsSync(p)) continue;
    for (const line of fs.readFileSync(p, 'utf8').split(/\r?\n/)) {
      const m = /^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/.exec(line);
      if (m && process.env[m[1]] === undefined) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
    }
  }
}
loadEnv();

export function appendEnv(key, value) {
  const p = path.join(ROOT, '.env');
  const text = fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : '';
  const re = new RegExp(`^${key}=.*$`, 'm');
  fs.writeFileSync(p, re.test(text) ? text.replace(re, `${key}=${value}`) : `${text.replace(/\n?$/, '\n')}${key}=${value}\n`);
}

const SB = () => process.env.NEXT_PUBLIC_SUPABASE_URL;
const sbHeaders = (extra = {}) => ({ apikey: process.env.SUPABASE_SERVICE_ROLE_KEY, Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`, ...extra });

export async function sbSelect(query) {
  const r = await fetch(`${SB()}/rest/v1/${query}`, { headers: sbHeaders() });
  if (!r.ok) throw new Error(`supabase ${r.status}: ${await r.text()}`);
  return r.json();
}
export async function sbUpdate(table, id, patch) {
  const r = await fetch(`${SB()}/rest/v1/${table}?id=eq.${id}`, { method: 'PATCH', headers: sbHeaders({ 'content-type': 'application/json', Prefer: 'return=minimal' }), body: JSON.stringify(patch) });
  if (!r.ok) throw new Error(`supabase ${r.status}: ${await r.text()}`);
}
/** Upload a file to the public "videos" bucket and return its public URL. */
export async function sbUploadPublic(objectPath, buf, type) {
  const r = await fetch(`${SB()}/storage/v1/object/videos/${objectPath}`, { method: 'POST', headers: sbHeaders({ 'content-type': type, 'x-upsert': 'true' }), body: buf });
  if (!r.ok) throw new Error(`storage ${r.status}: ${await r.text()}`);
  return `${SB()}/storage/v1/object/public/videos/${objectPath}`;
}

export const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/[ʻʼ‘’'`]/g, '')
    .replace(/[^a-z0-9а-яё]+/gi, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 40) || 'video';

export function arg(name, def) {
  const i = process.argv.indexOf(`--${name}`);
  if (i < 0) return def;
  const v = process.argv[i + 1];
  return v && !v.startsWith('--') ? v : true;
}
