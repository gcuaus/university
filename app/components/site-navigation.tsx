'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import MobileMenu from './mobile-menu';
import ThemeToggle from './theme-toggle';
import LanguageSwitcher from './language-switcher';

export type NavLabels = {
  about?: string;
  whyUs?: string;
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
  locale?: 'en' | 'id';
  logo?: string | null;
  brand?: string;
  descriptor?: string;
};

const DEFAULTS: Required<NavLabels> = {
  about: 'About Us',
  whyUs: 'Why Us?',
  programs: 'Programs',
  faculty: 'Faculty',
  location: 'Location',
  tuition: 'Tuition',
  news: 'News',
  contact: 'Contact',
  apply: 'Apply now',
};

const BRAND_DEFAULTS = { brand: 'GCUA', descriptor: 'Great Commission University of America' };

export default function SiteNavigation({ variant, labels, locale = 'en', logo, brand, descriptor }: SiteNavigationProps) {
  const pathname = usePathname();
  const activeLocale = pathname === '/id' || pathname.startsWith('/id/') ? 'id' : locale;
  const resolvedVariant = variant ?? (pathname === '/' ? 'home' : 'directory');
  const englishLabels = { ...DEFAULTS, ...labels };
  const t = activeLocale === 'id'
    ? {
        ...englishLabels,
        about: 'Tentang Kami',
        whyUs: 'Mengapa GCUA?',
        programs: 'Program',
        faculty: 'Dosen',
        location: 'Lokasi',
        tuition: 'Biaya Kuliah',
        news: 'Berita',
        contact: 'Kontak',
        apply: 'Daftar',
      }
    : englishLabels;
  const academyLabel = activeLocale === 'id' ? 'Akademi' : 'Academy';
  const admissionLabel = activeLocale === 'id' ? 'Penerimaan' : 'Admission';
  const b = { brand: brand ?? BRAND_DEFAULTS.brand, descriptor: descriptor ?? BRAND_DEFAULTS.descriptor };
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  const links = [
    { href: '/about', label: t.about },
    { href: '/location', label: t.location },
    { href: '/blog', label: t.news },
    { href: '/contact', label: t.contact },
  ];
  const mobileLinks = [
    links[0],
    {
      href: '/about/doctrinal-foundation',
      label: t.whyUs,
      children: [
        { href: '/about/doctrinal-foundation', label: activeLocale === 'id' ? 'Landasan Doktrinal' : 'Our Doctrinal Foundation' },
        { href: '/getting-started', label: activeLocale === 'id' ? 'Panduan Memulai' : 'Getting Started' },
      ],
    },
    {
      href: '/programs',
      label: academyLabel,
      children: [
        { href: '/programs', label: t.programs },
        { href: '/faculty', label: t.faculty },
      ],
    },
    {
      href: '/tuition',
      label: admissionLabel,
      children: [
        { href: '/tuition', label: t.tuition },
        { href: '/#evaluation', label: activeLocale === 'id' ? 'Pendaftaran' : 'Application' },
      ],
    },
    ...links.slice(1),
  ];

  return (
    <header className={resolvedVariant === 'directory' ? 'site-header directory-site-header' : 'site-header'}>
      <Link className="brand" href="/#top">
        {logo ? <img className="brand-logo" src={logo} alt={`${b.brand} logo`} /> : <span className="seal">G</span>}
        <span><strong>{b.brand}</strong><small>{b.descriptor}</small></span>
      </Link>
      <nav className="site-nav" aria-label="Main navigation">
        <Link className={isActive('/about') ? 'is-active' : undefined} href="/about" aria-current={isActive('/about') ? 'page' : undefined}>{t.about}</Link>
        <details className="site-nav-dropdown">
          <summary className={isActive('/about/doctrinal-foundation') || isActive('/getting-started') ? 'is-active' : undefined}>{t.whyUs}</summary>
          <div className="site-nav-submenu">
            <Link href="/about/doctrinal-foundation">{activeLocale === 'id' ? 'Landasan Doktrinal' : 'Our Doctrinal Foundation'}</Link>
            <Link href="/getting-started">{activeLocale === 'id' ? 'Panduan Memulai' : 'Getting Started'}</Link>
          </div>
        </details>
        <details className="site-nav-dropdown">
          <summary className={isActive('/programs') || isActive('/faculty') ? 'is-active' : undefined}>{academyLabel}</summary>
          <div className="site-nav-submenu">
            <Link href="/programs">{t.programs}</Link>
            <Link href="/faculty">{t.faculty}</Link>
          </div>
        </details>
        <details className="site-nav-dropdown">
          <summary className={isActive('/tuition') ? 'is-active' : undefined}>{admissionLabel}</summary>
          <div className="site-nav-submenu">
            <Link href="/tuition">{t.tuition}</Link>
            <Link href="/#evaluation">{activeLocale === 'id' ? 'Pendaftaran' : 'Application'}</Link>
          </div>
        </details>
        {links.slice(1).map((link) => <Link className={isActive(link.href) ? 'is-active' : undefined} href={link.href} aria-current={isActive(link.href) ? 'page' : undefined} key={link.href}>{link.label}</Link>)}
        <Link className={isActive('/') ? 'is-active' : undefined} href="/#evaluation" aria-current={isActive('/') ? 'page' : undefined}>{t.apply}</Link>
        <span className="header-theme-toggle"><ThemeToggle /></span>
        <LanguageSwitcher />
        <Link className="nav-cta" href="/keystatic">{activeLocale === 'id' ? 'Masuk' : 'Login'}</Link>
      </nav>
      <div className="mobile-header-actions">
        <Link className="nav-cta" href="/keystatic">{activeLocale === 'id' ? 'Masuk' : 'Login'}</Link>
        <MobileMenu items={mobileLinks} apply={t.apply} locale={activeLocale} />
      </div>
    </header>
  );
}