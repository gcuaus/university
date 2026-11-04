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
  navAbout: 'About Us',
  navAcademy: 'Academy',
  navWhyUs: 'Why Us?',
  navDoctrinalFoundation: 'Doctrinal Foundation',
  navGettingStarted: 'Getting Started',
  navPrograms: 'Programs',
  navFaculty: 'Faculty',
  navTuition: 'Tuition',
  navLocation: 'Location',
  navNews: 'News',
  navAdmission: 'Admission',
  navAdmissionTuition: 'Tuition',
  navApplication: 'Application',
  navStaffLogin: 'Staff Login',
  navStudentLogin: 'Student Login',
  navApply: 'Apply now',
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
            <Link href="/about">{home.navAbout}</Link>
            <SiteDropdown label={home.navWhyUs} id="why-us-menu" className="why-us-menu">
              <Link href="/about/doctrinal-foundation">{home.navDoctrinalFoundation}</Link>
              <Link href="/about/getting-started">{home.navGettingStarted}</Link>
            </SiteDropdown>
            <SiteDropdown label={home.navAcademy} id="academy-menu" className="academy-menu">
              <Link href="/programs">{home.navPrograms}</Link>
              <Link href="/faculty">{home.navFaculty}</Link>
            </SiteDropdown>
            <Link href="/tuition">{home.navTuition}</Link>
            <Link href="/location">{home.navLocation}</Link>
            <Link href="/news">{home.navNews}</Link>
            <SiteDropdown label={home.navAdmission} id="admission-menu" className="admission-menu">
              <Link href="/admission#tuition">{home.navAdmissionTuition}</Link>
              <Link href="/admission#application">{home.navApplication}</Link>
            </SiteDropdown>
            <Link href="/keystatic">{home.navStaffLogin}</Link>
            <a href="https://online.gcua.us/lms">{home.navStudentLogin}</a>
          </nav>
          <div className="header-utilities"><LanguageSwitcher /><span className="header-theme-toggle"><ThemeToggle /></span></div>
        </MobileNavigation>
        <Link className="nav-cta" href="/#evaluation">{home.navApply} <span>↗</span></Link>
      </header>
    </>
  );
}