'use client';

import Link from 'next/link';

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <section className="panel card" role="alert">
    <h1>Something went wrong</h1><p>Please try again or return to the portfolio.</p>
    <div className="actions"><button className="btn primary" type="button" onClick={reset}>Try again</button><Link className="btn" href="/">Go home</Link></div>
  </section>;
}
