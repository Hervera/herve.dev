import { site } from '@/data/site';
import { ThemeToggle } from './ThemeProvider';

export default function TheFooter() {
  return <footer className="container">
    <div className="hr" />
    <div className="foot">
      <span className="muted">© {new Date().getFullYear()} {site.name}</span>
      <ThemeToggle footer />
      <div className="footer-right">
        <a href={site.github} target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <span className="kbd">Montréal / Remote</span>
      </div>
    </div>
  </footer>;
}
