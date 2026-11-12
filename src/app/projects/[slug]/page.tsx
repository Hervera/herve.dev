import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projects } from '@/data/projects';
import TagList from '@/components/TagList';
import PageSchema from '@/components/PageSchema';
import { pageMetadata } from '@/lib/seo';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find(project => project.slug === slug);
  if (!project) notFound();
  return pageMetadata({ title: project.title, description: project.tagline, path: `/projects/${project.slug}` });
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find(project => project.slug === slug);
  if (!project) notFound();
  const sections = [
    ['Constraints', project.caseStudy.constraints],
    ['Approach', project.caseStudy.approach],
    ['Results', project.caseStudy.results],
    ['Learnings', project.caseStudy.learnings],
  ] as const;
  return <>
    <PageSchema title={project.title} description={project.tagline} path={`/projects/${project.slug}`} project={project} />
    <section className="panel card prose">
      <div className="top">
        <div>
          <h1>{project.title}</h1><p>{project.tagline}</p>
          <p><strong>Role:</strong> {project.role} · <strong>Year:</strong> {project.year}</p>
        </div>
        <div className="actions">
          {project.links.live && <a className="btn" href={project.links.live} target="_blank" rel="noopener noreferrer">Live</a>}
          {project.links.github && <a className="btn" href={project.links.github} target="_blank" rel="noopener noreferrer">GitHub</a>}
        </div>
      </div>
      <TagList items={project.stack} />
      <div className="hr" />
      <h2>Highlights</h2>
      <ul>{project.highlights.map(highlight => <li key={highlight}>{highlight}</li>)}</ul>
      <div className="hr" />
      <h2>Case study</h2>
      <h3>Problem</h3><p>{project.caseStudy.problem}</p>
      {sections.map(([title, items]) => <div key={title}><h3>{title}</h3><ul>{items.map(item => <li key={item}>{item}</li>)}</ul></div>)}
      <div className="hr" />
      <Link className="btn primary" href="/projects">Back to Projects</Link>
    </section>
  </>;
}
