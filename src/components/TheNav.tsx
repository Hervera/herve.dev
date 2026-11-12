'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './ThemeProvider';

export default function TheNav() {
  const pathname = usePathname();
  return <header className="nav">
    <div className="container nav-inner">
      <Link className="brand" href="/" aria-label="Hervé Nkurikiyimfura — Home">
        <span className="dot" aria-hidden="true" /><span className="nowrap">Hervé N.</span>
      </Link>
      <nav className="links" aria-label="Primary">
        {['Projects', 'About', 'Resume'].map(label => {
          const href = `/${label.toLowerCase()}`;
          const active = pathname === href || pathname.startsWith(`${href}/`);
          return <Link key={href} href={href} className={active ? 'active' : undefined} aria-current={active ? 'page' : undefined}>{label}</Link>;
        })}
        <ThemeToggle />
        <Link href="/contact" className="btn primary" aria-current={pathname === '/contact' ? 'page' : undefined}>Contact</Link>
      </nav>
    </div>
  </header>;
}
