import { site } from '@/data/site';
import PageSchema from '@/components/PageSchema';
import { pageMetadata, pageSeo } from '@/lib/seo';

export const metadata = pageMetadata(pageSeo.contact);

export default function ContactPage() {
  return <>
    <PageSchema {...pageSeo.contact} />
    <section className="panel card">
      <h1>Contact</h1>
      <p>Best way to reach me: email or LinkedIn.</p>
      <div className="hr" />
      <div className="contact-grid">
        <div className="panel card inner"><h2>Email</h2><a className="btn primary" href={`mailto:${site.email}`}>{site.email}</a></div>
        <div className="panel card inner">
          <h2>Social</h2>
          <div className="actions">
            <a className="btn" href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a className="btn" href={site.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </div>
      </div>
    </section>
  </>;
}
