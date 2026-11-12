import Link from 'next/link';
import { createReader } from '@keystatic/core/reader';
import config from '../../keystatic.config';
import LanguageSwitcher from './language-switcher';
import MobileNavigation from './mobile-navigation';

const reader = createReader(process.cwd(), config);

const fallback = {
  announcement: 'Proclaim the Gospel. Fulfill the Great Commission. Serve Christ.',
  brand: 'GCUA',
  brandDescriptor: 'Great Commission University of America',
  navHome: 'Home',
  navAbout: 'About Us',
  navAcademic: 'Academic',
  navAdmission: 'Admission',
  navResources: 'Resources Page',
};

export default async function SiteHeader() {
  const home = { ...fallback, ...(await reader.singletons.home.read() ?? {}) };

  return (
    <>
      <div className="announcement">{home.announcement}<span>↗</span></div>
      <header className="site-header">
        <Link className="brand" href="/#top">
          <img className="brand-logo" src="/logo-assets/logo.png" alt="Great Commission University of America" />
          <span><strong>{home.brand}</strong><small>{home.brandDescriptor}</small></span>
        </Link>
        <MobileNavigation>
          <nav aria-label="Main navigation">
            <Link href="/">{home.navHome}</Link>
            <Link href="/about">{home.navAbout}</Link>
            <Link href="/programs">{home.navAcademic}</Link>
            <Link href="/admission">{home.navAdmission}</Link>
            <Link href="/resources">{home.navResources}</Link>
          </nav>
          <div className="header-utilities"><LanguageSwitcher /></div>
        </MobileNavigation>
        <Link className="nav-cta" href="/application">Enroll Now</Link>
      </header>
    </>
  );
}