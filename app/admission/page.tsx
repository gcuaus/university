import Link from 'next/link';
import { createReader } from '@keystatic/core/reader';
import config from '../../keystatic.config';

const reader = createReader(process.cwd(), config);

export default async function AdmissionPage() {
  const page = await reader.singletons.admissionPage.read();
  return (
    <main className="directory-page">
      <header className="directory-header"><Link href={page?.startHref || '/#evaluation'} className="admin-link">{page?.startLabel}</Link></header>
      <section className="directory-hero">
        <p className="eyebrow">{page?.heroEyebrow}</p>
        <h1>{page?.heroTitle}</h1>
        <p>{page?.heroDescription}</p>
      </section>
      <section className="directory-grid">
        {page?.cards.map((card) => (
          <article className="directory-card" id={card.id} key={card.id || card.label}>
            <span className="card-index">{card.label}</span>
            <h2>{card.title}</h2>
            <p>{card.description}</p>
            {card.linkHref && <a href={card.linkHref}>{card.linkLabel} <span>↗</span></a>}
          </article>
        ))}
      </section>
    </main>
  );
}
