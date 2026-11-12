'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const id = process.env.NEXT_PUBLIC_GTAG_ID ?? 'G-Z4420RG7TZ';

export default function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialized = useRef(false);
  const lastPage = useRef('');

  useEffect(() => {
    if (!id) return;
    window.dataLayer ??= [];
    window.gtag ??= function () { window.dataLayer!.push(arguments); };
    if (!initialized.current) {
      window.gtag('js', new Date());
      window.gtag('config', id, { send_page_view: false });
      initialized.current = true;
    }
    const query = searchParams.toString();
    const path = `${pathname}${query ? `?${query}` : ''}`;
    const frame = requestAnimationFrame(() => {
      if (lastPage.current === path) return;
      window.gtag?.('event', 'page_view', { page_path: path, page_location: window.location.href, page_title: document.title });
      lastPage.current = path;
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, searchParams]);

  return id ? <Script id="google-analytics" src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`} strategy="afterInteractive" /> : null;
}
