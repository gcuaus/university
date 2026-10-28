'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';

type Language = 'en-US' | 'id';

const LANGUAGE_EVENT = 'gctsa-language-change';
const STORAGE_KEY = 'gctsa-language';

function getSnapshot(): Language {
  return window.localStorage.getItem(STORAGE_KEY) === 'id' ? 'id' : 'en-US';
}

function getServerSnapshot(): Language {
  return 'en-US';
}

function subscribe(callback: () => void) {
  window.addEventListener(LANGUAGE_EVENT, callback);
  return () => window.removeEventListener(LANGUAGE_EVENT, callback);
}

export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false);

  const language = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    function closeOnOutsideClick(event: PointerEvent) {
      if (event.target instanceof Element && !event.target.closest('.language-switcher')) {
        setOpen(false);
      }
    }
    document.addEventListener('pointerdown', closeOnOutsideClick);
    return () => document.removeEventListener('pointerdown', closeOnOutsideClick);
  }, [setOpen]);

  function changeLanguage(nextLanguage: Language) {
    setOpen(false);
    document.documentElement.lang = nextLanguage;
    window.localStorage.setItem(STORAGE_KEY, nextLanguage);
    window.dispatchEvent(new CustomEvent(LANGUAGE_EVENT, { detail: nextLanguage }));
  }

  const flag = language === 'id' ? '/flags/id.svg' : '/flags/us.svg';
  const label = language === 'id' ? 'Indonesian' : 'English (United States)';

  return (
    <div className="language-switcher">
      <button
        aria-label={`Language: ${label}`}
        aria-expanded={open}
        aria-controls="language-options"
        className="language-switcher-trigger"
        type="button"
        onClick={() => setOpen((current) => !current)}
      >
        <img src={flag} alt="" />
        <span className="language-code">{language === 'id' ? 'ID' : 'EN'}</span>
      </button>
      {open && (
        <div className="language-options" id="language-options">
          <button className="language-option" type="button" onClick={() => changeLanguage('en-US')}>
            <img src="/flags/us.svg" alt="" /> English (United States)
          </button>
          <button className="language-option" type="button" onClick={() => changeLanguage('id')}>
            <img src="/flags/id.svg" alt="" /> Indonesian
          </button>
        </div>
      )}
    </div>
  );
}
