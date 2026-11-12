import type { Metadata } from 'next';
import { site } from '@/data/site';
import { absoluteUrl } from './site-url';

export const pageSeo = {
  home: {
    title: 'Full-Stack Software Engineer',
    description: 'Explore Hervé Nkurikiyimfura’s software engineering portfolio: scalable web and mobile apps, frontend architecture, UI systems, and reliable APIs.',
    path: '/',
  },
  about: {
    title: 'About',
    description: 'Meet Hervé Nkurikiyimfura, a Full-Stack Software Engineer with 9 years of experience in frontend architecture, full-stack delivery, and mobile applications.',
    path: '/about',
  },
  contact: {
    title: 'Contact',
    description: 'Contact Hervé Nkurikiyimfura in Montréal for software engineering opportunities. Connect by email, LinkedIn, or GitHub for web and mobile projects.',
    path: '/contact',
  },
  resume: {
    title: 'Resume',
    description: 'View and download Hervé Nkurikiyimfura’s Full-Stack Software Engineer resume, covering frontend architecture, full-stack development, and mobile delivery.',
    path: '/resume',
  },
  projects: {
    title: 'Projects',
    description: 'Explore nine software engineering case studies by Hervé Nkurikiyimfura, spanning messaging, ride booking, lending, real estate, CMS, and e-commerce.',
    path: '/projects',
  },
};

export interface PageSeo {
  title: string;
  description: string;
  path: string;
}

export function pageMetadata({ title, description, path }: PageSeo): Metadata {
  const fullTitle = `${title} | ${site.name}`;
  const images = [{ url: absoluteUrl(site.image), width: 1194, height: 1120, alt: site.name }];
  return {
    title: { absolute: fullTitle },
    description,
    authors: [{ name: site.name, url: absoluteUrl() }],
    alternates: { canonical: absoluteUrl(path) },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
    openGraph: {
      type: 'website', title: fullTitle, description, url: absoluteUrl(path),
      siteName: `${site.name} — Portfolio`, locale: 'en_CA', images,
    },
    twitter: { card: 'summary_large_image', title: fullTitle, description, images },
  };
}
