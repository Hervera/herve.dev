import type { MetadataRoute } from 'next';
import { portfolioRoutes } from '@/lib/routes';
import { absoluteUrl } from '@/lib/site-url';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return portfolioRoutes.map(path => ({ url: absoluteUrl(path) }));
}
