import { NextResponse, type NextRequest } from 'next/server';

/**
 * Edge proxy (the `middleware` file convention, renamed in Next.js 16):
 * keeps the admin area out of search engines and caches, and rejects cross-site
 * state-changing requests before they reach a route handler.
 *
 * Session validation is NOT done here — that needs the database, which the edge
 * runtime cannot reach cheaply. Every admin route and page re-checks the
 * session itself; this layer is only a cheap first filter.
 */
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const res = NextResponse.next();

  if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
    res.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
    res.headers.set('Cache-Control', 'no-store, max-age=0');
  }

  // Belt and braces alongside SameSite cookies: a cross-origin write is
  // refused outright. GET/HEAD are exempt because they must never mutate.
  const method = req.method.toUpperCase();
  if (!['GET', 'HEAD', 'OPTIONS'].includes(method) && pathname.startsWith('/api/')) {
    const origin = req.headers.get('origin');
    if (origin) {
      const host = req.headers.get('host');
      const allowed = new Set<string>();
      if (host) {
        allowed.add(`https://${host}`);
        allowed.add(`http://${host}`);
      }
      if (process.env.NEXT_PUBLIC_APP_URL) {
        try {
          allowed.add(new URL(process.env.NEXT_PUBLIC_APP_URL).origin);
        } catch {
          /* ignore malformed env value */
        }
      }
      // Telegram delivers webhooks server-to-server with no Origin header, so
      // this branch never applies to them.
      if (!allowed.has(origin) && !pathname.startsWith('/api/telegram/')) {
        return NextResponse.json({ error: 'bad_origin' }, { status: 403 });
      }
    }
  }

  return res;
}

export const config = {
  matcher: ['/admin/:path*', '/api/:path*']
};
