import type { MetadataRoute } from 'next';
import { abs, siteUrl } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/admin', '/api/', '/lab', '/checkout', '/profile', '/parent', '/signin', '/upgrade', '/shadcn-demo', '/demo', '/record', '/auth', '/exam/g11/*/tahlillar'] }],
    sitemap: abs('/sitemap.xml'),
    host: siteUrl()
  };
}
