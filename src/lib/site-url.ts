export function normalizeSiteUrl(value: string): string {
  const url = new URL(value);
  if (!['http:', 'https:'].includes(url.protocol) || url.pathname !== '/' || url.search || url.hash || url.username || url.password) {
    throw new Error('NEXT_PUBLIC_SITE_URL must be an HTTP(S) origin, for example https://herveranik.com.');
  }
  return url.origin;
}

export const siteUrl = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL || 'https://herveranik.com');
export const absoluteUrl = (path = '/') => path === '/' ? siteUrl : new URL(path, `${siteUrl}/`).href;
