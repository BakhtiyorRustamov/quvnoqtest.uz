import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

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
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' }
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Do not advertise the framework/version in responses
  poweredByHeader: false,
  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }];
  }
};

export default withNextIntl(nextConfig);
