export interface Project {
  slug: string;
  title: string;
  tagline: string;
  role: string;
  stack: string[];
  year: string;
  links: {
    live?: string;
    github?: string;
  };
  highlights: string[];
  caseStudy: {
    problem: string;
    constraints: string[];
    approach: string[];
    results: string[];
    learnings: string[];
  };
}
