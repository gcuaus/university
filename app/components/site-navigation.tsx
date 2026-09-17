'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import MobileMenu from './mobile-menu';
import ThemeToggle from './theme-toggle';

export type NavLabels = {
  about?: string;
  programs?: string;
  faculty?: string;
  location?: string;
  tuition?: string;
  news?: string;
  contact?: string;
  apply?: string;
};

type SiteNavigationProps = {
  variant?: 'home' | 'directory';
  labels?: NavLabels;
};

const DEFAULTS: Required<NavLabels> = {
  about: 'About',
  programs: 'Programs',
  faculty: 'Faculty',
  location: 'Location',
  tuition: 'Tuition',
  news: 'News',
  contact: 'Contact',
  apply: 'Apply now',
};

export default function SiteNavigation({ variant, labels }: SiteNavigationProps) {
  const pathname = usePathname();
  const resolvedVariant = variant ?? (pathname === '/' ? 'home' : 'directory');
  const t = { ...DEFAULTS, ...labels };
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  const links = [
    { href: '/about', label: t.about },
    { href: '/programs', label: t.programs },
    { href: '/faculty', label: t.faculty },
    { href: '/location', label: t.location },
    { href: '/tuition', label: t.tuition },
    { href: '/blog', label: t.news },
    { href: '/contact', label: t.contact },
  ];

  return (
    <header className={resolvedVariant === 'directory' ? 'site-header directory-site-header' : 'site-header'}>
      <Link className="brand" href="/#top">
        <span className="seal">G</span>
        <span><strong>GCTSA</strong><small>Great Commission Theological Seminary of America</small></span>
      </Link>
      <nav className="site-nav" aria-label="Main navigation">
        {links.map((link) => <Link className={isActive(link.href) ? 'is-active' : undefined} href={link.href} aria-current={isActive(link.href) ? 'page' : undefined} key={link.href}>{link.label}</Link>)}
        <Link className={isActive('/') ? 'is-active' : undefined} href="/#evaluation" aria-current={isActive('/') ? 'page' : undefined}>{t.apply}</Link>
        <span className="header-theme-toggle"><ThemeToggle /></span>
        <Link className="nav-cta" href="/keystatic">Login</Link>
      </nav>
      <div className="mobile-header-actions">
        <Link className="nav-cta" href="/keystatic">Login</Link>
        <MobileMenu items={links} apply={t.apply} />
      </div>
    </header>
  );
}