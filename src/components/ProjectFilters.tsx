'use client';

import { useState } from 'react';
import type { Project } from '@/types/project';
import ProjectCard from './ProjectCard';

const roles = ['All', 'Frontend', 'Full-Stack', 'Backend', 'Mobile'];
const technologies = ['All', 'React', 'Next.js', 'Vue.js', 'Angular', 'Node.js', 'Laravel', 'Java Spring Boot', 'Flutter'];

function inferRole(project: Project) {
  const role = project.role.toLowerCase();
  if (role.includes('mobile')) return 'Mobile';
  if (role.includes('backend')) return 'Backend';
  if (role.includes('full-stack') || role.includes('full stack')) return 'Full-Stack';
  return 'Frontend';
}

export default function ProjectFilters({ projects }: { projects: Project[] }) {
  const [role, setRole] = useState('All');
  const [tech, setTech] = useState('All');
  const filtered = projects.filter(project => (role === 'All' || inferRole(project) === role) && (tech === 'All' || project.stack.includes(tech)));
  return <>
    <div className="top">
      <div><h1>Projects</h1><p>Case studies focused on decisions, constraints, and outcomes.</p></div>
      <div className="filters" aria-label="Filter projects">
        <label className="filter"><span className="muted">Role:</span><select value={role} onChange={event => setRole(event.target.value)}>{roles.map(value => <option key={value} value={value}>{value}</option>)}</select></label>
        <label className="filter"><span className="muted">Tech:</span><select value={tech} onChange={event => setTech(event.target.value)}>{technologies.map(value => <option key={value} value={value}>{value === 'Java Spring Boot' ? 'Spring Boot' : value}</option>)}</select></label>
      </div>
    </div>
    <div className="hr" />
    <div className="cards">{filtered.map(project => <ProjectCard key={project.slug} project={project} />)}</div>
    <p className="sr-only" role="status">{filtered.length} projects match the selected filters.</p>
    {filtered.length === 0 && <p className="empty-state">No projects match these filters. Try another role or technology.</p>}
  </>;
}
