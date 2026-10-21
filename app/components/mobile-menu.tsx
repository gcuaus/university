'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

type MenuItem = { href: string; label: string; children?: MenuItem[] };

const DEFAULT_LINKS: MenuItem[] = [
  { href: '/about', label: 'About Us' },
  {
    href: '/about/doctrinal-foundation',
    label: 'Why Us?',
    children: [
      { href: '/about/doctrinal-foundation', label: 'Our Doctrinal Foundation' },
      { href: '/getting-started', label: 'Getting Started' },
    ],
  },
  {
    href: '/programs',
    label: 'Academy',
    children: [
      { href: '/programs', label: 'Programs' },
      { href: '/faculty', label: 'Faculty' },
    ],
  },
  {
    href: '/tuition',
    label: 'Admission',
    children: [
      { href: '/tuition', label: 'Tuition' },
      { href: '/#evaluation', label: 'Application' },
    ],
  },
  { href: '/location', label: 'Location' },
  { href: '/blog', label: 'News' },
  { href: '/contact', label: 'Contact' },
];

export default function MobileMenu({
  items = DEFAULT_LINKS,
  apply = 'Apply now',
  locale = 'en',
}: {
  items?: MenuItem[];
  apply?: string;
  locale?: 'en' | 'id';
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
        aria-label={locale === 'id'
          ? open ? 'Tutup menu navigasi' : 'Buka menu navigasi'
          : open ? 'Close navigation menu' : 'Open navigation menu'}
        onClick={() => setOpen(!open)}
      >
        <span aria-hidden="true">{open ? '×' : '☰'}</span>
      </button>
      {open && (
        <div className="mobile-menu-panel" id="mobile-menu-panel">
          {items.map((item) => (
            item.children ? (
              <details className="mobile-menu-group" key={item.href} open={item.children.some((child) => isActive(child.href))}>
                <summary className={item.children.some((child) => isActive(child.href)) ? 'is-active' : undefined}>{item.label}</summary>
                {item.children.map((child) => (
                  <Link
                    className={isActive(child.href) ? 'is-active' : undefined}
                    href={child.href}
                    aria-current={isActive(child.href) ? 'page' : undefined}
                    onClick={() => setOpen(false)}
                    key={child.href}
                  >
                    {child.label}
                  </Link>
                ))}
              </details>
            ) : (
              <Link
                className={isActive(item.href) ? 'is-active' : undefined}
                href={item.href}
                aria-current={isActive(item.href) ? 'page' : undefined}
                onClick={() => setOpen(false)}
                key={item.href}
              >
                {item.label}
              </Link>
            )
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