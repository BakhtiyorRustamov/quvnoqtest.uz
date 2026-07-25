import 'server-only';
import type { NextRequest } from 'next/server';

/**
 * CSRF defence in depth.
 *
 * Session cookies are already `SameSite=Lax`, which stops a cross-site form or
 * image tag from carrying them on a POST. This adds a second, independent
 * check: the request must declare an Origin (or Referer) belonging to this
 * site. Browsers set Origin on every cross-origin request and it cannot be
 * forged by page JavaScript.
 *
 * Requests with no Origin *and* no Referer are allowed through: that is what
 * server-to-server callers and some in-app webviews look like, and those cannot
 * be CSRF vectors because there is no ambient browser session to ride on.
 */
export function sameOrigin(req: NextRequest): boolean {
  const origin = req.headers.get('origin');
  const referer = req.headers.get('referer');
  if (!origin && !referer) return true;

  const allowed = new Set<string>();
  const host = req.headers.get('host');
  if (host) {
    allowed.add(`https://${host}`);
    allowed.add(`http://${host}`);
  }
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  if (appUrl) {
    try {
      allowed.add(new URL(appUrl).origin);
    } catch {
      /* ignore malformed env value */
    }
  }
  // Vercel preview deployments get a generated hostname.
  const vercelUrl = process.env.VERCEL_URL;
  if (vercelUrl) allowed.add(`https://${vercelUrl}`);

  const candidate = origin ?? safeOrigin(referer);
  return !!candidate && allowed.has(candidate);
}

function safeOrigin(url: string | null): string | null {
  if (!url) return null;
  try {
    return new URL(url).origin;
  } catch {
    return null;
  }
}
