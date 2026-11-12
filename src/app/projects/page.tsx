import { projects } from '@/data/projects';
import ProjectFilters from '@/components/ProjectFilters';
import PageSchema from '@/components/PageSchema';
import { pageMetadata, pageSeo } from '@/lib/seo';

export const metadata = pageMetadata(pageSeo.projects);

export default function ProjectsPage() {
  return <>
    <PageSchema {...pageSeo.projects} projects={projects} />
    <section className="panel card"><ProjectFilters projects={projects} /></section>
  </>;
}
