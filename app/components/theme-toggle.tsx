'use client';

import { useEffect, useSyncExternalStore } from 'react';

const THEME_EVENT = 'gctsa-theme-change';
const STORAGE_KEY = 'gctsa-theme';

function getSnapshot() {
  return document.documentElement.dataset.theme === 'light';
}

function getServerSnapshot() {
  return false;
}

function subscribe(callback: () => void) {
  window.addEventListener(THEME_EVENT, callback);
  return () => window.removeEventListener(THEME_EVENT, callback);
}

function setTheme(light: boolean) {
  document.documentElement.dataset.theme = light ? 'light' : 'dark';
  window.localStorage.setItem(STORAGE_KEY, light ? 'light' : 'dark');
  window.dispatchEvent(new Event(THEME_EVENT));
}

export default function ThemeToggle() {
  const light = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    setTheme(saved === 'light');
  }, []);

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={() => setTheme(!light)}
      aria-label={light ? 'Switch to dark mode' : 'Switch to light mode'}
      aria-pressed={light}
    >
      <span aria-hidden="true" className="theme-toggle-knob" />
    </button>
  );
}
