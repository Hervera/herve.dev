import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page not found',
  description: 'Return to the portfolio to explore projects and contact Hervé Nkurikiyimfura.',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return <section className="panel card">
    <h1>404 — Page not found</h1><p>This page or project does not exist.</p>
    <div className="actions"><Link className="btn primary" href="/">Go home</Link><Link className="btn" href="/projects">View projects</Link></div>
  </section>;
}
