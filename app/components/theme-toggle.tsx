'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [light, setLight] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem('gctsa-theme');
    const prefersLight = saved === 'light';
    setLight(prefersLight);
    document.documentElement.dataset.theme = prefersLight ? 'light' : 'dark';
  }, []);

  function toggleTheme() {
    const nextLight = !light;
    setLight(nextLight);
    document.documentElement.dataset.theme = nextLight ? 'light' : 'dark';
    window.localStorage.setItem('gctsa-theme', nextLight ? 'light' : 'dark');
  }

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={toggleTheme}
      aria-label={light ? 'Switch to dark mode' : 'Switch to light mode'}
      aria-pressed={light}
    >
      <span className="theme-toggle-label">{light ? 'Light' : 'Dark'}</span>
    </button>
  );
}
