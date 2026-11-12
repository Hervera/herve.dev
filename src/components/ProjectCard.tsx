import Link from 'next/link';
import type { Project } from '@/types/project';
import TagList from './TagList';

export default function ProjectCard({ project }: { project: Project }) {
  return <article className="panel card project-card">
    <div className="card-top"><div><h3>{project.title}</h3><p>{project.tagline}</p></div><span className="kbd">{project.year}</span></div>
    <TagList items={project.stack} />
    <div className="hr" />
    <div className="actions">
      <Link className="btn primary" href={`/projects/${project.slug}`} aria-label={`View case study: ${project.title}`}>View case study</Link>
      {project.links.live && <a className="btn" href={project.links.live} target="_blank" rel="noopener noreferrer">Live</a>}
      {project.links.github && <a className="btn" href={project.links.github} target="_blank" rel="noopener noreferrer">GitHub</a>}
    </div>
  </article>;
}
