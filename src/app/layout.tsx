import type { Metadata, Viewport } from 'next';
import { Suspense, type ReactNode } from 'react';
import { site } from '@/data/site';
import { siteUrl } from '@/lib/site-url';
import TheNav from '@/components/TheNav';
import TheFooter from '@/components/TheFooter';
import Analytics from '@/components/Analytics';
import { IdentitySchema } from '@/components/PageSchema';
import { ThemeProvider } from '@/components/ThemeProvider';
import { themeInitScript } from '@/lib/theme';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `${site.jobTitle} | ${site.name}`, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: `${site.name} — Portfolio`,
  manifest: '/site.webmanifest',
  icons: {
    icon: [{ url: '/favicon.ico', sizes: 'any' }, { url: '/favicon.svg', type: 'image/svg+xml' }],
    apple: '/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width', initialScale: 1,
  themeColor: [{ media: '(prefers-color-scheme: dark)', color: '#0b0c10' }, { media: '(prefers-color-scheme: light)', color: '#f7f8fb' }],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en" data-theme="dark" suppressHydrationWarning>
    <head><script dangerouslySetInnerHTML={{ __html: themeInitScript }} /></head>
    <body>
      <ThemeProvider>
        <div className="app">
          <a className="skip-link" href="#main-content">Skip to content</a>
          <TheNav />
          <main id="main-content" className="container" tabIndex={-1}>{children}</main>
          <TheFooter />
        </div>
      </ThemeProvider>
      <IdentitySchema />
      <Suspense fallback={null}><Analytics /></Suspense>
    </body>
  </html>;
}
