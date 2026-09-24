import Link from 'next/link';
import type { Metadata } from 'next';
import { createReader } from '@keystatic/core/reader';
import config from '../../keystatic.config';
import { pageMetadata } from '../lib/seo';

const reader = createReader(process.cwd(), config);

export const metadata: Metadata = pageMetadata({
  title: 'About',
  description: 'Learn about the convictions, goals, and vision that shape GCUA.',
  path: '/about',
});

export default async function AboutPage() {
  const faqs = await reader.collections.aboutFaqs.all();
  const stories = await reader.collections.about.all();
  return (
    <main className="directory-page about-page">
      <section className="directory-hero"><p className="eyebrow">Who we are</p><h1>About Great Commission.</h1><p>Learn about the convictions, goals, and vision that shape our theological education.</p></section>
      <section className="faq-section" aria-labelledby="about-faq-title"><div className="faq-intro"><p className="eyebrow">About us</p><h2 id="about-faq-title">Convictions that guide our work.</h2></div><div className="faq-list">{faqs.map(({ slug, entry }, index) => <details className="faq-item" key={slug} open={index === 0}><summary><span>{String(index + 1).padStart(2, '0')}</span>{entry.title}<b>+</b></summary><p>{entry.answer}</p></details>)}</div></section>
      {faqs.length === 0 && <p className="empty-state">About Us FAQs will appear here once they are added in Keystatic.</p>}
      {stories.length > 0 && <section className="directory-grid">{stories.map(({ slug, entry }) => <article className="directory-card" key={slug}><span className="card-index">ABOUT</span><h2>{entry.title}</h2><p>{entry.summary}</p><Link href={`/about/${slug}`}>Read more <span aria-hidden="true">&#8599;</span></Link></article>)}</section>}
    </main>
  );
}
