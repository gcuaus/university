import Link from 'next/link';
import { createReader } from '@keystatic/core/reader';
import config from '../keystatic.config';
import './hero-mobile.css';
import './infographics.css';
import './evaluation-form.css';
import HeroSlider from './components/hero-slider';
import EvaluationForm from './components/evaluation-form';
import ProgramsCarousel from './components/programs-carousel';
import MarkdocContent from './components/markdoc-content';

const reader = createReader(process.cwd(), config);

const fallback = {
  announcement: 'Applications for Fall 2026 are now open', brand: 'GCUA', brandDescriptor: 'Great Commission University of America',
  navAbout: 'About Us', navPrograms: 'Programs', navFaculty: 'Faculty', navApply: 'Apply', heroEyebrow: 'A Personal Invitation',
  heroTitle: 'Pursue Your Degree. Prepare\nfor Your Calling.', heroBody: '', heroPrimaryCta: 'Explore programs', heroSecondaryCta: 'Meet our faculty',
  statOneValue: '35+', statOneLabel: 'Years of faithful formation', statTwoValue: '12', statTwoLabel: 'Distinctive programs', statThreeValue: '1', statThreeLabel: 'Shared calling',
  welcomeEyebrow: 'A Personal Invitation', welcomeTitle: 'Pursue Your Degree.\nPrepare for Your Calling.', welcomeBody: 'Great Commission University of America (GCUA) provides biblically grounded, academically focused, and ministry-centered higher education for men and women called to serve Christ and His Church.\n\nAs a Pentecostal-Charismatic institution, GCUA affirms the authority of Scripture and the continuing work and power of the Holy Spirit. Our programs integrate biblical studies, theological education, spiritual formation, leadership development, and practical ministry preparation.\n\nWhether you are preparing for pastoral ministry, Christian education, missions, evangelism, counseling, church leadership, or deeper biblical study, GCUA offers flexible learning opportunities designed to equip you for effective Christian service.', welcomeClosing: 'Study from wherever you are. Grow in knowledge. Be empowered by the Spirit. Fulfill your calling.', welcomeSignatureName: 'Dr. Ferdinand Saerang', welcomeSignatureTitle: 'President of Great Commission University of America',
  programsEyebrow: 'Find your path', programsTitle: 'Programs shaped around your calling', programsBody: 'Build a strong foundation for ministry, scholarship, and thoughtful Christian witness.', programOneTitle: 'Master of Divinity', programOneBody: 'A comprehensive course of study for pastors and ministry leaders.', programTwoTitle: 'Master of Arts', programTwoBody: 'Focused graduate study for educators, counselors, and working professionals.', programThreeTitle: 'Certificate Studies', programThreeBody: 'Flexible theological formation for the season of life you are in.',
  offerTitle: 'What We Offer Every Student', offerBody: '', offerItems: [] as string[], whyEyebrow: 'Why Choose GCUA', whyTitle: 'A Spirit-Empowered Christian University for Biblical and Ministry Education', whyBody: '',

  ctaTitle: 'Your next faithful step starts here.', ctaBody: 'Come and see what thoughtful, Christ-centered education can make possible.', ctaButton: 'Begin your application', footerText: 'Great Commission University of America\nTruthful study. Faithful service.',
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

async function getGettingStarted() {
  return reader.collections.gettingStarted.read('getting-started');
}

export default async function HomePage() {
  const home = await getHome();
  const heroSlides = await getHeroSlides();
  const infographics = await getInfographics();
  const faculty = await getFaculty();
  const programs = await reader.collections.programs.all();
  const gettingStarted = await getGettingStarted();
  const gettingStartedContent = gettingStarted ? await gettingStarted.content() : null;

  return (
    <main>
      <div className="announcement">{home.announcement}<span aria-hidden="true">↗</span></div>
      <section className="hero" id="top"><div className="hero-copy"><p className="eyebrow">{home.heroEyebrow}</p><h1>{home.heroTitle.split('\n').map((line, index) => <span key={index}>{index > 0 && <br />}{line}</span>)}</h1><p className="hero-body">{home.heroBody}</p><div className="actions"><Link className="button gold" href="/programs">{home.heroPrimaryCta}<span aria-hidden="true">↗</span></Link><Link className="button outline" href="/faculty">{home.heroSecondaryCta}</Link></div></div><HeroSlider slides={heroSlides.map(({ entry }) => entry)} /></section>
      <section className="stats-table-wrap">
        <div className="stats-table" aria-label="School statistics">
          <div className="stats-table-item"><strong>{home.statOneValue}</strong><span>{home.statOneLabel}</span></div>
          <div className="stats-table-item"><strong>{home.statTwoValue}</strong><span>{home.statTwoLabel}</span></div>
          <div className="stats-table-item"><strong>{home.statThreeValue}</strong><span>{home.statThreeLabel}</span></div>
        </div>
      </section>
            <section className="offer" aria-labelledby="offer-title">
        <div className="section-intro">
          <h2 id="offer-title">{home.offerTitle}</h2>
          {home.offerBody && <p>{home.offerBody}</p>}
        </div>
        <ul className="offer-list">
          {home.offerItems.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </section>
      <section className="infographics" aria-labelledby="why-title">
        <div className="infographics-heading">
          <p className="eyebrow">{home.whyEyebrow}</p>
          <h2 id="why-title">{home.whyTitle}</h2>
          {home.whyBody && <p className="why-body">{home.whyBody}</p>}
        </div>
        <div className="infographics-grid">
          {infographics.map(({ slug, entry }) => (
            <article className="infographic-card" key={slug}>
              {entry.imageUrl
                ? <img src={entry.imageUrl} alt={entry.imageAlt ?? ''} />
                : <span className="infographic-icon" aria-hidden="true">{entry.icon}</span>}
              <div><h3>{entry.title}</h3><p>{entry.description}</p></div>
            </article>
          ))}
        </div>
      </section>
      <section className="welcome-invitation" id="about">
        <div className="welcome-invitation-inner">
          <p className="eyebrow">{home.welcomeEyebrow}</p>
          <h2>{home.welcomeTitle.split('\n').map((line, index) => <span key={index}>{index > 0 && <br />}{line}</span>)}</h2>
          <div className="welcome-invitation-copy">
            {home.welcomeBody.split(/\n\s*\n/).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <h3 className="welcome-invitation-closing">{home.welcomeClosing}</h3>
          <p className="welcome-invitation-signature"><strong>{home.welcomeSignatureName}</strong><span>{home.welcomeSignatureTitle}</span></p>
        </div>
      </section>
      <section className="programs" id="programs"><div className="section-intro"><p className="eyebrow">{home.programsEyebrow}</p><h2>{home.programsTitle}</h2><p>{home.programsBody}</p></div><ProgramsCarousel programs={programs.map(({ slug, entry }) => ({ slug, title: entry.title, summary: entry.summary, level: entry.level, duration: entry.duration, disciplines: entry.disciplines, programType: entry.programType, curriculumUrl: entry.curriculumUrl || '/programs' }))} /></section>
      <section className="homepage-faculty" id="faculty"><div className="faculty-intro"><p className="eyebrow">Our faculty</p><h2>Look for a faculty.</h2><blockquote>“Don’t look for a building. Don’t look for a campus. Don’t look for a library. Don’t look for a location. Look for a faculty.”<cite>Chancellor John Piper, Bethlehem College and Seminary</cite></blockquote></div><div className="homepage-faculty-grid">{faculty.map(({ slug, entry }) => <article key={slug}>{entry.photoUrl && <img style={{ width: 88, height: 88 }} src={entry.photoUrl} alt={entry.name} />}<h3>{entry.name}</h3><p>{entry.role}</p></article>)}</div><div className="partnership-copy"><p className="eyebrow">Partnership</p><h3>Great Commission University of America</h3><p>Maintains academic partnerships in theological education with several theological colleges and seminaries in Indonesia. These partner institutions are legally established, officially recognized, and accredited according to the laws and regulations of the Republic of Indonesia.</p><ul><li>Agapes Theological College</li><li>Vineyard Theological College</li><li>Sunergeo Theological College</li></ul><Link className="under-link" href="/faculty">Meet our faculty <span aria-hidden="true">↗</span></Link></div></section>
      <section className="cta" id="evaluation"><p className="eyebrow">Come as you are</p><h2>Request your free evaluation today.</h2><p>Tell us about your educational background and ministry interests, and our team will help you understand your next faithful step.</p><EvaluationForm /></section>
      {gettingStartedContent && <section className="getting-started-section" aria-label="Getting Started"><MarkdocContent document={gettingStartedContent} className="getting-started-timeline" /></section>}
    </main>
  );
}
