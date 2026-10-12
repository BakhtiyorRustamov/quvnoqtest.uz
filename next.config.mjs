import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

// There is a stray package-lock.json in the parent folder (C:\Users\user), so
// Turbopack guessed that directory as the workspace root. Pinning it to this
// project keeps module resolution and file tracing correct.
const projectRoot = dirname(fileURLToPath(import.meta.url));

// Security headers applied to every route (NFR: hardening; no functional impact).
const securityHeaders = [
  // Prevent MIME-type sniffing
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Disallow embedding the site in iframes (clickjacking protection)
  { key: 'X-Frame-Options', value: 'DENY' },
  // Send only the origin as referrer to other sites
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // The app never needs these browser capabilities
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
  // Enforce HTTPS for 6 months (served over Vercel HTTPS; ignored on http://localhost)
  { key: 'Strict-Transport-Security', value: 'max-age=15552000; includeSubDomains' },
  // Cross-origin isolation for popups/embeds opened by other origins
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  // Content Security Policy.
  //
  // 'unsafe-inline' is required for styles because Framer Motion writes inline
  // style attributes, and for scripts because Next's App Router bootstraps
  // hydration with an inline script. Nonces would remove both, but they force
  // every page to be dynamically rendered, which would cost the static caching
  // that keeps this site cheap to serve.
  //
  // The valuable directives here are the ones that hold regardless:
  // connect-src / img-src limit where data can be sent, frame-ancestors stops
  // clickjacking, and form-action stops a injected form posting off-site.
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://telegram.org https://*.vercel-scripts.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://*.supabase.co",
      "media-src 'self' data: blob:",
      "font-src 'self' data:",
      // Supabase (storage/API), Vercel analytics, Telegram widget
      "connect-src 'self' https://*.supabase.co https://*.vercel-insights.com https://vitals.vercel-insights.com",
      "frame-src 'self' https://telegram.org",
      "worker-src 'self' blob:",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      'upgrade-insecure-requests'
    ].join('; ')
  }
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  turbopack: { root: projectRoot },
  // Do not advertise the framework/version in responses
  poweredByHeader: false,
  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }];
  }
};

export default withNextIntl(nextConfig);
