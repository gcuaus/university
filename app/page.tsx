import Link from 'next/link';
import { createReader } from '@keystatic/core/reader';
import config from '../keystatic.config';
import './globals.css';
import './infographics.css';
import ThemeToggle from './components/theme-toggle';
import HeroSlider from './components/hero-slider';
import EvaluationForm from './components/evaluation-form';
import MobileMenu from './components/mobile-menu';
import './site-content.css';
import './navigation-footer.css';

const reader = createReader(process.cwd(), config);

const fallback = {
  announcement: 'Applications for Fall 2026 are now open', brand: 'GCTSA', brandDescriptor: 'Great Commission Theological Seminary of America',
  navAbout: 'About', navPrograms: 'Programs', navFaculty: 'Faculty', navApply: 'Apply', heroEyebrow: 'Forming faithful leaders for a changing world',
  heroTitle: 'Rooted in truth. Ready for service.', heroBody: 'A theological education for the whole person: rigorous in study, generous in community, and alive to the call of Christ.', heroPrimaryCta: 'Explore programs', heroSecondaryCta: 'Meet our faculty',
  statOneValue: '35+', statOneLabel: 'Years of faithful formation', statTwoValue: '12', statTwoLabel: 'Distinctive programs', statThreeValue: '1', statThreeLabel: 'Shared calling',
  welcomeEyebrow: 'A place to belong', welcomeTitle: 'Study deeply. Serve faithfully.', welcomeBody: 'At GCTSA, we believe theological education should shape more than what you know. It should form how you live, lead, and love your neighbors.',
  programsEyebrow: 'Find your path', programsTitle: 'Programs shaped around your calling', programsBody: 'Build a strong foundation for ministry, scholarship, and thoughtful Christian witness.', programOneTitle: 'Master of Divinity', programOneBody: 'A comprehensive course of study for pastors and ministry leaders.', programTwoTitle: 'Master of Arts', programTwoBody: 'Focused graduate study for educators, counselors, and working professionals.', programThreeTitle: 'Certificate Studies', programThreeBody: 'Flexible theological formation for the season of life you are in.',
  ctaTitle: 'Your next faithful step starts here.', ctaBody: 'Come and see what thoughtful, Christ-centered education can make possible.', ctaButton: 'Begin your application', footerText: 'Great Commission Theological Seminary of America\nTruthful study. Faithful service.',
};

async function getHome() {
  const content = await reader.singletons.home.read();
  return { ...fallback, ...(content ?? {}) };
}

async function getHeroSlides() {
  return reader.collections.heroSlides.all();
}

async function getInfographics() {
  return reader.collections.infographics.all();
}

async function getFaculty() {
  return reader.collections.faculty.all();
}

export default async function HomePage() {
  const home = await getHome();
  const heroSlides = await getHeroSlides();
  const infographics = await getInfographics();
  const faculty = await getFaculty();
  return (
    <main>
      <div className="announcement">{home.announcement}<span>↗</span></div>
      <header className="site-header"><Link className="brand" href="#top"><span className="seal">G</span><span><strong>{home.brand}</strong><small>{home.brandDescriptor}</small></span></Link><nav className="site-nav"><Link href="/about">{home.navAbout}</Link><Link href="/programs">{home.navPrograms}</Link><Link href="/faculty">{home.navFaculty}</Link><Link href="/tuition">Tuition</Link><Link href="/#evaluation">Apply now</Link><span className="header-theme-toggle"><ThemeToggle /></span><Link className="nav-cta" href="/keystatic">Login</Link></nav><div className="mobile-header-actions"><Link className="nav-cta" href="/keystatic">Login</Link><MobileMenu /></div></header>
      <section className="hero" id="top"><div className="hero-copy"><p className="eyebrow">{home.heroEyebrow}</p><h1>{home.heroTitle}</h1><p className="hero-body">{home.heroBody}</p><div className="actions"><Link className="button gold" href="/programs">{home.heroPrimaryCta}<span>↗</span></Link><Link className="button outline" href="/faculty">{home.heroSecondaryCta}</Link></div></div><HeroSlider slides={heroSlides.map(({ entry }) => entry)} /></section>
      <section className="infographics" aria-labelledby="infographics-title"><div className="infographics-heading"><p className="eyebrow">GCITS distinctive</p><h2 id="infographics-title">A serious education for a faithful life.</h2></div><div className="infographics-grid">{infographics.map(({ slug, entry }) => <article className="infographic-card" key={slug}><img src={entry.imageUrl} alt={entry.imageAlt} /><div><h3>{entry.title}</h3><p>{entry.description}</p></div></article>)}</div></section>
      <section className="split-section" id="about"><div className="section-label"><p className="eyebrow">{home.welcomeEyebrow}</p><span>01</span></div><div><h2>{home.welcomeTitle}</h2><p>{home.welcomeBody}</p><Link className="under-link" href="/keystatic">Read our story <span>↗</span></Link></div></section>
      <section className="programs" id="programs"><div className="section-intro"><p className="eyebrow">{home.programsEyebrow}</p><h2>{home.programsTitle}</h2><p>{home.programsBody}</p></div><div className="program-grid"><article><span>01</span><h3>{home.programOneTitle}</h3><p>{home.programOneBody}</p><Link href="/programs">Explore <span>↗</span></Link></article><article><span>02</span><h3>{home.programTwoTitle}</h3><p>{home.programTwoBody}</p><Link href="/programs">Explore <span>↗</span></Link></article><article><span>03</span><h3>{home.programThreeTitle}</h3><p>{home.programThreeBody}</p><Link href="/programs">Explore <span>↗</span></Link></article></div></section>
      <section className="homepage-faculty" id="faculty"><div className="faculty-intro"><p className="eyebrow">Our faculty</p><h2>Look for a faculty.</h2><blockquote>“Don’t look for a building. Don’t look for a campus. Don’t look for a library. Don’t look for a location. Look for a faculty.”<cite>Chancellor John Piper, Bethlehem College and Seminary</cite></blockquote></div><div className="homepage-faculty-grid">{faculty.map(({ slug, entry }) => <article key={slug}>{entry.photoUrl && <img style={{ width: 88, height: 88 }} src={entry.photoUrl} alt={entry.name} />}<h3>{entry.name}</h3><p>{entry.role}</p></article>)}</div><div className="partnership-copy"><p className="eyebrow">Partnership</p><h3>Great Commission International Theological Seminary</h3><p>Maintains academic partnerships in theological education with several theological colleges and seminaries in Indonesia. These partner institutions are legally established, officially recognized, and accredited according to the laws and regulations of the Republic of Indonesia.</p><ul><li>Agapes Theological College</li><li>Vineyard Theological College</li><li>Sunergeo Theological College</li></ul><Link className="under-link" href="/keystatic/collection/faculty">Edit faculty and partnership content <span>↗</span></Link></div></section>
      <section className="cta" id="evaluation"><p className="eyebrow">Come as you are</p><h2>Request your free evaluation today.</h2><p>Tell us about your educational background and ministry interests, and our team will help you understand your next faithful step.</p><EvaluationForm /></section>
      <footer><div><span className="seal small">G</span><p>{home.footerText}</p></div><span className="footer-admin"><Link href="/keystatic">Content manager</Link> · © 2026 GCTSA</span><span className="footer-theme-toggle"><ThemeToggle /></span></footer>
    </main>
  );
}