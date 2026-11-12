import Link from 'next/link';
import { projects } from '@/data/projects';
import ProjectCard from '@/components/ProjectCard';
import PageSchema from '@/components/PageSchema';
import { pageMetadata, pageSeo } from '@/lib/seo';

export const metadata = pageMetadata(pageSeo.home);

export default function HomePage() {
  return <>
    <PageSchema {...pageSeo.home} />
    <section className="grid">
      <div className="panel card hero">
        <h1>Full-Stack Software Engineer</h1>
        <p className="lead">I build scalable, production-grade software with strong frontend architecture, clean UI systems, reliable APIs, and end-to-end delivery across web and mobile platforms.</p>
        <div className="actions cta">
          <Link className="btn primary" href="/projects">View Projects</Link>
          <Link className="btn" href="/resume">Download Resume</Link>
          <Link className="btn" href="/contact">Contact</Link>
        </div>
        <div className="hr" />
        <div className="stats">
          <div className="stat"><div className="num">9</div><div className="stat-label">Years</div></div>
          <div className="stat"><div className="num">Architecture + UI Systems</div><div className="stat-label">Design systems + shared components</div></div>
          <div className="stat"><div className="num">Real-time</div><div className="stat-label">Socket.IO, maps, live tracking</div></div>
        </div>
      </div>
      <div className="panel card side">
        <h2>Featured work</h2>
        <p>Selected projects with impact, architecture decisions, and results.</p>
        <div className="featured-list">{projects.slice(0, 3).map(project => <ProjectCard key={project.slug} project={project} />)}</div>
      </div>
    </section>
  </>;
}
