import Link from 'next/link';
import { createReader } from '@keystatic/core/reader';
import config from '../keystatic.config';
import './hero-mobile.css';
import './infographics.css';
import './evaluation-form.css';
import HeroSlider from './components/hero-slider';
import EvaluationForm from './components/evaluation-form';
import ProgramsCarousel from './components/programs-carousel';

const reader = createReader(process.cwd(), config);

const fallback = {
  announcement: 'Applications for Fall 2026 are now open', brand: 'GCUA', brandDescriptor: 'Great Commission University of America',
  navAbout: 'About', navPrograms: 'Programs', navFaculty: 'Faculty', navApply: 'Apply', heroEyebrow: 'Great Commission University of America',
  heroTitle: 'Pursue Your Degree. Prepare for Your Calling.', heroBody: 'Great Commission University of America (GCUA) provides biblically grounded, academically focused, and ministry-centered higher education for men and women called to serve Christ and His Church.', heroPrimaryCta: 'Explore programs', heroSecondaryCta: 'Meet our faculty',
  statOneValue: '20+', statOneLabel: 'Years of faithful formation', statTwoValue: '12', statTwoLabel: 'Distinctive programs', statThreeValue: '1', statThreeLabel: 'Shared calling',
  welcomeEyebrow: 'From the President', welcomeTitle: 'A Personal Invitation', welcomeBody: 'Study from wherever you are. Grow in knowledge. Be empowered by the Spirit. Fulfill your calling.', welcomeSignerName: 'Dr. Ferdinand Saerang', welcomeSignerRole: 'President of Great Commission University of America',
  offerTitle: 'What We Offer Every Student', offerBody: '', offerItems: [] as string[],
  whyEyebrow: 'Why Choose GCUA', whyTitle: 'A Spirit-Empowered Christian University for Biblical and Ministry Education', whyBody: '',
  programsEyebrow: 'Find your path', programsTitle: 'Programs shaped around your calling', programsBody: 'Build a strong foundation for ministry, scholarship, and thoughtful Christian witness.', programOneTitle: 'Master of Divinity', programOneBody: 'A comprehensive course of study for pastors and ministry leaders.', programTwoTitle: 'Master of Arts', programTwoBody: 'Focused graduate study for educators, counselors, and working professionals.', programThreeTitle: 'Certificate Studies', programThreeBody: 'Flexible theological formation for the season of life you are in.',
  stepsEyebrow: 'Getting Started', stepsTitle: 'How to Enroll at Great Commission University of America', stepsBody: '', steps: [] as { title: string; body: string }[],
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

export default async function HomePage() {
  const home = await getHome();
  const heroSlides = await getHeroSlides();
  const infographics = await getInfographics();
  const faculty = await getFaculty();
  const programs = await reader.collections.programs.all();
  const invitationParagraphs = home.welcomeBody.split(/\n{2,}/).filter(Boolean);

  return (
    <main>
      <div className="announcement">{home.announcement}<span aria-hidden="true">↗</span></div>
      <section className="hero" id="top"><div className="hero-copy"><p className="eyebrow">{home.heroEyebrow}</p><h1>{home.heroTitle}</h1><p className="hero-body">{home.heroBody}</p><div className="actions"><Link className="button gold" href="/programs">{home.heroPrimaryCta}<span aria-hidden="true">↗</span></Link><Link className="button outline" href="/faculty">{home.heroSecondaryCta}</Link></div></div><HeroSlider slides={heroSlides.map(({ entry }) => entry)} /></section>

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

      <section className="split-section" id="about">
        <div className="section-label"><p className="eyebrow">{home.welcomeEyebrow}</p><span></span></div>
        <div className="split-section-content">
          <div className="belonging-visual"><img src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80" alt="Students gathered in a Bible study session" /></div>
          <div className="split-section-copy">
            <h2>{home.welcomeTitle}</h2>
            {invitationParagraphs.map((paragraph) => <p key={paragraph.slice(0, 40)}>{paragraph}</p>)}
            {home.welcomeSignerName && (
              <p className="invitation-signer"><strong>{home.welcomeSignerName}</strong><span>{home.welcomeSignerRole}</span></p>
            )}
            <Link className="under-link" href="/about">Read our story <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </section>

      <section className="programs" id="programs"><div className="section-intro"><p className="eyebrow">{home.programsEyebrow}</p><h2>{home.programsTitle}</h2><p>{home.programsBody}</p></div><ProgramsCarousel programs={programs.map(({ slug, entry }) => ({ slug, title: entry.title, summary: entry.summary, level: entry.level, duration: entry.duration, disciplines: entry.disciplines, programType: entry.programType, curriculumUrl: entry.curriculumUrl || '/programs' }))} /></section>

      <section className="homepage-faculty" id="faculty"><div className="faculty-intro"><p className="eyebrow">Our faculty</p><h2>Look for a faculty.</h2><blockquote>“Don’t look for a building. Don’t look for a campus. Don’t look for a library. Don’t look for a location. Look for a faculty.”<cite>Chancellor John Piper, Bethlehem College and Seminary</cite></blockquote></div><div className="homepage-faculty-grid">{faculty.map(({ slug, entry }) => <article key={slug}>{entry.photoUrl && <img style={{ width: 88, height: 88 }} src={entry.photoUrl} alt={entry.name} />}<h3>{entry.name}</h3><p>{entry.role}</p></article>)}</div><div className="partnership-copy"><p className="eyebrow">Partnership</p><h3>Great Commission University of America</h3><p>Maintains academic partnerships in theological education with several theological colleges and seminaries in Indonesia. These partner institutions are legally established, officially recognized, and accredited according to the laws and regulations of the Republic of Indonesia.</p><ul><li>Agapes Theological College</li><li>Vineyard Theological College</li><li>Sunergeo Theological College</li></ul><Link className="under-link" href="/faculty">Meet our faculty <span aria-hidden="true">↗</span></Link></div></section>

      <section className="steps" aria-labelledby="steps-title">
        <div className="section-intro">
          <p className="eyebrow">{home.stepsEyebrow}</p>
          <h2 id="steps-title">{home.stepsTitle}</h2>
          {home.stepsBody && <p>{home.stepsBody}</p>}
        </div>
        <ol className="steps-list">
          {home.steps.map((step, index) => (
            <li key={step.title}>
              <span className="steps-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h3>{step.title}</h3>
                {step.body && <p>{step.body}</p>}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="cta" id="evaluation"><p className="eyebrow">Come as you are</p><h2>Request your free evaluation today.</h2><p>Tell us about your educational background and ministry interests, and our team will help you understand your next faithful step.</p><EvaluationForm /></section>
    </main>
  );
}
