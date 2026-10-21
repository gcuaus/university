import Link from 'next/link';
import { createReader } from '@keystatic/core/reader';
import config from '../../keystatic.config';
import '../site-content.css';

const reader = createReader(process.cwd(), config);

export default async function AboutPage() {
  const faqs = await reader.collections.aboutFaqs.all();
  return (
    <main className="directory-page about-page">
      <section className="directory-hero"><p className="eyebrow">Who we are</p><h1>About Great Commission.</h1><p>Learn about the convictions, goals, and vision that shape our theological education.</p></section>
      <section className="faq-section" aria-labelledby="about-faq-title"><div className="faq-intro"><p className="eyebrow">About us</p><h2 id="about-faq-title">Convictions that guide our work.</h2><Link className="admin-link" href="/keystatic/collection/aboutFaqs">Edit About FAQs ↗</Link></div><div className="faq-list">{faqs.map(({ slug, entry }, index) => <details className="faq-item" key={slug} open={index === 0}><summary><span>{String(index + 1).padStart(2, '0')}</span>{entry.title}<b>+</b></summary><p>{entry.answer}</p></details>)}</div></section>
      <section className="about-feature-grid" aria-label="About GCUA">
        <article><span className="card-index">ABOUT</span><h2>Our Doctrinal Foundation</h2><p>Biblical truth, Pentecostal faith, and Spirit-empowered ministry form the foundation of GCUA.</p><Link href="https://staging.gcua.us/about/doctrinal-foundation">Read more <span>↗</span></Link></article>
        <article><span className="card-index">ABOUT</span><h2>Educational Philosophy</h2><p>Our educational philosophy shapes hearts, sharpens minds, and equips Spirit-empowered leaders for ministry and academic service.</p><Link href="https://staging.gcua.us/about/educational-philosophy">Read more <span>↗</span></Link></article>
        <article><span className="card-index">ABOUT</span><h2>Institutional Goals and Objectives</h2><p>The goals and objectives that guide GCUA's formation of hearts, preparation of minds, and development of Spirit-empowered leaders.</p><Link href="https://staging.gcua.us/about/institutional-goals">Read more <span>↗</span></Link></article>
        <article><span className="card-index">ABOUT</span><h2>Our Story</h2><p>GCUA forms faithful leaders through rigorous theological education and life-giving community.</p><Link href="https://staging.gcua.us/about/our-story">Read more <span>↗</span></Link></article>
        <article><span className="card-index">ABOUT</span><h2>Our Values and Vision</h2><p>The values, vision, methods, and commitments that shape GCUA's life and ministry.</p><Link href="https://staging.gcua.us/about/values-and-vision">Read more <span>↗</span></Link></article>
      </section>
      {faqs.length === 0 && <p className="empty-state">About Us FAQs will appear here once they are added in Keystatic.</p>}
    </main>
  );
}
