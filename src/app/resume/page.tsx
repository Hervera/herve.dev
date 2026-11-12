import PageSchema from '@/components/PageSchema';
import { pageMetadata, pageSeo } from '@/lib/seo';

export const metadata = pageMetadata(pageSeo.resume);
const pdf = '/Herve_Nkurikiyimfura_Full-Stack-Software_Engineer.pdf';

export default function ResumePage() {
  return <>
    <PageSchema {...pageSeo.resume} />
    <section className="panel card">
      <div className="top">
        <div><h1>Resume</h1><p>Download the PDF or view it inline.</p></div>
        <div className="actions">
          <a className="btn" href={pdf} target="_blank" rel="noopener noreferrer">Open PDF</a>
          <a className="btn primary" href={pdf} download>Download PDF</a>
        </div>
      </div>
      <div className="hr" />
      <iframe className="resume-frame" src={pdf} title="Resume PDF" />
    </section>
  </>;
}
