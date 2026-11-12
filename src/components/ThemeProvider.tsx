'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

type Theme = 'dark' | 'light';
const ThemeContext = createContext<{ theme: Theme; toggle: () => void } | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  useEffect(() => {
    const apply = () => {
      const current = document.documentElement.getAttribute('data-theme');
      setTheme(current === 'light' ? 'light' : 'dark');
    };
    apply();
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== 'theme') return;
      const next = event.newValue === 'light' ? 'light' : event.newValue === 'dark' ? 'dark'
        : window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      setTheme(next);
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  function toggle() {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    setTheme(next);
    try { localStorage.setItem('theme', next); } catch { /* Theme works without browser storage. */ }
  }

  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>;
}

export function ThemeToggle({ footer = false }: { footer?: boolean }) {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('ThemeToggle requires ThemeProvider.');
  const { theme, toggle } = context;
  const label = theme === 'dark' ? 'Dark' : 'Light';
  return <button className={`btn ${footer ? 'theme-footer' : 'theme-toggle hide-mobile'}`} type="button" onClick={toggle} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
    <span aria-hidden="true">{theme === 'dark' ? '☾' : '☀︎'}</span>
    <span className={footer ? undefined : 'theme-label'}>{label}{footer ? ' mode' : ''}</span>
  </button>;
}
