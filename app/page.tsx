import Link from 'next/link';
import { DocumentRenderer } from '@keystatic/core/renderer';
import { createReader } from '@keystatic/core/reader';
import config from '../keystatic.config';
import './infographics.css';
import HeroSlider from './components/hero-slider';
import EvaluationForm from './components/evaluation-form';
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
  invitationTagline: 'Study from wherever you are. Grow in knowledge. Be empowered by the Spirit. Fulfill your calling.', invitationName: 'Dr. Ferdinand Saerang', invitationRole: 'President of Great Commission University of America', invitationImageUrl: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=1200&q=85', invitationImageAlt: 'Students learning and growing together in Christian community',
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

async function getCredentials() {
  const [section, credentials] = await Promise.all([
    reader.singletons.credentialsSection.read(),
    reader.collections.credentials.all(),
  ]);
  const credentialOrder = ['OUR FOUNDATION', 'OUR APPROACH', 'OUR MISSION'];
  return {
    section,
    credentials: [...credentials].sort((left, right) => {
      const leftOrder = credentialOrder.indexOf(left.entry.eyebrow);
      const rightOrder = credentialOrder.indexOf(right.entry.eyebrow);
      return (leftOrder < 0 ? credentialOrder.length : leftOrder)
        - (rightOrder < 0 ? credentialOrder.length : rightOrder);
    }),
  };
}

async function getFaculty() {
  return reader.collections.faculty.all();
}

export default async function HomePage() {
  const home = await getHome();
  const heroSlides = await getHeroSlides();
  const whyChoose = await reader.collections.about.read('why-choose-gcua');
  if (!whyChoose) throw new Error('Missing required "why-choose-gcua" content.');
  const { section: credentialsSection, credentials } = await getCredentials();
  const faculty = await getFaculty();
  return (
    <main>
      <section className="hero" id="top"><div className="hero-copy"><p className="eyebrow">{home.heroEyebrow}</p><h1>{home.heroTitle}</h1><p className="hero-body">{home.heroBody}</p><div className="actions"><Link className="button gold" href="/programs">{home.heroPrimaryCta}<span>↗</span></Link><Link className="button outline" href="/about/our-story">{home.heroSecondaryCta}</Link></div></div><HeroSlider slides={heroSlides.map(({ entry }) => entry)} /></section>
      <section className="credentials-section" aria-labelledby="credentials-title">
        <div className="credentials-heading">
          <p className="eyebrow">{credentialsSection?.eyebrow}</p>
          <h2 id="credentials-title">{credentialsSection?.title}</h2>
          <p>{credentialsSection?.description}</p>
        </div>
        <div className="credentials-grid">
          {credentials.map(({ slug, entry }) => (
            <article className="credential-card" key={slug}>
              <span className="credential-icon" aria-hidden="true">{entry.icon}</span>
              <p className="credential-eyebrow">{entry.eyebrow}</p>
              <h3>{entry.title}</h3>
              <p className="credential-description">{entry.description}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="infographics" aria-labelledby="infographics-title"><div className="infographics-heading"><p className="eyebrow">Why Choose GCUA?</p><h2 id="infographics-title">A Christ-Centered, Bible-Based &amp; Spirit-Empowered Christian University</h2></div><div className="why-choose-scroll"><div className="why-choose-content"><DocumentRenderer document={await whyChoose.content()} /></div><div className="why-choose-bottom-fade" aria-hidden="true" /></div></section>
      <section className="personal-invitation" aria-labelledby="invitation-title"><div className="invitation-image"><img src={home.invitationImageUrl} alt={home.invitationImageAlt} /></div><div className="invitation-copy"><p className="eyebrow">{home.invitationEyebrow}</p><h2 id="invitation-title">{home.invitationTitle}</h2><p>{home.invitationBody}</p><p className="invitation-tagline">{home.invitationTagline}</p><p className="invitation-signature"><strong>{home.invitationName}</strong><span>{home.invitationRole}</span></p></div></section>
      <section className="split-section" id="about"><div className="section-label"><p className="eyebrow">{home.welcomeEyebrow}</p><span>01</span></div><div><h2>{home.welcomeTitle}</h2><p>{home.welcomeBody}</p><Link className="under-link" href="/about">Read our story <span>↗</span></Link></div></section>
      <section className="programs" id="programs"><div className="section-intro"><p className="eyebrow">{home.programsEyebrow}</p><h2>{home.programsTitle}</h2><p>{home.programsBody}</p></div><div className="program-grid"><article><span>01</span><h3>{home.programOneTitle}</h3><p>{home.programOneBody}</p><Link href="/programs">View program <span>↗</span></Link></article><article><span>02</span><h3>{home.programTwoTitle}</h3><p>{home.programTwoBody}</p><Link href="/programs">View program <span>↗</span></Link></article><article><span>03</span><h3>{home.programThreeTitle}</h3><p>{home.programThreeBody}</p><Link href="/programs">View program <span>↗</span></Link></article></div></section>
      <section className="homepage-faculty" id="faculty"><div className="faculty-intro"><p className="eyebrow">Leadership</p><h2>Christian educators and experienced ministry leaders.</h2><blockquote>Prepare and empower Spirit-filled Christian leaders to proclaim the Gospel, fulfill the Great Commission, and serve Christ effectively throughout the world.<cite>GCUA Mission</cite></blockquote></div><div className="homepage-faculty-grid">{faculty.map(({ slug, entry }) => <article key={slug}>{entry.photoUrl && <Link href={`/faculty/${slug}`} aria-label={`View ${entry.name} profile`}><img style={{ width: 88, height: 88 }} src={entry.photoUrl} alt={entry.name} /></Link>}<h3>{entry.name}</h3><p>{entry.role}</p></article>)}</div></section>
      <section className="cta" id="evaluation"><p className="eyebrow">Our commitment</p><h2>Request your free evaluation today.</h2><p>Tell us about your educational background and ministry interests, and our team will help you understand your next faithful step.</p><EvaluationForm /></section>
    </main>
  );
}