import 'server-only';
import { sbAdmin, supabaseConfigured } from './supabaseAdmin';
import { rateLimit as memoryRateLimit } from './rateLimit';

/**
 * Cross-instance rate limiter backed by Postgres.
 *
 * The in-memory limiter in ./rateLimit.ts is per-process, so on Vercel it
 * resets with every cold start and is not shared between concurrent lambdas —
 * fine as a courtesy brake, useless against a determined flood. Anything that
 * costs money (AI tokens, storage writes) or guards a secret (admin login)
 * uses this one instead.
 *
 * Costs one round-trip per call, so it is applied only to expensive endpoints.
 * Falls back to the in-memory limiter when Supabase is not configured, and
 * fails OPEN on database errors — a limiter outage must not take the site down.
 */
export async function rateLimitDb(key: string, limit: number, windowSeconds: number): Promise<boolean> {
  if (!supabaseConfigured()) return memoryRateLimit(key, limit, windowSeconds * 1000);
  try {
    const { data, error } = await sbAdmin().rpc('rate_limit_hit', {
      p_bucket: key,
      p_limit: limit,
      p_window_seconds: windowSeconds
    });
    if (error) return true; // fail open
    return data !== false;
  } catch {
    return true;
  }
}

/**
 * Applies both limiters. The in-memory one short-circuits obvious floods
 * without a database round-trip; the DB one catches what survives a cold start.
 */
export async function rateLimitStrict(
  key: string,
  limit: number,
  windowSeconds: number
): Promise<boolean> {
  // Memory limit is deliberately looser — it is only there to absorb bursts.
  if (!memoryRateLimit(key, limit * 3, windowSeconds * 1000)) return false;
  return rateLimitDb(key, limit, windowSeconds);
}

/** Best-effort cleanup of expired buckets; safe to call occasionally. */
export async function pruneRateLimits(): Promise<void> {
  if (!supabaseConfigured()) return;
  try {
    await sbAdmin().from('rate_limits').delete().lt('reset_at', new Date().toISOString());
  } catch {
    /* ignore */
  }
}
