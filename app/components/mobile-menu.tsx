'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

type MenuItem = { href: string; label: string };

const DEFAULT_LINKS: MenuItem[] = [
  { href: '/about', label: 'About' },
  { href: '/programs', label: 'Programs' },
  { href: '/faculty', label: 'Faculty' },
  { href: '/location', label: 'Location' },
  { href: '/tuition', label: 'Tuition' },
  { href: '/blog', label: 'News' },
  { href: '/contact', label: 'Contact' },
];

export default function MobileMenu({
  items = DEFAULT_LINKS,
  apply = 'Apply now',
}: {
  items?: MenuItem[];
  apply?: string;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <div className="mobile-menu">
      <button
        className="mobile-menu-button"
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu-panel"
        aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
        onClick={() => setOpen(!open)}
      >
        <span aria-hidden="true">{open ? '×' : '☰'}</span>
      </button>
      {open && (
        <div className="mobile-menu-panel" id="mobile-menu-panel">
          {items.map((item) => (
            <Link
              className={isActive(item.href) ? 'is-active' : undefined}
              href={item.href}
              aria-current={isActive(item.href) ? 'page' : undefined}
              onClick={() => setOpen(false)}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
          <Link
            className={isActive('/') ? 'is-active' : undefined}
            href="/#evaluation"
            aria-current={isActive('/') ? 'page' : undefined}
            onClick={() => setOpen(false)}
          >
            {apply}
          </Link>
        </div>
      )}
    </div>
  );
}