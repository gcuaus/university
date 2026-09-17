import Link from 'next/link';
import { createReader } from '@keystatic/core/reader';
import config from '../../keystatic.config';
import '../globals.css';
import '../site-content.css';
import '../navigation-footer.css';

const reader = createReader(process.cwd(), config);

export default async function AboutPage() {
  const faqs = await reader.collections.aboutFaqs.all();
  return (
    <main className="directory-page about-page">
      <header className="directory-header"><Link href="/" className="back-link">GCTSA <span>↗</span></Link><Link href="/keystatic" className="admin-link">Edit</Link></header>
      <section className="directory-hero"><p className="eyebrow">Who we are</p><h1>About Great Commission.</h1><p>Learn about the convictions, goals, and vision that shape our theological education.</p></section>
      <section className="faq-section" aria-labelledby="about-faq-title"><div className="faq-intro"><p className="eyebrow">About us</p><h2 id="about-faq-title">Convictions that guide our work.</h2><Link className="admin-link" href="/keystatic/collection/aboutFaqs">Edit About FAQs ↗</Link></div><div className="faq-list">{faqs.map(({ slug, entry }, index) => <details className="faq-item" key={slug} open={index === 0}><summary><span>{String(index + 1).padStart(2, '0')}</span>{entry.title}<b>+</b></summary><p>{entry.answer}</p></details>)}</div></section>
      {faqs.length === 0 && <p className="empty-state">About Us FAQs will appear here once they are added in Keystatic.</p>}
    </main>
  );
}
