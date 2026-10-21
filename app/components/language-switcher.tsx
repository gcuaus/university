'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

function localizedPath(pathname: string, locale: 'en' | 'id') {
  const englishPath = pathname.replace(/^\/id(?=\/|$)/, '') || '/';
  if (locale === 'en') return englishPath;
  return englishPath === '/' ? '/id' : `/id${englishPath}`;
}

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const locale = pathname === '/id' || pathname.startsWith('/id/') ? 'id' : 'en';

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <span aria-label="Choose language">
      <Link
        href={localizedPath(pathname, 'en')}
        aria-label="English (United States)"
        aria-current={locale === 'en' ? 'true' : undefined}
        title="English (United States)"
      >
        🇺🇸
      </Link>
      <Link
        href={localizedPath(pathname, 'id')}
        aria-label="Indonesian"
        aria-current={locale === 'id' ? 'true' : undefined}
        title="Indonesian"
      >
        🇮🇩
      </Link>
    </span>
  );
}
