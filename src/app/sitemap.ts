import type { MetadataRoute } from 'next';
import { abs, sitemapEntries } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return sitemapEntries().map((e) => ({ url: abs(e.path), lastModified: now, changeFrequency: e.freq, priority: e.priority }));
}
