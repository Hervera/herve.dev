import PageSchema from '@/components/PageSchema';
import { pageMetadata, pageSeo } from '@/lib/seo';

export const metadata = pageMetadata(pageSeo.about);

export default function AboutPage() {
  return <>
    <PageSchema {...pageSeo.about} />
    <section className="panel card prose">
      <h1>About</h1>
      <p>I’m a Full-Stack Software Engineer with 9 years of experience building production-grade web and mobile applications with scalable architecture, reusable UI systems, and reliable APIs. I’ve delivered real products across messaging, transportation, e-commerce, content platforms, and enterprise solutions.</p>
      <div className="hr" />
      <h2>What I optimize for</h2>
      <ul>
        <li>Scalable frontend architecture (shared patterns, maintainable structure)</li>
        <li>Consistent UI delivery (design systems, Storybook, component reuse)</li>
        <li>Reliable end-to-end execution (APIs, real-time features, deployments)</li>
        <li>Quality &amp; confidence (testing, CI, clean contracts)</li>
      </ul>
      <div className="hr" />
      <h2>Core stack</h2>
      <p>React · Next.js · TypeScript · Vue.js · Node.js/Express · Laravel · Spring Boot · PostgreSQL/MySQL/MongoDB · Redis · Docker · CI (GitHub Actions) · Testing (Jest/RTL, Mocha/Chai)</p>
      <div className="hr" />
      <h2>Highlights</h2>
      <ul>
        <li>Frontend lead experience (architecture + shared component systems)</li>
        <li>Full-stack shipping (REST + real-time + deployments)</li>
        <li>Cross-platform mobile delivery with Flutter</li>
      </ul>
    </section>
  </>;
}
