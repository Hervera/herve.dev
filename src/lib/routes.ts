import { projects } from '@/data/projects';

export const portfolioRoutes = ['/', '/projects', '/about', '/resume', '/contact', ...projects.map(project => `/projects/${project.slug}`)];
