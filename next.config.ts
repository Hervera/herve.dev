import type { NextConfig } from 'next';

const staticExport = process.env.NEXT_STATIC_EXPORT === 'true';

const config: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  trailingSlash: false,
  ...(staticExport ? { output: 'export' } : {}),
};

export default config;
