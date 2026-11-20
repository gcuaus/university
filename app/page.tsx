import Link from 'next/link';
import { DocumentRenderer } from '@keystatic/core/renderer';
import { createReader } from '@keystatic/core/reader';
import config from '../keystatic.config';
import './infographics.css';
import HeroSlider from './components/hero-slider';
import EvaluationForm from './components/evaluation-form';
import HomeProgramGrid from './components/home-program-grid';
import { enrollmentSteps } from './enrollment-steps';
import './site-content.css';

const reader = createReader(process.cwd(), config);

const fallback = {
  announcement: 'Proclaim the Gospel. Fulfill the Great Commission. Serve Christ.', brand: 'GCUA', brandDescriptor: 'Great Commission University of America',
  navAbout: 'About Us', navPrograms: 'Academic', navFaculty: 'Faculty', navApply: 'Apply now', heroEyebrow: 'Our mission',
  heroTitle: 'Christ-centered. Bible-based. Spirit-empowered.', heroBody: 'Prepare and empower Spirit-filled Christian leaders to proclaim the Gospel, fulfill the Great Commission, and serve Christ effectively throughout the world.', heroPrimaryCta: 'Explore academic programs', heroSecondaryCta: 'Our mission and vision',
  statOneValue: '01', statOneLabel: 'Great Commission', statTwoValue: '12', statTwoLabel: 'Degree programs', statThreeValue: '03', statThreeLabel: 'Areas of education',
  welcomeEyebrow: 'Our vision', welcomeTitle: "Leaders who make disciples and advance God's Kingdom.", welcomeBody: "We develop Christ-centered, biblically grounded, and Holy Spirit-empowered leaders who make disciples and advance God's Kingdom. Our graduates serve as transformational leaders in churches, families, communities, and nations.",
  programsEyebrow: 'Our educational approach', programsTitle: "Know God's Word. Know God's ways. Do God's work.", programsBody: 'We provide Christ-centered, Bible-based, and Spirit-empowered education that combines academic learning, spiritual formation, and practical ministry.', programOneTitle: 'Associate of Arts in Biblical Studies', programOneBody: 'The Associate of Arts in Biblical Studies introduces students to biblical interpretation, Christian theology, and practical ministry from a Pentecostal–Charismatic perspective.', programTwoTitle: 'Bachelor of Theology (Th.B.)', programTwoBody: 'The Bachelor of Theology prepares students for pastoral ministry, evangelism, Christian education, missions, and church leadership. The program emphasizes biblical scholarship, theological understanding, and Spirit-empowered ministry.', programThreeTitle: 'Master of Divinity (M.Div.)', programThreeBody: 'The Master of Divinity is a professional graduate degree designed to prepare students for pastoral leadership, preaching, evangelism, missions, church planting, and other areas of Christian ministry.',
  ctaTitle: 'Prepare to fulfill the Great Commission.', ctaBody: 'Discover how Christ-centered, Bible-based, Spirit-empowered education can prepare you for Christian leadership and effective Kingdom service.', ctaButton: 'Begin your application',
  invitationEyebrow: 'A Personal Invitation', invitationTitle: 'Pursue Your Degree. Prepare for Your Calling.', invitationBody: 'Great Commission University of America (GCUA) provides biblically grounded, academically focused, and ministry-centered higher education for men and women called to serve Christ and His Church. As a Pentecostal-Charismatic institution, GCUA affirms the authority of Scripture and the continuing work and power of the Holy Spirit. Our programs integrate biblical studies, theological education, spiritual formation, leadership development, and practical ministry preparation. Whether you are preparing for pastoral ministry, Christian education, missions, evangelism, counseling, church leadership, or deeper biblical study, GCUA offers flexible learning opportunities designed to equip you for effective Christian service.',
  invitationTagline: 'Study from wherever you are. Grow in knowledge. Be empowered by the Spirit. Fulfill your calling.', invitationName: 'Dr. Ferdinand Saerang', invitationRole: 'President of Great Commission University of America', invitationImageUrl: 'https://gcits.org/wp-content/uploads/2026/03/FERDINAND.jpg', invitationImageAlt: 'Dr. Ferdinand Saerang',
};

async function getHome() {
  const content = await reader.singletons.home.read();
  return {
    ...fallback,
    ...(content ?? {}),
    invitationImageUrl: content?.invitationImageUrl ?? fallback.invitationImageUrl,
  };
}

async function getHeroSlides() {
  return reader.collections.heroSlides.all();
}

async function getFaculty() {
  return reader.collections.faculty.all();
}

async function getPrograms() {
  const programs = await reader.collections.programs.all();
  return [...programs].sort((left, right) =>
    (left.entry.sortOrder ?? Number.MAX_SAFE_INTEGER)
    - (right.entry.sortOrder ?? Number.MAX_SAFE_INTEGER)
  );
}

export default async function HomePage() {
  const home = await getHome();
  const heroSlides = await getHeroSlides();
  const whyChoose = await reader.collections.about.read('why-choose-gcua');
  if (!whyChoose) throw new Error('Missing required "why-choose-gcua" content.');
  const faculty = await getFaculty();
  const programs = await getPrograms();
  return (
    <main>
      <section className="hero" id="top"><div className="hero-copy"><p className="eyebrow">{home.heroEyebrow}</p><h1>{home.heroTitle}</h1><p className="hero-body">{home.heroBody}</p><div className="actions"><Link className="button gold" href="/programs">{home.heroPrimaryCta}<span>↗</span></Link><Link className="button outline" href="/about/our-story">{home.heroSecondaryCta}</Link></div></div><HeroSlider slides={heroSlides.map(({ entry }) => entry)} /></section>
      <section className="personal-invitation personal-invitation-top" aria-labelledby="invitation-title"><div className="invitation-copy"><p className="eyebrow">{home.invitationEyebrow}</p><h2 id="invitation-title">{home.invitationTitle}</h2><p>{home.invitationBody}</p><p className="invitation-tagline">{home.invitationTagline}</p><div className="invitation-signature"><div className="invitation-signature-copy"><strong>{home.invitationName}</strong><span>{home.invitationRole}</span></div><img className="invitation-signature-image" src={home.invitationImageUrl} alt={home.invitationImageAlt} /></div></div></section>
      <section className="programs" id="programs" aria-labelledby="programs-title">
        <div className="section-intro">
          <p className="eyebrow">Our academic programs</p>
          <h2 id="programs-title" className="academic-range-title">From Diploma to Doctorate</h2>
          <p>Explore Christ-centered degree programs for biblical study, theology, Christian leadership, counseling, and practical ministry.</p>
        </div>
        <HomeProgramGrid
          programs={programs.map(({ slug, entry }) => ({
            slug,
            category: entry.category ?? '',
            title: entry.title,
            summary: entry.summary,
            detailsUrl: entry.detailsUrl || `/programs/${slug}`,
          }))}
        />
      </section>
      <section className="infographics" aria-labelledby="infographics-title">
        <div className="infographics-layout">
          <div className="infographics-heading">
            <p className="eyebrow">Why Choose GCUA?</p>
            <h2 id="infographics-title">A Christ-Centered, Bible-Based &amp; Spirit-Empowered Christian University</h2>
            <blockquote className="infographics-verse">
              “Study to shew thyself approved unto God, a workman that needeth not to be ashamed, rightly dividing the word of truth.”
              <cite>2 Timothy 2:15</cite>
            </blockquote>
          </div>
          <div className="why-choose-scroll">
            <div className="why-choose-content"><DocumentRenderer document={await whyChoose.content()} /></div>
          </div>
        </div>
      </section>
      <section className="home-enrollment" aria-labelledby="home-enrollment-title">
        <div className="section-intro">
          <p className="eyebrow">Your path to GCUA</p>
          <h2 id="home-enrollment-title">What Happens Next</h2>
        </div>
        <ol className="home-enrollment-steps">
          {enrollmentSteps.map((step) => (
            <li key={step.number}>
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
        <Link className="button gold" href="/application">Begin your application <span aria-hidden="true">↗</span></Link>
      </section>
      <section className="split-section" id="about"><div className="section-label"><p className="eyebrow">{home.welcomeEyebrow}</p><span>01</span></div><div><h2>{home.welcomeTitle}</h2><p>{home.welcomeBody}</p><Link className="under-link" href="/about">Read our story <span>↗</span></Link></div></section>
      <section className="homepage-faculty" id="faculty"><div className="faculty-intro"><p className="eyebrow">Leadership</p><h2>Christian educators and experienced ministry leaders.</h2><blockquote>Prepare and empower Spirit-filled Christian leaders to proclaim the Gospel, fulfill the Great Commission, and serve Christ effectively throughout the world.<cite>GCUA Mission</cite></blockquote></div><div className="homepage-faculty-grid">{faculty.map(({ slug, entry }) => <article key={slug}>{entry.photoUrl && <Link href={`/faculty/${slug}`} aria-label={`View ${entry.name} profile`}><img style={{ width: 88, height: 88 }} src={entry.photoUrl} alt={entry.name} /></Link>}<h3>{entry.name}</h3><p>{entry.role}</p></article>)}</div></section>
      <section className="cta" id="evaluation"><p className="eyebrow">Our commitment</p><h2>Request your free evaluation today.</h2><p>Tell us about your educational background and ministry interests, and our team will help you understand your next faithful step.</p><EvaluationForm /></section>
    </main>
  );
}