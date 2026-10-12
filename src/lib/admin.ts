import 'server-only';
import { cookies } from 'next/headers';
import { createHash, randomBytes, scrypt as _scrypt, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';
import { sbAdmin, supabaseConfigured } from './supabaseAdmin';

const scrypt = promisify(_scrypt) as (
  password: string | Buffer,
  salt: string | Buffer,
  keylen: number
) => Promise<Buffer>;

/**
 * Admin authentication for /admin.
 *
 * Deliberately independent of the app's user model: app "accounts" are just an
 * anonymous device cookie, which is nowhere near strong enough to protect a
 * panel that can grant paid access and read every receipt.
 *
 * The password is never stored — only a scrypt hash, in an environment
 * variable. Sessions are random 32-byte tokens; only their SHA-256 is written
 * to the database, so a leaked database dump does not yield usable sessions.
 */

export const ADMIN_COOKIE = 'qt_admin';
const SESSION_HOURS = 12;

/* ------------------------------- password -------------------------------- */

const SCRYPT_KEYLEN = 64;

/** Formats a hash as `scrypt$<saltHex>$<keyHex>` (what goes in ADMIN_PASSWORD_HASH). */
export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16);
  const key = await scrypt(password, salt, SCRYPT_KEYLEN);
  return `scrypt$${salt.toString('hex')}$${key.toString('hex')}`;
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const parts = stored.split('$');
  if (parts.length !== 3 || parts[0] !== 'scrypt') return false;
  try {
    const salt = Buffer.from(parts[1], 'hex');
    const expected = Buffer.from(parts[2], 'hex');
    if (expected.length !== SCRYPT_KEYLEN) return false;
    const actual = await scrypt(password, salt, SCRYPT_KEYLEN);
    return timingSafeEqual(actual, expected);
  } catch {
    return false;
  }
}

export function adminConfigured(): boolean {
  return !!process.env.ADMIN_PASSWORD_HASH && supabaseConfigured();
}

/* -------------------------------- sessions -------------------------------- */

function hashToken(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}

export async function createAdminSession(meta: { ip: string | null; userAgent: string | null }): Promise<string> {
  const token = randomBytes(32).toString('base64url');
  const expiresAt = new Date(Date.now() + SESSION_HOURS * 3600_000).toISOString();

  await sbAdmin().from('admin_sessions').insert({
    token_hash: hashToken(token),
    label: 'admin',
    ip: meta.ip,
    user_agent: meta.userAgent?.slice(0, 300) ?? null,
    expires_at: expiresAt
  });

  (await cookies()).set(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: 'strict', // stricter than the app session: no cross-site navigation carries it
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_HOURS * 3600
  });

  return token;
}

/** Returns true when the caller holds a valid, unexpired, unrevoked session. */
export async function isAdmin(): Promise<boolean> {
  if (!adminConfigured()) return false;
  const token = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (!token) return false;

  const { data } = await sbAdmin()
    .from('admin_sessions')
    .select('token_hash, expires_at, revoked_at')
    .eq('token_hash', hashToken(token))
    .maybeSingle();

  if (!data || data.revoked_at) return false;
  return new Date(data.expires_at).getTime() > Date.now();
}

export async function destroyAdminSession(): Promise<void> {
  const jar = await cookies();
  const token = jar.get(ADMIN_COOKIE)?.value;
  if (token && supabaseConfigured()) {
    await sbAdmin()
      .from('admin_sessions')
      .update({ revoked_at: new Date().toISOString() })
      .eq('token_hash', hashToken(token));
  }
  jar.delete(ADMIN_COOKIE);
}

/** Deletes sessions that expired more than a day ago. */
export async function pruneAdminSessions(): Promise<void> {
  if (!supabaseConfigured()) return;
  await sbAdmin()
    .from('admin_sessions')
    .delete()
    .lt('expires_at', new Date(Date.now() - 86400_000).toISOString());
}

/* --------------------------------- audit ---------------------------------- */

export async function audit(entry: {
  action: string;
  targetType?: string;
  targetId?: string;
  detail?: Record<string, unknown>;
  ip?: string | null;
}): Promise<void> {
  try {
    await sbAdmin().from('admin_audit_log').insert({
      actor: 'admin',
      action: entry.action,
      target_type: entry.targetType ?? null,
      target_id: entry.targetId ?? null,
      detail: entry.detail ?? {},
      ip: entry.ip ?? null
    });
  } catch {
    /* auditing must never block the action it records */
  }
}
