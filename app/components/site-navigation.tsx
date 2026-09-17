'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import MobileMenu from './mobile-menu';
import ThemeToggle from './theme-toggle';

type SiteNavigationProps = {
  variant?: 'home' | 'directory';
};

const links = [
  { href: '/about', label: 'About' },
  { href: '/programs', label: 'Programs' },
  { href: '/faculty', label: 'Faculty' },
  { href: '/location', label: 'Location' },
  { href: '/tuition', label: 'Tuition' },
];

export default function SiteNavigation({ variant = 'home' }: SiteNavigationProps) {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className={variant === 'directory' ? 'site-header directory-site-header' : 'site-header'}>
      <Link className="brand" href="/#top">
        <span className="seal">G</span>
        <span><strong>GCTSA</strong><small>Great Commission Theological Seminary of America</small></span>
      </Link>
      <nav className="site-nav" aria-label="Main navigation">
        {links.map((link) => <Link className={isActive(link.href) ? 'is-active' : undefined} href={link.href} aria-current={isActive(link.href) ? 'page' : undefined} key={link.href}>{link.label}</Link>)}
        <Link className={isActive('/') ? 'is-active' : undefined} href="/#evaluation" aria-current={isActive('/') ? 'page' : undefined}>Apply now</Link>
        <span className="header-theme-toggle"><ThemeToggle /></span>
        <Link className="nav-cta" href="/keystatic">Login</Link>
      </nav>
      <div className="mobile-header-actions">
        <Link className="nav-cta" href="/keystatic">Login</Link>
        <MobileMenu />
      </div>
    </header>
  );
}
