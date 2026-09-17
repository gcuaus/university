'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [light, setLight] = useState(false);

  useEffect(() => {
    const applyTheme = (value: string | null) => {
      const nextLight = value === 'light';
      setLight(nextLight);
      document.documentElement.dataset.theme = nextLight ? 'light' : 'dark';
    };
    applyTheme(window.localStorage.getItem('gctsa-theme'));
    const handleThemeChange = (event: Event) => applyTheme((event as CustomEvent<string>).detail);
    window.addEventListener('gctsa-theme-change', handleThemeChange);
    return () => window.removeEventListener('gctsa-theme-change', handleThemeChange);
  }, []);

  function toggleTheme() {
    const nextLight = !light;
    setLight(nextLight);
    document.documentElement.dataset.theme = nextLight ? 'light' : 'dark';
    window.localStorage.setItem('gctsa-theme', nextLight ? 'light' : 'dark');
    window.dispatchEvent(new CustomEvent('gctsa-theme-change', { detail: nextLight ? 'light' : 'dark' }));
  }

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={toggleTheme}
      aria-label={light ? 'Switch to dark mode' : 'Switch to light mode'}
      aria-pressed={light}
    >
      <span aria-hidden="true" className="theme-toggle-knob" />
      <span className="theme-toggle-label">{light ? 'Light' : 'Dark'}</span>
    </button>
  );
}
