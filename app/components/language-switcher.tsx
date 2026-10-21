'use client';

import { useEffect, useState } from 'react';

type Language = 'en-US' | 'id';

export default function LanguageSwitcher() {
  const [language, setLanguage] = useState<Language>('en-US');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem('gctsa-language');
    const nextLanguage = savedLanguage === 'id' ? 'id' : 'en-US';
    setLanguage(nextLanguage);
    document.documentElement.lang = nextLanguage;
  }, []);

  useEffect(() => {
    function closeOnOutsideClick(event: PointerEvent) {
      if (event.target instanceof Element && !event.target.closest('.language-switcher')) {
        setOpen(false);
      }
    }

    document.addEventListener('pointerdown', closeOnOutsideClick);
    return () => document.removeEventListener('pointerdown', closeOnOutsideClick);
  }, []);

  function changeLanguage(nextLanguage: Language) {
    setLanguage(nextLanguage);
    setOpen(false);
    document.documentElement.lang = nextLanguage;
    window.localStorage.setItem('gctsa-language', nextLanguage);
    window.dispatchEvent(new CustomEvent('gctsa-language-change', { detail: nextLanguage }));
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