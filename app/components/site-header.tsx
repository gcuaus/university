import Link from 'next/link';
import { createReader } from '@keystatic/core/reader';
import config from '../../keystatic.config';
import LanguageSwitcher from './language-switcher';
import MobileNavigation from './mobile-navigation';
import SiteDropdown from './site-dropdown';
import ThemeToggle from './theme-toggle';

const reader = createReader(process.cwd(), config);

const fallback = {
  announcement: 'Applications for Fall 2026 are now open',
  brand: 'GCUA',
  brandDescriptor: 'Great Commission University of America',
  navPrograms: 'Programs',
  navFaculty: 'Faculty',
  navApply: 'Apply now',
};

export default async function SiteHeader() {
  const home = { ...fallback, ...(await reader.singletons.home.read() ?? {}) };

  return (
    <>
      <div className="announcement">{home.announcement}<span>↗</span></div>
      <header className="site-header">
        <Link className="brand" href="/#top">
          <img className="brand-logo brand-logo-dark" src="/logo-assets/logo_dark_transparent.png" alt="Great Commission University of America" />
          <img className="brand-logo brand-logo-light" src="/logo-assets/logo.png" alt="" />
          <span><strong>{home.brand}</strong><small>{home.brandDescriptor}</small></span>
        </Link>
        <MobileNavigation>
          <nav aria-label="Main navigation">
            <Link href="/about">About Us</Link>
            <SiteDropdown label="Why Us?" id="why-us-menu" className="why-us-menu">
              <a href="https://staging.gcua.us/about/doctrinal-foundation">Doctrinal Foundation</a>
              <a href="https://staging.gcua.us/getting-started">Getting Started</a>
            </SiteDropdown>
            <SiteDropdown label="Academy" id="academy-menu" className="academy-menu">
              <Link href="/programs">{home.navPrograms}</Link>
              <Link href="/faculty">{home.navFaculty}</Link>
            </SiteDropdown>
            <Link href="/tuition">Tuition</Link>
            <Link href="/location">Location</Link>
            <a href="https://staging.gcua.us/blog">News</a>
            <a href="https://staging.gcua.us/contact">Contact</a>
            <SiteDropdown label="Admission" id="admission-menu" className="admission-menu">
              <Link href="/admission#tuition">Tuition</Link>
              <Link href="/admission#application">Application</Link>
            </SiteDropdown>
          </nav>
          <div className="header-utilities"><LanguageSwitcher /><span className="header-theme-toggle"><ThemeToggle /></span></div>
        </MobileNavigation>
        <Link className="nav-cta" href="/#evaluation">{home.navApply} <span>↗</span></Link>
      </header>
    </>
  );
}