import 'server-only';

/**
 * Minimal in-memory sliding-window rate limiter (no dependencies).
 * Per-instance on serverless — a best-effort brake on abuse (email flooding,
 * user-row spam), not a hard global guarantee. Fails open by design.
 */

type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();
const MAX_BUCKETS = 10_000; // hard cap so the map itself can't be flooded

export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const b = buckets.get(key);
  if (!b || b.resetAt <= now) {
    if (buckets.size >= MAX_BUCKETS) {
      // drop expired entries; if still full, fail open rather than block users
      for (const [k, v] of buckets) if (v.resetAt <= now) buckets.delete(k);
      if (buckets.size >= MAX_BUCKETS) return true;
    }
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  b.count += 1;
  return b.count <= limit;
}

/** Client IP for rate-limit keys (Vercel/proxies set x-forwarded-for). */
export function clientIp(req: Request): string {
  const fwd = req.headers.get('x-forwarded-for');
  return (fwd ? fwd.split(',')[0] : req.headers.get('x-real-ip') ?? 'unknown').trim();
}
