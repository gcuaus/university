import Link from 'next/link';
import { createReader } from '@keystatic/core/reader';
import config from '../../keystatic.config';
import '../site-content.css';

const reader = createReader(process.cwd(), config);

export default async function AboutPage() {
  const faqs = await reader.collections.aboutFaqs.all();
  const page = await reader.singletons.aboutPage.read();
  return (
    <main className="directory-page about-page">
      <section className="directory-hero"><p className="eyebrow">{page?.heroEyebrow}</p><h1>{page?.heroTitle}</h1><p>{page?.heroDescription}</p></section>
      <section className="faq-section" aria-labelledby="about-faq-title"><div className="faq-intro"><p className="eyebrow">{page?.faqEyebrow}</p><h2 id="about-faq-title">{page?.faqTitle}</h2><Link className="admin-link" href={page?.faqEditHref || '/keystatic/collection/aboutFaqs'}>{page?.faqEditLabel} ↗</Link></div><div className="faq-list">{faqs.map(({ slug, entry }, index) => <details className="faq-item" key={slug} open={index === 0}><summary><span>{String(index + 1).padStart(2, '0')}</span>{entry.title}<b>+</b></summary><p>{entry.answer}</p></details>)}</div></section>
      <section className="about-feature-grid" aria-label="About GCUA">
        {page?.features.map((feature) => <article key={feature.title}><span className="card-index">{feature.label}</span><h2>{feature.title}</h2><p>{feature.description}</p><Link href={feature.href}>{feature.linkLabel} <span>↗</span></Link></article>)}
      </section>
      {faqs.length === 0 && <p className="empty-state">{page?.emptyFaqMessage}</p>}
    </main>
  );
}
