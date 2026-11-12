import JsonLd from './JsonLd';
import { site } from '@/data/site';
import { absoluteUrl } from '@/lib/site-url';
import type { PageSeo } from '@/lib/seo';
import type { Project } from '@/types/project';

export function IdentitySchema() {
  return <JsonLd data={{
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person', '@id': `${absoluteUrl()}#person`, name: site.name,
        jobTitle: site.jobTitle, url: absoluteUrl(), image: absoluteUrl(site.image),
        sameAs: [site.github, site.linkedin],
      },
      {
        '@type': 'WebSite', '@id': `${absoluteUrl()}#website`,
        name: `${site.name} — Portfolio`, url: absoluteUrl(), inLanguage: 'en',
        author: { '@id': `${absoluteUrl()}#person` },
      },
    ],
  }} />;
}

export default function PageSchema({ title, description, path, project, projects }: PageSeo & { project?: Project; projects?: Project[] }) {
  const url = absoluteUrl(path);
  const breadcrumbs = [{ '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl() }];
  if (project) breadcrumbs.push({ '@type': 'ListItem', position: 2, name: 'Projects', item: absoluteUrl('/projects') });
  if (path !== '/') breadcrumbs.push({ '@type': 'ListItem', position: breadcrumbs.length + 1, name: title, item: url });
  return <>
    <JsonLd data={{
      '@context': 'https://schema.org', '@type': 'WebPage', '@id': `${url}#webpage`,
      url, name: `${title} | ${site.name}`, description,
      isPartOf: { '@id': `${absoluteUrl()}#website` },
      about: { '@id': `${absoluteUrl()}#person` }, inLanguage: 'en',
      ...(project ? { mainEntity: {
        '@type': 'CreativeWork', name: project.title, description: project.tagline,
        url, keywords: project.stack.join(', '), creator: { '@id': `${absoluteUrl()}#person` },
      } } : {}),
      ...(projects ? { mainEntity: {
        '@type': 'ItemList', numberOfItems: projects.length,
        itemListElement: projects.map((item, index) => ({
          '@type': 'ListItem', position: index + 1, name: item.title, url: absoluteUrl(`/projects/${item.slug}`),
        })),
      } } : {}),
    }} />
    {path !== '/' && <JsonLd data={{ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: breadcrumbs }} />}
  </>;
}
